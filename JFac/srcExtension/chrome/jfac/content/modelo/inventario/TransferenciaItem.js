function TransferenciaItem(id){
	this.classname = 'TransferenciaItem';
	this.tablename = 'inv_transferencia_detalle';
	
	this.id= id ? id : -1;
	this.transferencia = new Transferencia();
	this.producto = new Producto();
	this.cantidadEnviada = 0;
	this.cantidadRecibida = 0;
};

TransferenciaItem.prototype=new Object();

TransferenciaItem.prototype.mapFields = function( q ) {
	var f = new Array();
	f['cantidadEnviada']	= q + this.cantidadEnviada + q;
	f['cantidadRecibida']	= q + this.cantidadRecibida + q;
	
	return f;
};

TransferenciaItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['transferencia'] = ['id_transferencia','id', new Transferencia()];
	f['producto'] = ['id_producto','id', new Producto()];
	return f;
};

TransferenciaItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

TransferenciaItem.prototype.setProducto = function(producto){
	this.producto = producto;
};