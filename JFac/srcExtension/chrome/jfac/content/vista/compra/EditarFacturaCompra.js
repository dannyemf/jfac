window.onload = function () {
	try {
		
	} catch (e) {
		// TODO: handle exception
	}
	self = new EditarFacturaCompra();	
};

function EditarFacturaCompra(){
	try{
		this.contexto = new Context(); this.contexto = getContexto();	
		
		this.dao = new FacturaCompraDao();
		this.daoProveedor = new ProveedorDao();
		this.daoStock = new StockDao();
		this.daoParam = new ParametroDao();
		
		this.listaProveedores = this.daoProveedor.buscarTodos();
		this.factura = new FacturaCompra();							
		this.treeItems = new XulTree('treeItems', ['producto.codigo','cantidad','producto.nombre', 'costo','descuento','iva','subtotal'],'producto.codigo');
		
		this.prmIva = this.contexto.iva;		
		this.editar(window.arguments ? window.arguments[0] : null);
		
		this.inicializar();
	}catch(a){
		alert("EditarFacturaCompra(): " + a);
	}		
};

EditarFacturaCompra.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardarConfirmar();}, true);
	$Xul("btnGuardarTemporal").addEventListener( 'command', function(){self.guardarTemporal();}, true);	
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	
	$Xul("btnAgregarItem").addEventListener( 'command', function(){self.productos();}, true);
	$Xul("btnRemomerItem").addEventListener( 'command', function(){self.removerItem();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnImprimir").hide();
	$Xul("btnEditarItem").addEventListener( 'command', function(){self.editarItem();}, true);
	
	$Xul("txtDescuento").addEventListener( 'input', function(){self.calcular();}, true);
	$Xul("txtSobrecargo").addEventListener( 'input', function(){self.calcular();}, true);
	$Xul("txtIvaPorcentaje").addEventListener( 'input', function(){self.calcular();}, true);
	$Xul("cmbProveedor").addEventListener( 'select', function(){self.seleccionarProveedor();}, true);	
	
	$Xul("tabFac").addEventListener( 'select', function(e){if(this.selectedIndex == 1){ self.factura.autoprint=false; self.vistaPrevia(); } },true);
	$Xul('treeItems').addEventListener( 'dblclick', function(e){self.editarItem();}, true);
	
	$Xul("lblUsuario").val(this.contexto.usuario.getNombreCompleto());
	$Xul("lblLocal").val(this.contexto.local.getNombreCompleto());	
};

EditarFacturaCompra.prototype.seleccionarProveedor = function () {
	var i = $Xul("cmbProveedor").selectedIndex;
	if(i >= 0){
		this.factura.proveedor = this.listaProveedores[i];
	}else{
		this.factura.proveedor = null;
	}
};

EditarFacturaCompra.prototype.inicializarBind = function () {		
	$Xul('txtNumeroFactura').bind(this.factura, 'numeroFactura');
	$Xul('txtNumeroAutorizacion').bind(this.factura, 'numeroAutorizacion');
	
	$Xul('dtpFechaEmision').bind(this.factura, 'fechaEmision');
	$Xul('dtpFechaAut').bind(this.factura, 'fechaAutorizacion');
	$Xul('dtpFechaCaducidad').bind(this.factura, 'fechaCaducidad');
	
	$Xul('txtSubtotal').bind(this.factura, 'subtotal');
	$Xul('txtSubDoce').bind(this.factura, 'subDoce');
	$Xul('txtSubCero').bind(this.factura, 'subCero');
	$Xul('txtDescuento').bind(this.factura, 'descuento');
	$Xul('txtIva').bind(this.factura, 'iva');
	$Xul('txtSobrecargo').bind(this.factura, 'sobrecargo');
	$Xul('txtTotal').bind(this.factura, 'total');
	
	$Xul('txtIvaPorcentaje').val(this.prmIva);
	
	var cmbProveedor = $Xul('cmbProveedor');
	cmbProveedor.fillComboBox(this.listaProveedores, "id", ["identificacion", "razonSocial"]);
	cmbProveedor.bind(this.factura, 'proveedor.id', new Proveedor());
	
	if(this.factura.estado == this.factura.ESTADO_REGISTRADA){
		$Xul("btnGuardarTemporal").enable();
		$Xul("btnGuardar").enable();
	}else{
		$Xul("btnGuardarTemporal").disable();
		$Xul("btnGuardar").disable();
	}
	
	this.treeItems.clear();
	this.treeItems.setDatos(this.factura.items);
};

EditarFacturaCompra.prototype.editar = function (factura) {
	try {			
		if(factura){
			this.factura = factura;			
		}else{
			this.factura = new FacturaCompra();
			this.factura.usuario = this.contexto.usuario;
			this.factura.local = this.contexto.local;
			this.factura.ivaPorcentaje = this.contexto.iva;
			this.factura.periodo = this.contexto.periodo;			
			if(this.listaProveedores.length > 0){
				this.factura.proveedor = this.listaProveedores[0];
			}
		}
		this.inicializarBind();		
		this.calcular();
	} catch (e) {
		alert("EditarFacturaCompra.editar(): " + e);
	}
};

EditarFacturaCompra.prototype.productos = function () {
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/compra/IngresarProductosCompra.xul", "ixxi", features, this);
};

EditarFacturaCompra.prototype.removerItem = function () {
	var i = this.treeItems.getSelectedIndex();	
	if(i >= 0){
		var item = this.treeItems.getSelected();
		var conf = confirm("Desea eliminar este item : " + item.producto.codigo + " - " + item.producto.nombre);
		if(conf){
			var ix = this.factura.removerItemByIndice(i);		
			this.treeItems.removeByIndex(i);
			this.calcular();
		}
	}else{
		alert("No ha seleccionado un item");
	}
};

EditarFacturaCompra.prototype.cancelar = function () {
	return true;
};

EditarFacturaCompra.prototype.vistaPrevia = function () {	
	window.model = {			
			empresa : this.daoParam.obtener(new ParametroConst().NOMBRE_EMPRESA).valor,			
			direccion : this.contexto.local.direccion,
			propietario : this.daoParam.obtener(new ParametroConst().NOMBRE_PROPIETARIO).valor,
			telefono : this.contexto.local.telefono,
			ruc : this.daoParam.obtener(new ParametroConst().RUC_PROPIETARIO).valor,
			contexto : this.contexto
	};
	
	window.facturaImprimir = this.factura;
	var p = $Xul("print");
	p.attr("src","");
	p.attr("src","chrome://jfac/content/vista/print/print-fac-compra.html");
};

EditarFacturaCompra.prototype.imprimir = function () {
	$Xul("tabFac").selectedIndex = 1;	
	this.vistaPrevia();	
	imprimir('print','facventa','FacturaCompra');	
};

EditarFacturaCompra.prototype.crearItem = function (producto) {
	var it = new FacturaCompraItem();
	it.producto = producto;
	
	return it;
};

/**
 * ItemFacturaCompra
 * @param item
 * @return true o false
 */
EditarFacturaCompra.prototype.agregarItem = function (item) {
	var b = this.factura.agregarItem(item);
	if(b){
		this.treeItems.add(item);
		popup("Item","El item se ha agregado a la factura");
		this.calcular();
		return true;
	}
	popup("Item","El item ya existe en la factura");
	return false;
};

EditarFacturaCompra.prototype.calcular = function(){
	try {		
		var subDoce = 0; //subtotal de productos con iva, sin tomar en cuenta el iva
		var subCero = 0; //subtotal de productos sin iva		
		var descuento = 0;    //descuento
		var subtotal = 0;     //valor total de lo anterior, sin incluir impuestos
		var iva = 0;     //iva
		var ivaP = $Xul("txtIvaPorcentaje").val();
		
		if(isNaN(ivaP)) ivaP = 0;
		if(ivaP < 0) ivaP = 0;
		if(ivaP > 100) ivaP = 100;
		$Xul("txtIvaPorcentaje").val(ivaP);		
		
		var sobrecargo = $Xul('txtSobrecargo').val() * 1;
		if(isNaN(sobrecargo)){
			sobrecargo = 0;
		}
		
		for ( var i = 0; i < this.factura.items.length; i++) {
			var it = this.factura.items[i];
			
			if (it.producto.isCobraIva == 1 || it.producto.isCobraIva == true){
				subDoce += (it.costo * 1) * (it.cantidad * 1);
				descuento += (it.descuento * 1);
			} else {
				subCero += (it.costo * 1) * (it.cantidad * 1);
				descuento += (it.descuento * 1);
			}
			
			it.producto.precioCompra = it.costo;
			it.producto.precioVenta = (it.costo + ((it.costo * it.producto.utilidad) / 100.0)).round(2);
		}
		
		iva = subDoce * ivaP / 100.0;		
		subtotal = subDoce + subCero - descuento;
		var total = subtotal + iva + sobrecargo;
		
		$Xul('txtSubDoce').val(subDoce);
		$Xul('txtSubCero').val(subCero);
		$Xul('txtSubtotal').val(subtotal);
		$Xul('txtDescuento').val(descuento);
		$Xul('txtIva').val(iva);		
		
		$Xul('txtTotal').val(total);
	
	} catch (e) {
		// TODO: handle exception
		alert("EditarFacturaCompra.calcular(): " + e);
	}
};

EditarFacturaCompra.prototype.editarItem = function(){
	var item = this.treeItems.getSelected();
	if(item != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/compra/EditarItem.xul", "editar item", features, item);
		this.treeItems.updateSelected();
		this.calcular();
	}
};

EditarFacturaCompra.prototype.validar = function(){
	
	var valid = window.validar();
	
	$Xul("treeItems").removeValidationError();
	$Xul("txtNumeroFactura").removeValidationError();
	
	if(this.factura.items.length == 0){
		$Xul("treeItems").addValidationError("Ingrese los items");
		valid = false;
	}
	
	if(this.factura.total <= 0){
		$Xul("txtTotal").addValidationError("El total debe ser mayor a cero");
		valid = false;
	}
	
	var existe = this.dao.existeByNumero(this.factura);
	if(existe){
		$Xul("txtNumeroFactura").addValidationError("Número de factura ya está registrado");
		valid = false;
	}

	return valid;
};

EditarFacturaCompra.prototype.guardarConfirmar = function () {
	try {
		if(this.validar()){
			if(confirm('Al guardar con esta acción se afectará stock y ya no podrá editarla.\nDesea proceder?','Guardar y Confirmar')){
				var b = this.dao.guardar(this.factura, true);
				if(b){
					var x = confirm("La factura se ha guardado correctamente; desea imprimirla?");
					if(x){
						this.imprimir();
					}					
					if(window.arguments){
						this.factura.editada = true;
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
		// TODO: handle exception
		alert(e);
	}
};

EditarFacturaCompra.prototype.guardarTemporal = function () {
	try {
		if(this.validar()){
			if(confirm('Con esta acción guardará la factura, pero luego debe confirmarla para afectar stock. Desea proceder?','Guardar Temporal')){
				var b = this.dao.guardar(this.factura, false);
				if(b){										
					if(window.arguments){
						this.factura.editada = true;
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
		// TODO: handle exception
		alert(e);
	}
};