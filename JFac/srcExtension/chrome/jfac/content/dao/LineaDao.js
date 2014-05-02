function LineaDao(){
};

LineaDao.prototype = new Dao();

LineaDao.prototype.guardar = function(linea){
	var guardado = false;
	if(linea.id == -1){
		guardado = this.create(linea);
	}else{
		guardado = this.update(linea);
	}	
	return guardado;
};

LineaDao.prototype.eliminar = function(linea){
	return this.deletee(linea);
};

LineaDao.prototype.obtnerTodos = function(){
	var linea = new Linea();
	var lista = this.readAll(linea);
	var lstModel = this.modelListTo(linea, lista);
	return lstModel;
};

/**
 * Verifica si existe una linea con el mismo codigo
 * @param {Linea} linea
 * @return {Boolean}
 */
LineaDao.prototype.existe = function(linea){
	try {
		var id = linea.id;
		var lista = this.readBy(linea, "where codigo = '" + linea.codigo + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};