window.onload = function () {
	self = new AdministrarAutorizacionesSri();
};

function AdministrarAutorizacionesSri(){
	this.dao = new AutorizacionSriDao();
	this.tree = new XulTree('tree', ['numero','estado','fechaInicio','fechaFin'],'id');
	this.tree.setDateColumns([['fechaInicio','yyyy-MM-dd'], ['fechaFin','yyyy-MM-dd']]);
	this.inicializar();
	this.tree.setDatos(this.dao.obtenerTodos());
}; 

AdministrarAutorizacionesSri.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', function(){self.nuevo();}, true);
	$Xul('btnEditar').addEventListener('command', function(){self.editar();}, true);
	$Xul('btnEliminar').addEventListener('command', function(){self.eliminar();}, true);
};

AdministrarAutorizacionesSri.prototype.eliminar = function () {
	var us = this.tree.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			this.tree.remove(us);
			alert("La autorización sri ha sido eliminada: " + us.numero);
		}else{
			alert("No se pudo eliminar la autorización sri");
		}
	}else{
		alert("Debe seleccionar una autorización sri");
	}
};

AdministrarAutorizacionesSri.prototype.nuevo = function () {	
	var model = new AutorizacionSri();
	var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
	window.openDialog("chrome://jfac/content/vista/venta/EditarAutorizacionSri.xul", "ixxi", features, model);
	if(model.id > 0){
		this.tree.add(model);
	}
};

AdministrarAutorizacionesSri.prototype.editar = function () {
	var model = this.tree.getSelected();	
	if(model != null){
		var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
		window.openDialog("chrome://jfac/content/vista/venta/EditarAutorizacionSri.xul", "ixxi", features, model);
		this.dao.refresh(model);
		this.tree.updateSelected();
	}else{
		alert("Debe seleccionar una autorización", "Editar");
	}
};
