window.onload = function () {
	try {
		self = new EditarCuentaBancaria();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarCuentaBancaria(){
	this.dao = new CuentaBancariaDao();
	this.daoBanco = new BancoDao();
	
	this.cuenta = new CuentaBancaria();	
	this.cuenta = window.arguments[0];
	
	this.inicializar();
};

EditarCuentaBancaria.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	$Xul("btnSelCuenta").addEventListener( 'command', function(){self.buscarPlan();}, true);
		
	
	var lista = this.daoBanco.buscarTodosEmpresa();
	$Xul('cmbBanco').fillComboBox(lista, 'id', ['codigo','nombre'],'--Seleccione--',-1);	
	$Xul('cmbTipo').bind(this.cuenta, 'tipo');
	$Xul('cmbBanco').bind(this.cuenta, 'banco.id', new Banco());
	$Xul('txtNumero').bind(this.cuenta, 'numero');
	
	$Xul('txtCuenta').val(this.cuenta.plan.id > 0 ? this.cuenta.plan.codigo +'-'+this.cuenta.plan.nombre : '');
};

EditarCuentaBancaria.prototype.agregarPlan = function (plan) {
	if(plan){
		if(plan.movimiento == 1){
			self.cuenta.plan = plan;
			$Xul("txtCuenta").val(plan.codigo + " - " + plan.nombre );
			return true;
		}else{
			alert("Debe ser un movimiento");
		}
	}else{
		alert("No ha seleccionado un plan");
	}
	
	return false;
};

EditarCuentaBancaria.prototype.buscarPlan = function () {
	var features = "chrome,modal,dependent=true,centerscreen,resizable";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/DialogoPlanes.xul", "buscador-planes", features, this.agregarPlan);	
};


EditarCuentaBancaria.prototype.validar = function () {
	var v = window.validar();
	
	if(this.dao.existe(this.cuenta)){
		v = false; $Xul('txtNumero').addValidationError('Número de cuenta duplicado');
	}	
	if($Xul('cmbBanco').val() == '' || $Xul('cmbBanco').val() == -1){
		v = false; $Xul('cmbBanco').addValidationError('Seleccione el banco');
	}
	
	return v;
};

EditarCuentaBancaria.prototype.guardar = function () {
	var v = this.validar();
	if(v){
		try {
			var b = this.dao.guardar(this.cuenta);
			if(b){
				window.close();
			}else{
				alert("No se pudo guardar la cuenta seleccionado");
			}
		} catch (ex) {
			alert(ex);
		}
	}
};
