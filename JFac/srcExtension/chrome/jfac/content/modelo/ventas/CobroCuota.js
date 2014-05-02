function CobroCuotaConst(){
	this.EFECTIVO = "EFECTIVO";
	this.CHEQUE = "CHEQUE";
	this.DEPOSITO = "DEPOSITO";
	this.TRANSFERENCIA = "TRANSFERENCIA";
};
CobroCuotaConst.prototype = new Object();

function CobroCuota(){
	this.classname = 'CobroCuota';
	this.tablename = 'ven_cobro_cuota';
	
	this.id= -1;
	this.formaPago = this.EFECTIVO;
	this.montoTotal = 0.0;	
	this.fecha = new Date();
	
	this.cobroItem = new CobroItem();
	this.cliente = new Cliente();
	this.usuario = new Usuario();
	this.local = new Local();
	this.lote = new LoteCaja();
	
	this.montoReal = 0.0;
	this.montoMora = 0.0;
	this.montoInteres = 0.0;
	
	// cheques, depostitos, transferencia
	this.banco = new Banco();
	this.cuenta = new CuentaBancaria();                                                                                                                             
	this.fechaEmision = new Date();
	this.fechaVencimiento = new Date();	
	this.numeroReferencia = '';
	this.numeroCuenta = '';
	
};

CobroCuota.prototype = new CobroCuotaConst();

CobroCuota.prototype.mapFields = function( q ) {
	var f = new Array();
	f['formaPago']		= q + this.formaPago + q;
	
	f['montoTotal']	= q + this.montoTotal + q;	
	f['montoReal']	= q + this.montoReal + q;
	f['montoMora']	= q + this.montoMora + q;
	f['montoInteres']	= q + this.montoInteres + q;
	
	f['fecha']	= q + this.fecha.toString('yyyy-MM-dd') + q;
	
	return f;
};

CobroCuota.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['cobroItem'] = ['id_cobro_item','id', new CobroItem()];
	f['cliente'] = ['id_cliente','id', new Cliente()];
	f['usuario'] = ['id_usuario','id', new Usuario()];
	f['local']   = ['id_local','id', new Local()];
	f['banco']   = ['id_banco','id', new Banco()];
	f['lote']   = ['id_lote','id', new LoteCaja()];
	f['cuenta']   = ['id_cuenta','id', new CuentaBancaria()];
	return f;
};

CobroCuota.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};