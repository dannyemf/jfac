window.onload = function () {
	try {
		self = new DialogoProductos();
	} catch (e) {
		alert(e);
	}
};

function DialogoProductos(){
	this.contexto = new Context(); this.contexto = getContexto();
	
	this.dao = new ProductoDao();	
	this.funccion = window.arguments[0];
	
	this.treeProductos = new XulTree('treeProductos', ['codigo', 'nombre', 'precioCompra', 'precioVenta', 'precioPromocion'],'id');
	this.treeProductos.setDatos(this.contexto.cacheListaProductos);
	
	this.inicializar();
};

DialogoProductos.prototype.inicializar = function () {
	
	$Xul("btnAceptar").addEventListener( 'command', function(){self.seleccionar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnNuevo").addEventListener( 'command', function(){self.nuevo();}, true);	
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
	
	$Xul("txtTexto").addEventListener( 'keyup', function(){if(event.keyCode == 13){self.buscar();}}, true);
	
	$Xul("treeProductos").addEventListener( 'dblclick', function(){self.seleccionar();}, true);
	$Xul("treeProductos").addEventListener( 'keyup', function(e){if(e.keyCode == 13)self.seleccionar();}, true);
};

DialogoProductos.prototype.buscar = function () {
	try {
		var texto = $Xul('txtTexto').val();
		var criterio = $Xul('listaCriterios').val();
		
		var lista = new Array();
		var us = null;
		
		if(criterio == 'TODOS'){
			lista = this.dao.buscarTodos();
		}else{
			if(criterio == 'CODIGO'){
				lista = this.dao.buscarPorCodigo(texto);
			}else{
				if(criterio == 'SERIE'){
					lista = this.dao.buscarPorSerie(texto);
				}
			}
		}
		this.contexto.cacheListaProductos = lista;
		this.treeProductos.setDatos(lista);
		$Xul('txtTexto').select();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

DialogoProductos.prototype.seleccionar = function () {	
	try {
		var model = this.treeProductos.getSelected();
		if(model != null){
			var v = this.funccion(model);
			if(v) window.close();
		}
	} catch (e) {
		alert("DialogoProductos.seleccionar(): " + e);
	}
};

DialogoProductos.prototype.nuevo = function () {
	var model = new Producto();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/inventario/EditarProducto.xul", "EditarProducto", features, model);
	if(model.id > 0){
		this.treeProductos.add(model);
	}
};

DialogoProductos.prototype.editar = function () {	
	var model = this.treeProductos.getSelected();
	if(model != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/inventario/EditarProducto.xul", "EditarProducto", features, model);
		this.dao.refresh(model);
		this.treeProductos.updateSelected();
	}else{
		alert("Debe seleccionar un Producto para editarlo");
	}
};