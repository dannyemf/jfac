function AutorizacionSriConst(){
	this.ESTADO_ACTIVO = "Activo";
	this.ESTADO_INACTIVO = "Inactivo";
}
AutorizacionSriConst.prototype=new Object();

function AutorizacionSri(id){
	this.classname = 'AutorizacionSri';
	this.tablename = 'ven_autorizacion_sri';
	
	this.id= id ? id : -1;
	this.numero= '';
	this.estado= this.ESTADO_INACTIVO;
	
	this.fechaInicio = new Date();
	this.fechaFin = new Date();
};

AutorizacionSri.prototype=new AutorizacionSriConst();

AutorizacionSri.prototype.mapFields = function( q ) {
	var f = new Array();
	f['numero']			= q + this.numero + q;	
	f['estado']			= q + this.estado + q;
	f['fechaInicio']	= q + this.fechaInicio.toString('yyyy-MM-dd') + q;
	f['fechaFin']		= q + this.fechaFin.toString('yyyy-MM-dd') + q;
	
	return f;
};

AutorizacionSri.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

AutorizacionSri.prototype.toString = function(){
	return this.numero + " - " + this.estado;
};