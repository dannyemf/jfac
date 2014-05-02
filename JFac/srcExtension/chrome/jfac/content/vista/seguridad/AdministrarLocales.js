window.onload = function () {
	self = new AdministrarLocales();
};

function AdministrarLocales(){
	this.dao = new LocalDao();
	this.treeLocales = new XulTree('treeLocales', ['codigo', 'nombre', 'telefono','direccion'], 'id');
	this.treeLocales.setDatos(this.dao.obtenerTodos());
	this.inicializar();
};

AdministrarLocales.prototype.inicializar = function () {
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
};

AdministrarLocales.prototype.cmdEliminar = function () {
	self.eliminar();
};

AdministrarLocales.prototype.cmdNuevo = function () {
	self.nuevo();
};

AdministrarLocales.prototype.cmdEditar = function () {
	self.editar();
};

AdministrarLocales.prototype.eliminar = function () {
	var us = this.treeLocales.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Local eliminado: " + us.nombre);
			this.treeLocales.remove(us);
		}else{
			alert("No se pudo eliminar el local seleccionado");
		}
	}else{
		alert("Debe seleccionar un local para eliminarlo");
	}
};

AdministrarLocales.prototype.nuevo = function () {
	var us = new Local();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/seguridad/EditarLocal.xul", "ixxi", features, us);
	if(us.id > 0){
		this.treeLocales.add(us);
	}
};

AdministrarLocales.prototype.editar = function () {	
	var us = this.treeLocales.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/seguridad/EditarLocal.xul", "ixxi", features, us);
		this.dao.refresh(us);
		this.treeLocales.updateSelected();
	}else{
		alert("Debe seleccionar un local para editarlo");
	}
};
