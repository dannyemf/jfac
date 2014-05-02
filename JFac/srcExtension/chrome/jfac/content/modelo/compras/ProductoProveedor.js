function ProductoProveedor(){
	this.classname = 'ProductoProveedor';
	this.tablename = 'com_producto_proveedor';
	
	this.id= -1;
	this.proveedor= new Proveedor();
	this.producto= new Producto();
	this.retencionIR= new RetencionIR();
};

ProductoProveedor.prototype=new Object();

ProductoProveedor.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model			
	f['proveedor'] = ['id_proveedor','id', new Proveedor()];
	f['producto'] = ['id_producto','id', new Producto()];
	f['retencionIR'] = ['id_retencion_ir','id', new RetencionIR()];
	
	return f;
};

ProductoProveedor.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

ProductoProveedor.prototype.mapFields = function( q ) {
	var f = new Array();	
	return f;
};
