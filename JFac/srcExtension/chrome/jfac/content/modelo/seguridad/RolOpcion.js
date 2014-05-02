function RolOpcion(){
	this.classname = 'RolOpcion';
	this.tablename = 'seg_rol_opcion';
	
	this.rol = new Rol();
	this.opcion = new Opcion();
};

RolOpcion.prototype=new Object();

RolOpcion.prototype.mapFields = function( q ) {
	var f = new Array();
	//f['id_rol']	= q+this.id_rol+q;
	//f['id_usuario']	= q+this.id_usuario+q;
	return f;
};

/*RolOpcion.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['rol'] 	= ['id_rol','id', new Rol()];		
	f['opcion'] = ['id_opcion','id', new Opcion()];	
	return f;
};*/

RolOpcion.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id_rol']=q+ this.id_rol + q;
	f['id_opcion']=q+ this.id_opcion + q;
	return f;
};

