window.onload = function () {
	self = new AdministrarProductoProveedor();
};

function AdministrarProductoProveedor(){
	this.daoProdProv = new ProductoProveedorDao();
	this.tree = new XulTree('tree', ['proveedor.razonSocial', 'producto.nombre', ['retencionIR.codigo', 'retencionIR.nombreCorto']], 'id');
	this.tree.setDatos(this.daoProdProv.buscarTodos());
	this.inicializar();
};

AdministrarProductoProveedor.prototype.inicializar = function () {
	$Xul("btnNuevo").addEventListener( 'command', function(){self.nuevo();}, true);
	$Xul("btnEliminar").addEventListener( 'command', function(){self.eliminar();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
};

AdministrarProductoProveedor.prototype.eliminar = function () {
	var productoProveedor = this.tree.getSelected();
	if(productoProveedor != null){
		var eliminado = this.daoProdProv.eliminar(productoProveedor);
		if(eliminado){
			alert("Producto - Proveedor eliminado: " + productoProveedor.producto + " - " + productoProveedor.proveedor);
			this.tree.remove(productoProveedor);
		}else{
			alert("No se pudo eliminar el Producto - Proveedor seleccionado");
		}
	}else{
		alert("Debe seleccionar un Producto - Proveedor para eliminarlo");
	}
};

AdministrarProductoProveedor.prototype.nuevo = function () {
	var productoProveedor = new ProductoProveedor();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/compra/EditarProductoProveedor.xul", "editar", features, productoProveedor);
	if(productoProveedor.id > 0){
		this.daoProdProv.refresh(productoProveedor);
		this.tree.add(productoProveedor);
	}
};

AdministrarProductoProveedor.prototype.editar = function () {	
	var productoProveedor = this.tree.getSelected();
	if(productoProveedor != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/compra/EditarProductoProveedor.xul", "editar", features, productoProveedor);
		this.daoProdProv.refresh(productoProveedor);
		this.tree.updateSelected();
	}else{
		alert("Debe seleccionar un Producto - Proveedor para editarlo");
	}
};