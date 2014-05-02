function CobroItemConst(){
	this.EFECTIVO = "EFECTIVO";
	this.CHEQUE = "CHEQUE";
	this.ANTICIPO = "ANTICIPO";
	this.CREDITO_DIFERIDO = "CREDITO_DIFERIDO";
	this.CREDITO_CORRIENTE = "CREDITO_CORRIENTE";
};
CobroItemConst.prototype = new Object();

function CobroItem(){
	this.classname = 'CobroItem';
	this.tablename = 'ven_cobro_detalle';
	
	this.id= -1;
	this.formaPago = this.EFECTIVO;
	this.monto = 0.0;
	this.saldo = 0.0;
	this.id_documento = 0;
	this.fecha = new Date();
	
	this.porcentajeInteres = 0.0;
	this.porcentajeMora = 0.0;
	
	this.cobro = new Cobro();	
	this.cuotas = new Array();
};

CobroItem.prototype = new CobroItemConst();

CobroItem.prototype.mapFields = function( q ) {
	var f = new Array();
	f['formaPago']		= q + this.formaPago + q;
	f['monto']	= q + this.monto + q;
	f['saldo']		= q + this.saldo + q;	
	f['id_documento']	= q + this.id_documento + q;
	f['porcentajeInteres']	= q + this.porcentajeInteres + q;
	f['porcentajeMora']	= q + this.porcentajeMora + q;
	f['fecha']	= q + this.fecha.toString('yyyy-MM-dd') + q;
	
	return f;
};

CobroItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['cobro'] = ['id_cobro','id', new Cobro()];			
	return f;
};

CobroItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

/**
 * {Cuota}
 */
CobroItem.prototype.crearCuota = function(){
	var c = new Cuota();
	c.cobroItem = this;
	this.cuotas.push(c);
	return c;
};