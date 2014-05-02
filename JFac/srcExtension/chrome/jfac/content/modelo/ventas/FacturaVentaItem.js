function FacturaVentaItem(){
	this.classname = 'FacturaVentaItem';
	this.tablename = 'ven_fac_venta_detalle';
	
	this.id= -1;
	this.cantidad = 1;
	this.costo = 0;
	this.descuento = 0;
	this.iva = 0;
	this.subtotal = 0;	
	this.tipoPrecio = "venta";	
	
	this.producto = new Producto();
	this.factura = new FacturaVenta();
};

FacturaVentaItem.prototype=new Object();

FacturaVentaItem.prototype.mapFields = function( q ) {
	var f = new Array();
	f['cantidad']	= q + this.cantidad + q;
	f['costo']		= q + this.costo + q;
	f['descuento']	= q + this.descuento + q;
	f['iva']	= q + this.iva + q;
	f['subtotal']	= q + this.subtotal + q;	
	f['tipoPrecio']		= q + this.tipoPrecio + q;
	
	return f;
};

FacturaVentaItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['producto'] = ['id_producto','id', new Producto()];
	f['factura'] = ['id_facventa','id', new FacturaVenta()];
	return f;
};

FacturaVentaItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

FacturaVentaItem.prototype.setProducto = function(producto){
	this.producto = producto;
};