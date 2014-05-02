window.onload = function () {
	try {
		self = new EditarBanco();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarBanco(){
	this.dao = new BancoDao();
	
	this.banco = new Banco();	
	this.banco = window.arguments[0];
	
	this.inicializar();
};

EditarBanco.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
		
	$Xul('txtCodigo').bind(this.banco, 'codigo');	
	$Xul('txtNombre').bind(this.banco, 'nombre');
	$Xul('txtDescripcion').bind(this.banco, 'descripcion');
	$Xul('chkEstado').bind(this.banco, 'estado');
	$Xul('chkUtilizaEmpresa').bind(this.banco, 'utilizaEmpresa');
	
};

EditarBanco.prototype.validar = function () {
	var v = window.validar();
	
	if(this.dao.existe(this.banco)){
		v = false;
		$Xul('txtCodigo').addValidationError('Código duplicado');
	}
	
	return v;
};

EditarBanco.prototype.guardar = function () {
	var v = this.validar();
	if(v){
		try {
			var b = this.dao.guardar(this.banco);
			if(b){
				window.close();
			}else{
				alert("No se pudo guardar el banco seleccionado");
			}
		} catch (ex) {
			alert(ex);
		}
	}
};


EditarBanco.prototype.cancelar = function () {
	return true;
};
