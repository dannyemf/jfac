function Proveedor(){
	this.classname = 'Proveedor';
	this.tablename = 'com_proveedor';
	
	this.id= -1;
	this.tipoIdentificacion= 'RUC';
	this.identificacion= '';
	this.razonSocial= '';
	this.provincia= '';
	this.ciudad= '';
	this.direccion= '';
	this.contacto= '';
	this.telefono= '';
	this.fax= '';
	this.celular= '';
	this.mail= '';
	this.tipoProveedor='';
};

Proveedor.prototype=new Object();

Proveedor.prototype.mapFields = function( q ) {
	var f = new Array();
	f['identificacion']	= q+this.identificacion+q;
	f['tipoIdentificacion']	= q+this.tipoIdentificacion+q;
	f['razonSocial']	= q+this.razonSocial+q;
	f['provincia']	= q+this.provincia+q;
	f['ciudad']	= q+this.ciudad+q;
	f['direccion']	= q+this.direccion+q;
	f['contacto']	= q+this.contacto+q;
	f['telefono']	= q+this.telefono+q;
	f['fax']	= q+this.fax+q;
	f['celular']	= q+this.celular+q;
	f['mail']	= q+this.mail+q;
	f['tipoProveedor']	= q+this.tipoProveedor+q;
	
	return f;
};

Proveedor.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};