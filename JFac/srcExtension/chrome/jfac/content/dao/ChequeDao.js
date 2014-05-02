function ChequeDao(){
};

ChequeDao.prototype = new Dao();

ChequeDao.prototype.guardar = function(cheque){
	var guardado = false;	
	
	if(cheque.id == -1){
		guardado = this.create(cheque);
	}else{
		guardado = this.update(cheque);
	}
	
	return guardado;
};

ChequeDao.prototype.eliminar = function(cheque){
	return this.deletee(cheque);
};


/**
 * Busca todas todas los cheques
 * 
 * @return {Array} Lista de cheque
 */
ChequeDao.prototype.buscarTodos = function(){
	var cheque = new cheque();
	var lista = this.readAll(cheque);
	return this.modelListTo(cheque, lista);	
};

/**
 * Busca una cheque por su id
 * 
 * @param {Number} id - El id del cheque
 * @return {Cheque}
 */
ChequeDao.prototype.buscarPorId = function(id){
	var cheque = new cheque();
	var lista = new Array();
	
	try{
		lista = this.readBy(cheque, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(cheque, lista[0]);
	}
	return null;	
};

/**
 * Verifica si existe un cheque con el mismo codigo
 * @param {Cheque} cheque
 * @return {Boolean}
 */
ChequeDao.prototype.existe = function(cheque){
	try {
		var id = cheque.id;
		var lista = this.readBy(cheque, "where numero = '" + cheque.numero + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};