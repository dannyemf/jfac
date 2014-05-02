function PuntoFacturacion(id){
	this.classname = 'PuntoFacturacion';
	this.tablename = 'ven_punto_facturacion';
	
	this.id= id ? id : -1;
	this.codigo= '000-000';
	this.nombre= '';
	
	this.local = new Local();
	
};

PuntoFacturacion.prototype=new Object();

PuntoFacturacion.prototype.mapFields = function( q ) {
	var f = new Array();
	f['codigo']		= q + this.codigo + q;	
	f['nombre']	= q + this.nombre + q;
	
	return f;
};

PuntoFacturacion.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['local'] = ['id_local','id', new Local()];
	
	return f;
};

PuntoFacturacion.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

PuntoFacturacion.prototype.toString = function(){
	return this.codigo + " - " + this.nombre;
};