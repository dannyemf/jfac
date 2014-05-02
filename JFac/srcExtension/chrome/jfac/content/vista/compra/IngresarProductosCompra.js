window.onload = function () {
	self = new IngresarProductosCompra();
};

function IngresarProductosCompra(){
	this.dao = new ProductoDao();
	this.frame = window.arguments[0];
	this.treeProductos = new XulTree('treeProductos', ['codigo', 'nombre', 'precioCompra', 'precioVenta', 'precioPromocion','isCobraIva'],'codigo');
		
	this.txtBuscar = $Xul('txtBuscar');
	this.txtCantidad = $Xul('txtCantidad');
	this.txtCosto = $Xul('txtCosto');
	this.txtDescuento = $Xul('txtDescuento');
	this.txtSubtotal = $Xul('txtSubtotal');
	this.txtIva = $Xul('txtIva');
	this.txtIvaP = $Xul('txtIvaP');
	
	this.prmIva = new ParametroDao().obtener('IVA').valor;
	this.txtIvaP.val(this.prmIva);

	this.inicializar();
};

IngresarProductosCompra.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener('click', function(){self.buscar();}, true);
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("txtBuscar").addEventListener('keyup', function(event){if(event.keyCode == 13){self.buscar();}}, true);
	this.treeProductos.setSelectEvent(function(){self.selPro();});
	
	$Xul("txtCantidad").addEventListener('input', function(){self.calcular();}, true);
	$Xul("txtCosto").addEventListener('input', function(){self.calcular();}, true);
	$Xul("txtDescuento").addEventListener('input', function(){self.calcular();}, true);
	
	$Xul("btnCerrar").addEventListener('command', function(){window.close();}, true);
	
	$Xul('treeProductos').addEventListener( 'dblclick', function(e){self.guardar();}, true);
};

IngresarProductosCompra.prototype.buscar = function () {
	var texto = this.txtBuscar.val();
	var lista = new Array();
	lista = this.dao.buscarPorVarios(texto);
	this.treeProductos.setDatos(lista);
	this.txtBuscar.select();
};

IngresarProductosCompra.prototype.calcular = function () {
	var cant = this.txtCantidad.val() * 1;
	var costo = this.txtCosto.val() * 1;
	var desc = this.txtDescuento.val() * 1;
	var ivap = this.txtIvaP.val() / 100.0;
	var iva = ivap * (cant * costo); 
	var sub = (cant * costo) + iva - desc;
	
	this.txtSubtotal.val(sub);
	this.txtIva.val(iva);
};

IngresarProductosCompra.prototype.selPro = function () {
	
	var producto = this.treeProductos.getSelected();
	this.txtBuscar.val(producto.codigo);
	this.txtCantidad.val(1);
	this.txtCosto.val(producto.precioCompra);
	this.txtDescuento.val(0);	
	this.txtSubtotal.val(0);
	
	if(producto.isCobraIva){
		this.txtIvaP.val(this.prmIva);
	}else{
		this.txtIvaP.val(0.0);
	}
	
	this.calcular();
};

IngresarProductosCompra.prototype.guardar = function () {
	var p = this.treeProductos.getSelected();
	if(p != null){
		var item = this.frame.crearItem(p);		
		item.cantidad = this.txtCantidad.val();
		item.subtotal = this.txtSubtotal.val();
		item.costo = this.txtCosto.val();
		item.descuento = this.txtDescuento.val();
		item.iva = this.txtIva.val();
		
		this.frame.agregarItem(item);		
	}else{
		alert('No ha seleccionado un producto');
	}
};