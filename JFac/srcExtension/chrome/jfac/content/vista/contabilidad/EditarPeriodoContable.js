window.onload = function () {
	try {
		self = new EditarPeriodoContable();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarPeriodoContable(){
	this.periodoContableDao = new PeriodoContableDao();
	this.periodoContable = window.arguments[0];
	this.inicializar();
};

EditarPeriodoContable.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);	
	
	$Xul("txtCodigo").bind(this.periodoContable, 'id');
	$Xul("txtNombre").bind(this.periodoContable, 'nombre');
	$Xul("dtpFechaInicial").bind(this.periodoContable, 'fechaInicial');
	$Xul("dtpFechaFinal").bind(this.periodoContable, 'fechaFinal');
};

EditarPeriodoContable.prototype.cmdGuardar = function () {self.guardar();};
EditarPeriodoContable.prototype.cmdCancelar = function () {window.close();};

EditarPeriodoContable.prototype.guardar = function () {
	var v = validar();
	if(v){
		var b = this.periodoContableDao.guardar(this.periodoContable);
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar el Periodo Contable seleccionado");
		}
	}
};

EditarPeriodoContable.prototype.cancelar = function () {
	return true;
};