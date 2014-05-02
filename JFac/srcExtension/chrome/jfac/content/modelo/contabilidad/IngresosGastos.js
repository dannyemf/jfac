function IngresosGastos(id){
	this.classname = 'IngresosGastos';
	this.tablename = 'cont_ingreso_gasto';
	
	this.id = id ? id : -1;
	this.descripcion = '';
	this.tipo = 'Ingreso';	//Gasto
	this.valor = 0;
	this.fechaRegistro = new Date();
	
	this.lote = new LoteCaja();
	this.local = new Local();
	this.usuario = new Usuario();
		
	this.items = new Array();
};

IngresosGastos.prototype=new Object();

IngresosGastos.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['descripcion']	= q + this.descripcion + q;
	f['tipo']			= q + this.tipo + q;
	f['valor']			= q + this.valor + q;
	f['fechaRegistro']	= q + toStringFecha(this.fechaRegistro) + q;	
	
	return f;
};

IngresosGastos.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['lote'] 	 = ['id_lote','id', new LoteCaja()];
	f['local'] 	 = ['id_local','id', new Local()];
	f['usuario'] = ['id_usuario','id', new Usuario()];
	return f;
};

IngresosGastos.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};