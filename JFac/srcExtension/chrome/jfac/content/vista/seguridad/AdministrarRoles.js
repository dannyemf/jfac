window.onload = function () {
	self = new AdministrarRoles();
};

function AdministrarRoles(){
	this.dao = new RolDao();
	this.treeRoles = new XulTree('treeRoles', ['nombre', 'descripcion'],'id');
	this.inicializar();
	
	this.treeRoles.setDatos(this.dao.obtnerTodosRoles());
};

AdministrarRoles.prototype.inicializar = function () {
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
};

AdministrarRoles.prototype.cmdEliminar = function () {
	self.eliminar();
};

AdministrarRoles.prototype.cmdNuevo = function () {
	self.nuevo();
};

AdministrarRoles.prototype.cmdEditar = function () {
	self.editar();
};

AdministrarRoles.prototype.eliminar = function () {
	var us = this.treeRoles.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Rol eliminado: " + us.nombre);
			this.treeRoles.remove(us);
		}else{
			alert("No se pudo eliminar el Rol seleccionado");
		}
	}else{
		alert("Debe seleccionar un Rol para eliminarlo");
	}
};

AdministrarRoles.prototype.nuevo = function () {
	var us = new Rol();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/seguridad/EditarRol.xul", "ixxi", features, us);
	if(us.id > 0){
		this.treeRoles.add(us);
	}
};

AdministrarRoles.prototype.editar = function () {	
	var us = this.treeRoles.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/seguridad/EditarRol.xul", "ixxi", features, us);
		this.dao.refresh(us);
		this.treeRoles.updateSelected();
	}else{
		alert("Debe seleccionar un Rol para editarlo");
	}
};
