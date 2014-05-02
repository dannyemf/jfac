function LoteAsientosConst(){
	this.ESTADO_REGISTRADO = "Registrado";
	this.ESTADO_CONTABILIZADO = "Contabilizado";
};
LoteAsientosConst.prototype=new Object();

function LoteAsientos(id){
	this.classname = 'LoteAsientos';
	this.tablename = 'cont_lote_asientos';
	
	this.id = id ? id : -1;
	this.descripcion = '';
	this.estado = this.ESTADO_REGISTRADO;
	this.fecha = new Date();
	
	this.periodo = new PeriodoContable();
	this.local = Local();
	
	this.items = new Array();
};

LoteAsientos.prototype=new LoteAsientosConst();

LoteAsientos.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['descripcion']= q + this.descripcion + q;
	f['estado']		= q + this.estado + q;
	f['fecha']		= q + this.fecha.toString('yyyy-MM-dd HH:mm:ss') + q;
	return f;
};

LoteAsientos.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

LoteAsientos.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['local'] 	 = ['id_local','id', new Local()];		
	f['periodo'] = ['id_periodo','id', new PeriodoContable()];
	return f;
};

LoteAsientos.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['lote', 'id_lote', 'id', new AsientoContable()];
	return f;
};

LoteAsientos.prototype.agregarItem = function(asientoContable) {
	if(asientoContable.plan && asientoContable.plan.id > 0){
		this.items.push(asientoContable);
		asientoContable.lote = this;
		asientoContable.indice = this.items.length; 
		return true;
	}
	return false;
};

LoteAsientos.prototype.removerItemIndice = function(i) {
	this.items.splice(i, 1);				
	this.enumerarItems();
};

LoteAsientos.prototype.enumerarItems = function() {
	for ( var it = 0; it < this.items.length; it++) {
		this.items[it].indice = it + 1;
	}
};