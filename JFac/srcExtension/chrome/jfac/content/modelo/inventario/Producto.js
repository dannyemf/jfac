function ProductoConst(){
	this.TIPO_BIEN = 'BIEN';
	this.TIPO_SERVICIO = 'SERVICIO';
}

ProductoConst.prototype = new Object();

function Producto(id){
	this.classname = 'Producto';
	this.tablename = 'inv_producto';
	
	this.id= id ? id : -1;
	this.codigo= '';
	this.nombre= '';	
	
	this.precioCompra=0.0;
	this.precioVenta=0.0;
	this.precioPromocion=0.0;
	this.precioMayorista=0.0;
	
	this.stockMinimo=0;
	this.stockMaximo=0;	
	
	this.utilidad=0.0; // porcentaje
	this.descuento=0.0; // porcentaje
	
	this.isCobraIva=false;
	this.isFraccionable=false;
	this.isPesable=false;
	this.isAplicarSerie=false;
	
	this.unidadesCaja = 0;
	
	this.id_marca = null;
	this.id_linea = null;
	this.marca = new Marca();
	this.linea = new Linea();
	
	this.tipo = this.TIPO_BIEN;
};

Producto.prototype=new ProductoConst();

Producto.prototype.mapFields = function( q ) {
	var f = new Array();
	f['codigo']	= 			q+this.codigo+q;
	f['nombre']	= 			q+this.nombre+q;
	f['tipo']	= 			q+this.tipo+q;
	
	f['precioCompra'] = 	q+this.precioCompra+q;
	f['precioVenta'] =		q+this.precioVenta+q;
	f['precioPromocion'] = 	q+this.precioPromocion+q;
	f['precioMayorista'] =	q+this.precioMayorista+q;
	
	f['stockMinimo'] =	 	q+this.stockMinimo+q;
	f['stockMaximo'] = 		q+this.stockMaximo+q;
	f['utilidad'] = 		q+this.utilidad+q;
	f['descuento'] = 		q+this.descuento+q;
	f['isFraccionable']	= 	q+(this.isFraccionable ? 1 :0 )+q;
	f['isPesable'] = 		q+(this.isPesable ? 1 :0 )+q;
	f['isAplicarSerie']	= 	q+(this.isAplicarSerie ? 1 :0 )+q;
	f['isCobraIva']	= 		q+(this.isCobraIva ? 1 :0 )+q;
	
	f['unidadesCaja'] = 	q+this.unidadesCaja+q;
	
	return f;
};

Producto.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['marca'] 	= ['id_marca','id', new Marca()];		
	f['linea'] 	= ['id_linea','id', new Linea()];	
	return f;
};

Producto.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};