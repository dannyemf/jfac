function ProformaItem(){
	this.classname = 'ProformaItem';
	this.tablename = 'ven_proforma_detalle';
	
	this.id= -1;
	this.cantidad = 1;
	this.valorUnitario = 0;
	this.valorTotal = 0;
	this.tipoPrecio = "venta";
	
	this.id_producto = null;
	this.id_proforma = null;
	
	this.producto = new Producto();
	this.proforma = new Proforma();
};

ProformaItem.prototype=new Object();

ProformaItem.prototype.mapFields = function( q ) {
	var f = new Array();
	f['cantidad']		= q + this.cantidad + q;
	f['valorUnitario']	= q + this.valorUnitario + q;
	f['valorTotal']		= q + this.valorTotal + q;
	
	return f;
};

ProformaItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['producto'] = ['id_producto','id', new Producto()];
	f['proforma'] = ['id_proforma','id', new Proforma()];		
	
	return f;
};

ProformaItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

ProformaItem.prototype.setProducto = function(producto){
	this.producto = producto;
};