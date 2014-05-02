function ProductoDao(){
};

ProductoDao.prototype = new Dao();

ProductoDao.prototype.guardar = function(entidad){
	var guardado = false;
	if(entidad.id == -1){
		guardado = this.create(entidad);
	}else{
		guardado = this.update(entidad);
	}	
	return guardado;
};

ProductoDao.prototype.eliminar = function(entidad){
	return this.deletee(entidad);
};

ProductoDao.prototype.buscarTodos = function(limit){
	var entidad = new Producto();
	var lista = this.readAll(entidad, limit);
	return this.modelListTo(entidad, lista);
	
};

ProductoDao.prototype.buscarPorId = function(id){
	var user = new Producto();
	var lista = new Array();
	
	try{
		lista = this.readBy(user, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(user, lista[0]);
	}
	return null;	
};

ProductoDao.prototype.buscarPorCodigo = function(identificacion){
	var entidad = new Producto();
	var lista = this.readBy(entidad, "where codigo LIKE '" + identificacion + "%'");
	return this.modelListTo(entidad, lista);
};

ProductoDao.prototype.buscarPorSerie = function(identificacion){
	var entidad = new Producto();
	var lista = this.readBy(entidad, "where serie LIKE '" + identificacion + "%'");
	return this.modelListTo(entidad, lista);
};

ProductoDao.prototype.buscarPorVarios = function(texto){
	var entidad = new Producto();
	var lista = this.readBy(entidad, "where codigo LIKE '" + texto + "%'" + " or nombre LIKE '" + texto + "%'");
	return this.modelListTo(entidad, lista);
};