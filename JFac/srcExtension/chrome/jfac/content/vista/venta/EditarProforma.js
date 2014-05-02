window.onload = function () {
	try {		
		self = new EditarProforma();
	} catch (e) {
		// TODO: handle exception
	}		
};

function EditarProforma(){
	try{
		this.contexto = new Context();	this.contexto = getContexto();
		if(this.contexto.loteCaja == null || this.contexto.loteCaja.id == -1){
			alert("Usuario no autorizado para hacer proformas");			
			window.close();			
		};
		
		this.dao = new ProformaDao();
		this.daoCliente = new ClienteDao();
		this.daoProducto = new ProductoDao();
		this.daoStock = new StockDao();
		this.daoParam = new ParametroDao();
		this.listaClientes = this.daoCliente.buscarTodos();
		this.txtProducto = $Xul('txtProducto');
		this.proforma = new Proforma();
		this.validezdias = this.daoParam.obtener("PRO_VALIDEZ").valor*1;  
		this.treeItems = new XulTree('treeItems', ['producto.codigo','cantidad','producto.nombre','valorUnitario','valorTotal']);
		
		this.inicializar();
		
		this.editar(window.arguments ? window.arguments[0] : null);
	}catch(a){
		alert("EditarProforma(): " + a,"Error");
	}	
	
};

EditarProforma.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
	$Xul("btnProductos").addEventListener( 'command', this.cmdProductos, true);
	$Xul("tabFac").addEventListener( 'select', function(e){if(this.selectedIndex == 1){self.vistaPrevia();}},true);	
	$Xul('txtCantidad').addEventListener( 'keyup', function(e){if(e.keyCode==13){self.txtProducto.focus(); self.txtProducto.select();}}, true);
	
	this.txtProducto.addEventListener( 'keyup', this.cmdBuscarProducto, true);
	$Xul('treeItems').addEventListener( 'dblclick', function(e){self.editarItem();}, true);		
};

EditarProforma.prototype.inicializarBind = function () {
	$Xul('dtpFecha').bind(this.proforma, 'fecha');
	$Xul('dtpFechaVencimiento').bind(this.proforma, 'fechaVencimiento');
	$Xul('txtSubtotal').bind(this.proforma, 'subtotal');
	$Xul('txtIva').bind(this.proforma, 'iva');
	$Xul('txtTotal').bind(this.proforma, 'total');
};

EditarProforma.prototype.cmdGuardar = function () {self.guardar();};
EditarProforma.prototype.cmdCancelar = function () {window.close();};
EditarProforma.prototype.cmdProductos = function () {self.productos();};

EditarProforma.prototype.cmdBuscarCliente = function (event) {
	if(event.keyCode == 13){
		self.buscarCliente();
	}	
};

EditarProforma.prototype.cmdBuscarProducto = function (event) {
	if(event.keyCode == 13){
		self.buscarProducto();
	}
};

EditarProforma.prototype.editar = function (prof) {
	
	if(prof != null){
		$Xul("btnGuardar").disable();
		this.proforma = prof;
		$Xul("pupupCliente").cliente = this.proforma.cliente;
	}else{
		this.proforma = new Proforma();
		this.proforma.usuario = this.contexto.usuario;
		this.proforma.local = this.contexto.local;
		this.proforma.fechaVencimiento = new Date().addDays(this.validezdias);
	}
	
	this.inicializarBind();
	this.treeItems.clear();	
	this.treeItems.setDatos(this.proforma.items);
};

EditarProforma.prototype.guardar = function () {
	var v = this.validar();
	
	if(v){
		var b = this.dao.guardar(this.proforma);
		if(b){
			var x = confirm("La proforma se ha guardado correctamente; desea imprimirla?");
			if(x){
				this.imprimir();
			}
			this.editar();
		}else{
			alert("La proforma no se pudo guardar");
		}
	}
};
EditarProforma.prototype.productos = function () {
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/inventario/DialogoProductos.xul", "ixxi", features, function (producto) {
		self.agregarProducto (producto, 1);
		return false;
	});
};

EditarProforma.prototype.editarItem = function () {
	var item = this.treeItems.getSelected();
	if(item != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/venta/EditarItemProforma.xul", "ixxi", features, item);
		this.treeItems.updateSelected();
		this.calcular();
	}
};

EditarProforma.prototype.cancelar = function () {return true;};

EditarProforma.prototype.vistaPrevia = function () {
		
	window.model = {			
			empresa : this.contexto.nombreEmpresa,
			ruc : this.contexto.rucEmpresa,
			direccion : this.contexto.local.direccion,
			propietario : this.contexto.nombrePropietario,
			telefono : this.contexto.local.telefono,
			contribuyente : this.contexto.contribuyente,
			dias : this.daoParam.obtener(new ParametroConst().PRO_VALIDEZ).valor,
			contexto : this.contexto
	};
	
	this.proforma.cliente = $Xul("pupupCliente").cliente;
	window.proformaImprimir = this.proforma;
	var p = $Xul("print");
	p.attr("src","");
	p.attr("src","chrome://jfac/content/vista/print/print-proforma.html");
};

EditarProforma.prototype.imprimir = function () {
	$Xul("tabFac").selectedIndex = 1;
	this.vistaPrevia();	
	imprimir('print','facventa','Proforma');
};

EditarProforma.prototype.calcular = function(){
	try {
		var sub = 0;
		var iva = 0;
		
		for (var i = 0; i < this.proforma.items.length; i++) {
			var it = this.proforma.items[i];
			sub += ((it.cantidad * 1) * (it.valorUnitario * 1));
			iva += (it.cantidad * it.valorUnitario) * 0.12;
		}		
		
		sub = sub.round(2);
		iva = iva.round(2);
		var total = sub + iva;
		total = total.round(2);
		
		$Xul('txtSubtotal').val(sub);
		$Xul('txtIva').val(iva);
		$Xul('txtTotal').val(total);
		
	} catch (e) {
		// TODO: handle exception
		alert("EditarProforma.calcular(): " + e);
	}
};

EditarProforma.prototype.validar = function(){
	var valid = window.validar();
	
	$Xul("treeItems").removeValidationError();
	if(this.proforma.items.length == 0){
		$Xul("treeItems").addValidationError("Ingrese los items");
		valid = false;
	}
	
	var cli = $Xul("pupupCliente").cliente;
	if(cli != null){
		this.proforma.cliente = cli;	
		$Xul("pupupCliente").mensaje = "";
	}else{
		$Xul("pupupCliente").mensaje = "Seleccione el cliente";
		valid = false;
	}	
	return valid;
};

EditarProforma.prototype.buscarProducto = function(){	
	var codigo = this.txtProducto.val();
	var cantidad = $Xul('txtCantidad').val() * 1;
	if(isNaN(cantidad) || cantidad <= 0){
		cantidad = 1;
		$Xul('txtCantidad').val(cantidad);
	}
	
	try {
		var lst = this.daoProducto.buscarPorCodigo(codigo);
		if(lst.length > 0){
			this.agregarProducto(lst[0], cantidad);
		}
	} catch (e) {
		alert("buscarProducto(): " + e);
	}
};

EditarProforma.prototype.agregarProducto = function(producto, cantidad){
	try {
		// crear item proforma
		var item = new ProformaItem();
		var stock = this.daoStock.buscar(producto, this.contexto.local);

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
		item.setProducto(producto);
		item.cantidad = cantidad;
		item.valorUnitario = producto.precioVenta;
		item.valorTotal = (item.valorUnitario * item.cantidad);
		var b = this.proforma.agregarItem(item);
		if(b){			
			this.treeItems.add(item);
			this.txtProducto.val('');
			this.calcular();
			popup("Producto agregado: " + producto.codigo, "Producto");
		}else{
			popup("No se ha agregado el producto: " + producto.codigo, "Producto");
		}
		this.txtProducto.select();
		$Xul('txtCantidad').val('1');
	} catch (e) {
		alert("EditarProforma.agregarProducto(): " + e);
	}
};