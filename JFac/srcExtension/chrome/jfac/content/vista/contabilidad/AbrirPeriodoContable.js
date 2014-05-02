window.onload = function () {
	try {
		self = new AbrirPeriodoContable();
	} catch (e) {
		alert('AbrirPeriodoContable.onload(): '+e);
	}
};

function AbrirPeriodoContable(){
	
	this.daoEstadoPlan = new EstadoPlanDao();
	this.daoPeriodo = new PeriodoContableDao();
	
	this.local = new Local();
	this.local = window.arguments[0];	
	
	this.idPeriodo = -1;	
	this.periodos = this.daoPeriodo.obtenerPeriodosPendientes(this.local);
	this.inicializar();
};

AbrirPeriodoContable.prototype.inicializar = function () {	
	$Xul("btnAbrir").addEventListener( 'command', function(){self.abrir();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	
	$Xul("txtLocal").val(this.local.codigo + '-'+this.local.nombre);
	
	$Xul("cmbPeriodo").fillComboBox(this.periodos, 'id', ['nombre'], '--Seleccione--', -1);
	$Xul("cmbPeriodo").bind(this, 'idPeriodo');		
};

AbrirPeriodoContable.prototype.abrir = function () {
	try {
		var v = window.validar();
		if(v){			
			if(this.idPeriodo > 0){
				showWait();
				try {
					if (this.daoEstadoPlan.abrirPeriodoContable(this.local, new PeriodoContable(this.idPeriodo))){
						window.close();
						closeWait();
					}
				} catch (e) {
					closeWait();
					alert(e);
				}				
			}else{
				alert('Seleccione el periodo contable','Periodo');
			}			
		}
	} catch (e) {
		alert('AbrirPeriodoContable.guardar(): '+e);
	}
};

AbrirPeriodoContable.prototype.cancelar = function () {		
	window.close();
};