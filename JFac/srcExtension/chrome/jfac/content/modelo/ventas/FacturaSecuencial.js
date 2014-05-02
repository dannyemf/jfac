function FacturaSecuencial(id){
	this.classname = 'FacturaSecuencial';
	this.tablename = 'ven_secuencial';
	
	this.id= id ? id : -1;
	this.desde= 0;
	this.hasta= 0;
	this.secuencial= 0;
	this.tipoDocumento = Constante.TIPO_DOC_FACTURA;
	
	this.punto = new PuntoFacturacion();
	this.autorizacion = new AutorizacionSri();
	
};

FacturaSecuencial.prototype=new Object();

FacturaSecuencial.prototype.mapFields = function( q ) {
	var f = new Array();
	f['desde']		= q + this.desde + q;	
	f['hasta']	= q + this.hasta + q;
	f['secuencial']	= q + this.secuencial + q;	
	f['tipoDocumento']	= q + this.tipoDocumento + q;
	
	return f;
};

FacturaSecuencial.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['punto'] = ['id_punto','id', new PuntoFacturacion()];
	f['autorizacion'] = ['id_autorizacion','id', new AutorizacionSri()];
	return f;
};

FacturaSecuencial.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};