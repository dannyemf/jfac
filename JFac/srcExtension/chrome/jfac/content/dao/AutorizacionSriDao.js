function AutorizacionSriDao(){
};

AutorizacionSriDao.prototype = new Dao();

AutorizacionSriDao.prototype.guardar = function(autorizacion){
	var guardado = false;
	if(autorizacion.id == -1){
		guardado = this.create(autorizacion);
	}else{
		guardado = this.update(autorizacion);
	}	
	return guardado;
};

AutorizacionSriDao.prototype.eliminar = function(autorizacion){
	return this.deletee(autorizacion);
};

AutorizacionSriDao.prototype.obtenerTodos = function(){
	var autorizacion = new AutorizacionSri();
	var lista = this.readAll(autorizacion);	
	return this.modelListTo(autorizacion, lista);	
};


AutorizacionSriDao.prototype.buscarPorId = function(id){
	var autorizacion = new AutorizacionSri();
	var lista = new Array();
	
	try{
		lista = this.readBy(autorizacion, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		var m =  this.modelTo(autorizacion, lista[0]);
		return m;
	}
	return null;	
};

/**
 * Verifica si existe un autorizacion con el mismo numero
 * @param {AutorizacionSri} autorizacion
 * @return {Boolean}
 */
AutorizacionSriDao.prototype.existeByNumero = function(autorizacion){
	try {
		var id = autorizacion.id;
		var lista = this.readBy(autorizacion, "where numero = '" + autorizacion.numero + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};

