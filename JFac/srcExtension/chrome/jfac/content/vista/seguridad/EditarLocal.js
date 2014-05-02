window.onload = function () {
	try {
		self = new EditarLocal();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarLocal(){
	this.dao = new LocalDao();		
	this.local = window.arguments[0];
	this.inicializar();
};

EditarLocal.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
		
	$Xul('txtCodigo').bind(this.local, 'codigo');	
	$Xul('txtNombre').bind(this.local, 'nombre');
	$Xul('txtDireccion').bind(this.local, 'direccion');
	$Xul('txtTelefono').bind(this.local, 'telefono');
};


EditarLocal.prototype.guardar = function () {
	var v = validar();
	if(v){
		try {
			if(this.dao.existe(this.local) == false){
				var b = this.dao.guardar(this.local);
				if(b){
					window.close();
				}else{
					alert("No se pudo guardar el local seleccionado");
				}
			}else{
				alert("Ya existe un local con el mismo c�digo.");
			}
		} catch (ex) {
			// TODO: handle exception
			alert(ex);
		}
	}
};


EditarLocal.prototype.cancelar = function () {
	return true;
};
