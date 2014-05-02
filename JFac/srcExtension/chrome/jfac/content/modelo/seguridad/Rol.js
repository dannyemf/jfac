function Rol(){
	this.classname = 'Rol';
	this.tablename = 'seg_rol';
	
	this.id= -1;
	this.nombre= '';
	this.descripcion= '';
};

Rol.prototype=new Object();

Rol.prototype.mapFields = function( q ) {
	var f = new Array();
	f['nombre']	= q+this.nombre+q;
	f['descripcion']	= q+this.descripcion+q;
	return f;
};

Rol.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

