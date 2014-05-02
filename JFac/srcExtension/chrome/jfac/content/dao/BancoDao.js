function BancoDao(){
};

BancoDao.prototype = new Dao();

BancoDao.prototype.guardar = function(banco){
	var guardado = false;	
	
	if(banco.id == -1){
		guardado = this.create(banco);
	}else{
		guardado = this.update(banco);
	}
	
	return guardado;
};

BancoDao.prototype.eliminar = function(banco){
	return this.deletee(banco);
};




/**
 * Busca todas todas los bancos
 * 
 * @return {Array} Lista de Banco
 */
BancoDao.prototype.buscarTodos = function(){
	var banco = new Banco();
	var lista = this.readAll(banco);
	return this.modelListTo(banco, lista);	
};

/**
 * Busca todas todas los bancos
 * 
 * @return {Array} Lista de Banco
 */
BancoDao.prototype.buscarTodosEmpresa = function(){
	var banco = new Banco();
	var lista = this.readBy(banco, "where utilizaEmpresa = 1 and estado = 1");
	return this.modelListTo(banco, lista);	
};

/**
 * Busca una Banco por su id
 * 
 * @param {Number} id - El id del Banco
 * @return {Banco}
 */
BancoDao.prototype.buscarPorId = function(id){
	var banco = new Banco();
	var lista = new Array();
	
	try{
		lista = this.readBy(banco, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(banco, lista[0]);
	}
	return null;	
};

/**
 * Verifica si existe un banco con el mismo codigo
 * @param {Banco} banco
 * @return {Boolean}
 */
BancoDao.prototype.existe = function(banco){
	try {
		var id = banco.id;
		var lista = this.readBy(banco, "where codigo = '" + banco.codigo + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};