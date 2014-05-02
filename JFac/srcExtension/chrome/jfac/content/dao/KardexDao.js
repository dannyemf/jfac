function KardexDao(){
};

KardexDao.prototype = new Dao();

/**
 * Crea una entrada en el kardex y lo guarda
 * @param {Local} local
 * @param {Producto} producto
 * @param {String} descripcion
 * @param {Number} cantidadEntra
 * @param {Number} existencia
 * @return {Boolean}
 */
KardexDao.prototype.entrada = function(local, producto, descripcion, cantidadEntra, existencia){
	var k = new Kardex();
	k.local = local;
	k.producto = producto;
	k.descripcion = descripcion;
	k.cantidadEntra = cantidadEntra;
	k.cantidadSale = 0;
	
	if(existencia == null){
		var lst = this.query("SELECT existencia" + new StockProducto().tablename + " WHERE id_producto="+producto.id+ " and id_local = " + local.id);
		if(lst.length > 0){
			k.cantidadActual = lst[0].existencia;
		}
	}else{
		k.cantidadActual = existencia;
	}
	
	return this.create(k);
};


/**
 * Crea una salida en el kardex y lo guarda
 * @param {Local} local
 * @param {Producto} producto
 * @param {String} descripcion
 * @param {Number} cantidadSale
 * @param {Number} existencia
 * @return {Boolean}
 */
KardexDao.prototype.salida = function(local, producto, descripcion, cantidadSale, existencia){
	var k = new Kardex();
	k.local = local;
	k.producto = producto;
	k.descripcion = descripcion;
	k.cantidadEntra = 0;
	k.cantidadSale = cantidadSale;
	
	if(existencia == null){
		var lst = this.query("SELECT existencia" + new StockProducto().tablename + " WHERE id_producto="+producto.id+ " and id_local = " + local.id);
		if(lst.length > 0){
			k.cantidadActual = lst[0].existencia;
		}
	}else{
		k.cantidadActual = existencia;
	}
	
	return this.create(k);
};

/**
 * Consulta el kardex
 * @param {Date} fechaInicio
 * @param {Date} fechaFin
 * @param {Number} idLocal
 * @param {Number} idProducto
 * @param {String} referencia
 * @return {Array}
 */
KardexDao.prototype.vistaKardex = function(fechaInicio, fechaFin, idLocal, referencia ){		
	var filtroFecha = "";	
	
	if(fechaInicio != null && fechaFin != null){
		filtroFecha +=  " and date(fecha) >='"+fechaInicio.toString('yyyy-MM-dd')+"'";
		filtroFecha +=  " and date(fecha) <='"+fechaFin.toString('yyyy-MM-dd') + "' ";
	}
	
	var q = "SELECT id_local, id_producto, producto, local FROM vista_kardex WHERE " +
			this.fkSql('id_local', idLocal) + " and " +
			"(codigoProducto Like '%"  + (referencia ? referencia : '') + "%' or " +
			"nombreProducto Like '%"  + (referencia ? referencia : '') + "%') " +
			filtroFecha + " group by id_producto, id_local";
			
	var lst = this.query(q);
	
	for(var i = 0; i < lst.length; i++){
		var it = lst[i];
		var qp = "SELECT fecha, descripcion, cantidadActual, cantidadEntra, cantidadSale, nuevaCantidad FROM vista_kardex WHERE " +			
		'id_local='+ it.id_local + " and " +			
		'id_producto='+ it.id_producto + filtroFecha;
		
		it.items = this.query(qp);
	}
	
			
	return lst;
};