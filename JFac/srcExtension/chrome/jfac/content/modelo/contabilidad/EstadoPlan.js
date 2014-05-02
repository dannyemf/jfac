function EstadoPlanConst(){
	this.TIPO_SITUACION_INICIAL = "ESTADO_SITUACION_INICIAL";
	this.TIPO_CIERRE_PERIODO = "CIERRE_PERIODO";
	
	this.ESTADO_EMITIDO = 'EMITIDO';
	this.ESTADO_FINALIZADO = 'FINALIZADO';
};
EstadoPlanConst.prototype = new Object();

function EstadoPlan(id){
	this.classname = 'EstadoPlan';
	this.tablename = 'cont_estado_plan';
	
	this.id = id ? id : -1;
	this.tipo = this.TIPO_SITUACION_INICIAL;
	this.descripcion = '';	
	this.fecha = new Date();
	this.periodo = new PeriodoContable();
	this.estado = this.ESTADO_EMITIDO;
	this.local = new Local();
	
	this.totalDebe = 0;
	this.totalHaber = 0;
	
	this.items = new Array();
};

EstadoPlan.prototype = new EstadoPlanConst();

EstadoPlan.prototype.mapFields = function( q ) {
	var f = new Array();	
	f['tipo']	= 			q + this.tipo + q;
	f['estado']	= 			q + this.estado + q;
	f['descripcion'] = 		q + this.descripcion + q;
	f['fecha'] =	q + this.fecha.toString('yyyy-MM-dd HH:mm:ss') + q;
	return f;
};

EstadoPlan.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['periodo'] 	= ['id_periodo','id', new PeriodoContable()];
	f['local'] 	= ['id_local','id', new Local()];	
	return f;
};

EstadoPlan.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['estadoPlan', 'id_estado_plan', 'id', new EstadoPlanItem()];
	return f;
};

EstadoPlan.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};