window.onload = function () {
	self = new IngresarProductosTransferencia();
};

function IngresarProductosTransferencia(){
	this.dao = new ProductoDao();
	this.frame = window.arguments[0];
	this.treeProductos = new XulTree('treeProductos', ['codigo', 'nombre'],'codigo');
		
	this.txtBuscar = $Xul('txtBuscar');
	this.txtCantidad = $Xul('txtCantidad');
	
	this.inicializar();
};

IngresarProductosTransferencia.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener('click', function(){self.buscar();}, true);
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("txtBuscar").addEventListener('keyup', function(event){if(event.keyCode == 13){self.buscar();}}, true);
	this.treeProductos.setSelectEvent(function(){self.selPro();});
	
	$Xul("txtCantidad").addEventListener('input', function(){self.calcular();}, true);	
	$Xul("btnCerrar").addEventListener('command', function(){window.close();}, true);	
	$Xul('treeProductos').addEventListener( 'dblclick', function(e){self.guardar();}, true);
};

IngresarProductosTransferencia.prototype.buscar = function () {
	var texto = this.txtBuscar.val();
	var lista = new Array();
	lista = this.dao.buscarPorVarios(texto);
	this.treeProductos.setDatos(lista);
	this.txtBuscar.select();
};

IngresarProductosTransferencia.prototype.selPro = function () {	
	var producto = this.treeProductos.getSelected();
	this.txtBuscar.val(producto.codigo);
	this.txtCantidad.val(1);	
	this.calcular();
};

IngresarProductosTransferencia.prototype.guardar = function () {
	var p = this.treeProductos.getSelected();
	if(p != null){
		var item = new TransferenciaItem();
		item.setProducto(p);
		item.cantidad = this.txtCantidad.val();		
		this.frame.agregarItem(item);		
	}else{
		alert('No ha seleccionado un producto');
	}
};