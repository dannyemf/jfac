function RetencionDao(){
};

RetencionDao.prototype = new Dao();

/**
 * Guarda una retencion de iva
 * @param {RetencionIva} retencion
 * @return {Boolean}
 */
RetencionDao.prototype.guardarRetencionIva = function(retencion){	
	if(retencion.id == -1){
		return this.create(retencion);
	}else{
		return this.update(retencion);
	}
};

/**
 * Guarda una retencion de iva
 * @param {RetencionIR} retencion
 * @return {Boolean}
 */
RetencionDao.prototype.guardarRetencionIR = function(retencion){	
	if(retencion.id == -1){
		return this.create(retencion);
	}else{
		return this.update(retencion);
	}
};

/**
 * Elimina una retencion IVA
 * @param {RetencionIva} retencionIva
 * @return {Boolean}
 */
RetencionDao.prototype.eliminarRetencionIva = function(retencionIva){	
	return this.deletee(retencionIva);
};

/**
 * Elimina una retencion IR
 * @param {RetencionIR} retencionIR
 * @return {Boolean}
 */
RetencionDao.prototype.eliminarRetencionIR = function(retencionIR){	
	return this.deletee(retencionIR);
};

/**
 * Obtiene las retenciones IVA
 * @return {Array}
 */
RetencionDao.prototype.obtenerRetencionesIva = function(){	
	var model = new RetencionIva();
	var lst = this.readAll(model);
	return this.modelListTo(model, lst);
};

/**
 * Obtiene las retenciones IR
 * @return {Array}
 */
RetencionDao.prototype.obtenerRetencionesIR = function(){	
	var model = new RetencionIR();
	var lst = this.readAll(model);
	return this.modelListTo(model, lst);
};

/**
 * Verifica si existe una retención IR con el mismo código
 * @return {Array}
 */
RetencionDao.prototype.existeRetencionIR = function(codigo, id){
	var model = new RetencionIR();
	var exs = (this.query("SELECT COUNT(*) FROM " + model.tablename + " WHERE codigo = '" + codigo + "' and id != " + id)[0][0]) * 1;
	if(exs > 0){
		return true;
	}
	return false;
};

/**
 * Verifica si existe una retención IVA con la misma combinación [Tipo proveedor - Tipo agente retención]
 * @return {Array}
 */
RetencionDao.prototype.existeRetencionIVA = function(tipoProveedor, tipoAgente, id){
	var model = new RetencionIva();
	var exs = (this.query("SELECT COUNT(*) FROM " + model.tablename + " WHERE tipoProveedor like '" + tipoProveedor + "' and tipoAgenteRetencion like '" + tipoAgente + "' and id != " + id)[0][0]) * 1;
	if(exs > 0){
		return true;
	}
	return false;
};

/**
 * Genera las retenciones para una compra
 * @param {FacturaCompra} compra
 * @return {Retencion}
 */
RetencionDao.prototype.generarRetencionCompra = function(compra){
	
	try {
		var tipoAgente = new ParametroDao().obtener(new ParametroConst().TIPO_AGENTE_RETENCION).valor;
		var tablaIVA = this.obtenerRetencionIva(compra.proveedor.tipoProveedor, tipoAgente);			
		
		//Genera la retencion
		var dcmTotalRetencion = 0.0;
	    var dcmTotalIvaProductos = 0.0;
	    var dcmTotalIvaServicios = 0.0;   
	    var ivaPorcentaje = compra.ivaPorcentaje; 
	    var contexto = getContexto();
	    
	    var ejercicio = contexto.periodo;
		var proveedor = compra.proveedor;
		
	    var retencion = new Retencion();
	    retencion.compra = compra;
	    retencion.local = compra.local;
	    retencion.periodo = ejercicio;
	    retencion.proveedor = proveedor;
	    retencion.usuario = contexto.usuario;
	    retencion.punto = contexto.puntoFacturacion;
	    retencion.tipoRetencion = retencion.TIPO_RETENCION_COMPRA;
	    
	    var totalRetIva = 0;
	    var totalRetIr = 0;
	    
	    //retencion.numeroAutProv
	    
	    //region retencion del IVA
	    if (ivaPorcentaje > 0){
	        for (var i = 0;  i < compra.items.length; i++){
	        	var det = new FacturaCompraItem();
	        	det = compra.items[i];
	        	
	            if (det.producto.isCobraIva == true){
	                if (det.producto.tipo == new ProductoConst().TIPO_SERVICIO){
	                    dcmTotalIvaServicios += ((det.costo * det.cantidad) * ivaPorcentaje) / 100.0;
	                }else{
	                    dcmTotalIvaProductos += ((det.costo * det.cantidad) * ivaPorcentaje) / 100.0;
	                }
	            }
	        }

	        if (dcmTotalIvaServicios > 0 && tablaIVA.porcentajeServicio > 0){
	            var detalle = new RetencionItem();
	            detalle.impuesto = "IVA";
	            detalle.descripcion  = "IVA Servicios";
	            detalle.baseImponible = dcmTotalIvaServicios;
	            detalle.porcentaje = tablaIVA.porcentajeServicio;            
	            detalle.valor = (dcmTotalIvaServicios * (tablaIVA.porcentajeServicio / 100.0)).round(2);
	            detalle.ejercicioFiscal = ejercicio.nombre;
	            detalle.plan = tablaIVA.planServicio; // Para contabilizacion
	            retencion.add(detalle);
	            if(tablaIVA.planServicio.id == null){
	            	throw new Error('No se ha configurado un plan en retenciones iva (Servicios) --> TipoProveedor: ' +compra.proveedor.tipoProveedor +'; TipoAgenteRetencion: '+ tipoAgente +'; Porcentaje: '+ tablaIVA.porcentajeServicio );
	            }
	            
	            totalRetIva += detalle.valor;
	        }

	        if (dcmTotalIvaProductos > 0 && tablaIVA.porcentajeBien > 0){
	        	var detalle = new RetencionItem();
	        	detalle.impuesto = "IVA";
	        	detalle.descripcion = "IVA Bienes";
	        	detalle.baseImponible = dcmTotalIvaProductos;
	        	detalle.porcentaje = tablaIVA.porcentajeBien;
	        	detalle.valor = (dcmTotalIvaProductos * (tablaIVA.porcentajeBien / 100.0)).round(2);
	        	detalle.ejercicioFiscal = ejercicio.nombre;
	        	detalle.plan = tablaIVA.planBien; // Para contabilizacion
	            retencion.add(detalle);    
	            
	            if(tablaIVA.planBien.id == null){
	            	throw new Error('No se ha configurado un plan en retenciones iva (Bienes) --> TipoProveedor: ' +compra.proveedor.tipoProveedor +'; TipoAgenteRetencion: '+ tipoAgente,'; Porcentaje: ' + tablaIVA.porcentajeBien );
	            }
	            
	            totalRetIva += detalle.valor;
	            
	        }
	    }
	    //endregion
	    	    
	    //region Retencion del IR    
	    var tablaArtProvGrupos = this.query("SELECT r.id, r.codigo, r.porcentajeRetencion, r.id_plan FROM "+new ProductoProveedor().tablename+" p, "+new RetencionIR().tablename+" r WHERE p.id_retencion_ir = r.id and p.id_proveedor = "+compra.proveedor.id+" group by r.id;");
	    for (var i = 0; i < tablaArtProvGrupos.length; i++)
	    {
	    	var grupos = tablaArtProvGrupos[i];
	        var dcmTotalGrupo = 0.0;
	        var dcmBase0= 0.0;
	        var dcmBaseGrav = 0.0;
	        var dcmPorcentaje = grupos.porcentajeRetencion;
	        
	        var tablaArtProvGrup = this.query("SELECT * FROM "+new ProductoProveedor().tablename+" WHERE id_retencion_ir = " + grupos.id);
	        for (var j = 0; j < tablaArtProvGrup.length; j++){
	        	var grupo = tablaArtProvGrup[j];
	        	
	            for (var d = 0; d < compra.items.length; d++){
	            	var detalle = new FacturaCompraItem();
	            	detalle = compra.items[d];
	            	
	                if (detalle.producto.id == grupo.id_producto){
	                	//detalle.subtotal
	                    dcmTotalGrupo += (detalle.cantidad * detalle.costo);
	                }
	                
	                //Verificamos si el articulo tiene IVA o no
	                if (detalle.producto.isCobraIva == true){
	                    dcmBase0 += (detalle.cantidad * detalle.costo);
	                }else{
	                    dcmBaseGrav += (detalle.cantidad * detalle.costo);
	                }
	            }
	        }
	        if (dcmTotalGrupo > 0 && dcmPorcentaje > 0){
	        	var detalle = new RetencionItem();            
	        	detalle.impuesto = "IR";
	        	detalle.codigoRetencion = grupos.codigo;
	        	detalle.descripcion = "IR (" + grupos.codigo+")";
	        	detalle.base0 = dcmBase0;
	        	detalle.baseGrav = dcmBaseGrav;
	        	detalle.baseNoGrav = 0;
	        	detalle.baseImponible = dcmTotalGrupo;
	        	detalle.porcentaje = dcmPorcentaje;
	        	detalle.valor = (dcmTotalGrupo * (dcmPorcentaje / 100)).round(2);
	        	detalle.ejercicioFiscal = ejercicio.nombre;
	        	
	        	//Asigna el plan, para contabilizacion
	        	if(grupos.id_plan == null){
	        		throw new Error('No se ha configurado un plan en Retencion Impuesto Renta: ' + r.codigo);
	        	}
	        	detalle.plan = new Plan(grupos.id_plan);
	        	
	        	totalRetIr += detalle.valor;
	        	
	            retencion.add(detalle);            
	        }
	    }

	    retencion.total = 0.0;
	    for(var t = 0; t < retencion.items.length; t++){
	    	retencion.total += (retencion.items[t].valor * 1);
	    }
	    retencion.total = retencion.total.round(2);
	    retencion.totalRetencionIva = totalRetIva;
	    retencion.totalRetencionIr = totalRetIr;
	    
	    //Genera un secuencial provisorio. Se debe volver a generar al guardar
	    if (retencion.numero == ''){
	    	var sec = new FacturaSecuencialDao().generarSecuencial(retencion);				
	    	retencion.numero = sec.numero;		
	    	retencion.autorizacionSri = sec.autorizacion;
	    	retencion.fechaInicio = sec.autorizacion.fechaInicio;
	    	retencion.fechaCaducidad = sec.autorizacion.fechaFin;
	    }
	    
	    //endregion           
	    return retencion;
	} catch (e) {
		throw e;
	}
    
};

/**
 * Obtiene una configuración de retención.
 * 
 * @param {String} tipoProveedor
 * @param {String} tipoAgente
 * @return {RetencionIva}
 */
RetencionDao.prototype.obtenerRetencionIva = function(tipoProveedor, tipoAgente){
	var r = new RetencionIva();
	var lst = this.readBy(r, "WHERE tipoProveedor='"+tipoProveedor+"' and tipoAgenteRetencion='" +tipoAgente+"'");
	if(lst.length > 0){
		return this.modelTo(r, lst[0]);
	}else{
		return new RetencionIva();
	}	
};

/**
 * Guarda una retención nueva
 * @param {FacturaCompra} compra
 * @param {Retencion} retencion
 * @return {Boolean}
 */
RetencionDao.prototype.guardarRetencionCompra = function(compra, retencion){
	try {
		this.begin();
		
		var sec = new FacturaSecuencialDao().generarSecuencial(retencion);				
    	retencion.numero = sec.numero;
    	retencion.autorizacionSri = sec.autorizacion;
    	retencion.fechaInicio = sec.autorizacion.fechaInicio;
    	retencion.fechaCaducidad = sec.autorizacion.fechaFin;
    	this.updateField(sec, 'secuencial');
		
    	//Guarda la retencion
		this.create(retencion);
		
		//Guarda los items de la retencion
		for(var i = 0; i < retencion.items.length; i++){
			this.create(retencion.items[i]);
		}
		
		//Actualiza la compra
		this.query("UPDATE " + compra.tablename + " SET id_retencion="+retencion.id + " WHERE id="+compra.id);
		
		//Contabiliza la retencion
		new ContabilidadDao().contabilizarRetencionCompra(compra,retencion);
		
		this.commit();
		return true;
	} catch (e) {
		logInfo(e);
		this.rollback();
		throw e;
	}
	
	return false;
};

/**
 * Verifica si una factura de compra ya generó la retencioón
 * @param {FacturaCompra} compra
 * @return {Boolean}
 */
RetencionDao.prototype.existeRetencion = function(compra){
	var model = new Retencion();
	var lst = this.readBy(model, "WHERE id_compra = " + compra.id);
	if(lst.length > 0){
		return true;
	}
	return false;
};

/**
 * Guarada un retencion en ventas
 * @param {FacturaVenta} factura
 * @param {Retencion} retencion
 * @return {Boolean}
 */
RetencionDao.prototype.guardarRetencionVenta = function(factura, retencion){
	try {
		this.begin();
		
		this.create(retencion);
		
		for(var i = 0; i < retencion.items.length; i++){
			this.create(retencion.items[i]);
		}
		
		var cb = new Cobro();
		cb = this.modelTo(new Cobro(), this.readBy(new Cobro(), "WHERE id_venta = " + factura.id)[0]);
		
		this.query('UPDATE ' + factura.tablename + " SET id_retencion=" + retencion.id + " WHERE id="+factura.id );
				
		
		//Contabiliza		
		var cbi = new CobroItem();
		//1. Busca en credito corriente
		cbi = ArrayUtil.singleKey(cb.items, 'formaPago',  new CobroItemConst().CREDITO_CORRIENTE);
		if(cbi != null && cbi.saldo >= retencion.total){			
			cbi.saldo = cbi.saldo - retencion.total;			
			this.updateField(cbi, 'saldo');
			new ContabilidadDao().contabilizarRetencionVenta(factura, retencion, 'CREDITO');
		}else{		
			//2. Busca en credito diferio
			cbi = ArrayUtil.singleKey(cb.items, 'formaPago',  new CobroItemConst().CREDITO_DIFERIDO);
			if(cbi != null && cbi.saldo >= retencion.total){			
				//Por las cuotas voy reduciendo
				var total = retencion.total;
				var cuotas = this.readBy(new Cuota(), "WHERE id_cobro_item="+cbi.id);
				for(var c = 0; c < cuotas.length; c++){
					ct = cuotas[c];
					ct.monto = ct.monto * 1;
					
					if(ct.estado == new CuotaConst().ESTADO_REGISTRADA && total > 0){
						if(ct.monto >= total){
							ct.monto = ct.monto - total;
							total = 0;
						}else{
							ct.monto = 0;
							total = total - ct.monto;							
						}
						
						this.query("UPDATE " + new Cuota().tablename + " SET monto="+ct.monto + " WHERE id="+ct.id);											
						if(ct.monto == 0){
							ct.estado = new CuotaConst().ESTADO_FINALIZADA;
							this.query("UPDATE " + new Cuota().tablename + " SET estado="+ct.estado + " WHERE id="+ct.id);
						}
					}
				}
				
				if(total > 0){
					throw new Error('No se ha podido descontar la retencion de las cuotas');
				}
								
				cbi.saldo = cbi.saldo - retencion.total;
				this.updateField(cbi, 'saldo');
				
				new ContabilidadDao().contabilizarRetencionVenta(factura, retencion, 'CREDITO');
				
			}else{		
				//3. Busca en efectivo
				if(cb.totalEfectivo > 0 && cb.totalEfectivo >= retencion.total ){
					var lote = getContexto().loteCaja;
					if(lote != null && lote.id > 0){
						retencion.lote = lote;
						this.query("UPDATE " + retencion.tablename + " SET  id_lote = " + lote.id + " WHERE id="+retencion.id);
						new ContabilidadDao().contabilizarRetencionVenta(factura, retencion, 'EFECTIVO');
					}else{
						throw new Error('No se puede guardar la retención: LOTE CAJA NO ABIERTO');
					}
				}else{
					throw new Error('No se puede guardar la retención: NO APLICA A NINGUNA FORMA DE PAGO');
				}
			}		
		}
		
		this.commit();
		return true;
	} catch (e) {		
		this.rollback();
		throw e;
	}
	
	return false;
};