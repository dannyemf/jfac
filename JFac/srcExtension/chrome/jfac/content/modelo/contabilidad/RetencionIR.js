function RetencionIRConst(){	
};

RetencionIRConst.prototype=new Object();

function RetencionIR(id){
	this.classname = 'RetencionIR';
	this.tablename = 'cont_retencion_ir';
	
	this.id = id ? id : -1;
	this.codigo = '';
	this.nombreCorto = '';
	this.descripcion = '';
	this.porcentajeRetencion = 0;
	this.plan = new Plan();
};

RetencionIR.prototype=new RetencionIRConst();

RetencionIR.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['codigo']	= 				q + this.codigo + q;	
	f['nombreCorto'] = 			q + this.nombreCorto + q;	
	f['descripcion'] = 			q + this.descripcion + q;
	f['porcentajeRetencion'] = 	q + this.porcentajeRetencion + q;
		
	return f;
};

RetencionIR.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model			
	f['plan'] = ['id_plan','id', new Plan()];	
	return f;
};

RetencionIR.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};