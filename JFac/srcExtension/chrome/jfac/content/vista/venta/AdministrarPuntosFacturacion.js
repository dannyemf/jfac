window.onload = function () {
	self = new AdministrarPuntosFacturacion();
};

function AdministrarPuntosFacturacion(){
	this.dao = new PuntoFacturacionDao();
	this.tree = new XulTree('tree', ['codigo','nombre','local.codigo','local.nombre'],'id');
	this.inicializar();
	this.tree.setDatos(this.dao.obtenerTodos());
}; 

AdministrarPuntosFacturacion.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', function(){self.nuevo();}, true);
	$Xul('btnEditar').addEventListener('command', function(){self.editar();}, true);
	$Xul('btnEliminar').addEventListener('command', function(){self.eliminar();}, true);
};

AdministrarPuntosFacturacion.prototype.eliminar = function () {
	var us = this.tree.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			this.tree.remove(us);
			alert("El punto de facturación ha sido eliminado: " + us.nombre);
		}else{
			alert("No se pudo eliminar el punto de facturacion seleccionado");
		}
	}else{
		alert("Debe seleccionar un punto de facturación");
	}
};

AdministrarPuntosFacturacion.prototype.nuevo = function () {	
	var model = new PuntoFacturacion();
	var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
	window.openDialog("chrome://jfac/content/vista/venta/EditarPuntoFacturacion.xul", "ixxi", features, model);
	if(model.id > 0){
		this.tree.add(model);
	}
};

AdministrarPuntosFacturacion.prototype.editar = function () {
	var model = this.tree.getSelected();
	if(model != null){
		var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
		window.openDialog("chrome://jfac/content/vista/venta/EditarPuntoFacturacion.xul", "ixxi", features, model);
		this.dao.refresh(model);
		this.tree.updateSelected();
	}else{
		alert("Debe seleccionar un punto de facturación", "Editar");
	}
};
