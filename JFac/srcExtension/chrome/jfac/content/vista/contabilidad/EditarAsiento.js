window.onload = function () {
	try {
		self = new EditarAsiento();
	} catch (e) {
		// TODO: handle exception
		alert("EditarAsiento.onload(): " + e);
	}
};

function EditarAsiento(){	
	this.item = new AsientoContable();
	this.item = window.arguments[0];
	
	this.oldData = {		
		plan : this.item.plan,
		descripcion: this.item.descripcion,
		documento: this.item.documento,
		fecha: this.item.fecha,
		monto: this.item.monto,
		origen: this.item.origen,
		tipo: this.item.tipo
	};
	
	this.inicializar();
};

EditarAsiento.prototype.inicializar = function () {
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	$Xul("btnBuscarPlan").addEventListener( 'command', function(){self.buscarPlan();}, true);
	
	$Xul('txtFecha').val(this.item.fecha.toString('yyyy-MM-dd HH:mm:ss'));
	$Xul("txtDescripcion").bind(this.item, 'descripcion');	
	$Xul("txtPlan").val(this.item.plan.codigo + " - " + this.item.plan.nombre );
	$Xul("txtOrigen").bind(this.item, 'origen');
	$Xul("txtDocumento").bind(this.item, 'documento');
	$Xul("txtMonto").bind(this.item, 'monto');
	$Xul("cmbTipo").bind(this.item, 'tipo');	
};

EditarAsiento.prototype.agregarPlan = function (plan) {
	if(plan){
		if(plan.movimiento == 1){
			self.item.plan = plan;
			$Xul("txtPlan").val(self.item.plan.codigo + " - " + self.item.plan.nombre );
			return true;
		}else{
			alert("Debe ser un movimiento");
		}
	}else{
		alert("No ha seleccionado un plan");
	}
	
	return false;
};

EditarAsiento.prototype.buscarPlan = function () {
	var features = "chrome,modal,dependent=true,centerscreen,resizable";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/DialogoPlanes.xul", "buscador-planes", features, this.agregarPlan);	
};

EditarAsiento.prototype.guardar = function () {
	try {
		var v = window.validar();
		if(this.item.plan && this.item.plan.id == -1){
			v = false;
			$Xul("txtPlan").addValidationError("Seleccione el plan");
		};
		
		if(v){		
			window.arguments[0].guardado = true;			
			window.close();			
		}
	} catch (e) {
		alert(e);
	}
};

EditarAsiento.prototype.cancelar = function () {			
	this.item.plan = this.oldData.plan;
	this.item.descripcion = this.oldData.descripcion;
	this.item.documento = this.oldData.documento;
	this.item.fecha = this.oldData.fecha;
	this.item.monto = this.oldData.monto;
	this.item.origen = this.oldData.origen;
	this.item.tipo = this.oldData.tipo;
	
	window.arguments[0].guardado = false;
	window.close();
};