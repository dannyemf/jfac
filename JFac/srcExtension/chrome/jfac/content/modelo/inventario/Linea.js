function Linea(){
	this.classname = 'Linea';
	this.tablename = 'inv_linea';
	
	this.id= -1;
	this.codigo= '';
	this.nombre= '';
};

Linea.prototype=new Object();

Linea.prototype.mapFields = function( q ) {
	var f = new Array();
	f['codigo']	= q+this.codigo+q;
	f['nombre']	= q+this.nombre+q;
	return f;
};

Linea.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

