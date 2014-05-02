function RolUsuario(){
	this.classname = 'RolUsuario';
	this.tablename = 'seg_rol_usuario';	
	
	this.rol = new Rol();
	this.usuario = new Usuario();	
};

RolUsuario.prototype=new Object();

RolUsuario.prototype.mapFields = function( q ) {
	var f = new Array();
	//f['id_rol']	= q+this.id_rol+q;
	//f['id_usuario']	= q+this.id_usuario+q;
	return f;
};

/*RolUsuario.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['rol'] 	= ['id_rol','id', new Rol()];		
	f['usuario'] = ['id_usuario','id', new Usuario()];	
	return f;
};*/

RolUsuario.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id_rol']=q+ this.id_rol + q;
	f['id_usuario']=q+ this.id_usuario + q;
	return f;
};

