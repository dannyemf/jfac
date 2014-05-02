function ClienteDao(){
};

ClienteDao.prototype = new Dao();

ClienteDao.prototype.guardar = function(cliente){
	var guardado = false;
	if(cliente.id == -1){
		guardado = this.create(cliente);
	}else{
		guardado = this.update(cliente);
	}	
	return guardado;
};

ClienteDao.prototype.eliminar = function(cliente){
	return this.deletee(cliente);
};

ClienteDao.prototype.buscarTodos = function(){
	var cliente = new Cliente();
	var lista = this.readAll(cliente);
	return this.modelListTo(cliente, lista);
	
};

ClienteDao.prototype.buscarPorId = function(id){
	var cliente = new Cliente();
	var lista = new Array();
	
	try{
		lista = this.readBy(cliente, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(cliente, lista[0]);
	}
	return null;	
};

/**
 * Verifica si existe un cliente con la misma c�dula
 * @param {Cliente} cliente
 * @return {Boolean}
 */
ClienteDao.prototype.existeCedula = function(cliente){
	try {
		var id = cliente.id;
		var lista = this.readBy(cliente, "where cedula = '" + cliente.cedula + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};

ClienteDao.prototype.buscarPorCedula = function(cedula){
	var cliente = new Cliente();
	var lista = this.readBy(cliente, "where cedula LIKE '" + cedula + "%'");
	return this.modelListTo(cliente, lista);
};

ClienteDao.prototype.buscarPorNombres = function(nombres){
	var cliente = new Cliente();
	var lista = this.readBy(cliente, "where nombres LIKE '" + nombres + "%'");
	return this.modelListTo(cliente, lista);	
};

ClienteDao.prototype.buscarPorApellidos= function(apellidos){
	var cliente = new Cliente();
	var lista = this.readBy(cliente, "where apellidos LIKE '" + apellidos + "%'");
	return this.modelListTo(cliente, lista);	
};

ClienteDao.prototype.buscarPorTexto= function(texto){
	var cliente = new Cliente();
	texto = texto.trim();
	if(texto.length == 0){
		texto = "'%'";
	}else{
		texto = "'" + texto + "%'";
	}
	var lista = this.readBy(cliente, "where cedula LIKE " + texto + " or nombres LIKE " + texto
							+ " or apellidos LIKE " + texto);
	return this.modelListTo(cliente, lista);	
};