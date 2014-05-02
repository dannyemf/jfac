window.onload = function () {
	self = new AdministrarPeriodosContables();
};

function AdministrarPeriodosContables(){
	this.dao = new PeriodoContableDao();
	
	this.treePeriodosContables = new XulTree('treePeriodosContables', ['id', 'nombre', 'fechaInicial', 'fechaFinal'], 'id');
	this.treePeriodosContables.setDateColumns([['fechaInicial','yyyy-MM-dd 00:00:00'], ['fechaFinal','yyyy-MM-dd 00:00:00']]);
	this.inicializar();
	this.treePeriodosContables.setDatos(this.dao.obtenerTodos());
}; 

AdministrarPeriodosContables.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', this.cmdNuevo, true);	
	$Xul('btnEditar').addEventListener('command', this.cmdEditar, true);
	$Xul('btnEliminar').addEventListener('command', this.cmdEliminar, true);
};

AdministrarPeriodosContables.prototype.cmdEliminar = function () {self.eliminar();};
AdministrarPeriodosContables.prototype.cmdNuevo = function () {self.nuevo();};
AdministrarPeriodosContables.prototype.cmdEditar = function () {self.editar();};

AdministrarPeriodosContables.prototype.eliminar = function () {
	var us = this.treePeriodosContables.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Periodo Contable eliminado: " + us.nombre);
			this.treePeriodosContables.remove(us);
		}else{
			alert("No se pudo eliminar el Periodo Contable seleccionado");
		}
	}else{
		alert("Debe seleccionar un Periodo Contable para eliminarlo");
	}
};

AdministrarPeriodosContables.prototype.nuevo = function () {
	var periodo = new PeriodoContable();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarPeriodoContable.xul", "ixxi", features, periodo);
	if(periodo.id > 0){
		this.treePeriodosContables.add(periodo);
	}
};

AdministrarPeriodosContables.prototype.editar = function () {
	var us = this.treePeriodosContables.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarPeriodoContable.xul", "ixxi", features, us);
		this.dao.refresh(us);
		this.treePeriodosContables.updateSelected();
	}else{
		alert("Debe seleccionar un Periodo Contable para editarlo");
	}
};