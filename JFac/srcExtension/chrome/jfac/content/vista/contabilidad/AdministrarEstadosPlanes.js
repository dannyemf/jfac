window.onload = function () {
	try {
		self = new AdministrarEstadosPlanes();
	} catch (e) {
		alert('AdministrarEstadosPlanes.onload(): '+e);
	}
};

function AdministrarEstadosPlanes(){
	
	this.dao = new EstadoPlanDao();
	this.daoPeriodo = new PeriodoContableDao();
	this.daoLocal = new LocalDao();
	this.locales = this.daoLocal.obtenerTodos();
	
	this.local = new Local();
	this.local = null;
	
	this.periodoActivo = new PeriodoContable();
	this.periodoActivo = null;
	
	this.tree = new XulTree('tree', ['id', 'tipo',['local.codigo','local.nombre'], 'estado', 'descripcion', 'fecha', 'periodo.nombre'], 'id');
	this.tree.setDateColumns([['fecha','yyyy-MM-dd HH:mm:ss']]);		
	
	this.inicializar();	
}; 

AdministrarEstadosPlanes.prototype.inicializar = function () {		
	$Xul('btnEstadoInicial').addEventListener('command', function(){self.esInicial();}, true);
	$Xul('btnAbrirPeriodo').addEventListener('command', function(){self.abrirPeriodo();}, true);
	$Xul('btnCerrarPeriodo').addEventListener('command', function(){self.cerrarPeriodo();}, true);	
	$Xul('cmbLocal').addEventListener('command', function(){self.selLocal();}, true);
	
	$Xul('cmbLocal').fillComboBox(this.locales, 'id', ['codigo','nombre']);
	$Xul('cmbLocal').selectedIndex = 0;
	this.selLocal();
};

AdministrarEstadosPlanes.prototype.selLocal = function () {
	var i = $Xul('cmbLocal').selectedIndex; 
	if(i >= 0){
		this.local = this.locales[i];
		this.periodoActivo = this.daoPeriodo.obtenerPeriodoActivo(this.local);
		var estados = this.dao.obtenerTodosSinDetalle(this.local);
		
		if(this.periodoActivo != null){
			$Xul('txtPerAct').val(this.periodoActivo.nombre);
			$Xul('btnAbrirPeriodo').disable();
			$Xul('btnCerrarPeriodo').enable();
		}else{
			$Xul('txtPerAct').val('--Ninguno--');			
			$Xul('btnCerrarPeriodo').disable();
			
			if(this.dao.exsistenEstadoEmitido(this.local)){
				$Xul('btnAbrirPeriodo').enable();
			}else{
				$Xul('btnAbrirPeriodo').disable();
			}			
		}
		
		if(estados.length > 0){
			$Xul('btnEstadoInicial').disable();
		}else{
			$Xul('btnEstadoInicial').enable();
		}
		 
		this.tree.clear();
		this.tree.setDatos(estados);		
	}
};

AdministrarEstadosPlanes.prototype.esInicial = function () {
	if(this.local != null){
		if(this.dao.existeEstadoSituacionInicial(this.local) == false){
			var c = confirm('No existe el estado de situación inicial.\Desea crearlo ahora?','Estado Inicial');			
			if(c){
				showWait('Creando');
				var model = {
						local : this.local,
						estadoPlan : new EstadoPlan() 
				};
				var features = "chrome,modal,dependent=true,dialog,centerscreen";
				window.openDialog("chrome://jfac/content/vista/contabilidad/CrearEstadoSituacionInicial.xul", "est-sit-ini", features, model);				
				if(model.estadoPlan.id > 0){
					this.tree.add(model.estadoPlan);
					$Xul('btnEstadoInicial').disable();
					$Xul('btnAbrirPeriodo').enable();
					$Xul('btnCerrarPeriodo').disable();
				}
			}
		}else{
			alert('Ya existe un estado de situación inicial');
		}
	}
};

AdministrarEstadosPlanes.prototype.abrirPeriodo = function () {		
	if(this.local != null){					
		if(this.periodoActivo == null){
			if(this.daoPeriodo.existenPeriodosPendientes(this.local)){
				if(this.dao.exsistenEstadoEmitido(this.local)){
					var features = "chrome,modal,dependent=true,dialog,centerscreen";
					window.openDialog("chrome://jfac/content/vista/contabilidad/AbrirPeriodoContable.xul", "abrir-periodo", features, this.local);
					this.selLocal();
				}else{
					alert('No existe el estado de situación inicial, o un estado de cierre de periodo.\n'+
						'Primero cree el estado de situación inicial, o cierre el periodo anterior.','Abrir Periodo');
				}
			}else{
				alert('Primero cree un periodo para poder abrirlo.','Abrir Periodo');
			}		
		}else{
			alert('Ya existe un periodo contable abierto.','Abrir Periodo');
		}
	}else{
		alert('Debe seleccionar un local');
	}
};

AdministrarEstadosPlanes.prototype.cerrarPeriodo = function () {		
	if(this.local != null){					
		if(this.periodoActivo != null){
			try {
				if(confirm('Desea cerrar el periodo ' + this.periodoActivo.nombre+' del local ' + this.local.nombre,'Cerrar Periodo')){
					showWait();
					var estadoPlan = this.dao.cerrarPeriodo(this.local, this.periodoActivo);
					if(estadoPlan != null){
						alert('El periodo ha sido cerrado','Cerrar Periodo');
						this.periodoActivo = null;
						$Xul('txtPerAct').val('--Ninguno--');
						this.tree.add(estadoPlan);
						this.selLocal();
					}
					closeWait();
				}
			} catch (e) {
				closeWait();
				alert(e);
			}
		}else{
			alert('No existe un periodo activo para este local: ' + this.local.nombre,'Cerrar Periodo');
		}
	}else{
		alert('Debe seleccionar un local','Cerrar Periodo');
	}
};

AdministrarEstadosPlanes.prototype.ver = function () {
	var us = this.tree.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarPeriodoContable.xul", "ixxi", features, us);		
	}else{
		alert("Debe seleccionar un Periodo Contable para editarlo");
	}
};