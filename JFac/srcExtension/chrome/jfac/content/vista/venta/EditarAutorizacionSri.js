window.onload = function () {
	try {
		self = new EditarAutorizacionSri();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarAutorizacionSri(){
	this.dao = new AutorizacionSriDao();			
	this.autorizacion = new AutorizacionSri(); 
	this.autorizacion = window.arguments[0];
	
	this.inicializar();
};

EditarAutorizacionSri.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	$Xul("dtpFinicio").addEventListener( 'change', function(){self.selectFecha();}, true);
	
	if(this.autorizacion.id == -1){
		this.autorizacion.fechaFin = new Date().addYears(1);
	}
	
	$Xul('txtNumero').bind(this.autorizacion, 'numero');	
	$Xul('cmbEstado').bind(this.autorizacion, 'estado');
	
	$Xul('dtpFinicio').bind(this.autorizacion, 'fechaInicio');
	$Xul('dtpFfin').val(this.autorizacion.fechaFin);	
};

EditarAutorizacionSri.prototype.selectFecha = function () {
	var d = $Xul('dtpFinicio').dateValue;
	var f = d.addYears(1);
	this.autorizacion.fechaFin = f;
	$Xul('dtpFfin').val(f);
};

EditarAutorizacionSri.prototype.guardar = function () {
	var v = validar();
	if(v){
		try {
			if(this.dao.existeByNumero(this.autorizacion) == false){
				var b = this.dao.guardar(this.autorizacion);
				if(b){
					window.close();
				}else{
					alert("No se pudo guardar el autorizacion sri");
				}
			}else{
				alert("Ya existe una autorización con el mismo número.");
			}
		} catch (ex) {
			// TODO: handle exception
			alert(ex);
		}
	}
};


EditarAutorizacionSri.prototype.cancelar = function () {
	return true;
};
