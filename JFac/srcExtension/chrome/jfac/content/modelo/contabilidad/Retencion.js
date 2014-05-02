function RetencionConst(){
	this.TIPO_RETENCION_COMPRA = "RETENCION_COMPRA";
	this.TIPO_RETENCION_VENTA = "RETENCION_VENTA";
};

RetencionConst.prototype=new Object();

function Retencion(id){
	this.classname = 'Retencion';
	this.tablename = 'cont_retencion';
	
	this.id = id ? id : -1;
	this.numero = '';
	
	this.numeroAutProv = 0;
	this.total = 0.0;
	this.totalRetencionIva = 0.0;
	this.totalRetencionIr = 0.0;	
	this.isImpresa = false;
	this.tipoDocumento = Constante.TIPO_DOC_COM_RET;
	this.tipoRetencion = this.TIPO_RETENCION_COMPRA;
	
	this.fechaRegistro = new Date(); //fechaRegistro
	this.fechaEmision = new Date();
	this.fechaInicio = new Date(); // se agrega
	this.fechaCaducidad = new Date();
	
	this.local = new Local();
	this.periodo = new PeriodoContable();
	this.proveedor = new Proveedor();
	this.usuario = new Usuario();
	this.punto = new PuntoFacturacion();
	this.autorizacionSri = new AutorizacionSri();
	this.lote = new LoteCaja();
	
	this.items = new Array();	
};

Retencion.prototype=new RetencionConst();

Retencion.prototype.mapFields = function( q ) {
	var f = new Array();			
	f['numero']		= q + this.numero + q;		
	f['numeroAutProv']		= q + this.numeroAutProv + q;
	f['isImpresa']= q + (this.isImpresa ? 1 : 0)  + q;
	f['tipoDocumento']		= q + this.tipoDocumento + q;
	f['tipoRetencion']		= q + this.tipoRetencion + q;
	f['total']		= q + this.total + q;
	f['totalRetencionIva']		= q + this.totalRetencionIva + q;
	f['totalRetencionIr']		= q + this.totalRetencionIr + q;
	
	f['fechaRegistro']	= q + this.fechaRegistro.toString('yyyy-MM-dd HH:mm:ss') + q;
	f['fechaEmision']	= q + this.fechaEmision.toString('yyyy-MM-dd') + q;
	f['fechaInicio']	= q + this.fechaInicio.toString('yyyy-MM-dd') + q;	// se agrega
	f['fechaCaducidad']	= q + this.fechaCaducidad.toString('yyyy-MM-dd') + q;	
	return f;
};

Retencion.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['local'] 		= ['id_local',		'id', new Local()];
	f['periodo'] 	= ['id_periodo',	'id', new PeriodoContable()];
	f['proveedor']	= ['id_proveedor',	'id', new Proveedor()];
	f['usuario']	= ['id_usuario',	'id', new Usuario()];
	f['punto']		= ['id_punto',		'id', new PuntoFacturacion()];
	f['autorizacionSri'] = ['id_aut_sri','id', new AutorizacionSri()];
	f['lote'] = ['id_lote','id', new LoteCaja()];
	return f;
};

Retencion.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['retencion', 'id_retencion', 'id', new RetencionItem()];
	return f;
};

Retencion.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Retencion.prototype.crearItem = function (){
	return new RetencionItem();
};

/**
 * Agrega un item a la retencion
 * @param {RetencionItem} item
 * @return
 */
Retencion.prototype.add = function (item){
	this.items.push(item);
	item.retencion = this;
};