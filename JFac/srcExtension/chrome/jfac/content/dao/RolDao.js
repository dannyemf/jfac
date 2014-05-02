function RolDao(){
};

RolDao.prototype = new Dao();

RolDao.prototype.guardar = function(rol){
	var guardado = false;
	if(rol.id == -1){
		guardado = this.create(rol);
	}else{
		guardado = this.update(rol);
	}	
	return guardado;
};

RolDao.prototype.eliminar = function(rol){
	return this.deletee(rol);
};

/**
 * Guarda una lista de roles para un usuario
 * @param {Array} roles
 * @param {Usuario} user
 */
RolDao.prototype.guardarRolesUsuario = function(roles, user){
	try {
		this.begin();
		
		this.deleteBy(new RolUsuario(),'id_usuario = ' + user.id);
		
		for(var i = 0 ; i < roles.length; i++){
			var rol = roles[i];
			
			var rolUs = new RolUsuario();
			rolUs.id_rol = rol.id;
			rolUs.id_usuario = user.id;				
				
			if(rol.asignar == 1){	
				this.create(rolUs);
			}else{
				this.deletee(rolUs);
			}
		}
		this.commit();
	} catch (e) {
		this.rollback();
	}
};

RolDao.prototype.guardarRolesOpcion = function(roles, opcion){
	
	try {
		this.begin();
		
		this.deleteBy(new RolOpcion(),'id_opcion = ' + opcion.id);
		
		for(var i = 0 ; i < roles.length; i++){
			var rol = roles[i];
			
			var rolOpp = new RolOpcion();			
			rolOpp.id_rol = rol.id;
			rolOpp.id_opcion = opcion.id;
								
			if(rol.asignar == 1 || rol.asignar){				
				this.create(rolOpp);
			}else{
				this.deletee(rolOpp);
			}
		}
		
		this.commit();
		return true;
	} catch (e) {
		this.rollback();
	}
	return false;
	
	
};

RolDao.prototype.obtenerRolesUsuario = function(user){
	var rolus = new RolUsuario();
	var lista = this.readBy(rolus, "where  id_usuario = '" + user.id + "'");
	user.rolesUsuarios = this.modelListTo(rolus, lista);
	
	var listaRoles = new Array();
	for(i = 0; i < lista.length; i++){
		var rolUs = lista[i];
		var rol = new Rol();
		rol.id = rolUs.id_rol;
		this.read(rol);
		rolUs.usuario = user;
		rolUs.rol = rol;
		listaRoles.push(rol);
	}
	return listaRoles;
};

RolDao.prototype.obtenerRolesOpcion = function(opcion){
	var rolus = new RolOpcion();
	var lista = this.readBy(rolus, "where  id_opcion = '" + opcion.id + "'");
	opcion.rolesOpcion = this.modelListTo(rolus, lista);
	
	var listaRoles = new Array();
	for(var i = 0; i < lista.length; i++){
		var rolUs = new RolUsuario();  rolUs = lista[i];
		var rol = new Rol();
		rol.id = rolUs.id_rol;
		this.read(rol);
		rolUs.usuario = opcion;
		rolUs.rol = rol;
		listaRoles.push(rol);
	}
	return listaRoles;
};

RolDao.prototype.obtnerTodosRoles = function(){
	var rol = new Rol();
	var lista = this.readAll(rol);
	return this.modelListTo(rol, lista);
};