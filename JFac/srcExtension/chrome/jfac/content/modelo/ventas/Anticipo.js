function AnticipoConst(){
	this.ESTADO_PENDIENTE 			= 'Pendiente';		//Cuando se registra el anticipo
	this.ESTADO_DEVUELTO 			= 'Devuelto';		//Devuelve el anticipo
	this.ESTADO_ANULADO 		    = 'Anulado';	    //Edicion del monto o formaPago. Solo se usa en contabilizacion	
	this.ESTADO_FINALIZADO 			= 'Finalizado';		//Cuando ya llega a cero el saldo
	
	this.FORMA_PAGO_EFECTIVO 		= 'Efectivo';
	this.FORMA_PAGO_CHEQUE 			= 'Cheque';
	this.FORMA_PAGO_TRANSFERENCIA 	= 'Transferencia';
	this.FORMA_PAGO_DEPOSITO 		= 'Deposito';	
};
AnticipoConst.prototype=new Object();

function Anticipo(id){
	this.classname = 'Anticipo';
	this.tablename = 'ven_anticipo';
	
	this.id= id ? id : -1;
	this.monto = 0.0;
	this.saldo = 0.0;
	this.descripcion = '';
	this.formaPago = this.FORMA_PAGO_EFECTIVO;
	this.estado = this.ESTADO_PENDIENTE;
	this.fecha = new Date();
	this.cliente = new Cliente();
	this.usuario = new Usuario();
	this.local = new Local();
	this.lote = new LoteCaja();
	this.loteDevuelve = new LoteCaja();
	this.montoDevuelve = 0.0;
	
	// cheques, depostitos, transferencia
	this.banco = new Banco();
	this.cuenta = new CuentaBancaria();                                                                                                                             
	this.fechaEmision = new Date();
	this.fechaVencimiento = new Date();	
	this.numeroReferencia = '';
	this.numeroCuenta = '';	
};

Anticipo.prototype=new AnticipoConst();

Anticipo.prototype.mapFields = function( q ) {
	var f = new Array();
	f['monto']				= q + this.monto + q;
	f['montoDevuelve']				= q + this.montoDevuelve + q;
	f['saldo']				= q + this.saldo + q;
	f['descripcion']		= q + this.descripcion + q;
	f['formaPago']			= q + this.formaPago + q;
	f['estado']				= q + this.estado + q;
	f['fecha']				= q + this.fecha.toString('yyyy-MM-dd HH:mm:ss') + q;
	
	f['fechaEmision']		= (this.formaPago == this.FORMA_PAGO_EFECTIVO ? 'NULL' : q + this.fechaEmision.toString('yyyy-MM-dd') 	+ q);	
	f['fechaVencimiento']	= (this.formaPago == this.FORMA_PAGO_EFECTIVO ? 'NULL' : q + this.fechaVencimiento.toString('yyyy-MM-dd') + q);
	f['numeroCuenta']		= (this.formaPago == this.FORMA_PAGO_EFECTIVO ? 'NULL' : q + this.numeroCuenta + q);
	f['numeroReferencia']	= (this.formaPago == this.FORMA_PAGO_EFECTIVO ? 'NULL' : q + this.numeroReferencia + q);
	
	return f;
};

Anticipo.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Anticipo.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['cliente'] = ['id_cliente','id', new Cliente()];
	f['usuario'] = ['id_usuario','id', new Usuario()];
	f['local']   = ['id_local','id', new Local()];
	f['banco']   = ['id_banco','id', new Banco()];
	f['lote']   = ['id_lote','id', new LoteCaja()];
	f['loteDevuelve']   = ['id_lote_devuelve','id', new LoteCaja()];
	f['cuenta']   = ['id_cuenta','id', new CuentaBancaria()];
	return f;
};