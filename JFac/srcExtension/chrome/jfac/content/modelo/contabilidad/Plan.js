function Plan(id){
	this.classname = 'Plan';
	this.tablename = 'cont_plan';
	
	this.id = id ? id : -1;
	this.codigo = '';
	this.nombre = '';
	this.tipo = 'ACTIVO';
	this.movimiento = 0;
	
	this.padre = null; // Plan
	
};

Plan.prototype=new Object();

Plan.prototype.mapFields = function( q ) {
	var f = new Array();	
	f['codigo']	= q + this.codigo + q;
	f['nombre']	= q + this.nombre + q;
	f['tipo']	= q + this.tipo + q;
	f['movimiento']	= q + this.movimiento + q;
	
	return f;
};

Plan.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['plan'] 	 = ['id_padre','id', new Plan()];
	return f;
};

Plan.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};