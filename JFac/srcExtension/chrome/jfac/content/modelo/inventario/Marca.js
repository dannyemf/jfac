function Marca(){
	this.classname = 'Marca';
	this.tablename = 'inv_marca';
	
	this.id= -1;
	this.nombre= '';
};

Marca.prototype=new Object();

Marca.prototype.mapFields = function( q ) {
	var f = new Array();
	f['nombre']	= q+this.nombre+q;
	return f;
};

Marca.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

