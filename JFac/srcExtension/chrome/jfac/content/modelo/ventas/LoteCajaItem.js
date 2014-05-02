function LoteCajaItemConst(){
	this.TIPO_INGRESO = 'INGRESO';
	this.TIPO_SALIDA = 'SALIDA';
}
LoteCajaItemConst.prototype=new Object();

function LoteCajaItem(id){
	this.classname = 'LoteCajaItem';
	this.tablename = 'ven_lote_caja_item';
	
	this.id = id ? id : -1;	
	this.tipo = this.TIPO_INGRESO;
	this.valor = 0;
	this.documento = 0;
	this.descripcion = '';
	
	this.lote = new LoteCaja();
};

LoteCajaItem.prototype=new LoteCajaItemConst();

LoteCajaItem.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['tipo']		= q + this.tipo + q;
	f['valor']		= q + this.valor + q;
	f['documento']	= q + this.documento + q;
	f['descripcion']	= q + this.descripcion + q;
	f['id_lote']	= q + (this.lote ? this.lote.id : null) + q;
	
	return f;
};

LoteCajaItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};