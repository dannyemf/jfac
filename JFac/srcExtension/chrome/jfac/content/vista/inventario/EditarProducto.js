window.onload = function () {
	self = new EditarProducto();
};

function EditarProducto(){
	try{
		this.dao = new ProductoDao();
		this.daoMarca = new MarcaDao();
		this.daoLinea = new LineaDao();
		
		this.marcas = new Array();
		this.lineas = new Array();
		
		this.marcas = this.daoMarca.obtnerTodos();
		this.lineas = this.daoLinea.obtnerTodos();
		
		this.producto = new Producto();
		this.producto = window.arguments[0];
		
		this.inicializar();
	}catch(a){
		alert(a);
	}	
};

EditarProducto.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
	
	$Xul('txtId').bind(this.producto, 'id');
	$Xul('txtCodigo').bind(this.producto, 'codigo');
	$Xul('txtNombre').bind(this.producto, 'nombre');
	$Xul('txtPrecioCompra').bind(this.producto, 'precioCompra');
	$Xul('txtPrecioVenta').bind(this.producto, 'precioVenta');
	$Xul('txtPrecioPromocion').bind(this.producto, 'precioPromocion');
	$Xul('txtPrecioMayorista').bind(this.producto, 'precioMayorista');	
	
	$Xul('txtStockMinimo').bind(this.producto, 'stockMinimo');
	$Xul('txtStockMaximo').bind(this.producto, 'stockMaximo');
	
	$Xul('txtUtilidad').bind(this.producto, 'utilidad');
	$Xul('txtDescuento').bind(this.producto, 'descuento');
	$Xul('txtUnidadesCaja').bind(this.producto, 'unidadesCaja');
		
	$Xul("chkIva").bind(this.producto, 'isCobraIva');
	$Xul("chkFraccionable").bind(this.producto, 'isFraccionable');
	$Xul('chkPesable').bind(this.producto, 'isPesable');
	$Xul('chkAplicarSeries').bind(this.producto, 'isAplicarSeries');
	
	if(this.producto.id == -1){
		if(this.lineas.length > 0) this.producto.linea = new Linea(this.lineas[0].id);
		if(this.marcas.length > 0) this.producto.marca = new Marca(this.marcas[0].id);
	}
	
	var lm = $Xul('listaMarca');
	lm.fillComboBox(this.daoMarca.obtnerTodos(), 'id', ['nombre'],'--Seleccione--');
	lm.bind(this.producto, 'marca.id', new Marca());
	
	var ll = $Xul('listaLinea');
	ll.fillComboBox(this.daoLinea.obtnerTodos(), 'id', ['nombre'],'--Seleccione--');
	ll.bind(this.producto, 'linea.id', new Linea());
	
};

EditarProducto.prototype.cmdGuardar = function () {self.guardar();};
EditarProducto.prototype.cmdCancelar = function () {window.close();};

EditarProducto.prototype.guardar = function () {
	var v = validar();
	if(v){
		var b = this.dao.guardar(this.producto);
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar el Producto seleccionado");
		}
	}
};

EditarProducto.prototype.cancelar = function () {
	return true;
};