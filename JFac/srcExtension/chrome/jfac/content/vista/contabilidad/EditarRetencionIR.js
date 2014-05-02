window.onload = function () {
	try {
		self = new EditarRetencionIR();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarRetencionIR(){
	this.dao = new RetencionDao();
	this.retencionIR = new RetencionIR();
	this.retencionIR = window.arguments[0];
	this.inicializar();
};

EditarRetencionIR.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);	
	$Xul("btnSelPlan").addEventListener( 'command', function(){self.seleccionarPlan();}, true);
	$Xul("btnClrPlan").addEventListener( 'command', function(){self.fijarPlanNinguno();}, true);
		
	$Xul("txtCodigo").bind(this.retencionIR, 'codigo');
	$Xul("txtDescripcion").bind(this.retencionIR, 'descripcion');
	$Xul("txtNombreCorto").bind(this.retencionIR, 'nombreCorto');
	$Xul("txtPorcentajeRetencion").bind(this.retencionIR, 'porcentajeRetencion');
	
	if(this.retencionIR.plan.id == null || this.retencionIR.plan.id == -1){
		$Xul("txtPlan").val('--Ninguno--');
	}else{
		$Xul("txtPlan").val(this.retencionIR.plan.codigo + '-'+this.retencionIR.plan.nombre);
	}
};

EditarRetencionIR.prototype.cmdGuardar = function () {self.guardar();};
EditarRetencionIR.prototype.cmdCancelar = function () {window.close();};

/**
 * Método invocado por el buscador de planes
 * @param {Plan} plan
 * @return {Boolean}
 */
EditarRetencionIR.prototype.fijarPlan = function (plan) {
	if(plan){
		if(plan.movimiento == 1){
			self.retencionIR = plan;
			$Xul("txtPlan").val(plan.codigo + " - " + plan.nombre );
			return true;
		}else{
			alert("Debe ser un movimiento");
		}
	}else{
		alert("No ha seleccionado un plan");
	}	
	return false;
};

EditarRetencionIR.prototype.seleccionarPlan = function () {
	var features = "chrome,modal,dependent=true,centerscreen,resizable";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/DialogoPlanes.xul", "buscador-planes", features, this.fijarPlan);
};

EditarRetencionIR.prototype.fijarPlanNinguno = function () {
	this.retencionIR.plan = new Plan();
	$Xul('txtPlan').val('--Ninguno--');
};


EditarRetencionIR.prototype.guardar = function () {
	var v = validar();
	if(v){		
		var existe = this.dao.existeRetencionIR(this.retencionIR.codigo, this.retencionIR.id);
		if(existe == false){
			var b = this.dao.guardarRetencionIR(this.retencionIR);
			if(b){
				window.close();
			}else{
				alert("No se pudo guardar la Retención IR seleccionada");
			}
		}else{
			alert("Ya existe otra Retención IR con el mismo código", 'Guardar');
		}
	}
};

EditarRetencionIR.prototype.cancelar = function () {
	return true;
};