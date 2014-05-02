function ParametroDao(){
};

ParametroDao.prototype = new Dao();

/**
 * Guarda el parámetro
 * @param {Parametro} parametro
 * @return {Boolean}
 */
ParametroDao.prototype.guardar = function(parametro){
	if(parametro.id == -1){
		return this.create(parametro);
	}else{
		return this.update(parametro);
	}
};

/**
 * Verifica si existe un parametro con el codigo y que sea diferente a ese id
 * @param {String} codigo
 * @param {Number} id
 * @return {Boolean}
 */
ParametroDao.prototype.existe = function(codigo, id){
	var model = new Parametro();
	var exs = (this.query("SELECT COUNT(*) FROM " + model.tablename + " WHERE codigo = '" + codigo + "' and id != " + id)[0][0]) * 1;
	if(exs > 0){
		return true;
	}
	return false;
};

/**
 * Obtiene un parámetro por su codigo
 * @param {String} codigo
 * @return {Parametro}
 */
ParametroDao.prototype.obtener = function(codigo){
	var parametro = new Parametro();
	var lst = this.readBy(parametro, "WHERE codigo ='" + codigo +"'");
	if(lst.length > 0){
		return this.modelTo(parametro, lst[0]);
	}else{
		throw new Error('No se ha encontrado el parámetro: ' + codigo);
	}
};

/***
 * Obtiene todos los parámetros de un tipo
 * @param {String} tipo
 * @return {Array}
 */
ParametroDao.prototype.obtenerPorTipo = function(tipo){
	var parametro = new Parametro();
	var lst = this.readBy(parametro, "WHERE tipo ='" + tipo +"'");
	return this.modelListTo(parametro, lst);
};

ParametroDao.prototype.obtenerTodos = function(){
	var parametro = new Parametro();
	var lista = this.readAll(parametro);
	return this.modelListTo(parametro, lista);
};