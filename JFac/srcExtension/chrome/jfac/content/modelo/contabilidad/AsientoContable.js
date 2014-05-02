function AsientoContableConst(){
	this.TIPO_DEBE = "Debe";
	this.TIPO_HABER = "Haber";
};
AsientoContableConst.prototype=new Object();

function AsientoContable(id){
	this.classname = 'AsientoContable';
	this.tablename = 'cont_asiento';
	
	this.id = id ? id : -1;
	this.documento = '';
	this.origen = '';
	this.descripcion = '';
	this.tipo = this.TIPO_DEBE;
	this.monto = 0.0;
	this.fecha = new Date();
	
	this.lote = new LoteAsientos();
	this.plan = new Plan();
	this.periodo = new PeriodoContable();
	this.local = Local();
};

AsientoContable.prototype=new AsientoContableConst();

AsientoContable.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['documento']	= q + this.documento + q;
	f['origen']		= q + this.origen + q;
	f['descripcion']= q + this.descripcion + q;
	f['tipo']		= q + this.tipo + q;
	f['monto']		= q + this.monto + q;
	f['fecha']		= q + this.fecha.toString('yyyy-MM-dd HH:mm:ss')+ q;	
	return f;
};

AsientoContable.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['lote'] 	 = ['id_lote','id', new LoteAsientos()];		
	f['periodo'] = ['id_periodo','id', new PeriodoContable()];
	f['plan']    = ['id_plan','id', new Plan()];	
	f['local']   = ['id_local','id', new Local()];
	return f;
};

AsientoContable.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};