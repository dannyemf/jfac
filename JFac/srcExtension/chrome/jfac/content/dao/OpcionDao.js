function OpcionDao(){
};

OpcionDao.prototype = new Dao();

/**
 * Guarda una lista de roles para un usuario
 * @param {Lista de roles} roles
 * @param {Opcion} opcion
 */
OpcionDao.prototype.guardar = function(opcion){
	var guardado = false;	
	
	if(opcion.id == -1){
		guardado = this.create(opcion);
	}else{
		var oldOpp = new Opcion(opcion.id);
		this.read(oldOpp);
		
		guardado = this.update(opcion);		
		if(guardado && (oldOpp.codigo != null && oldOpp.codigo.trim().length =="")){
			this.query("UPDATE " + opcion.tablename + " set padre = '" + opcion.codigo +"' where padre = '" + oldOpp.codigo + "'" );
		}
	}	
	return guardado;
};

OpcionDao.prototype.eliminar = function(opcion){
	try {
		this.begin();
		
		this.query('DELETE FROM ' + new RolOpcion().tablename + " WHERE id_opcion = " + opcion.id );
		this.deletee(opcion);
		
		this.commit();
		return true;
	} catch (e) {
		this.rollback();
		throw e;
	}
	return false;
};

OpcionDao.prototype.guardarOpciones = function(roles, opcion){
	for(i = 0 ; i < roles.length; i++){
		var rol = roles[i];
		
		var rolOpp = new RolOpcion();
		rolOpp.id_rol = rol.id;
		rolOpp.id_opcion = opcion.id;
			
		if(rol.asignar == 1){	
			this.create(rolOpp);
		}else{
			this.deletee(rolOpp);
		}
	}
};

OpcionDao.prototype.obtnerTodosOpciones = function(){
	var rol = new Opcion();
	var lista = this.readBy(rol, "order by codigo");
	return this.modelListTo(rol, lista);
};

OpcionDao.prototype.obtnerMenu = function(user){
	var lista = this.query("SELECT * FROM vista_menu where ID_USUARIO = " + user.id + " GROUP BY (CODIGO)");
	return lista;
};

OpcionDao.prototype.obtnerVentana = function(user, codigoVentana){
	var lista = this.query("SELECT * FROM vista_menu where ID_USUARIO = " + user.id + " AND CODIGO_VENTANA ='"+codigoVentana+"' GROUP BY (CODIGO) LIMIT 1");
	if(lista.length > 0)
		return lista[0];
	
	return null;
};

