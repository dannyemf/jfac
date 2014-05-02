window.onload = function () {
	self = new EditarTipoCredito();
};

function EditarTipoCredito(){
	this.tipoCreditoDao = new TipoCreditoDao();
	this.tipoCredito = window.arguments[0];	
	this.inicializar();
};

EditarTipoCredito.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
	
	$Xul('txtId').bind(this.tipoCredito, 'id');
	$Xul('txtDescripcion').bind(this.tipoCredito, 'descripcion');	
	$Xul('cmbTipo').bind(this.tipoCredito, 'tipo');
	$Xul('txtNumeroCuotas').bind(this.tipoCredito, 'numeroCuotas');
	$Xul('txtInteres').bind(this.tipoCredito, 'interes');
	$Xul('txtMora').bind(this.tipoCredito, 'mora');
};

EditarTipoCredito.prototype.cmdGuardar = function () {self.guardar();};
EditarTipoCredito.prototype.cmdCancelar = function () {window.close();};

EditarTipoCredito.prototype.guardar = function () {
	var v = validar();
	if(v){
		var b = this.tipoCreditoDao.guardar(this.tipoCredito);			
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar el Tipo de crédito seleccionado");
		}
	}	
};

EditarTipoCredito.prototype.cancelar = function () {
	return true;
};