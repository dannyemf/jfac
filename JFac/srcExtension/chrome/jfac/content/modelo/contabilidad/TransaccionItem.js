function TransaccionItemConst(){
	this.TIPO_DEBE = "Debe";
	this.TIPO_HABER = "Haber";
}
TransaccionItemConst.prototype=new Object();

function TransaccionItem(id){
	this.classname = 'TransaccionItem';
	this.tablename = 'cont_transaccion_detalle';
	
	this.id = id ? id : -1;
	
	this.tipo = this.TIPO_DEBE;
	this.formula = 'model.total';
	this.aplicaA = '';

	this.transaccion = new Transaccion();
	this.plan = new Plan();		
};

TransaccionItem.prototype=new TransaccionItemConst();

TransaccionItem.prototype.mapFields = function( q ) {
	var f = new Array();
	f['tipo']	= q+this.tipo+q;
	f['formula']	= q+this.formula+q;
	f['aplicaA']	= q+this.aplicaA+q;
	
	return f;
};

TransaccionItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

TransaccionItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['transaccion'] 	= ['id_transaccion','id', new Transaccion()];		
	f['plan'] 			= ['id_plan','id', new Plan()];	
	return f;
};
