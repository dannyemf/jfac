window.onload = function () {
	try {
		self = new EditarProductoProveedor();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarProductoProveedor(){
	this.dao = new ProductoProveedorDao();
	this.daoProveedor = new ProveedorDao();
	this.daoProducto = new ProductoDao();
	this.daoRetencionIR = new RetencionDao();
	
	this.productoProveedor = new ProductoProveedor();	
	this.productoProveedor = window.arguments[0];
	
	this.listaProveedores = this.daoProveedor.buscarTodos();
	this.listaProductos = this.daoProducto.buscarTodos();	//se debe fijar como campo de texto para ingresar la info a buscar
	this.listaRetencionesIR = this.daoRetencionIR.obtenerRetencionesIR();
	
	this.txtProducto = $Xul('txtProducto');
	
	this.inicializar();
};

EditarProductoProveedor.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	$Xul("btnSel").addEventListener( 'command', function(){self.buscar();}, true);
		
	$Xul("cmbProveedor").addEventListener( 'select', function(){self.seleccionarProveedor();}, true);
	$Xul("cmbRetencionIR").addEventListener( 'select', function(){self.seleccionarRetencionIR();}, true);
	
	var cmbProveedor = $Xul('cmbProveedor');
	cmbProveedor.fillComboBox(this.listaProveedores, "id", ["razonSocial"], '--Seleccione--', -1);	
	cmbProveedor.bind(this.productoProveedor, 'proveedor.id', new Proveedor());
	
	var cmbRetencionIR = $Xul('cmbRetencionIR');
	cmbRetencionIR.fillComboBox(this.listaRetencionesIR, "id", ["codigo", "nombreCorto"],'--Seleccione--', -1);
	cmbRetencionIR.bind(this.productoProveedor, 'retencionIR.id', new RetencionIR());	
	
	this.txtProducto.val(this.productoProveedor.producto.nombre);
};

EditarProductoProveedor.prototype.buscar = function () {
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/inventario/DialogoProductos.xul", "dialogo-productos", features, function(p){
		if (p != null){
			self.txtProducto.val(p.nombre);
			self.productoProveedor.producto = p; 
		return true;
		}
		return false;
	});
};

EditarProductoProveedor.prototype.seleccionarProveedor = function () {
	var i = $Xul("cmbProveedor").selectedIndex;
	if(i >= 0){
		this.productoProveedor.proveedor = this.listaProveedores[i];
	}else{
		this.productoProveedor.proveedor = new Proveedor();
	}
};

EditarProductoProveedor.prototype.seleccionarRetencionIR = function () {
	var i = $Xul("cmbRetencionIR").selectedIndex;
	if(i >= 0){
		this.productoProveedor.retencionIR = this.listaRetencionesIR[i];
	}else{
		this.productoProveedor.retencionIR = null;
	}
};

EditarProductoProveedor.prototype.guardar = function () {
	var v = validar();
	if(v){
		try {			
			var existe = this.dao.existeProductoProveedor(this.productoProveedor.proveedor.id, this.productoProveedor.producto.id, this.productoProveedor.id);
			if(existe == false){				
				var b = this.dao.guardar(this.productoProveedor);
				if(b){
					window.close();
				}else{
					alert("No se pudo guardar el Producto - Proveedor seleccionado");
				}
			}else{
				alert("Ya existe un registro con la misma combinación [Producto - Proveedor]", 'Guardar');
			}
		} catch (ex) {
			alert(ex);
		}
	}
};

EditarProductoProveedor.prototype.cancelar = function () {return true;};