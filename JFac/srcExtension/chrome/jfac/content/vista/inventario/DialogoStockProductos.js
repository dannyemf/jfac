window.onload = function () {
	try {		
		self = new DialogoStockProductos();
	} catch (e) {
		alert(e);	
	}
};

function DialogoStockProductos(){
	this.contexto = new Context(); this.contexto = getContexto();
	this.dao = new StockDao();
	this.local = this.contexto.local;
	this.funccion = window.arguments[0];
	if(window.arguments[1]){
		this.local = window.arguments[1];
	}
	this.treeProductos = new XulTree('treeProductos', ['codigo', 'nombre','existencia', 'precioCompra', 'precioVenta', 'precioPromocion','isCobraIva'],'id_producto');
	this.treeProductos.setDatos(this.contexto.cacheListaStockProductos);
	this.inicializar();
};

DialogoStockProductos.prototype.inicializar = function () {
	
	$Xul("btnAceptar").addEventListener( 'command', function(){self.seleccionar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);	
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	
	$Xul("txtTexto").addEventListener( 'keyup', function(){if(event.keyCode == 13){self.buscar();}}, true);
	
	$Xul("treeProductos").addEventListener( 'dblclick', function(){self.seleccionar();}, true);
	$Xul("treeProductos").addEventListener( 'keyup', function(e){if(e.keyCode == 13)self.seleccionar();}, true);
};

DialogoStockProductos.prototype.buscar = function () {
	try {
		var texto = $Xul('txtTexto').val();	
		var lista = this.dao.buscarPorReferncia(texto, this.local);
		this.contexto.cacheListaStockProductos = lista;
		this.treeProductos.setDatos(lista);
		$Xul('txtTexto').select();
	} catch (e) {
		alert(e);
	}
};

DialogoStockProductos.prototype.seleccionar = function () {	
	try {
		var model = this.treeProductos.getSelected();
		if(model != null){
			var pro = this.dao.buscarPorProductoLocal(new Producto(model.id_producto), this.contexto.local);
			if(pro){
				var v = this.funccion(pro);
				if(v) window.close();
			}
		}
	} catch (e) {
		alert("DialogoStockProductos.seleccionar(): " + e);
	}
};