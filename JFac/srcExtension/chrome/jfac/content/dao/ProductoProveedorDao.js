function ProductoProveedorDao(){
};

ProductoProveedorDao.prototype = new Dao();

ProductoProveedorDao.prototype.guardar = function(productoProveedor){	
	var guardado = false;	
	
	if(productoProveedor .id == -1){
		guardado = this.create(productoProveedor);
	}else{
		guardado = this.update(productoProveedor);
	}
	
	return guardado;
};

ProductoProveedorDao.prototype.eliminar = function(productoProveedor){
	return this.deletee(productoProveedor);
};

/**
 * Busca todas todos los producto-proveedor configurados
 * 
 * @return {Array} Lista de producto-proveedor
 */
ProductoProveedorDao.prototype.buscarTodos = function(){
	var productoProveedor = new ProductoProveedor();
	var lista = this.readAll(productoProveedor);
	return this.modelListTo(productoProveedor, lista);	
};

/**
 * Busca todas todas los bancos
 * 
 * @return {Array} Lista de Banco
 */
/*ProductoProveedorDao.prototype.buscarTodosEmpresa = function(){
	var banco = new Banco();
	var lista = this.readBy(banco, "where utilizaEmpresa = 1 and estado = 1");
	return this.modelListTo(banco, lista);	
};*/

/**
 * Busca una Banco por su id
 * 
 * @param {Number} id - El id del Banco
 * @return {Banco}
 */
ProductoProveedorDao.prototype.buscarPorId = function(id){
	var productoProveedor = new ProductoProveedor();
	var lista = new Array();
	
	try{
		lista = this.readBy(productoProveedor, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(productoProveedor, lista[0]);
	}
	return null;	
};

/**
 * Verifica si existe un banco con el mismo codigo
 * @param {Banco} banco
 * @return {Boolean}
 */
ProductoProveedorDao.prototype.existeProductoProveedor = function(idProveedor, idproducto, id){
	var model = new ProductoProveedor();
	var exs = (this.query("SELECT COUNT(*) FROM " + model.tablename + " WHERE id_proveedor = '" + idProveedor + "' and id_producto = '" + idproducto + "' and id != " + id)[0][0]) * 1;
	if(exs > 0){
		return true;
	}
	return false;
};