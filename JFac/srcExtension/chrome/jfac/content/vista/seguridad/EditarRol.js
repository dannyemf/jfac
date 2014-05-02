window.onload = function () {
	self = new EditarRol();
};

function EditarRol(){
	this.rolDao = new RolDao();
	this.rol = window.arguments[0];
	
	this.inicializar();
};

EditarRol.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
	
	$Xul('txtId').bind(this.rol, 'id');
	$Xul('txtNombre').bind(this.rol, 'nombre');
	$Xul('txtDescripcion').bind(this.rol, 'descripcion');
};

EditarRol.prototype.cmdGuardar = function () {self.guardar();};
EditarRol.prototype.cmdCancelar = function () {window.close();};

EditarRol.prototype.guardar = function () {
	var v = validar();
	if(v){
		var b = this.rolDao.guardar(this.rol);
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar el Rol seleccionado");
		}
	}
};

EditarRol.prototype.cancelar = function () {
	return true;
};
