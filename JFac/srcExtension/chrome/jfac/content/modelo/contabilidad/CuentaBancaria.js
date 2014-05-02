function CuentaBancariaConst(){	
	this.TIPO_CORRIENTE = "Corriente";
	this.TIPO_AHORROS = "Ahorros";
};

CuentaBancariaConst.prototype=new Object();

function CuentaBancaria(id){
	this.classname = 'CuentaBancaria';
	this.tablename = 'cont_banco_cuenta';
	
	this.id = id ? id : -1;
	this.numero = '';
	this.tipo = this.TIPO_CORRIENTE;
	
	this.banco = new Banco();
	this.plan = new Plan();
};

CuentaBancaria.prototype=new CuentaBancariaConst();

CuentaBancaria.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['numero']	= q + this.numero + q;	
	f['tipo']	= q + this.tipo + q;	
	
	return f;
};

CuentaBancaria.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['banco'] 	 = ['id_banco','id', new Banco()];
	f['plan'] 	 = ['id_plan','id', new Plan()];
	return f;
};

CuentaBancaria.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};