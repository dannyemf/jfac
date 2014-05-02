function LoteCajaConst(){
	this.ESTADO_ABIERTA = "Abierta";
	this.ESTADO_CERRADA = "Cerrada";
};
LoteCajaConst.prototype=new Object();

function LoteCaja(id){
	this.classname = 'LoteCaja';
	this.tablename = 'ven_lote_caja';
	
	this.id = id ? id : -1;	
	this.estado = this.ESTADO_ABIERTA;
	this.valorApertura = 0;
	this.valorCierre = 0;
	this.valorReal = 0;
	this.fechaApertura = new Date();
	this.fechaCierre = new Date();
	this.observacion = '';
	
	this.usuario = new Usuario();
	this.punto = new PuntoFacturacion();
	
	this.items = new Array();
};

LoteCaja.prototype=new LoteCajaConst();

LoteCaja.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['estado']	= q + this.estado + q;
	f['valorApertura']	= q + this.valorApertura + q;
	f['valorCierre']	= q + this.valorCierre + q;
	f['valorReal']	= q + this.valorReal + q;
	f['fechaApertura']	= q + this.fechaApertura.toString('yyyy-MM-dd HH:mm:ss') + q;
	f['fechaCierre']	= this.fechaCierre == null ? 'NULL' : q + this.fechaCierre.toString('yyyy-MM-dd HH:mm:ss') + q;
	f['observacion']	= q + this.observacion + q;
	
	return f;
};

LoteCaja.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['usuario'] = ['id_usuario','id', new Usuario()];
	f['punto'] = ['id_punto','id', new PuntoFacturacion()];
	return f;
};

LoteCaja.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['lote', 'id_lote', 'id', new LoteCajaItem()];
	return f;
};

LoteCaja.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

LoteCaja.prototype.agregarItems = function( item ) {
	this.items.push(item);
	item.lote = this;
};