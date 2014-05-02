function FacturaVentaDao(){
};

FacturaVentaDao.prototype = new Dao();

/**
 * Guarda una factura de venta nueva
 * @param {FacturaVenta} factura
 * @param {Cobro} cobro
 * @return {Boolean}
 */
FacturaVentaDao.prototype.guardar = function(factura, cobro){
	
	var oldEstado = factura.estado;
	
	try {
		var fac = new FacturaVenta();
		fac = factura;
		
		var contabilizar = cobro ? true : false;
		
		this.begin();
		
		if(contabilizar){
			factura.estado = factura.ESTADO_FINALIZADA;
		}else{
			factura.estado = factura.ESTADO_REGISTRADA;
		}
		
		//Crea la retencion cuando el total sea mayor a cero
		if(factura.retencion.total > 0){
			this.create(factura.retencion);
			for(var r = 0; r < factura.retencion.items.length ; r++){
				this.create(factura.retencion.items[r]);
			}
		}
		
		if(factura.id == -1){
			// Secuencial y autorización sri
			var sec = new FacturaSecuencialDao().generarSecuencial(factura);				
			factura.numeroFactura = sec.numero;		
			factura.autorizacionSri = sec.autorizacion;		
			factura.fechaInicio = factura.autorizacionSri.fechaInicio;
			factura.fechaCaducidad = factura.autorizacionSri.fechaFin;					
			
			//Guarda la factura
			this.create(factura);
			
			// Actualiza el secuencia
			this.updateStrField(sec, 'secuencial');
			
			//Guarda los itemes
			for ( var i = 0; i < factura.items.length; i++) {
				this.create(factura.items[i]);				
			}
			
			//Afecta stock
			new StockDao().cargarVenta(factura, factura.local);	
			
		}else{
			this.updateStrField(factura, 'estado');
		}
		
		if(contabilizar){
			// Guarda el cobro
			this.create(cobro);				
			var totalAnticipos = cobro.totalAnticipos;
			var sobrante = cobro.sobranteAnticipos;
			var devolverSobrante = cobro.devolverSobranteAnticipos;
				
			//Guarda los items del cobro
			for(var i = 0; i < cobro.items.length; i++){
				this.create(cobro.items[i]);
								
				//Si cobro CREDITO_DIFERIDO --> Guarda las cuotas 
				if(cobro.items[i].formaPago ==new CobroItem().CREDITO_DIFERIDO){
					for(var j = 0; j < cobro.items[i].cuotas.length; j++){
						var cuot = cobro.items[i].cuotas[j];
						//Guarda las cuotas
						this.create(cuot);
					}
				}
				
				//Si cobro ANTICIPO --> actualiza saldos del anticipo
				if(cobro.items[i].formaPago ==new CobroItem().ANTICIPO){
					var anticipo = new Anticipo();
					anticipo = cobro.items[i].anticipo;														
					
					anticipo.saldo = anticipo.newsaldo;
					if(devolverSobrante){
						anticipo.saldo = 0;
					}
					
					if(anticipo.saldo == 0){
						anticipo.estado = anticipo.ESTADO_FINALIZADO;
					}								
					
					var actant = this.updateField(anticipo, 'saldo');
					if(actant == false) throw new Error('NO_UPDATE ANTICIPO: ' + anticipo.id);
					actant = this.updateField(anticipo, 'saldo');
					if(actant == false) throw new Error('NO_UPDATE ANTICIPO: ' + anticipo.id);
				}
				
				if(cobro.items[i].formaPago ==new CobroItem().CHEQUE){
					var cheque = new Cheque();
					cheque = cobro.items[i].cheque;
					
					var gcic = this.create(cheque);
					if(gcic){									
						cobro.items[i].id_documento = cheque.id;
						var gcic_id_doc = this.updateField(cobro.items[i], 'id_documento');
						if(gcic_id_doc == false) throw new Error('NO_UPDATE COBRO ITEM ID_DOCUMENTO');
					}else{
						throw new Error('NO_CREATE COBRO ITEM CHEQUE');
					}
				}				
			}
			
			//Contabilización		
			new ContabilidadDao().contabilizarVenta(factura, cobro);
		}//end contabilizar
			
		this.commit();
		return true;
	} catch (e) {
		logError(e);
		factura.estado = oldEstado;
		this.rollback();
		throw e;
	}	
	
	return false;
};

FacturaVentaDao.prototype.eliminar = function(factura){
	return this.deletee(factura);
};

FacturaVentaDao.prototype.buscarTodos = function(){
	var factura = new FacturaCompra();
	var lista = this.readAll(factura);
	return this.modelListTo(factura, lista);
	
};

FacturaVentaDao.prototype.buscarPorId = function(id){
	var factura = new FacturaVenta();
	var lista = new Array();
	
	try{
		lista = this.readBy(factura, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(factura, lista[0]);
	}
	return null;	
};

/**
 * Anula una factura de venta
 * @param {FacturaVenta} factura
 * @return {Boolean}
 */
FacturaVentaDao.prototype.anular = function(factura){
	try {
		
		var estados = new FacturaVentaConst();
		if(factura.estado == estados.ESTADO_REGISTRADA){
			this.begin();
			factura.estado = estados.ESTADO_ANULADA;		
			this.updateStrField(factura, 'estado');
			
			//Restaura el stock de la venta
			new StockDao().restaurarVenta(factura, factura.local);
			
			this.commit();
			return true;
		}else{
			alert('No se puede anular la venta en el estado ' + factura.estado);
			return false;
		}		
	} catch (e) {
		this.rollback();
		throw e;
	}
	
	return false;
};

/**
 * Busca las compras por local y proveedor
 * 
 * @param {Number} idLocal - El id del local o nulo para todos
 * @param {Number} idProveedor - El id del proveedor o nulo para todos
 * @return {Array} Lista de FacturaVenta
 */
FacturaVentaDao.prototype.buscarByUsLocCli = function(idUsuario, idLocal, idCliente, estado){
	var factura = new FacturaVenta();
	var lista = this.readBy(factura, "where " +
			this.fkSql('id_usuario', idUsuario) + " and " + 
			this.fkSql('id_local', idLocal) + " and " + 
			this.fkSql('id_cliente', idCliente) + " and " +
			"estado Like '"+  estado + "%'"
		);
	
	return this.modelListTo(factura, lista);	
};

/**
 * Busca las compras el tipo de fecha en el rango indicado, por local y porveedor
 * 
 * @param {String} tipoFecha - Se puede poner fechaRegistro, fechaEmision, fechaCaducidad
 * @param {Date} fechaInicio 
 * @param {Date}fechaFin
 * @param {Number} idLocal - Id de local o nulo para todos
 * @param {Number} idProveedor - Id del proveedor o nulo para todos
 * @return {Array} Lista de FacturaCompra
 */
FacturaVentaDao.prototype.buscarByFechaUsLocCli = function(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal, idCLiente, estado){
	var factura = new FacturaVenta();
	var lista = this.readBy(factura, "where " + 
			tipoFecha +">='" +fechaInicio.toString('yyyy-MM-dd') + "' and " + 
			tipoFecha +"<='" +fechaFin.toString('yyyy-MM-dd') + "' and "  +
			this.fkSql('id_usuario', idUsuario) + " and " + 
			this.fkSql('id_local', idLocal) + " and " + 
			this.fkSql('id_cliente', idCLiente)  + " and " +
			"estado Like '"+  estado + "%'"
		);
	return this.modelListTo(factura, lista);	
};

/**
 * Busca las compras por una propiedad su valor, id del local  e id del proveedor
 * 
 * @param {String} propiedad - Nombre del atributo
 * @param {String} valorPropiedad - Valor del atributo
 * @param {Number} idLocal - Id del local o nulo para todos
 * @param {Number} idProveedor - Id del proveedor o nulo para todos
 * @return {Array} Lista de FacturaCompra
 */
FacturaVentaDao.prototype.buscarByPropiedadUsLocCli = function(propiedad, valorPropiedad, idUsuario, idLocal, idCliente, estado){		
	var factura = new FacturaVenta();
	var lista = new Array();	
	try{
		lista = this.readBy(factura,"where " +
				propiedad + " Like '" + valorPropiedad+"%' and " + 
				this.fkSql('id_usuario', idUsuario) + " and " + 
				this.fkSql('id_local', idLocal) + " and " + 
				this.fkSql('id_cliente', idCliente) + " and " +
				"estado Like '"+  estado + "%'"
		);
	}catch(e){}	
	return this.modelListTo(factura, lista);	
};

FacturaVentaDao.prototype.vistaVentas = function(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal, idCliente, estado, numeroFactura){	
	
	var q = "SELECT * FROM vista_ventas WHERE " +			
			this.fkSql('id_usuario', idUsuario) + " and " +
			this.fkSql('id_local', idLocal) + " and " +
			this.fkSql('id_cliente', idCliente)  + " and " +
			this.strSql('estado', estado) + ' and ' +
			"numeroFactura Like '%"  + (numeroFactura ? numeroFactura : '') + "%' ";
			
			if(tipoFecha){
				q += "and date("+tipoFecha + ") >='" + fechaInicio.toString('yyyy-MM-dd') + "' "; 
				q += "and date("+tipoFecha + ") <='" + fechaFin.toString('yyyy-MM-dd') + "' ";
			}
			
	getContexto().cacheQuery = q;
	return this.query(q);
};