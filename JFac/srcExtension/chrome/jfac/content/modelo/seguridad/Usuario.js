function Usuario(id){
	this.classname = 'Usuario';
	this.tablename = 'seg_usuario';
	
	this.id= id ? id : -1;
	this.login= '';
	this.clave= '';
	this.cedula= '0000000000';
	this.nombres= '';
	this.apellidos= '';
	this.isActivo = true;
	
	this.punto = new PuntoFacturacion();
	this.local = new Local();
	
	this.rolesUsuarios = new Array();
};

Usuario.prototype=new Object();

Usuario.prototype.mapFields = function( q ) {
	var f = new Array();
	f['login']	= q+this.login+q;
	f['cedula']	= q+this.cedula+q;
	f['clave']	= q+this.clave+q;
	f['nombres']	= q+this.nombres+q;
	f['apellidos']	= q+this.apellidos+q;
	f['isActivo']	= q+(this.isActivo?1:0)+q;
	
	return f;
};

Usuario.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Usuario.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['punto'] 	= ['id_punto','id', new PuntoFacturacion()];		
	f['local'] = ['id_local','id', new Local()];	
	return f;
};

Usuario.prototype.getNombreCompleto = function() {
	return this.nombres + " " + this.apellidos;
};

