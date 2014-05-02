window.onload = function () {	
	try {
		self = new EditarFacturaVenta();
	} catch (e) {
		alert("EditarFacturaVenta.onload(): " + e);
	}		
};

function EditarFacturaVenta(){
	try{		
		this.contexto = new Context(); this.contexto = getContexto();
		if(this.contexto.loteCaja == null || this.contexto.loteCaja.id == -1){
			alert("Usuario no autorizado para hacer ventas");			
			window.close();			
		};
				
		this.prmIva = new ParametroDao().obtener("IVA").valor * 1;
		
		this.dao = new FacturaVentaDao();
		this.daoCliente = new ClienteDao();
		this.daoProducto = new ProductoDao();
		this.daoStock = new StockDao();
		this.daoSecuencial = new FacturaSecuencialDao();
		this.listaClientes = this.daoCliente.buscarTodos();
		this.txtProducto = $Xul('txtProducto');
		this.factura = new FacturaVenta();
		
		this.daoParam = new ParametroDao();
		this.treeItems = new XulTree('treeItems', ['producto.codigo','cantidad','producto.nombre', 'costo','descuento','subtotal']);
	    
		this.editar(window.arguments ? window.arguments[0] : null);
	}catch(a){
		alert("EditarFacturaVenta(): " + a,"Error");
	}	
	this.inicializar();
};

EditarFacturaVenta.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){ self.guardar();}, true);
	$Xul("btnGuardarTemporal").addEventListener( 'command', function(){ self.guardarTemporal();}, true);
	
	$Xul("btnCancelar").addEventListener( 'command',function(){self.cancelar();}, true);
	$Xul("btnProductos").addEventListener( 'click', function(){self.productos();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);	
	
	$Xul("tabFac").addEventListener( 'select', function(e){if(this.selectedIndex == 1){self.vistaPrevia();}},true);
	
	$Xul('txtCantidad').addEventListener( 'keyup', function(e){if(e.keyCode==13){
		self.txtProducto.focus();
		self.txtProducto.select();
	}}, true);
	
	this.txtProducto.addEventListener( 'keyup', this.cmdBuscarProducto, true);
	$Xul('treeItems').addEventListener( 'dblclick', function(e){self.editarItem(e);}, true);
	
	$Xul('btnEditarItem').addEventListener( 'command', function(e){self.editarItem(e);}, true);
	$Xul('btnEliminarItem').addEventListener( 'command', function(e){self.eliminarItem(e);}, true);
	
	$Xul('txtSobrecargo').addEventListener( 'change', function(e){self.calcular();}, false);	
	
	this.inicializarBind();
};

EditarFacturaVenta.prototype.inicializarBind = function () {
	$Xul('dtpFechaEmision').val(this.factura.fechaEmision.toString('dd/MM/yyyy HH:mm:ss'));
	
	$Xul('txtNumeroFactura').bind(this.factura, 'numeroFactura');	
	$Xul('txtSubDoce').bind(this.factura, 'subDoce');
	$Xul('txtSubCero').bind(this.factura, 'subCero');
	$Xul('txtSubtotal').bind(this.factura, 'subtotal');
	$Xul('txtDescuento').bind(this.factura, 'descuento');
	$Xul('txtIva').bind(this.factura, 'iva');
	$Xul('txtIvaP').bind(this.factura, 'ivaPorcentaje');
	$Xul('txtSobrecargo').bind(this.factura, 'sobrecargo');
	$Xul('txtTotal').bind(this.factura, 'total');	
	$Xul("pupupCliente").cliente = this.factura.cliente;
	
	if(this.factura.id == -1){		
		$Xul("btnGuardarTemporal").enable();
		$Xul("btnImprimir").hide();
		$Xul("btnProductos").disable();
		$Xul('btnEditarItem').enable();
		$Xul('btnEliminarItem').enable();
		$Xul('txtSobrecargo').enable();
		$Xul("pupupCliente").disabled = false;
	}else{
		$Xul("btnGuardarTemporal").disable();
		$Xul("btnImprimir").show();
		$Xul("btnProductos").disable();
		$Xul('btnEditarItem').disable();
		$Xul('btnEliminarItem').disable();
		$Xul('txtSobrecargo').disable();
		$Xul("pupupCliente").disabled = true;
	}
	
	if(this.factura.estado == this.factura.ESTADO_REGISTRADA){
		$Xul("btnGuardar").enable();
	}else{
		$Xul("btnGuardar").disable();
	}
	
};

EditarFacturaVenta.prototype.cmdBuscarCliente = function (event) {	
	if(event.keyCode == 13){
		self.buscarCliente();
	}	
};

EditarFacturaVenta.prototype.cmdBuscarProducto = function (event) {
	if(event.keyCode == 13){self.buscarProducto();}
};

EditarFacturaVenta.prototype.editar = function (factura) {
	try {
		if(factura){
			this.factura = factura;
		}else{
			this.factura = new FacturaVenta();	
			this.factura.lote = this.contexto.loteCaja;
			this.factura.usuario = this.contexto.usuario;
			this.factura.local = this.contexto.local;
			this.factura.punto = this.contexto.puntoFacturacion;		
			this.factura.periodo = new PeriodoContableDao().obtenerPeriodoActivo(this.factura.local);
			
			var sec = this.daoSecuencial.generarSecuencial(this.factura);		
			this.factura.numeroFactura = sec.numero;
			this.factura.autorizacionSri = sec.autorizacion;
			this.factura.fechaInicio = sec.autorizacion.fechaInicio;
			this.factura.fechaCaducidad =  sec.autorizacion.fechaFin;
				
			this.factura.ivaPorcentaje = this.prmIva;
			if(this.factura.periodo == null){
				throw new Error("No existe un periodo contable activo...");
			}
		}
		
		this.inicializarBind();
		this.treeItems.clear();
		this.treeItems.setDatos(this.factura.items);
	} catch (e) {
		alertTitle(e.message, "Error");
		window.close();
	}
};

EditarFacturaVenta.prototype.crearItemCobro = function () {
	return new CobroItem();
};

EditarFacturaVenta.prototype.crearCheque = function () {
	var ch = new Cheque();
	ch.cliente = self.factura.cliente;
	
	return ch;
};

EditarFacturaVenta.prototype.crearCuota = function (item) {
	var c = new Cuota();
	c.cobroItem = item;
	item.cuotas.push(c);
	return c;
};

EditarFacturaVenta.prototype.guardar = function () {
	try {
		var v = this.validar();
		if(v){
			var cobro = new Cobro();
			cobro.venta = this.factura;
			
			var model = {
					factura : this.factura,
					cobro : cobro,
					guardar: false,
					control: this
			};
			
			var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
			window.openDialog("chrome://jfac/content/vista/venta/IngresarPagosVenta.xul", "pagar-venta", features, model);
			
			if(model.guardar){
				var b = this.dao.guardar(this.factura, cobro);
				if(b){				
					var x = confirm("La factura se ha guardado correctamente; desea imprimirla?");
					if(x){														
						this.imprimir();
					}
					
					if(window.arguments){
						window.close();
					}else{
						this.editar(null);
					}							
				}else{
					alert("La factura no se pudo guardar");
				}
			}		
		}
	} catch (e) {
		alert(e);
	}
};

EditarFacturaVenta.prototype.guardarTemporal = function () {
	var v = this.validar();
	if(v){
		if(confirm('Desea guardar esta factura en estado pendiente?\nNota: No se ingresará los pagos, pero si se descontará de stock.')){
			try {
				if(this.dao.guardar(this.factura, null)){				
					var x = confirm("La factura se ha guardado correctamente; desea imprimirla?");
					if(x){
						this.imprimir();
					}
					if(window.arguments){
						window.close();
					}else{
						this.editar(null);
					}
				}else{
					alert("La factura no se pudo guardar");
				}
			} catch (e) {
				alert(e);
			}	
		}
	}
};

EditarFacturaVenta.prototype.productos = function () {
	if(this.factura.id == -1){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/inventario/DialogoStockProductos.xul", "dialogo-stock-productos", features, function(stock){
			self.agregarProducto(stock.producto, 1);
			return false;
		});
	}
};

EditarFacturaVenta.prototype.editarItem = function () {
	var item = this.treeItems.getSelected();
	if(item != null && this.factura.id == -1){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/venta/EditarItemFacVenta.xul", "editar-item-venta", features, item);		
		try {
			this.validarStock(item);
		} catch (e) {
			alert(e);
		}
		
		this.treeItems.updateSelected();
		this.calcular();
	}
};

EditarFacturaVenta.prototype.eliminarItem = function () {
	if(this.factura.id == -1){
		var indice = this.treeItems.getSelectedIndex();
		if(indice >= 0){
			this.factura.removerItemByIndice(indice);		
			this.treeItems.removeByIndex(indice);
		}
	}
};

EditarFacturaVenta.prototype.cancelar = function () {window.close();};

EditarFacturaVenta.prototype.vistaPrevia = function () {	
	this.factura.cliente = $Xul("pupupCliente").cliente;
	
	window.model = {			
			empresa : this.contexto.nombreEmpresa,
			ruc : this.contexto.rucEmpresa,
			direccion : this.contexto.local.direccion,
			propietario : this.contexto.nombrePropietario,
			telefono : this.contexto.local.telefono,
			contribuyente : this.contexto.contribuyente,
			contexto : this.contexto,
			factura : this.factura,
			cliente : this.factura.cliente
	};

	var p = $Xul("print");
	p.attr("src","");
	p.attr("src","chrome://jfac/content/vista/print/print-fac-venta.html");
};

EditarFacturaVenta.prototype.removerTabImprimir = function(){
	$Xul('tabContentImp').remove();
	$Xul('tabHeadImp').remove();
};

EditarFacturaVenta.prototype.imprimir = function () {	
	$Xul("tabFac").selectedIndex = 1;	
	this.vistaPrevia();
	var venta = this.factura;
	var b = imprimir('print', 'facventa','FacturaVenta');
	if(b) { //imprime correctamente
	    venta.isImpresa = true;
	    this.dao.updateField(venta, 'isImpresa');
	}
};

EditarFacturaVenta.prototype.calcular = function(){
	try {
		var subDoce = 0; //subtotal de productos con iva, sin tomar en cuenta el iva
		var subCero = 0; //subtotal de productos sin iva		
		var desc = 0;    //descuento
		var sub = 0;     //valor total de lo anterior, sin incluir impuestos
		var iva = 0;     //iva
		var ivaP = this.factura.ivaPorcentaje;
		
		$Xul("txtIvaP").val(ivaP);		
		
		var sobre = $Xul('txtSobrecargo').val() * 1;
		if(isNaN(sobre)){
			sobre = 0;
		}
		
		for ( var i = 0; i < this.factura.items.length; i++) {
			var it = this.factura.items[i];
			
			if (it.producto.isCobraIva == 1 || it.producto.isCobraIva == true){
				subDoce += (it.costo * 1) * (it.cantidad * 1);
				desc += (it.descuento * 1);
			} else {
				subCero += (it.costo * 1) * (it.cantidad * 1);
				desc += (it.descuento * 1);
			}
		}
		
		iva = (subDoce * ivaP / 100.0).round(2);
		sub = (subDoce + subCero - desc).round(2);
		
		this.factura.subDoce = subDoce;
		this.factura.subCero = subCero;
		
		$Xul('txtSubDoce').val(subDoce);
		$Xul('txtSubCero').val(subCero);
		$Xul('txtSubtotal').val(sub);
		$Xul('txtDescuento').val(desc);
		$Xul('txtIva').val(iva);
		
		var total = (sub + iva + sobre).round(2);
		
		$Xul('txtTotal').val(total);
		
	} catch (e) {
		// TODO: handle exception
		alert("EditarFacturaVenta.calcular(): " + e);
	}
};

EditarFacturaVenta.prototype.validar = function(){
	var valid = window.validar();
	
	$Xul("treeItems").removeValidationError();
	if(this.factura.items.length == 0){
		$Xul("treeItems").addValidationError("Ingrese los items");
		valid = false;
	}
	
	var cli = $Xul("pupupCliente").cliente;
	if(cli != null && cli.id > 0){
		this.factura.cliente = cli;	
		$Xul("pupupCliente").mensaje = "";
	}else{
		$Xul("pupupCliente").mensaje = "Seleccione el cliente";
		valid = false;
	}	
	return valid;
};

EditarFacturaVenta.prototype.validarStock = function(item){
	var st = this.daoStock.buscarPorProductoLocal(item.producto, this.contexto.local);
	if(st != null){
		if(item.cantidad * 1 <= st.existencia * 1){
			
		}else{
			var c = item.cantidad;
			item.cantidad = st.existencia * 1;
			item.iva = item.producto.isCobraIva ? (item.costo * item.cantidad * item.factura.ivaPorcentaje)/100.0 : 0.0;
			item.descuento = (item.descuentoPorcentaje * item.costo * item.cantidad)/100.0;
			item.subtotal = (item.costo * item.cantidad) - item.descuento;
			throw new Error("No existe stock: Artículo: " + item.producto.codigo + ", Stock: " + st.existencia+ ", Cantidad: " + c);
		}
	}else{
		throw new Error("No existe stock: Artículo: " + item.producto.codigo);
	}
};

EditarFacturaVenta.prototype.agregarProducto = function(producto, cantidad){
	try {
		// crear item fac
		var item = new FacturaVentaItem();
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
		item.producto = producto;
		item.cantidad = cantidad;
		item.costo = producto.precioVenta;
		item.iva = producto.isCobraIva ? (item.costo * item.cantidad * this.prmIva) / 100.0 : 0;		
		item.descuentoPorcentaje = producto.descuento;
		item.descuento = (cantidad * item.costo * item.descuentoPorcentaje) / 100.0;
		
		item.subtotal = (item.costo * item.cantidad) - item.descuento;
		
		try {
			this.validarStock(item, this.contexto.local);
		} catch (e) {
			alert(e); return;
		}
		
		var b = this.factura.agregarItem(item);
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
		alert("EditarFacturaVenta.agregarProducto(): " + e);
	}
};

EditarFacturaVenta.prototype.buscarProducto = function(){
	if(this.factura.id == -1){
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
	}
};