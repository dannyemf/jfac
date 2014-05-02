function StockProducto(){
	this.classname = 'StockProducto';
	this.tablename = 'inv_stock_producto';

	this.minimo=0.0;
	this.maximo=0.0;
	this.existencia= 0.0;
	
	this.producto = new Producto();
	this.local = new Local();	
};

StockProducto.prototype=new Object();

StockProducto.prototype.mapFields = function( q ) {
	var f = new Array();	
	f['existencia']	= q+this.existencia+q;
	f['minimo']	= q+this.minimo+q;
	f['maximo']	= q+this.maximo+q;
	return f;
};

StockProducto.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	return f;
};

StockProducto.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['producto'] = ['id_producto','id', new Producto()];
	f['local'] 	 = ['id_local','id', new Local()];		
	return f;
};

