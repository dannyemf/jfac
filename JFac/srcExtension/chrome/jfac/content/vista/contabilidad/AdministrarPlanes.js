window.onload = function () {
	try {
		self = new AdministrarPlanes();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function AdministrarPlanes(){
	this.dao = new PlanDao();
	this.treeCuentasContables = new XulTree('treeCuentasContables', ['codigo', 'nombre', 'tipo'], 'id');
	this.inicializar();
	this.treeCuentasContables.setDatos(this.dao.obtnerTodos());
}; 

AdministrarPlanes.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', this.cmdNuevo, true);	
	$Xul('btnEditar').addEventListener('command', this.cmdEditar, true);
	$Xul('btnEliminar').addEventListener('command', this.cmdEliminar, true);
};

AdministrarPlanes.prototype.cmdEliminar = function () {
	self.eliminar();
};

AdministrarPlanes.prototype.cmdNuevo = function () {
	self.nuevo();
};

AdministrarPlanes.prototype.cmdEditar = function () {
	self.editar();
};

AdministrarPlanes.prototype.eliminar = function () {
	var us = this.treeCuentasContables.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Cuenta Contable eliminada: " + us.nombre, "Eliminar");
			this.treeCuentasContables.remove(us);
		}else{
			alert("No se pudo eliminar el plan de cuentas seleccionada", "Eliminar");
		}
	}else{
		alert("Debe seleccionar un plan de cuentas para eliminarla", "Eliminar");
	}
};

AdministrarPlanes.prototype.nuevo = function () {
	var cuenta = new Plan();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarPlan.xul", "ixxi", features, cuenta);
	if(cuenta.id > 0){
		this.treeCuentasContables.add(cuenta);
	}
};

AdministrarPlanes.prototype.editar = function () {
	var us = this.treeCuentasContables.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarPlan.xul", "ixxi", features, us);
		this.dao.refresh(us);
		this.treeCuentasContables.updateSelected();
	}else{
		alert("Debe seleccionar un plan de cuentas para editarla");
	}
};