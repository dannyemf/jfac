function EstadoPlanItemConst(){	
}
EstadoPlanItemConst.prototype = new Object();

function EstadoPlanItem(id){
	this.classname = 'EstadoPlanItem';
	this.tablename = 'cont_estado_plan_detalle';
	
	this.id = id ? id : -1;
	
	this.debe = 0.0;
	this.haber = 0.0;
	
	this.estadoPlan = new EstadoPlan();
	this.plan = new Plan();
};

EstadoPlanItem.prototype = new EstadoPlanItemConst();

EstadoPlanItem.prototype.mapFields = function( q ) {
	var f = new Array();
	f['debe']	= q+this.debe+q;
	f['haber']	= q+this.haber+q;	
	return f;
};

EstadoPlanItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

EstadoPlanItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad            FK                PK    model
	f['estadoPlan'] 	= ['id_estado_plan','id', new EstadoPlan()];		
	f['plan'] 			= ['id_plan',       'id', new Plan()];	
	return f;
};
