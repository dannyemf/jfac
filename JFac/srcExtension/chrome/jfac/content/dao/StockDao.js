function StockDao(){
};

StockDao.prototype = new Dao();

StockDao.prototype.guardar = function(entidad){
	var guardado = false;
	if(entidad.id == -1){
		guardado = this.create(entidad);
	}else{
		guardado = this.update(entidad);
	}	
	return guardado;
};

/**
 * Aumenta el stock con la compra enviada
 * @param {FacturaCompra} compra
 * @param {Local} local
 * @return
 */
StockDao.prototype.cargarCompra = function (compra, local){	
	var items = compra.items;
	var kardexDao = new KardexDao();
	
	for ( var i = 0; i < items.length; i++) {
		var it = items[i];		
		//Obtiene el stock
		var st = this.buscar(it.producto, local);
		//Afecta kardex
		kardexDao.entrada(local, it.producto, 'Factura de compra: ' + compra.numeroFactura, it.cantidad, st.existencia);
		//Actualiza stock
		st.existencia = (st.existencia*1) + (it.cantidad * 1);
		if(st.id == -1){
			this.create(st);
		}else{
			this.updateWhere(st,'WHERE id_producto = ' + st.producto.id + ' and id_local = ' + st.local.id);
		}
	}
};

/**
 * Disminuye el stock con la venta enviada
 * @param {FacturaVenta} venta
 * @param {Local} local
 * @return
 */
StockDao.prototype.cargarVenta = function (venta, local){	
	var items = venta.items;
	var kardexDao = new KardexDao();
	
	for ( var i = 0; i < items.length; i++) {
		var it = items[i];
		//Obtiene el stock
		var st = this.buscar(it.producto, local);
		//Afecta kardex
		kardexDao.salida(local, it.producto, 'Factura de venta: ' + venta.numeroFactura, it.cantidad, st.existencia);
		//Actualiza stock
		st.existencia = (st.existencia*1) - (it.cantidad * 1);
		if(st.id == -1){
			this.create(st);
		}else{
			this.updateWhere(st, 'WHERE id_producto = ' + st.producto.id + ' and id_local = ' + st.local.id);
		}
	}
};

/**
 * Vuelve el stock de los productos de una venta
 * @param {FacturaVenta} venta
 * @param {Local} local
 * @return
 */
StockDao.prototype.restaurarVenta = function (venta, local){	
	var items = venta.items;
	var kardexDao = new KardexDao();
	
	for ( var i = 0; i < items.length; i++) {
		var it = items[i];		
		//Busca stock
		var st = this.buscar(it.producto, local);
		//Afecta kardex
		kardexDao.entrada(local, it.producto, 'Restaura factura de venta: ' + venta.numeroFactura, it.cantidad, st.existencia);
		//Actualiza stock
		st.existencia = (st.existencia*1) + (it.cantidad * 1);
		if(st.id == -1){
			this.create(st);
		}else{
			this.updateWhere(st, 'WHERE id_producto = ' + st.producto.id + ' and id_local = ' + st.local.id);
		}
	}
};

StockDao.prototype.descargarTransferencia = function (transferencia, local){	
	var items = transferencia.items;
	var kardexDao = new KardexDao();
	
	for ( var i = 0; i < items.length; i++) {
		var it = items[i];
		//Busca stock
		var st = this.buscar(it.producto, local);
		//Afecta kardex
		kardexDao.salida(local, it.producto, 'Transferencia: ' + transferencia.id, it.cantidadEnviada, st.existencia);
		//Actualiza stock
		st.existencia = (st.existencia*1) - (it.cantidadEnviada * 1);
		if(st.id == -1){
			this.create(st);
		}else{
			this.updateWhere(st, 'WHERE id_producto = ' + st.producto.id + ' and id_local = ' + st.local.id);
		}
	}
};

StockDao.prototype.receptarTransferencia = function (transferencia, local){	
	var items = transferencia.items;
	var kardexDao = new KardexDao();
	
	for ( var i = 0; i < items.length; i++) {
		var it = items[i];
		//Busca stock
		var st = this.buscar(it.producto, local);
		//Afecta kardex
		kardexDao.entrada(local, it.producto, 'Recepción de Transferencia: ' + transferencia.id, it.cantidadRecibida, st.existencia);
		//Actualiza stock
		st.existencia = (st.existencia*1) + (it.cantidadRecibida * 1);
		if(st.id == -1){
			this.create(st);
		}else{
			this.updateWhere(st, 'WHERE id_producto = ' + st.producto.id + ' and id_local = ' + st.local.id);
		}
	}
};

StockDao.prototype.eliminar = function(entidad){
	return this.deletee(entidad);
};

StockDao.prototype.buscarTodos = function(){
	var entidad = new StockProducto();
	var lista = this.readAll(entidad);
	return this.modelListTo(entidad, lista);
	
};

StockDao.prototype.buscarPorLocal = function(local){
	var stock = new StockProducto();
	var lista = new Array();
	try{
		lista = this.readBy(stock, "WHERE id_local = '" + local.id +"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(stock, lista[0]);
	}
	return null;	
};

StockDao.prototype.buscarStockPorLocal = function(idLocal, texto){
	var stock = new StockProducto();
	var producto = new Producto();
	var local = new Local();
	var lista = new Array();
	
	texto = texto.trim();
	if(texto.length == 0){texto = "'%'";}
	else{texto = "'" + texto + "%'";}	
	
	try{
		if(idLocal == -1){
			lista = this.query('SELECT p.id, l.nombre as local, p.codigo, p.nombre, s.existencia as existencia from ' 
					   +  stock.tablename + ' s, ' + producto.tablename + ' p, ' + local.tablename 
					   + ' l where s.id_producto = p.id and s.id_local = l.id and p.nombre like ' + texto + ';');
		}else if(idLocal == -2){
			lista = this.query('SELECT p.id, p.codigo, p.nombre, sum(s.existencia) as existencia from ' 
					   +  stock.tablename + ' s, ' + producto.tablename + 
					   ' p where s.id_producto = p.id and p.nombre like ' + texto + ' group by p.id;');
		}else{
			lista = this.query('SELECT p.id, p.codigo, p.nombre, sum(s.existencia) as existencia from ' 
						   +  stock.tablename + ' s, ' + producto.tablename + 
						   ' p where s.id_producto = p.id and p.nombre like ' + texto + 
						   ' and ' + this.fkSql('s.id_local', idLocal) + ' group by p.id;');
		}
	}catch(e){}	
	return lista;
};

/**
 * Busca el stock por codigo o nombre del producto y por el local
 * @param {String} referencia Codigo o nombre
 * @param {Local} local o nulo para todos
 * @return
 */
StockDao.prototype.buscarPorReferncia = function(referencia, local){
	var stock = new StockProducto();
	stock.tablename = 'vista_stock_producto';
	
	var lista = new Array();
	try{
		lista = this.readBy(stock, "WHERE " +
				" (codigo Like '" + referencia + "%'" + 
				" or nombre Like '" + referencia + "%')" +
				" and id_local " + (local ? " = " + local.id : " is not null")
				);
	}catch(e){}
	return lista;
};

StockDao.prototype.buscarPorProducto = function(producto){
	var stock = new StockProducto();
	var lista = new Array();
	try{
		lista = this.readBy(stock, "where id_producto = '" + producto.id +"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(stock, lista[0]);
	}
	return null;	
};

StockDao.prototype.buscarPorProductoLocal = function(producto, local){
	var stock = new StockProducto();
	var lista = new Array();
	try{
		lista = this.readBy(stock, "WHERE id_producto = " + producto.id + " and id_local = " + local.id);
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(stock, lista[0]);
	}
	return null;	
};

StockDao.prototype.buscar = function(producto, local){
	var entidad = new StockProducto();
	entidad.id = -1;
	entidad.local = local;
	entidad.producto = producto;
	
	this.readBy(new StockProducto(), 'WHERE id_producto = ' + producto.id + ' and id_local = ' + local.id);
	if(this.oDb.lista.length > 0){
		var obj = this.oDb.lista[0];
		var model = this.modelTo(new StockProducto(), obj);
		model.id = 1;
		return model;
	}else{		
		return entidad;		
	}
};