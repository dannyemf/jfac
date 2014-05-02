window.onload = function () {
	try {
	} catch (e) {
		// TODO: handle exception
	}
	self = new EditarLevantamiento();
};

function EditarLevantamiento(){
	try{
		this.contexto = new Context(); this.contexto = getContexto();
		
		this.dao = new LevantamientoDao();
		this.daoStock = new StockDao();
		this.daoParam = new ParametroDao();
		this.daoProducto = new ProductoDao();
		this.daoLocal = new LocalDao();
		
		this.listaLocales = this.contexto.getLocales();
		this.txtProducto = $Xul('txtProducto');
		this.levantamiento = new Levantamiento();					
		this.treeItems = new XulTree('treeItems', ['producto.codigo','producto.nombre', 'cantidadActual','cantidadConteo'],'producto.codigo');
			
		this.editar(window.arguments ? window.arguments[0] : null);
		
		this.inicializar();
	}catch(a){
		alert("EditarLevantamiento(): " + a);
	}		
};

EditarLevantamiento.prototype.inicializar = function () {
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardarConfirmar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	
	$Xul("btnAgregarItem").addEventListener( 'command', function(){self.productos();}, true);
	$Xul("btnAgregarTodos").addEventListener( 'command', function(){self.productosTodos();}, true);
	$Xul("btnEditarItem").addEventListener( 'command', function(){self.editarItem();}, true);
	$Xul("btnRemoverItem").addEventListener( 'command', function(){self.removerItem();}, true);
	
	$Xul('treeItems').addEventListener( 'dblclick', function(e){self.editarItem();}, true);
	
	$Xul('txtCantidad').addEventListener( 'keyup', function(e){if(e.keyCode==13){
		self.txtProducto.focus();
		self.txtProducto.select();
	}}, true);
	
	this.txtProducto.addEventListener( 'keyup', function(e) {if(e.keyCode==13){self.buscarProducto();}}, true);
};

EditarLevantamiento.prototype.inicializarBind = function () {
	$Xul('dtpFecha').val(this.levantamiento.fecha.toString('yyyy-MM-dd HH:mm:ss'));
	$Xul('txtObservacion').bind(this.levantamiento, 'observacion');
	
	var cmbLocal = $Xul('cmbLocal');
	cmbLocal.fillComboBox(this.listaLocales, "id", ["codigo", "nombre"]);
	cmbLocal.bind(this.levantamiento, 'local.id', new Local());
		
	this.treeItems.clear();
	this.treeItems.setDatos(this.levantamiento.items);
	
	if(this.levantamiento.id > 0){
		$Xul("btnGuardar").disable();
		$Xul("btnAgregarItem").disable();
		$Xul("btnAgregarTodos").disable();
		$Xul("btnEditarItem").disable();
		$Xul("btnRemoverItem").disable();
		$Xul('txtCantidad').disable();
		this.txtProducto.disable();
		$Xul('txtObservacion').disable();
		$Xul('cmbLocal').disable();
	}
};

EditarLevantamiento.prototype.verificarLocal = function () {
	if(this.levantamiento.items.length > 0){
		$Xul('cmbLocal').disable();
	}else{
		$Xul('cmbLocal').enable();
	}
};

EditarLevantamiento.prototype.editar = function (levantamiento) {
	try {
		if(levantamiento.id > 0){
			this.levantamiento = levantamiento;
		}else{
			this.levantamiento = new Levantamiento();
			this.levantamiento.usuario = this.contexto.usuario;
			this.levantamiento.local = this.contexto.local;
		}
		this.inicializarBind();
	} catch (e) {
		alert("EditarLevantamiento.editar(): " + e);
	}
};

EditarLevantamiento.prototype.productos = function () {
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/inventario/DialogoProductos.xul", "ixxi", features, this.agregarProducto);
};

EditarLevantamiento.prototype.cancelar = function () {
	window.close();
};

EditarLevantamiento.prototype.crearItem = function (producto) {
	var it = new LevantamientoItem();
	it.producto = producto;
	
	return it;
};

/**
 * ItemLevantamiento
 * @param item
 * @return true o false
 */
EditarLevantamiento.prototype.agregarItem = function (item) {
	var b = this.levantamiento.agregarItem(item);
	if(b){
		this.treeItems.add(item);
		popup("Item","El item se ha agregado al levantamiento de inventario");
		return true;
	}
	popup("Item","El item ya existe en el levantamiento de inventario");
	return false;
};

EditarLevantamiento.prototype.editarItem = function(){
	if(this.levantamiento.id == -1){
		var item = this.treeItems.getSelected();
		if(item != null){
			var features = "chrome,modal,dependent=true,dialog,centerscreen";
			window.openDialog("chrome://jfac/content/vista/inventario/EditarItemLevantamiento.xul", "editar item", features, item);
			this.treeItems.updateSelected();
		}
	}
};

EditarLevantamiento.prototype.removerItem = function () {
	var i = this.treeItems.getSelectedIndex();	
	if(i >= 0){
		var item = this.treeItems.getSelected();
		var conf = confirm("Desea eliminar este item : " + item.producto.codigo + " - " + item.producto.nombre);
		if(conf){
			var ix = this.levantamiento.removerItemByIndice(i);		
			this.treeItems.removeByIndex(i);
			this.verificarLocal();
		}
	}else{
		alert("No ha seleccionado un item");
	}
};

EditarLevantamiento.prototype.validar = function(){	
	var valid = window.validar();	
	$Xul("treeItems").removeValidationError();
	
	if(this.levantamiento.items.length == 0){
		$Xul("treeItems").addValidationError("Ingrese los items");
		valid = false;
	}
	return valid;
};

EditarLevantamiento.prototype.guardarConfirmar = function () {
	try {
		if(this.validar()){
			if(confirm('Al guardar con esta acción se afectará stock.\nDesea proceder?','Guardar y Confirmar')){
				var b = this.dao.guardar(this.levantamiento, true);
				if(b){					
					if(window.arguments){
						this.levantamiento.editada = true;
						window.close();
					}else{
						this.editar(null);
					}
				}else{
					alert("El levantamiento de inventario no se pudo guardar");
				}
			}
		}
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

EditarLevantamiento.prototype.productosTodos = function () {
	if(this.levantamiento.id == -1){
		var cantidad = 0;
		try {
			var lst = this.daoProducto.query("SELECT p.id, p.codigo, p.nombre, IFNULL((select s.existencia " +
					"from inv_stock_producto s where s.id_producto = p.id and s.id_local = " +
					this.levantamiento.local.id + "), 0) as existencia from inv_producto p;");
			this.levantamiento.items = new Array();
			for ( var i = 0; i < lst.length; i++) {
				var item = new LevantamientoItem();
				item.producto = new Producto(lst[i].id);
				item.producto.codigo = lst[i].codigo;
				item.producto.nombre = lst[i].nombre;
				item.cantidadActual = lst[i].existencia * 1;
				item.cantidadConteo = lst[i].existencia * 1;
				item.levantamiento = this.levantamiento;
				this.levantamiento.items.push(item);
			}
			
			this.treeItems.clear();
			this.treeItems.setDatos(this.levantamiento.items);
			this.verificarLocal();
		} catch (e) {
			alert("buscarProducto(): " + e);
		}
	}
};

EditarLevantamiento.prototype.buscarProducto = function(){
	if(this.levantamiento.id == -1){
		var codigo = this.txtProducto.val();
		var cantidad = $Xul('txtCantidad').val() * 1;
		if(isNaN(cantidad) || cantidad <= 0){
			cantidad = 0;
			$Xul('txtCantidad').val(cantidad);
		}
		
		try {
			//var lst = this.daoProducto.buscarPorCodigo(codigo);
			var lst = this.daoProducto.query("SELECT p.id, p.codigo, p.nombre, IFNULL((select s.existencia " +
					"from inv_stock_producto s where s.id_producto = p.id and s.id_local = " +
					this.levantamiento.local.id + "), 0) as existencia from inv_producto p where p.codigo like '" + codigo + "%';");
			
			if(lst.length > 0){
				this.agregarProducto(lst[0], cantidad);				
			}
		} catch (e) {
			alert("buscarProducto(): " + e);
		}
	}
};

EditarLevantamiento.prototype.agregarProducto = function(producto, cantidad){
	try {
		cantidad = cantidad ? cantidad : 0;
		// crear item levantamiento
		var item = new LevantamientoItem();
		var stock = self.daoStock.buscar(producto, self.levantamiento.local);		
		
		// si todo va bien
		item.producto = producto;
		item.cantidadActual = stock.existencia;		
		item.cantidadConteo = cantidad;
				
		var b = self.levantamiento.agregarItem(item);
		
		if(b){			
			self.treeItems.add(item);
			self.txtProducto.val('');
			popup("Producto agregado: " + producto.codigo, "Producto");
		}else{
			popup("No se ha agregado el producto: " + producto.codigo, "Producto");
		}
		self.txtProducto.select();
		self.verificarLocal();
		$Xul('txtCantidad').val('1');
	} catch (e) {
		alert("EditarLevantamiento.agregarProducto(): " + e);
	}
};