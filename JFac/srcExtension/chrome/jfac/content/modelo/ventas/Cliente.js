function Cliente(id){
	this.classname = 'Cliente';
	this.tablename = 'ven_cliente';
	
	this.id= id ? id : -1;
	this.cedula= '0000000000';
	this.nombres= '';
	this.apellidos= '';
	this.direccion= '';
	this.telefono= '';
	this.celular= '';
	this.fax= '';
	this.mail= '';
};

Cliente.prototype=new Object();

Cliente.prototype.mapFields = function( q ) {
	var f = new Array();
	f['cedula']		= q + this.cedula + q;	
	f['nombres']	= q + this.nombres + q;
	f['apellidos']	= q + this.apellidos + q;
	f['direccion']	= q + this.direccion + q;
	f['telefono']	= q + this.telefono + q;
	f['celular']	= q + this.celular + q;
	f['fax']		= q + this.fax + q;
	f['mail']		= q + this.mail + q;
	return f;
};

Cliente.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Cliente.prototype.getNombreCompleto = function(){
	return this.nombres + " " + this.apellidos;
};