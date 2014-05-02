function Kardex(id){
	this.classname = 'Kardex';
	this.tablename = 'inv_kardex';
	
	this.id = id ? id : -1;
	this.fecha=new Date();
	this.cantidadActual=0.0;
	this.cantidadEntra= 0.0;
	this.cantidadSale= 0.0;
	this.descripcion='';
	
	this.producto = new Producto();
	this.local = new Local();	
};

Kardex.prototype=new Object();

Kardex.prototype.mapFields = function( q ) {
	var f = new Array();	
	f['fecha']	= q+this.fecha.toString("yyyy-MM-dd HH:mm:ss")+q;
	f['cantidadActual']	= q+this.cantidadActual+q;
	f['cantidadEntra']	= q+this.cantidadEntra+q;
	f['cantidadSale']	= q+this.cantidadSale+q;
	f['descripcion']	= q+this.descripcion+q;
	return f;
};

Kardex.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Kardex.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['local'] 	 = ['id_local','id', new Local()];
	f['producto'] = ['id_producto','id', new Producto()];			
	return f;
};

