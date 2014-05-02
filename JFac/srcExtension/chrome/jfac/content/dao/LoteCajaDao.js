function LoteCajaDao(){
};

LoteCajaDao.prototype = new Dao();

LoteCajaDao.prototype.guardar = function(lote){
	try {
		this.begin();
		
		if(lote.id == -1){
			//Apertura caja
			lote.fechaCierre = null;
			this.create(lote);
		}else{
			
			//Cierre caja
			lote.fechaCierre = new Date();
			this.update(lote);			
			//Guarda los items
			for(var i = 0; i < lote.items.length; i++){
				this.create(lote.items[i]);
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

LoteCajaDao.prototype.eliminar = function(lote){
	return this.deletee(lote);
};

LoteCajaDao.prototype.buscarTodos = function(){
	var lote = new LoteCaja();
	var lista = this.readAll(lote);
	return this.modelListTo(lote, lista);	
};

LoteCajaDao.prototype.buscarPorEstado = function(estado){
	var lote = new LoteCaja();
	var lista = new Array();
	
	try{
		lista = this.readBy(lote, "where estado = '" + estado + "'");
	}catch(e){}
	
	return this.modelListTo(lote, lista);		
};

LoteCajaDao.prototype.obtenerLoteCajaAbierto = function(user, punto){
	var lote = new LoteCaja();
	var lista = this.readBy(lote, "where id_usuario = " + user.id +" and estado = '" + lote.ESTADO_ABIERTA + "' and id_punto = " + punto.id);
	if(lista.length > 0){
		return this.modelTo(lote, lista[0]);
	}else{	
		var lote = new LoteCaja();
		lote.punto = punto;	
		lote.usuario = user;
		return lote;
	}
};

LoteCajaDao.prototype.buscarPorId = function(id){
	var lote = new LoteCaja();
	var lista = new Array();
	
	try{
		lista = this.readBy(lote, "where id = '" + id+"'");
	}catch(e){}
	
	return this.modelListTo(lote, lista);		
};

LoteCajaDao.prototype.buscarPorFecha = function(fechaInicio, fechaFin){
	var lote = new LoteCaja();
	var lista = new Array();	
	try{
		lista = this.readBy(lote, "where date(fechaApertura) >= '" + fechaInicio.toString('yyyy-MM-dd') + "'" +
				" and date(fechaApertura) <= '" + fechaFin.toString('yyyy-MM-dd') + "'");
	}catch(e){}
	
	return this.modelListTo(lote, lista);	
};

LoteCajaDao.prototype.buscarPorEstadoPunto = function(estado, idPunto){
	var lote = new LoteCaja();
	var lista = new Array();
	
	try{
		lista = this.readBy(lote, "where id_punto = '" + idPunto + "' and estado = '" + estado + "'");
	}catch(e){}
	return this.modelListTo(lote, lista);	
};

LoteCajaDao.prototype.buscarPorEstadoUsuario = function(estado, idUsuario){
	var lote = new LoteCaja();
	var lista = new Array();
	
	try{
		lista = this.readBy(lote, "where id_usuario = '" + idUsuario + "' and estado = '" + estado + "'");
	}catch(e){}
	
	return this.modelListTo(lote, lista);	
};

LoteCajaDao.prototype.cargar = function(id){
	var lote = new LoteCaja();
	lote.id = id;
	
	try{
		this.read(lote);		
		lote.punto = new PuntoFacturacion(lote.id_punto);
		return lote;
	}catch(e){}
	return null;	
};

LoteCajaDao.prototype.generarItems = function(lote){
	
	var facModel = new FacturaVenta();
	var cobModel = new Cobro();
	var ingModel = new IngresosGastos();
	var antModel = new Anticipo();
	var ccuModel = new CobroCuota();
	var retModel = new Retencion();
	
	try{
		var listaIngresosGastos = this.query("SELECT g.id, g.tipo, g.valor from "+ingModel.tablename+" g where id_lote = " + lote.id);
		
		var listaVentas = this.query("SELECT v.numeroFactura as numero, c.totalEfectivo as monto " +
					"from " + facModel.tablename + " v, " + cobModel.tablename + " c " +
					"where v.id = c.id_venta and c.totalEfectivo > 0  and v.estado = 'Registrada' and v.id_lote = " + lote.id);
		
		var anticipos = this.query("SELECT a.id, a.monto from " + antModel.tablename + " a where a.estado != '"+antModel.ESTADO_DEVUELTO+"' and a.formaPago = '"+antModel.FORMA_PAGO_EFECTIVO+"' and a.id_lote = " + lote.id);
		
		var anticiposDevuletos = this.query("SELECT a.id, a.montoDevuelve from " + antModel.tablename + " a where a.estado = '"+antModel.ESTADO_DEVUELTO+"' and a.formaPago = '"+antModel.FORMA_PAGO_EFECTIVO+"' and a.id_lote_devuelve = " + lote.id);
		
		var pagoCuotas = this.query("SELECT id, montoTotal FROM " + ccuModel.tablename + " WHERE formaPago = '" + ccuModel.EFECTIVO + "' and id_lote="+lote.id);
		
		var retencionesEfectivo = this.query("SELECT id, numero, total FROM "+retModel.tablename+" where id_lote is not null and tipoRetencion='"+retModel.TIPO_RETENCION_VENTA+"' and id_lote="+lote.id);
		
		lote.items = new Array();		
		for (var i = 0; i < listaVentas.length; i++){		
			var item = new LoteCajaItem(); 
			lote.agregarItems(item);
			item.documento = listaVentas[i].numero;
			item.descripcion = 'Venta - pago en efectivo';
			item.valor = listaVentas[i].monto;
			item.tipo = item.TIPO_INGRESO;
		};
		
		for (var i = 0; i < listaIngresosGastos.length; i++){
			var item = new LoteCajaItem(); lote.agregarItems(item);
			item.documento = listaIngresosGastos[i].id;
			item.descripcion = listaIngresosGastos[i].tipo + ' ADICIONAL';
			item.valor = listaIngresosGastos[i].valor;
			item.tipo = listaIngresosGastos[i].tipo == 'Ingreso' ? item.TIPO_INGRESO : item.TIPO_SALIDA; 
		};
		
		for (var i = 0; i < anticipos.length; i++){
			var item = new LoteCajaItem(); lote.agregarItems(item);
			item.documento = anticipos[i].id;
			item.descripcion = 'Anticipo de cliente en efectivo';
			item.valor = anticipos[i].monto;
			item.tipo = item.TIPO_INGRESO;
		};
		
		for (var i = 0; i < anticiposDevuletos.length; i++){
			var item = new LoteCajaItem(); lote.agregarItems(item);
			item.documento = anticiposDevuletos[i].id;
			item.descripcion = 'Devolución en efectivo de anticipo';
			item.valor = anticiposDevuletos[i].montoDevuelve;
			item.tipo = item.TIPO_SALIDA;
		};
		
		for (var i = 0; i < pagoCuotas.length; i++){
			var item = new LoteCajaItem(); lote.agregarItems(item);
			item.documento = pagoCuotas[i].id;
			item.descripcion = 'Cobro de cuota en efectivo a cliente';
			item.valor = pagoCuotas[i].montoTotal;
			item.tipo = item.TIPO_INGRESO;
		};
		
		for (var i = 0; i < retencionesEfectivo.length; i++){
			var item = new LoteCajaItem(); lote.agregarItems(item);
			item.documento = retencionesEfectivo[i].numero;
			item.descripcion = 'Retencion en venta';
			item.valor = retencionesEfectivo[i].total;
			item.tipo = item.TIPO_SALIDA;
		};
		
	}catch(e){
		throw e;
	}
};

LoteCajaDao.prototype.vistaCierresCaja = function(tipoFecha, fechaInicio, fechaFin, idUsuario, idPunto){	
	
	var q = "SELECT * FROM vista_cierres_caja WHERE " +			
			this.fkSql('id_usuario', idUsuario) + " and " +
			this.fkSql('id_punto', idPunto) +" ";
			
			if(tipoFecha){
				q += "and date("+tipoFecha + ") >='" + fechaInicio.toString('yyyy-MM-dd') + "' "; 
				q += "and date("+tipoFecha + ") <='" + fechaFin.toString('yyyy-MM-dd') + "' ";
			}
			
	getContexto().cacheQuery = q;
	return this.query(q);
};