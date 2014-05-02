function ProveedorDao(){
};

ProveedorDao.prototype = new Dao();

ProveedorDao.prototype.guardar = function(entidad){
	var guardado = false;
	if(entidad.id == -1){
		guardado = this.create(entidad);
	}else{
		guardado = this.update(entidad);
	}	
	return guardado;
};

ProveedorDao.prototype.eliminar = function(entidad){
	return this.deletee(entidad);
};

ProveedorDao.prototype.buscarTodos = function(){
	var entidad = new Proveedor();
	var lista = this.readAll(entidad);
	return this.modelListTo(entidad, lista);
	
};

ProveedorDao.prototype.buscarPorId = function(id){
	var user = new Proveedor();
	var lista = new Array();
	
	try{
		lista = this.readBy(user, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(user, lista[0]);
	}
	return null;	
};

ProveedorDao.prototype.buscarPorIdentificacion = function(identificacion){
	var entidad = new Proveedor();
	var lista = this.readBy(entidad, "where identificacion LIKE '" + identificacion + "%'");
	return this.modelListTo(entidad, lista);
};

ProveedorDao.prototype.buscarPorRazon = function(razon){
	var entidad = new Proveedor();
	var lista = this.readBy(entidad, "where razonSocial LIKE '" + razon + "%'");
	return this.modelListTo(entidad, lista);	
};

ProveedorDao.prototype.buscarPorTexto= function(texto){
	var proveedor = new Proveedor();
	texto = texto.trim();
	if(texto.length == 0){
		texto = "'%'";
	}else{
		texto = "'" + texto + "%'";
	}
	var lista = this.readBy(proveedor, "where identificacion LIKE " + texto + " or razonSocial LIKE " + texto);
	return this.modelListTo(proveedor, lista);	
};