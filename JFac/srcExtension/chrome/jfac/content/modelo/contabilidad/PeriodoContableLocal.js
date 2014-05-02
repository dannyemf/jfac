function PeriodoContableLocalConst(){
	this.ESTADO_ABIERTO = 'ABIERTO';
	this.ESTADO_CERRADO = 'CERRADO';
}
PeriodoContableLocalConst.prototype = new Object();

function PeriodoContableLocal(id){
	this.classname = 'PeriodoContableLocal';
	this.tablename = 'cont_periodo_contable_local';
	
	this.id = id ? id : -1;	
	this.fechaApertura = new Date();
	this.fechaCierre = new Date();	
	this.estado= this.ESTADO_ABIERTO;
	
	this.periodo = new PeriodoContable();
	this.local = new Local();
};

PeriodoContableLocal.prototype=new PeriodoContableLocalConst();

PeriodoContableLocal.prototype.mapFields = function( q ) {
	var f = new Array();
	f['estado']			= q + this.estado + q;	
	f['fechaApertura']	= q + this.fechaApertura.toString('yyyy-MM-dd HH:mm:ss') + q;
	f['fechaCierre']	= (this.estado == this.ESTADO_ABIERTO ? 'NULL' : q + this.fechaCierre.toString('yyyy-MM-dd HH:mm:ss') + q);	
	return f;
};

PeriodoContableLocal.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model	
	f['periodo'] = ['id_periodo','id', new PeriodoContable()];
	f['local'] 	 = ['id_local','id', new Local()];			
	return f;
};

PeriodoContableLocal.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};