function UsuarioDao(){
};

UsuarioDao.prototype = new Dao();

UsuarioDao.prototype.guardar = function(user){
	var guardado = false;
	if(user.id == -1){
		guardado = this.create(user);
	}else{
		guardado = this.update(user);
	}	
	return guardado;
};

UsuarioDao.prototype.obtnerRoles = function(user){
	var rolus = new RolUsuario();
	var lista = this.readBy(rolus, "where  id_usuario = '" + user.id + "'");
	if(lista.length > 0){
		return this.modelListTo(rolus, lista);
	}
	return new Array();
};

UsuarioDao.prototype.eliminar = function(user){
	try {
		this.begin();
		
		this.query("DELETE FROM " + new RolUsuario().tablename + " WHERE id_usuario="+user.id);
		this.deletee(user);
		
		this.commit();
		
		return true;
	} catch (e) {
		this.rollback();
	}
	return false;
};

UsuarioDao.prototype.buscarTodos = function(){
	var user = new Usuario();
	var lista = this.readAll(user);
	return this.modelListTo(user, lista);	
};

UsuarioDao.prototype.buscarActivos = function(){
	var user = new Usuario();
	var lista = this.readBy(user, "where isActivo = 1");
	return this.modelListTo(user, lista);	
};

UsuarioDao.prototype.buscarPorLogin = function(login){
	var user = new Usuario();
	var lista = this.readBy(user, "where login = '" + login + "'");
	if(lista.length > 0){
		var m =  this.modelTo(user, lista[0]);
		
		return m;
	}
	return null;	
};

UsuarioDao.prototype.buscarPorId = function(id){
	var user = new Usuario();
	var lista = new Array();
	
	try{
		lista = this.readBy(user, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(user, lista[0]);
	}
	return null;	
};

UsuarioDao.prototype.cargar = function(id){
	var user = new Usuario();
	user.id = id;
	
	try{
		this.read(user);		
		user.punto = new PuntoFacturacion(user.id_punto);
		user.local = new Local(user.id_local);
		return user;
	}catch(e){}
	
	
	return null;	
};

UsuarioDao.prototype.buscarPorCedula = function(cedula){
	var user = new Usuario();
	var lista = this.readBy(user, "where cedula LIKE '" + cedula + "%'");
	return this.modelListTo(user, lista);
};

UsuarioDao.prototype.buscarPorNombres = function(nombres){
	var user = new Usuario();
	var lista = this.readBy(user, "where nombres LIKE '" + nombres + "%'");
	return this.modelListTo(user, lista);	
};

UsuarioDao.prototype.buscarPorApellidos= function(apellidos){
	var user = new Usuario();
	var lista = this.readBy(user, "where apellidos LIKE '" + apellidos + "%'");
	return this.modelListTo(user, lista);	
};