window.onload = function () {
	try {
		self = new AdministrarProductos();
	} catch (e) {
		alert(e);
	}
};

function AdministrarProductos(){
	this.dao = new ProductoDao();
	this.treeProductos = new XulTree('treeProductos', ['codigo', 'nombre', 'precioCompra', 'precioVenta', 'precioPromocion'],'id');
	this.limit = 100;
	
	this.inicializar();
};

AdministrarProductos.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', this.cmdBuscar, true);
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
	$Xul("txtTexto").addEventListener( 'keyup', this.keyBuscar, true);
	
	$Xul('txtLimit').bind(this, 'limit');
};

AdministrarProductos.prototype.keyBuscar = function (event) {
	if(event.keyCode == 13){
		self.buscar();
	}
};

AdministrarProductos.prototype.cmdBuscar = function () {self.buscar();};
AdministrarProductos.prototype.cmdEliminar = function () {self.eliminar();};
AdministrarProductos.prototype.cmdNuevo = function () {self.nuevo();};
AdministrarProductos.prototype.cmdEditar = function () {self.editar();};

AdministrarProductos.prototype.buscar = function () {
	
	var v = window.validar();
	if(!v){
		return;
	}
	
	this.treeProductos.clear();
	showWait();
	
	try {
		var texto = $Xul('txtTexto').val();
		var criterio = $Xul('listaCriterios').val();
		
		var lista = new Array();
		var us = null;
		
		if(criterio == 'TODOS'){
			lista = this.dao.buscarTodos(this.limit);
		}else{
			if(criterio == 'CODIGO'){
				lista = this.dao.buscarPorCodigo(texto);
			}else{
				if(criterio == 'SERIE'){
					lista = this.dao.buscarPorSerie(texto);
				}
			}
		}
		
		this.treeProductos.setDatos(lista);
		$Xul('txtTexto').select();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
	
	closeWait();
};

AdministrarProductos.prototype.eliminar = function () {
	var us = this.treeProductos.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Producto eliminado: " + us.nombre);
			this.treeProductos.remove(us);
		}else{
			alert("No se pudo eliminar el Producto seleccionado");
		}
	}else{
		alert("Debe seleccionar un Producto para eliminarlo");
	}
};

AdministrarProductos.prototype.nuevo = function () {
	var us = new Producto();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/inventario/EditarProducto.xul", "EditarProducto", features, us);
	if(us.id > 0){
		this.treeProductos.add(us);
	}
};

AdministrarProductos.prototype.editar = function () {	
	var us = this.treeProductos.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/inventario/EditarProducto.xul", "EditarProducto", features, us);
		this.dao.refresh(us);
		this.treeProductos.updateSelected();
	}else{
		alert("Debe seleccionar un Producto para editarlo");
	}
};
