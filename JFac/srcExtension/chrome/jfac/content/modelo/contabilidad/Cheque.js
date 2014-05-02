function ChequeConst(){
	this.ESTADO_REGISTRADO = 'REGISTRADO';
	this.ESTADO_ANULADO = 'ANULADO';
	this.ESTADO_FINALIZADO = 'FINALIZADO';
};

ChequeConst.prototype=new Object();

function Cheque(id){
	this.classname = 'Cheque';
	this.tablename = 'cont_cheque';
	
	this.id = id ? id : -1;
	this.numero = '';	
	this.fechaEmision = new Date();
	this.fechaVencimiento = new Date();
	this.monto = 0.0;
	this.estado = this.ESTADO_REGISTRADO;
	
	this.banco = new Banco();
	this.cuenta = new CuentaBancaria();
	this.cliente = new Cliente();
};

Cheque.prototype=new ChequeConst();

Cheque.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['numero']				= q + this.numero + q;	
	f['monto']				= q + this.monto + q;
	f['estado']				= q + this.estado + q;
	f['fechaEmision']		= q + this.fechaEmision.toString('yyyy-MM-dd') + q;
	f['fechaVencimiento']	= q + this.fechaVencimiento.toString('yyyy-MM-dd') + q;
	
	return f;
};

Cheque.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['banco'] = ['id_banco','id', new Banco()];
	f['cuenta'] = ['id_cuenta','id', new CuentaBancaria()];
	f['cliente'] = ['id_cliente','id', new Cliente()];
	return f;
};

Cheque.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};