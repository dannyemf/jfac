function FacturaCompraItem(id){
	this.classname = 'FacturaCompraItem';
	this.tablename = 'com_fac_compra_detalle';
	
	this.id= id ? id : -1;
	this.cantidad = 1;
	this.costo = 0;
	this.descuento = 0;
	this.iva = 0;
	this.subtotal = 0;
	
	this.id_producto = null;
	this.id_faccompra = null;
	
	this.producto = new Producto();
	this.factura = new FacturaCompra();
};

FacturaCompraItem.prototype=new Object();

FacturaCompraItem.prototype.mapFields = function( q ) {
	var f = new Array();
	f['cantidad']	= q+this.cantidad+q;
	f['costo']	= q+this.costo+q;
	f['descuento']	= q+this.descuento+q;
	f['iva']	= q+this.iva+q;
	f['subtotal']	= q+this.subtotal+q;
	
	return f;
};

FacturaCompraItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

FacturaCompraItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['producto'] 	 = ['id_producto','id', new Producto()];		
	f['factura'] = ['id_faccompra','id', new FacturaCompra()];
	return f;
};

FacturaCompraItem.prototype.setProducto = function(producto){
	this.producto = producto;
};

