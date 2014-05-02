function LocalDao(){
};

LocalDao.prototype = new Dao();

LocalDao.prototype.guardar = function(local){
	var guardado = false;
	if(local.id == -1){
		guardado = this.create(local);
	}else{
		guardado = this.update(local);
	}

	return guardado;
};

LocalDao.prototype.buscarPorId = function(id){
	var local = new Local();
	var lista = new Array();	
	try{
		lista = this.readBy(local, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(local, lista[0]);
	}
	return null;	
};

LocalDao.prototype.obtenerPorId = function(id){
	var local = new Local(id);
	this.read(local);	
	return local;
};

LocalDao.prototype.eliminar = function(local){
	return this.deletee(local);
};

LocalDao.prototype.obtenerTodos = function(){
	var local = new Local();
	var lista = this.readAll(local);
	var lstModel = this.modelListTo(local, lista);
	
	return lstModel;
};

/**
 * Verifica si existe una local con el mismo codigo
 * @param {Local} local
 * @return {Boolean}
 */
LocalDao.prototype.existe = function(local){
	try {
		var id = local.id;
		var lista = this.readBy(local, "where codigo = '" + local.codigo + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};