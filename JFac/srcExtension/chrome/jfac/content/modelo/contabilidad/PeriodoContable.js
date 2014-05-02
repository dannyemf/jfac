function PeriodoContableConst(){}
PeriodoContableConst.prototype = new Object();

function PeriodoContable(id){
	this.classname = 'PeriodoContable';
	this.tablename = 'cont_periodo_contable';
	
	this.id = id ? id : -1;
	this.nombre = '';
	this.fechaInicial = new Date();
	this.fechaFinal = new Date();
};

PeriodoContable.prototype=new PeriodoContableConst();

PeriodoContable.prototype.mapFields = function( q ) {
	var f = new Array();	
	f['nombre']			= q + this.nombre + q;
	f['fechaInicial']	= q + this.fechaInicial.toString('yyyy-MM-dd') + q;
	f['fechaFinal']		= q + this.fechaFinal.toString('yyyy-MM-dd') + q;
	return f;
};

PeriodoContable.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};