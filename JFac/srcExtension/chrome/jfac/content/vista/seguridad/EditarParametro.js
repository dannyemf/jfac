window.onload = function () {
	self = new EditarParametro();
};

function EditarParametro(){
	this.parametroDao = new ParametroDao();
	
	this.parametro = new Parametro();
	this.parametro = window.arguments[0];
	
	this.inicializar();
};

EditarParametro.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
	
	$Xul("txtCodigo").bind(this.parametro, 'codigo');
	$Xul("txtValor").bind(this.parametro, 'valor');
	$Xul("txtDescripcion").bind(this.parametro, 'descripcion');
	$Xul("cmbTipo").bind(this.parametro, 'tipo');
	
	if(this.parametro.isEditable == true){
		$Xul("txtCodigo").enable();
		$Xul("cmbTipo").enable();
	}else{
		$Xul("txtCodigo").disable();
		$Xul("cmbTipo").disable();
	}
};

EditarParametro.prototype.cmdGuardar = function () {self.guardar();};
EditarParametro.prototype.cmdCancelar = function () {self.cancelar();};

EditarParametro.prototype.validar = function () {
	var v = window.validar();
	var e = this.parametroDao.existe(this.parametro.codigo, this.parametro.id);
	if(e){
		$Xul("txtCodigo").addValidationError('Código duplicado');
		v = false;
	}
	return v;
};

EditarParametro.prototype.guardar = function () {
	var v = this.validar();
	if(v){		
		var b = this.parametroDao.guardar(this.parametro);
		if(b){
			this.parametro.guardado = true;
			window.close();
		}else{
			alert("No se pudo guardar el Parámetro seleccionado");
		}
	}
};

EditarParametro.prototype.cancelar = function () {
	this.parametro.guardado = false;
	window.close();
	return true;
};