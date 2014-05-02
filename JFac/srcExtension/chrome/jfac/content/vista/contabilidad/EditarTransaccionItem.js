window.onload = function () {
	try {
		self = new EditarTransaccionItem();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarTransaccionItem(){
	this.daoPlan = new PlanDao();
	//this.planes = this.daoPlan.obtnerTodos();
	this.item = new TransaccionItem();	
	this.item = window.arguments[0].model;
		
	this.oldData = {
		//porc : this.item.porcentaje,
		plan : this.item.plan,
		tipo : this.item.tipo,
		formula: this.item.formula
	};	
	
	this.inicializar();
};

EditarTransaccionItem.prototype.inicializar = function () {			
	$Xul("txtTransaccion").val(this.item.transaccion.codigo + " - " + this.item.transaccion.descripcion);
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	$Xul("btnSelPlan").addEventListener( 'command', function(){self.seleccionarPlan();}, true);
	$Xul("btnSelAut").addEventListener( 'command', function(){self.seleccionarPlanAut();}, true);
	
	
	
	/*$Xul("cmbPlan").fillComboBox(this.planes, 'id', ['codigo','nombre'],'[AUTOMATICO]', -1);
	$Xul("cmbPlan").addEventListener( 'select', function(){
		var i = this.selectedIndex;
		if(i == 0){
			self.item.plan = new Plan();
			self.item.plan.id = -1;
			self.item.plan.codigo = "[AUTOMATICO]";
			self.item.plan.nombre = "[AUTOMATICO]";
		}else{
			self.item.plan = self.planes[i-1];
		}		
	}, true);*/
	
	$Xul("txtPlan").val(this.item.plan.id == -1 ? this.item.plan.codigo : this.item.plan.codigo + ' - ' + this.item.plan.id);
	
	
	//$Xul("cmbPlan").bind(this.item, 'plan.id', new Plan());
	$Xul("cmbTipo").bind(this.item, 'tipo');
	//$Xul("txtPorcentaje").bind(this.item, 'porcentaje');
	$Xul("txtFormula").bind(this.item, 'formula');
	$Xul("txtAplica").bind(this.item, 'aplicaA');	
};

EditarTransaccionItem.prototype.agregarPlan = function (plan) {
	if(plan){
		if(plan.movimiento == 1){
			self.item.plan = plan;
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

EditarTransaccionItem.prototype.seleccionarPlan = function () {
	var features = "chrome,modal,dependent=true,centerscreen,resizable";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/DialogoPlanes.xul", "buscador-planes", features, this.agregarPlan);
};

EditarTransaccionItem.prototype.seleccionarPlanAut = function () {
	var plan = new Plan();
	plan.codigo = '[AUTOMATICO]';
	plan.nombre = '[AUTOMATICO]';
	this.item.plan = plan;
	$Xul('txtPlan').val(plan.codigo);
};

EditarTransaccionItem.prototype.guardar = function () {
	try {
		var v = window.validar();
		if(v){			
			window.arguments[0].guardado = true;			
			window.close();			
		}
	} catch (e) {
		alert('EditarTransaccionItem.guardar(): '+e);
	}
};

EditarTransaccionItem.prototype.cancelar = function () {	
	this.item.plan = this.oldData.plan;
	this.item.tipo = this.oldData.tipo;
	//this.item.porcentaje = this.oldData.porc;
	this.item.formula = this.oldData.formula;
	window.close();
};