function TipoCreditoConst(){
	this.TIPO_MENSUAL = "MENSUAL";
	this.TIPO_QUINCENAL = "QUINCENAL";
	this.TIPO_SEMANAL = "SEMANAL";
	this.TIPO_DIARIO = "DIARIO";
};

TipoCreditoConst.prototype = new Object();

function TipoCredito(id){
	this.classname = 'TipoCredito';
	this.tablename = 'ven_tipo_credito';
	
	this.id= id ? id : -1;
	this.descripcion= '';
	this.tipo= this.TIPO_MENSUAL;
	this.numeroCuotas= 0;
	this.interes= 0.0;
	this.mora= 0.0;
};

TipoCredito.prototype=new TipoCreditoConst();

TipoCredito.prototype.mapFields = function( q ) {
	var f = new Array();
	f['descripcion']	= q + this.descripcion + q;	
	f['tipo']			= q + this.tipo + q;
	f['numeroCuotas']	= q + this.numeroCuotas + q;
	f['interes']		= q + this.interes + q;
	f['mora']			= q + this.mora + q;
	return f;
};

TipoCredito.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};