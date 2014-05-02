window.onload = function () {
	try {
		self = new EditarProveedor();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarProveedor(){
	this.dao = new ProveedorDao();
	this.daoPrm = new ParametroDao();
	
	this.proveedor = new Proveedor();
	this.proveedor = window.arguments[0];
	this.tipos = this.daoPrm.obtenerPorTipo(new ParametroConst().TIPO_PROVEEDOR); 
	
	this.inicializar();
};

EditarProveedor.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
		
	$Xul('txtCodigo').bind(this.proveedor, 'id');
	$Xul('cmdTipoIdentificacion').bind(this.proveedor, 'tipoIdentificacion');
	$Xul('txtIdentificacion').bind(this.proveedor, 'identificacion');
	$Xul('txtRazonSocial').bind(this.proveedor, 'razonSocial');
	$Xul('txtProvincia').bind(this.proveedor, 'provincia');
	$Xul('txtCiudad').bind(this.proveedor, 'ciudad');
	$Xul('txtDireccion').bind(this.proveedor, 'direccion');
	$Xul('txtContacto').bind(this.proveedor, 'contacto');
	$Xul('txtTelefono').bind(this.proveedor, 'telefono');
	$Xul('txtFax').bind(this.proveedor, 'fax');
	$Xul('txtCelular').bind(this.proveedor, 'celular');
	$Xul('txtMail').bind(this.proveedor, 'mail');
	
	$Xul('cmbTipoProveedor').fillComboBox(this.tipos, 'codigo', ['descripcion']);	
	$Xul('cmbTipoProveedor').bind(this.proveedor, 'tipoProveedor');
};

EditarProveedor.prototype.cmdGuardar = function () {self.guardar();};
EditarProveedor.prototype.cmdCancelar = function () {window.close();};

EditarProveedor.prototype.guardar = function () {
	var v = validar();
	if(v){
		var b = this.dao.guardar(this.proveedor);
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar el Proveedor seleccionado");
		}
	}
};

EditarProveedor.prototype.cancelar = function () {
	return true;
};