function Local(id){
	this.classname = 'Local';
	this.tablename = 'seg_local';
	
	this.id = id ? id : -1;
	this.codigo= '';
	this.nombre= '';
	this.direccion= '';
	this.telefono= '';	
};

Local.prototype=new Object();

Local.prototype.mapFields = function( q ) {
	var f = new Array();
	f['codigo']	= q+this.codigo+q;
	f['nombre']	= q+this.nombre+q;
	f['direccion']	= q+this.direccion+q;
	f['telefono']	= q+this.telefono+q;
	return f;
};

Local.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Local.prototype.getNombreCompleto = function() {
	return this.codigo + " - " + this.nombre;
};
