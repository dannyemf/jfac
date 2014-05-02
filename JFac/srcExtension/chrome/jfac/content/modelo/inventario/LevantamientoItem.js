function LevantamientoItem(id){
	this.classname = 'LevantamientoItem';
	this.tablename = 'inv_levantamiento_detalle';
	
	this.id= id ? id : -1;
	this.levantamiento = new Levantamiento();
	this.producto = new Producto();
	this.cantidadActual = 0.0;
	this.cantidadConteo = 0.0;
};

LevantamientoItem.prototype=new Object();

LevantamientoItem.prototype.mapFields = function( q ) {
	var f = new Array();
	f['cantidadActual']	= q + this.cantidadActual + q;
	f['cantidadConteo']	= q + this.cantidadConteo + q;
	
	return f;
};

LevantamientoItem.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['levantamiento'] = ['id_levantamiento','id', new Levantamiento()];
	f['producto'] = ['id_producto','id', new Producto()];
	return f;
};

LevantamientoItem.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};