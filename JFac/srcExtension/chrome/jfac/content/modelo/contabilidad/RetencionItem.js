function RetencionItemConst(){
	this.TIPO_DEBE = "Debe";
	this.TIPO_HABER = "Haber";
}
RetencionItemConst.prototype=new Object();

function RetencionItem(id){
	this.classname = 'RetencionItem';
	this.tablename = 'cont_retencion_detalle';
	
	this.id = id ? id : -1;
	this.impuesto = ''; //codigo
	this.codigoRetencion = '';
	this.descripcion = '';
	this.ejercicioFiscal = '';
	
	this.base0 = 0.0;
	this.baseGrav = 0.0;
	this.baseNoGrav = 0.0;
	
	this.baseImponible = 0.0;
	this.porcentaje = 0.0;
	this.valor = 0.0;
		
	this.retencion = new Retencion();	
};

RetencionItem.prototype=new RetencionItemConst();

RetencionItem.prototype.mapFields = function( q ) {
	var f = new Array();
	
	f['impuesto']	= q+this.impuesto+q;
	f['codigoRetencion']	= q+this.codigoRetencion+q;
	f['descripcion']	= q+this.descripcion+q;
	f['ejercicioFiscal']	= q+this.ejercicioFiscal+q;
	
	f['base0']	= q+this.base0+q;
	f['baseGrav']	= q+this.baseGrav+q;
	f['baseNoGrav']	= q+this.baseNoGrav+q;
	
	f['baseImponible']	= q+this.baseImponible+q;
	f['porcentaje']	= q+this.porcentaje+q;
	f['valor']	= q+this.valor+q;
	
	return f;
};

RetencionItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

RetencionItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['retencion'] 	= ['id_retencion','id', new Retencion()];
	return f;
};
