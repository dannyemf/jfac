function ContabilidadDao(){	
};

ContabilidadDao.prototype = new Dao();

/**
 * Obtiene los items de la transacción contable con el código indicado
 * @param {String} codigo
 * @return {Array}
 */
ContabilidadDao.prototype.obtenerItems = function(codigo){
	var traModel = new Transaccion();
	var iteModel = new TransaccionItem();
	var sql = "SELECT t.textoLote, d.* from "+traModel.tablename+" t, "+iteModel.tablename+" d where t.id = d.id_transaccion and t.estado = '"+traModel.ESTADO_ACTIVA+"' and t.codigo = '"+codigo+"';";
	var items = this.query(sql);
	return items;
};


/**
 * Contabiliza un venta cuando recien es creado 
 * 
 * @param {FacturaCompra} objFactura 
 * @return {Boolean}
 */
ContabilidadDao.prototype.contabilizarCompra = function(objFactura){
	
	var factura = new FacturaVenta();
	factura = objFactura;	
	var oldEstado = factura.estado;
	var codigo = 'COMPRA_MERCADERIA';
	
	try {		
		logInfo('Contabilizar compra --> ' + factura.numeroFactura);		
		logInfo('Transacción: ' + codigo);
		
		var items = this.obtenerItems(codigo);		
		if(items.length > 0){
		
			var lote = new LoteAsientos();
			lote.descripcion = "LoteAutomático: " + items[0].textoLote + "; Factura: " + factura.numeroFactura ;
			lote.estado = lote.ESTADO_CONTABILIZADO;
			lote.periodo = new PeriodoContableDao().obtenerPeriodoActivo(factura.local);
			lote.local = factura.local;
			if(lote.periodo == null){
				throw new Error("No existe un periodo activo");
			}
			if(lote.local == null){
				throw new Error("No existe un local..");
			}
			
			//Guarda el lote
			var glote = this.create(lote);
			if(!glote) throw new Error('NO_CREATE LOTE');
			
			var debe = 0, haber = 0;
			
			for(var i = 0; i < items.length; i++){
				
				var ita = new TransaccionItem();
				ita = items[i];
				
				var asiento = new AsientoContable();				
				asiento.periodo = lote.periodo;
				asiento.local = lote.local;			
				asiento.tipo = ita.tipo;				
				asiento.documento = factura.id;
				asiento.aplicable = false;
				asiento.lote = lote;
				asiento.plan = new Plan(ita.id_plan);
				asiento.origen = 'compra';
				asiento.aplicable = true;
				
				var model = factura;								
				
				if(asiento.aplicable){					
					// Evalua el monto			
					try{
						var monto = eval(ita.formula) * 1;				
						asiento.monto = monto;					
					}catch (e) {
						throw new Error("No se ha podido evaluar la fórmula..");
					}
					
					if(isNaN(asiento.monto)) throw new Error('La fórmula no es correcta');
					if(ita.tipo == 'Debe'){
						debe += monto;
					}else{
						haber += monto;
					}					
										
					lote.agregarItem(asiento);
					
					var gasi = this.create(asiento);					
					if(!gasi) throw new Error('NO_CREATE ASIENTO');
				}
				
			}//End for
			
			if(debe != haber){
				throw new Error('LAS SUMAS DEL DEBE Y HABER NO SON IGUALES (DEBE='+debe+'; HABER='+haber+')');
			}			
							
							
		}else{
			throw new Error("No se ha configurado items de transacción");
		}
		
		return true;		
	} catch (e) {
		factura.estado = oldEstado;		
		logInfo(e);		
		throw e;
	}
	
	return false;
};

/**
 * Contabiliza un anticipo cuando recien es creado o bien cuando se devuelve
 * Creacion: Usar model.monto
 * Devolucion: Usar model.saldo
 * 
 * @param {Anticipo} anticipo
 * @param {String} codigoTransaccion
 * @return {Bolean}
 */
ContabilidadDao.prototype.contabilizarAnticipo = function(anticipo, codigoTransaccion){
	
	var model = new Anticipo();
	model = anticipo;	
	var oldEstado = model.estado;
	var codigo = codigoTransaccion ? codigoTransaccion : ("ANTICIPO_"+model.formaPago+"_"+model.estado).toUpperCase();
	
	try {		
		logInfo('Contabilizar anticipo --> ' + anticipo.id);
		logInfo('Transacción: ' + codigo);
		
		var items = this.obtenerItems(codigo);
		
		if(items.length > 0){		
			var lote = new LoteAsientos();
			lote.descripcion = "LoteAutomático: " + items[0].textoLote + '; Cliente: ' + anticipo.cliente.cedula;
			lote.estado = lote.ESTADO_CONTABILIZADO;
			lote.periodo = new PeriodoContableDao().obtenerPeriodoActivo(model.local);
			lote.local = model.local;		
			if(lote.periodo == null){
				throw new Error("No existe un periodo activo");
			}
			if(lote.local == null){
				throw new Error("No existe un local..");
			}
			
			//Guarda el lote
			var glote = this.create(lote);
			if(!glote) throw new Error('NO_CREATE LOTE');
			
			var debe = 0, haber = 0;
			
			for(var i = 0; i < items.length; i++){
				
				var ita = new TransaccionItem();
				ita = items[i];
				
				var asiento = new AsientoContable();				
				asiento.periodo = lote.periodo;
				asiento.local = lote.local;			
				asiento.tipo = ita.tipo;
				asiento.origen = "anticipo";
				asiento.documento = model.id;

				// EFECTIVO Y CHEQUE ES OBLIGATORIO LA CONFURACION COMPLETA
				if(model.formaPago == model.FORMA_PAGO_EFECTIVO || model.formaPago== model.FORMA_PAGO_CHEQUE){
					if(ita.id_plan == null){
						throw new Error('NO_CONFIGURADO_PLAN');
					}else{//ASIENTO CONFIGURADO
						asiento.plan = new Plan(ita.id_plan);
					}
				}else{					
					if(ita.id_plan == null){//AUTOMATICO							
						var lstIds = this.query("SELECT id_plan from " + new CuentaBancaria().tablename + " WHERE id = " + model.cuenta.id)[0];
						asiento.plan = new Plan(lstIds.id_plan);
					}else{//ASIENTO CONFIGURADO
						asiento.plan = new Plan(ita.id_plan);
					}
				}
				
				// Evalua el monto			
				try{
					var monto = eval(ita.formula) * 1;				
					asiento.monto = monto;					
				}catch (e) {
					throw new Error("No se ha podido evaluar la fórmula..");
				}
									
				if(isNaN(asiento.monto)) throw new Error('La fórmula no es correcta');
				if(ita.tipo == 'Debe'){
					debe += monto;
				}else{
					haber += monto;
				}					
									
				lote.agregarItem(asiento);
				
				var gasi = this.create(asiento);					
				if(!gasi) throw new Error('NO_CREATE ASIENTO');
			}
			
			if(debe != haber){
				throw new Error('LAS SUMAS DEL DEBE Y HABER NO SON IGUALES');
			}			
				
			/*model.isContabilizado = true;
			this.updateField(model, 'isContabilizado');*/
							
		}else{
			throw new Error("No se ha configurado items de transacción");
		}
		
		return true;		
	} catch (e) {
		model.estado = oldEstado;		
		logInfo(e);		
		throw e;
	}
	
	return false;
};

/**
 * Contabiliza u cobro de cuota
 * @param {CobroCuota} cobroCuota
 * @return {Boolean}
 */
ContabilidadDao.prototype.contabilizarCobroCuota = function(cobroCuota){
	
	var model = new CobroCuota();
	model = cobroCuota;
	
	var codigo =("COBRO_CUOTA_"+model.formaPago).toUpperCase();
	
	try {		
		logInfo('Contabilizar anticipo --> ' + cobroCuota.id);
		logInfo('Transacción: ' + codigo);
		
		var items = this.obtenerItems(codigo);
		
		if(items.length > 0){		
			var lote = new LoteAsientos();
			lote.descripcion = "LoteAutomático: " + items[0].textoLote + '; Cliente: ' + cobroCuota.cliente.id;
			lote.estado = lote.ESTADO_CONTABILIZADO;
			lote.periodo = new PeriodoContableDao().obtenerPeriodoActivo(model.local);
			lote.local = model.local;		
			if(lote.periodo == null){
				throw new Error("No existe un periodo activo");
			}
			if(lote.local == null){
				throw new Error("No existe un local..");
			}
			
			//Guarda el lote
			var glote = this.create(lote);
			if(!glote) throw new Error('NO_CREATE LOTE');
			
			var debe = 0, haber = 0;
			
			for(var i = 0; i < items.length; i++){
				
				var ita = new TransaccionItem();
				ita = items[i];
				
				var asiento = new AsientoContable();				
				asiento.periodo = lote.periodo;
				asiento.local = lote.local;			
				asiento.tipo = ita.tipo;
				asiento.origen = "CobroCuota";
				asiento.documento = model.id;
				asiento.lote = lote;

				// EFECTIVO Y CHEQUE ES OBLIGATORIO LA CONFURACION COMPLETA
				if(model.formaPago == model.EFECTIVO || model.formaPago== model.CHEQUE){
					if(ita.id_plan == null){
						throw new Error('NO_CONFIGURADO_PLAN');
					}else{//ASIENTO CONFIGURADO
						asiento.plan = new Plan(ita.id_plan);
					}
				}else{					
					if(ita.id_plan == null){//AUTOMATICO							
						var lstIds = this.query("SELECT id_plan from " + new CuentaBancaria().tablename + " WHERE id = " + model.cuenta.id)[0];
						asiento.plan = new Plan(lstIds.id_plan);
					}else{//ASIENTO CONFIGURADO
						asiento.plan = new Plan(ita.id_plan);
					}
				}
				
				cobroCuota.aplicable = true;
				
				if(ita.aplicaA == 'INTERES'){
					if(cobroCuota.montoInteres <= 0){
						cobroCuota.aplicable = false;
					}
				}
				
				if(ita.aplicaA == 'MORA'){
					if(cobroCuota.montoMora <= 0){
						cobroCuota.aplicable = false;
					}
				}
				
				if(cobroCuota.aplicable){
					// Evalua el monto			
					try{
						var monto = eval(ita.formula) * 1;				
						asiento.monto = monto;					
					}catch (e) {
						throw new Error("No se ha podido evaluar la fórmula..");
					}
										
					if(isNaN(asiento.monto)) throw new Error('La fórmula no es correcta');
					if(ita.tipo == 'Debe'){
						debe += monto;
					}else{
						haber += monto;
					}					
										
					lote.agregarItem(asiento);
					
					var gasi = this.create(asiento);					
					if(!gasi) throw new Error('NO_CREATE ASIENTO');
				}
			}
			
			if(debe != haber){
				throw new Error('LAS SUMAS DEL DEBE Y HABER NO SON IGUALES');
			}			
				
			/*model.isContabilizado = true;
			this.updateField(model, 'isContabilizado');*/
							
		}else{
			throw new Error("No se ha configurado items de transacción");
		}
		
		return true;		
	} catch (e) {		
		logInfo(e);		
		throw e;
	}
	
	return false;
};

/**
 * Contabiliza un ingreso o gasto 
 * 
 * @param {IngresosGastos} model
 * @return {Bolean}
 */
ContabilidadDao.prototype.contabilizarIngresoGasto = function(model){
	
	var codigo = ("CAJA_"+model.tipo).toUpperCase();
	
	try {		
		logInfo('Contabilizar ingreso o gasto --> ' + model.id );
		logInfo('Transacción: ' + codigo);
		
		var items = this.obtenerItems(codigo);
		
		if(items.length > 0){		
			var lote = new LoteAsientos();
			lote.descripcion = "LoteAutomático: " + items[0].textoLote + '; Valor: ' + model.valor;
			lote.estado = lote.ESTADO_CONTABILIZADO;
			lote.periodo = new PeriodoContableDao().obtenerPeriodoActivo(model.local);
			lote.local = model.local;
			if(lote.periodo == null){
				throw new Error("No existe un periodo activo");
			}
			if(lote.local == null){
				throw new Error("No existe un local..");
			}
			
			//Guarda el lote
			var glote = this.create(lote);
			if(!glote) throw new Error('NO_CREATE LOTE');
			
			var debe = 0, haber = 0;
			
			for(var i = 0; i < items.length; i++){
				
				var ita = new TransaccionItem();
				ita = items[i];
				
				var asiento = new AsientoContable();				
				asiento.periodo = lote.periodo;
				asiento.local = lote.local;			
				asiento.tipo = ita.tipo;
				asiento.origen = model.tipo;
				asiento.documento = model.id;
				asiento.lote = lote;
				asiento.plan = new Plan(ita.id_plan);
				
				// Evalua el monto			
				try{
					var monto = eval(ita.formula) * 1;				
					asiento.monto = monto;					
				}catch (e) {
					throw new Error("No se ha podido evaluar la fórmula..");
				}
									
				if(isNaN(asiento.monto)) throw new Error('La fórmula no es correcta');
				if(ita.tipo == 'Debe'){
					debe += monto;
				}else{
					haber += monto;
				}					
									
				lote.agregarItem(asiento);
				
				var gasi = this.create(asiento);					
				if(!gasi) throw new Error('NO_CREATE ASIENTO');
			}
			
			if(debe != haber){
				throw new Error('LAS SUMAS DEL DEBE Y HABER NO SON IGUALES');
			}
							
		}else{
			throw new Error("No se ha configurado items de transacción");
		}
		
		return true;		
	} catch (e) {		
		logInfo(e);		
		throw e;
	}
	
	return false;
};

/**
 * COntabiliza una retención en compras
 * @param {FacturaCompra} compra
 * @param {Retencion} retencion
 * @return {Boolean}
 */
ContabilidadDao.prototype.contabilizarRetencionCompra = function(compra, retencion){
	
	var codigo = ("COMPRA_RETENCIONES").toUpperCase();
	
	try {		
		logInfo('Contabilizar retencion --> ' + retencion.id );
		logInfo('Transacción: ' + codigo);
		
		var items = this.obtenerItems(codigo);
		
		if(items.length > 0){		
			var lote = new LoteAsientos();
			lote.descripcion = "LoteAutomático: " + items[0].textoLote + '; Número retención: ' + retencion.numero +"; Factura Compra: " + compra.numeroFactura;
			lote.estado = lote.ESTADO_CONTABILIZADO;
			lote.periodo = new PeriodoContableDao().obtenerPeriodoActivo(retencion.local);
			lote.local = retencion.local;
			if(lote.periodo == null){
				throw new Error("No existe un periodo activo");
			}
			if(lote.local == null){
				throw new Error("No existe un local..");
			}
			
			//Guarda el lote
			var glote = this.create(lote);
			if(!glote) throw new Error('NO_CREATE LOTE');
			
			var debe = 0, haber = 0;
			
			for(var i = 0; i < items.length; i++){
				
				var ita = new TransaccionItem();
				ita = items[i];
				
				if(ita.id_plan == null){ // Automatico
					for(var r = 0; r < retencion.items.length; r++){
						var det = new RetencionItem();
						det = retencion.items[r];
						
						if(det.plan == null){
							throw new Error('No existe un plan configurado para el item de retencion');
						}
						
						var asiento = new AsientoContable();				
						asiento.periodo = lote.periodo;
						asiento.local = lote.local;			
						asiento.tipo = ita.tipo;
						asiento.origen = 'retencion';
						asiento.documento = retencion.id;
						asiento.lote = lote;
						asiento.plan = det.plan; // Asignado al generar la retencion						
						
						// Evalua el monto			
						try{
							var model = det;
							var monto = eval(ita.formula) * 1;				
							asiento.monto = monto;					
						}catch (e) {
							throw new Error("No se ha podido evaluar la fórmula..");
						}
											
						if(isNaN(asiento.monto)) throw new Error('La fórmula no es correcta');
						if(ita.tipo == 'Debe'){
							debe += monto;
						}else{
							haber += monto;
						}					
											
						lote.agregarItem(asiento);
						var gasi = this.create(asiento);					
						if(!gasi) throw new Error('NO_CREATE ASIENTO');
						
					}
					
				}else{
					//Asiento configurado
					var asiento = new AsientoContable();				
					asiento.periodo = lote.periodo;
					asiento.local = lote.local;			
					asiento.tipo = ita.tipo;
					asiento.origen = 'retencion';
					asiento.documento = retencion.id;
					asiento.lote = lote;
					asiento.plan = new Plan(ita.id_plan);
					
					// Evalua el monto			
					try{
						var model = retencion;
						var monto = eval(ita.formula) * 1;				
						asiento.monto = monto;					
					}catch (e) {
						throw new Error("No se ha podido evaluar la fórmula..");
					}
										
					if(isNaN(asiento.monto)) throw new Error('La fórmula no es correcta');
					if(ita.tipo == 'Debe'){
						debe += monto;
					}else{
						haber += monto;
					}					
										
					lote.agregarItem(asiento);
					var gasi = this.create(asiento);					
					if(!gasi) throw new Error('NO_CREATE ASIENTO');
				}
				
			}
			
			if(debe != haber){
				throw new Error('LAS SUMAS DEL DEBE Y HABER NO SON IGUALES');
			}
							
		}else{
			throw new Error("No se ha configurado items de transacción");
		}
		
		return true;		
	} catch (e) {		
		logInfo(e);		
		throw e;
	}
	
	return false;
};

/**
 * COntabiliza una retención en compras
 * @param {FacturaVenta} retencion
 * @param {Retencion} retencion
 * @return {Boolean}
 */
ContabilidadDao.prototype.contabilizarRetencionVenta = function(factura, retencion, tipo){
	
	var codigo = ("VENTA_RETENCIONES").toUpperCase();
	
	try {		
		logInfo('Contabilizar retención en ventas --> ' + retencion.id );
		logInfo('Transacción: ' + codigo);
		
		var items = this.obtenerItems(codigo);
		
		if(items.length > 0){		
			var lote = new LoteAsientos();
			lote.descripcion = "LoteAutomático: " + items[0].textoLote + '; Número retención: ' + retencion.numero +"; Factura Venta: " + factura.numeroFactura;
			lote.estado = lote.ESTADO_CONTABILIZADO;
			lote.periodo = new PeriodoContableDao().obtenerPeriodoActivo(retencion.local);
			lote.local = retencion.local;
			if(lote.periodo == null){
				throw new Error("No existe un periodo activo");
			}
			if(lote.local == null){
				throw new Error("No existe un local..");
			}
			
			//Guarda el lote
			var glote = this.create(lote);
			if(!glote) throw new Error('NO_CREATE LOTE');
			
			var debe = 0, haber = 0;
			
			for(var i = 0; i < items.length; i++){
				
				var ita = new TransaccionItem();
				ita = items[i];
				
				
				//Asiento configurado
				var asiento = new AsientoContable();				
				asiento.periodo = lote.periodo;
				asiento.local = lote.local;			
				asiento.tipo = ita.tipo;
				asiento.origen = 'retencion_ventas';
				asiento.documento = retencion.id;
				asiento.lote = lote;
				asiento.plan = new Plan(ita.id_plan);
				var aplica = false;
				
				var model = retencion;
				
				switch (ita.aplicaA) {
				case 'RETENCION_IVA':
					if(retencion.totalRetencionIva > 0){
						aplica = true;
					}
					break;
				case 'RETENCION_IR':
					if(retencion.totalRetencionIr > 0){
						aplica = true;
					}
					break;
				case 'EFECTIVO':
					if(tipo == 'EFECTIVO'){						
						aplica = true;					
					}
					break;
				case 'CREDITO':
					if(tipo == 'CREDITO'){
						aplica = true;
					}
					break;
				}
				
				if(aplica){
					// Evalua el monto			
					try{
						var model = retencion;
						var monto = eval(ita.formula) * 1;				
						asiento.monto = monto;					
					}catch (e) {
						throw new Error("No se ha podido evaluar la fórmula..");
					}
										
					if(isNaN(asiento.monto)) throw new Error('La fórmula no es correcta');
					if(ita.tipo == 'Debe'){
						debe += monto;
					}else{
						haber += monto;
					}					
										
					lote.agregarItem(asiento);
					var gasi = this.create(asiento);					
					if(!gasi) throw new Error('NO_CREATE ASIENTO');
				}
			}
				
			
			
			if(debe != haber){
				throw new Error('LAS SUMAS DEL DEBE Y HABER NO SON IGUALES');
			}
							
		}else{
			throw new Error("No se ha configurado items de transacción");
		}
		
		return true;		
	} catch (e) {		
		logInfo(e);		
		throw e;
	}
	
	return false;
};

/**
 * Contabiliza un venta cuando recien es creado 
 * 
 * @param {FacturaVenta} objFactura
 * @param {Cobro} objCobro
 * @return {Boolean}
 */
ContabilidadDao.prototype.contabilizarVenta = function(objFactura, objCobro){
	
	var factura = new FacturaVenta();
	factura = objFactura;	
	var oldEstado = factura.estado;
	var codigo = 'VENTA_MERCADERIA';
	
	try {		
		logInfo('Contabilizar venta --> ' + factura.numeroFactura);		
		logInfo('Transacción: ' + codigo);
				
		var items = this.obtenerItems(codigo);		
		if(items.length > 0){
		
			var lote = new LoteAsientos();
			lote.descripcion = "LoteAutomático: " + items[0].textoLote + "; Factura: " + factura.numeroFactura ;
			lote.estado = lote.ESTADO_CONTABILIZADO;
			lote.periodo = new PeriodoContableDao().obtenerPeriodoActivo(factura.local);
			lote.local = factura.local;
			if(lote.periodo == null){
				throw new Error("No existe un periodo activo");
			}
			if(lote.local == null){
				throw new Error("No existe un local..");
			}
			
			//Guarda el lote
			var glote = this.create(lote);
			if(!glote) throw new Error('NO_CREATE LOTE');
			
			var cobro = new Cobro();
			cobro = objCobro;					
			
			var debe = 0, haber = 0;
			
			for(var i = 0; i < items.length; i++){
				
				var ita = new TransaccionItem();
				ita = items[i];
				
				var asiento = new AsientoContable();				
				asiento.periodo = lote.periodo;
				asiento.local = lote.local;			
				asiento.tipo = ita.tipo;				
				asiento.documento = factura.id;
				asiento.aplicable = false;
				asiento.lote = lote;
				asiento.plan = new Plan(ita.id_plan);
				
				var model = cobro;
				
				switch (ita.aplicaA) {
					case 'EFECTIVO':
						if(cobro.totalEfectivo > 0){
							asiento.aplicable = true;
							asiento.origen = "Pago efectivo";
						}
						break;
					case 'ANTICIPO':
						if(cobro.totalAnticipos > 0){
							asiento.aplicable = true;
							asiento.origen = "Pago con anticipos";
						}
						break;
					case 'CHEQUE':
						if(cobro.totalCheques > 0){
							asiento.aplicable = true;
							asiento.origen = "Pago con cheque";
						}
						break;
					case 'CREDITO_DIFERIDO':
						if(cobro.totalCreditoDiferido > 0){
							asiento.aplicable = true;
							asiento.origen = "Pago con cédito diferido";
						}
						break;
					case 'CREDITO_CORRIENTE':
						if(cobro.totalCreditoCorriente > 0){
							asiento.aplicable = true;
							asiento.origen = "Pago con crédito corriente";
						}
						break;
					case 'SOBRANTE_ANTICIPOS':
						if(cobro.devolverSobranteAnticipos == true && cobro.sobranteAnticipos > 0){
							asiento.aplicable = true;
							asiento.origen = "Pago anticipos - devolución sobrante";
						}
						break;
					case 'RETENCION_IVA':
						if(factura.retencion.totalRetencionIva > 0){
							asiento.aplicable = true;
							asiento.origen = "Retencion iva en ventas";
							model = factura.retencion;
						}
						break;
					case 'RETENCION_IR':
						if(factura.retencion.totalRetencionIr > 0){
							asiento.aplicable = true;
							asiento.origen = "Retencion ir en ventas";
							model = factura.retencion;
						}
						break;

					default:
						asiento.aplicable = true;
						model = factura;
						break;
				}
				
								
				
				if(asiento.aplicable){					
					// Evalua el monto			
					try{
						var monto = eval(ita.formula) * 1;				
						asiento.monto = monto;					
					}catch (e) {
						throw new Error("No se ha podido evaluar la fórmula..");
					}
					
					if(isNaN(asiento.monto)) throw new Error('La fórmula no es correcta');
					if(ita.tipo == 'Debe'){
						debe += monto;
					}else{
						haber += monto;
					}					
										
					lote.agregarItem(asiento);
					
					var gasi = this.create(asiento);					
					if(!gasi) throw new Error('NO_CREATE ASIENTO');
				}
				
			}//End for
			
			if(debe != haber){
				throw new Error('LAS SUMAS DEL DEBE Y HABER NO SON IGUALES (DEBE='+debe+'; HABER='+haber+')');
			}			
				
			/*model.isContabilizado = true;
			this.updateField(model, 'isContabilizado');*/
							
		}else{
			throw new Error("No se ha configurado items de transacción");
		}
		
		return true;		
	} catch (e) {
		factura.estado = oldEstado;		
		logInfo(e);		
		throw e;
	}
	
	return false;
};

ContabilidadDao.prototype.cargarItemLoteLibroDiario = function(listaLotes){
	for(var i = 0; i < listaLotes.length; i++){
		var m = listaLotes[i];
		m.items = this.query("SELECT p.codigo, p.nombre, a.tipo, a.monto FROM " + new AsientoContable().tablename +" a, " + new Plan().tablename + " p where a.id_plan = p.id and a.id_lote = " + m.id);
	}
};

/*ContabilidadDao.prototype.buscarLibroDiarioTodo = function(){
	var lote = new LoteAsientos();
	var lista = this.readAll(lote);
	this.cargarItemLoteLibroDiario(lista);
	return lista;
	//return this.modelListTo(lote, lista);
};*/

//Sólo se agrega buscarLibroDiarioPorFecha
/*
ContabilidadDao.prototype.buscarLibroDiarioPorFecha = function(fechaInicio, fechaFin){	
	var loteAsiento = new LoteAsientos();
	var lista = this.readBy(loteAsiento, "where date(fecha) >='" + fechaInicio.toString('yyyy-MM-dd') + "' and date(fecha) <='" + fechaFin.toString('yyyy-MM-dd') + "'");
	this.cargarItemLoteLibroDiario(lista);
	return lista;
};*/

/*ContabilidadDao.prototype.buscarLibriDiarioPorPeriodo = function(periodo){
	var loteAsiento = new LoteAsientos();
	var lista = this.readBy(loteAsiento, "where " + this.fkSql("id_periodo", periodo));
	this.cargarItemLoteLibroDiario(lista);
	return lista;
};*/

/*ContabilidadDao.prototype.buscarLibroDiarioPorLocal = function(local){
	var loteAsiento = new LoteAsientos();
	var lista = this.readBy(loteAsiento, "where " + this.fkSql("id_local", local));
	this.cargarItemLoteLibroDiario(lista);
	return lista;
};*/

ContabilidadDao.prototype.buscarLibroDiarioPorPeriodoLocal = function(periodo, local){
	var loteAsiento = new LoteAsientos();
	var lista = this.readBy(loteAsiento, "where " + this.fkSql("id_local", local) + ' and ' + this.fkSql("id_periodo", periodo));
	this.cargarItemLoteLibroDiario(lista);
	return lista;
};

ContabilidadDao.prototype.buscarLibroDiarioPorPeriodoLocalFechas = function(periodo, local, fechaInicio, fechaFin){
	var loteAsiento = new LoteAsientos();
	var lista = this.readBy(loteAsiento, "where " + 
			this.fkSql("id_local", local) + ' and ' + this.fkSql("id_periodo", periodo) 
			+ ' and ' + 
			"date(fecha) >='" + fechaInicio.toString('yyyy-MM-dd') + "' and date(fecha) <='" + fechaFin.toString('yyyy-MM-dd') + "'"
	);
	this.cargarItemLoteLibroDiario(lista);
	return lista;
};

ContabilidadDao.prototype.buscarAsiento = function(lote){
	var asiento = new AsientoContable();
	var lista = this.readAll(asiento);
	return this.modelListTo(lote, lista);
};

ContabilidadDao.prototype.generarBalance = function(periodo, local){
	var sql = "SELECT p.id as id_plan, p.codigo, p.nombre, " +
			"(select sum(a.monto) from cont_asiento as a where a.tipo = 'Debe' and a.id_plan = p.id and a.id_periodo "+ (periodo != null ? "="+periodo.id : " is not null ") +" and id_local "+ (local != null ? "="+local.id : " is not null ") +") as Debe, " +
			"(select sum(a.monto) from cont_asiento as a where a.tipo = 'Haber' and a.id_plan = p.id and a.id_periodo "+ (periodo != null? "="+periodo.id : " is not null ") +" and id_local "+ (local != null ? "="+local.id : " is not null") +") as Haber " +
			"from cont_plan as p";
	
	return this.query(sql);
};

ContabilidadDao.prototype.generarLibroDiario = function(periodo, local, lote){
	/*var lotes = new Array();
	lotes = this.buscarLote();
	for(var i = 0; i < lotes.length; i++){
		var it = items[i];*/
	var sql = "SELECT p.id as id_plan, p.codigo, p.nombre, " +
			"(select a.monto from cont_asiento as a where a.tipo = 'Debe' and a.id_plan = p.id and a.id_periodo "+ (periodo != null ? "="+periodo.id : " is not null ") +" and id_local "+ (local != null ? "="+local.id : " is not null ") +") as Debe, " +
			"(select a.monto from cont_asiento as a where a.tipo = 'Haber' and a.id_plan = p.id and a.id_periodo "+ (periodo != null? "="+periodo.id : " is not null ") +" and id_local "+ (local != null ? "="+local.id : " is not null") +") as Haber " +
			"from cont_plan as p, cont_asiento as a where a.id_plan = p.id and a.id_periodo "+ (periodo != null? "="+periodo.id : " is not null ") +" and id_local "+ (local != null ? "="+local.id : " is not null") + " and a.id_lote "+ (lote != null ? "="+lote.id : " is not null");
	
	return this.query(sql);
};