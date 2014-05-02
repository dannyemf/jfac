window.onload = function () {
	try {
		self = new EditarRetencionIva();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarRetencionIva(){
	this.dao = new RetencionDao();
	this.daoPrm = new ParametroDao();
	
	this.retencion = new RetencionIva();	
	this.retencion = window.arguments[0];
	
	this.tipoAgentes = this.daoPrm.obtenerPorTipo(new ParametroConst().TIPO_AGENTE_RETENCION);
	this.tipoProveedores = this.daoPrm.obtenerPorTipo(new ParametroConst().TIPO_PROVEEDOR);
	
	this.inicializar();
};

EditarRetencionIva.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	$Xul("btnPlanBien").addEventListener( 'command', function(){self.selPlanBien();}, true);
	$Xul("btnPlanBienNiguna").addEventListener( 'command', function(){self.fijarPlanBienNinguna();}, true);	
	$Xul("btnPlanServicio").addEventListener( 'command', function(){self.selPlanServicio();}, true);
	$Xul("btnPlanServicioNiguna").addEventListener( 'command', function(){self.fijarPlanServicioNinguna();}, true);
		
	$Xul('txtBien').bind(this.retencion, 'porcentajeBien');	
	$Xul('txtServicio').bind(this.retencion, 'porcentajeServicio');
	
	$Xul('cmbTipoAgente').fillComboBox(this.tipoAgentes, 'codigo', ['valor'],'--Seleccione--');
	$Xul('cmbTipoProvee').fillComboBox(this.tipoProveedores, 'codigo', ['valor'], '--Seleccione--');		
	
	
	if(this.retencion.planBien.id == null || this.retencion.planBien.id == -1){
		$Xul('txtPlanBien').val('--Seleccione--');
	}else{
		$Xul('txtPlanBien').val(this.retencion.planBien.codigo + '-'+this.retencion.planBien.nombre);
	}
	
	if(this.retencion.planServicio.id  == null  || this.retencion.planServicio.id == -1){		
		$Xul('txtPlanServicio').val('--Seleccione--');
	}else{
		$Xul('txtPlanServicio').val(this.retencion.planServicio.codigo + '-'+this.retencion.planServicio.nombre);
	}
	
	$Xul('cmbTipoAgente').bind(this.retencion, 'tipoAgenteRetencion');
	$Xul('cmbTipoProvee').bind(this.retencion, 'tipoProveedor');
};



EditarRetencionIva.prototype.selPlanBien = function () {
	var features = "chrome,modal,dependent=true,centerscreen,resizable";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/DialogoPlanes.xul", "buscador-planes", features, this.fijarPlanBien);
};

EditarRetencionIva.prototype.fijarPlanBienNinguna = function () {
	this.retencion.planBien = new Plan();
	$Xul("txtPlanBien").val('--Ninguna--');
};

EditarRetencionIva.prototype.fijarPlanBien = function (plan) {
	if(plan){
		if(plan.movimiento == 1){
			self.retencion.planBien = plan;
			$Xul("txtPlanBien").val(plan.codigo + " - " + plan.nombre );
			return true;
		}else{
			alert("Debe ser un movimiento");
		}
	}else{
		alert("No ha seleccionado un plan");
	}	
	return false;
};

EditarRetencionIva.prototype.selPlanServicio = function () {
	var features = "chrome,modal,dependent=true,centerscreen,resizable";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/DialogoPlanes.xul", "buscador-planes", features, this.fijarPlanServicio);
};

EditarRetencionIva.prototype.fijarPlanServicioNinguna = function () {
	this.retencion.planServicio  = new Plan();
	$Xul("txtPlanServicio").val('--Ninguna--');
};

EditarRetencionIva.prototype.fijarPlanServicio = function (plan) {
	if(plan){
		if(plan.movimiento == 1){
			self.retencion.planServicio = plan;
			$Xul("txtPlanServicio").val(plan.codigo + " - " + plan.nombre );
			return true;
		}else{
			alert("Debe ser un movimiento");
		}
	}else{
		alert("No ha seleccionado un plan");
	}	
	return false;
};

EditarRetencionIva.prototype.validar = function () {
	var v = window.validar();
	
	if(this.dao.existeRetencionIVA(this.retencion.tipoProveedor, this.retencion.tipoAgenteRetencion, this.retencion.id)){
		v = false;
		alert("Combinación [Agente - Proveedor] duplicada");
	}
	
	if(this.retencion.planBien.id == -1 && this.porcentajeBien > 0){
		v = false;
		$Xul("txtPlanBien").addValidationError('Seleccione la cuenta contable');
	}
	
	if(this.retencion.planServicio.id == -1 && this.porcentajeServicio > 0){
		v = false;
		$Xul("txtPlanServicio").addValidationError('Seleccione la cuenta contable');
	}
	
	return v;
};


EditarRetencionIva.prototype.guardar = function () {
	var v = this.validar();
	if(v){
		try {
			var b = this.dao.guardarRetencionIva(this.retencion);
			if(b){
				window.close();
			}else{
				alert("No se pudo guardar la configuracíon");
			}
		} catch (ex) {
			alert(ex);
		}
	}
};


EditarRetencionIva.prototype.cancelar = function () {
	window.close();
};
