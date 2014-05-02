window.onload = function () {
	self = new EditarCliente();
};

function EditarCliente(){
	this.clienteDao = new ClienteDao();
	this.cliente = window.arguments[0];	
	this.inicializar();
};

EditarCliente.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
	
	$Xul('txtId').bind(this.cliente, 'id');
	$Xul('txtCedula').bind(this.cliente, 'cedula');	
	$Xul('txtNombres').bind(this.cliente, 'nombres');
	$Xul('txtApellidos').bind(this.cliente, 'apellidos');
	$Xul('txtDireccion').bind(this.cliente, 'direccion');
	$Xul('txtTelefono').bind(this.cliente, 'telefono');
	$Xul('txtCelular').bind(this.cliente, 'celular');
	$Xul('txtFax').bind(this.cliente, 'fax');
	$Xul('txtMail').bind(this.cliente, 'mail');
};

EditarCliente.prototype.cmdGuardar = function () {self.guardar();};
EditarCliente.prototype.cmdCancelar = function () {window.close();};

EditarCliente.prototype.guardar = function () {
	var v = validar();
	if(v){
		var existe = this.clienteDao.existeCedula(this.cliente);
		if(existe == false){
			var b = this.clienteDao.guardar(this.cliente);			
			if(b){
				window.close();
			}else{
				alert("No se pudo guardar el Cliente seleccionado");
			}
		}else{
			alert("Ya existe un cliente registrado con esta cédula", "Guardar");
		}
	}	
};

EditarCliente.prototype.cancelar = function () {
	return true;
};