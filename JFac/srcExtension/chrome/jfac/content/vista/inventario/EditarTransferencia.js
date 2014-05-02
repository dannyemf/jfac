window.onload = function () {
	try {	
		self = new EditarTransferencia();
	} catch (e) {
		alert('EditarTransferencia.onload(): '+e);
	}	
};

function EditarTransferencia(){
	try{
		this.contexto = new Context();	this.contexto = getContexto();
		this.dao = new TransferenciaDao();
		this.daoParam = new ParametroDao();
		
		this.daoStock = new StockDao();
		
		this.transferencia = new Transferencia();							
		this.treeItems = new XulTree('treeItems', ['producto.codigo','cantidadEnviada','producto.nombre'],'producto.codigo');
			
		this.editar(window.arguments ? window.arguments[0] : null);
		
		this.inicializar();
	}catch(a){
		alert("EditarTransferencia(): " + a);
	}		
};

EditarTransferencia.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.enviar();}, true);
	$Xul("btnGuardarTemporal").addEventListener( 'command', function(){self.guardarTemporal();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	
	$Xul("btnAgregarItem").addEventListener( 'command', function(){self.productos();}, true);
	$Xul("btnRemomerItem").addEventListener( 'command', function(){self.removerItem();}, true);
	$Xul("btnEditarItem").addEventListener( 'command', function(){self.editarItem();}, true);
	
	$Xul('treeItems').addEventListener( 'dblclick', function(e){self.editarItem();}, true);
};

EditarTransferencia.prototype.inicializarBind = function () {	
	var listaLocalesOrigen =this.contexto.getLocales();
	var listaLocalesDestino =this.contexto.getLocales();
	
	if(this.transferencia.id == -1){
		if(listaLocalesOrigen.length > 0){
			this.transferencia.localOrigen = listaLocalesOrigen[0];
		}
		if(listaLocalesDestino.length > 0){
			this.transferencia.localDestino  = listaLocalesDestino[0];
		}
	}
		
	$Xul('cmbEstado').bind(this.transferencia, 'estado');
	$Xul('txtObservacion').bind(this.transferencia, 'observacion');	
	$Xul('txtUsuario').val(this.transferencia.usuario.nombres + " " + this.transferencia.usuario.apellidos);
	
	$Xul('dtpFechaCreacion').bind(this.transferencia, 'fechaCreacion');
	
	$Xul("cmbLocalOrigen").fillComboBox(listaLocalesOrigen, 'id', ['codigo','nombre'], '--Seleccione--', -1);
	$Xul("cmbLocalOrigen").bind(this.transferencia, 'localOrigen.id', new Local());	
	
	$Xul("cmbLocalDestino").fillComboBox(listaLocalesDestino, 'id', ['codigo','nombre'],'--Seleccione--',-1);
	$Xul("cmbLocalDestino").bind(this.transferencia, 'localDestino.id', new Local());
		
	this.treeItems.clear();
	this.treeItems.setDatos(this.transferencia.items);	
};

EditarTransferencia.prototype.editar = function (transferencia) {
	try {			
		if(transferencia){
			this.transferencia = transferencia;			
		}else{
			this.transferencia = new Transferencia();
			this.transferencia.usuario = this.contexto.usuario;
		}
		
		if(this.transferencia.estado == this.transferencia.ESTADO_ENVIADA){
			$Xul("btnGuardar").disable();
			$Xul("btnGuardarTemporal").disable();
		}
		
		this.inicializarBind();
	} catch (e) {
		alert("EditarTransferencia.editar(): " + e);
	}
};

EditarTransferencia.prototype.enviar = function () {
	try {
		if(this.validar()){
			if(this.transferencia.localOrigen.id == this.transferencia.localDestino.id){
				alert("El local de destino no puede ser igual al local de origen");				
			} else{
				var b = this.dao.guardar(this.transferencia, true);
				if(b){					
					this.editar(null);
					if(window.arguments){
						window.close();
					}
				}else{
					alert("La transferencia no se pudo guardar");
				}
			}
		}
	} catch (e) {
		alert(e);
	}
};

EditarTransferencia.prototype.guardarTemporal = function () {
	try {
		if(this.validar()){
			if(this.transferencia.localOrigen.id == this.transferencia.localDestino.id){
				alert("El local de destino no puede ser igual al local de origen");				
			} else{
				var b = this.dao.guardar(this.transferencia, false);
				if(b){					
					this.editar(null);
					if(window.arguments){
						window.close();
					}
				}else{
					alert("La transferencia no se pudo guardar");
				}
			}
		}
	} catch (e) {
		alert(e);
	}
};

EditarTransferencia.prototype.productos = function () {
	var features = "chrome,modal,dependent=true,dialog,centerscreen";	
	window.openDialog("chrome://jfac/content/vista/inventario/DialogoStockProductos.xul", "dialogo-stock-productos", features, function(stock){
		self.agregarProducto(stock.producto, 1);
		return false;
	}, this.transferencia.localOrigen);
};

EditarTransferencia.prototype.removerItem = function () {
	var i = this.treeItems.getSelectedIndex();	
	if(i >= 0){
		var item = this.treeItems.getSelected();
		var conf = confirm("Desea eliminar este item : " + item.producto.codigo + " - " + item.producto.nombre);
		if(conf){
			var ix = this.transferencia.removerItemByIndice(i);		
			this.treeItems.removeByIndex(i);
		}
	}else{
		alert("No ha seleccionado un item");
	}
};

EditarTransferencia.prototype.cancelar = function () {
	return true;
};

EditarTransferencia.prototype.agregarProducto = function(producto, cantidad){
	try {
		// crear item transferencia
		var item = new TransferenciaItem();
		var stock = this.daoStock.buscarPorProductoLocal(producto, this.contexto.local);

		// Valida stock - cantidad
		if(stock.existencia == 0){
			alert("No existe stock para este producto");
			return;
		}
		
		if(cantidad > stock.existencia){
			alert("La cantidad sobrepasa al stock existente: " + stock.existencia);
			return;
		}
		
		// si todo va bien
		item.stock = stock;
		item.producto = producto;
		item.cantidadEnviada = cantidad;
		item.costo = producto.precioVenta;
		item.descuentoPorcentaje = producto.descuento;
		item.descuento = (cantidad * item.costo * item.descuentoPorcentaje) / 100.0;
		item.subtotal = (item.costo * item.cantidadEnviada) - item.descuento;
		
		try {
			this.validarStock(item, this.contexto.local);
		} catch (e) {
			alert(e); return;
		}
		
		var b = this.transferencia.agregarItem(item);
		if(b){			
			this.treeItems.add(item);
			popup("Producto agregado: " + producto.codigo, "Producto");
		}else{
			popup("No se ha agregado el producto: " + producto.codigo, "Producto");
		}
	} catch (e) {
		alert("EditarTransferencia.agregarProducto(): " + e);
	}
};

/**
 * ItemTransferencia
 * @param item
 * @return true o false
 */
EditarTransferencia.prototype.agregarItem = function (item) {
	var b = this.transferencia.agregarItem(item);
	if(b){
		this.treeItems.add(item);
		popup("Item","El item se ha agregado a la transferencia");
		return true;
	}
	popup("Item","El item ya existe en la transferencia");
	return false;
};

EditarTransferencia.prototype.editarItem = function(){
	var item = this.treeItems.getSelected();
	if(item != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/inventario/EditarItem.xul", "editar item", features, item);
		this.treeItems.updateSelectedWithModel(item);
	}
};

EditarTransferencia.prototype.validarStock = function(item){
	var st = this.daoStock.buscarPorProductoLocal(item.producto, this.contexto.local);
	if(st != null){
		if(item.cantidadEnviada * 1 <= st.existencia * 1){
			
		}else{
			var c = item.cantidadEnviada;
			item.cantidadEnviada = st.existencia * 1;
			throw new Error("No existe stock: Artículo: " + item.producto.codigo + ", Stock: " + st.existencia+ ", Cantidad: " + c);
		}
	}else{
		throw new Error("No existe stock: Artículo: " + item.producto.codigo);
	}
};

EditarTransferencia.prototype.validar = function(){
	
	var valid = window.validar();
	
	$Xul("treeItems").removeValidationError();	
	
	if(this.transferencia.items.length == 0){
		$Xul("treeItems").addValidationError("Ingrese los items");
		valid = false;
	}
	
	return valid;
};