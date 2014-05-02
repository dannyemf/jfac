window.onload = function () {
	try {
		self = new EditarPlan();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarPlan(){
	this.dao = new PlanDao();
	this.plan = window.arguments[0];
	this.inicializar();
};

EditarPlan.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);	
	
	$Xul("txtId").bind(this.plan, 'id');
	$Xul("txtCodigo").bind(this.plan, 'codigo');
	$Xul("txtNombre").bind(this.plan, 'nombre');
	$Xul("cmdTipo").bind(this.plan, 'tipo');
};

EditarPlan.prototype.cmdGuardar = function () {self.guardar();};
EditarPlan.prototype.cmdCancelar = function () {window.close();};

EditarPlan.prototype.guardar = function () {
	var v = validar();
	if(v){
		var existe = this.dao.existe(this.plan);
		if(existe == false){
			var b = this.dao.guardar(this.plan);
			if(b){
				window.close();
			}else{
				alert("No se pudo guardar el plan de cuentas seleccionada");
			}
		}else{
			alert("Ya existe otro plan de cuentas con el mismo código", 'Guardar');
		}
	}
};

EditarPlan.prototype.cancelar = function () {
	return true;
};