window.onload = function () {
	self = new AdministrarFacturaSecuenciales();
};

function AdministrarFacturaSecuenciales(){
	this.dao = new FacturaSecuencialDao();
	this.tree = new XulTree('tree', [['punto.codigo','punto.nombre'],'autorizacion.numero','tipoDocumento','desde','hasta','secuencial'],'id');
	this.inicializar();
	this.tree.setDatos(this.dao.obtenerTodos());
}; 

AdministrarFacturaSecuenciales.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', function(){self.nuevo();}, true);
	$Xul('btnEditar').addEventListener('command', function(){self.editar();}, true);
	$Xul('btnEliminar').addEventListener('command', function(){self.eliminar();}, true);
};

AdministrarFacturaSecuenciales.prototype.eliminar = function () {
	var us = this.tree.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			this.tree.remove(us);
			alert("El secuencial ha sido eliminado: " + us.secuencial);
		}else{
			alert("No se pudo eliminar el secuencial");
		}
	}else{
		alert("Debe seleccionar un secuencial");
	}
};

AdministrarFacturaSecuenciales.prototype.nuevo = function () {	
	var model = new FacturaSecuencial();
	var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
	window.openDialog("chrome://jfac/content/vista/venta/EditarFacturaSecuencial.xul", "ixxi", features, model);
	if(model.id > 0){
		this.tree.add(model);
	}
};

AdministrarFacturaSecuenciales.prototype.editar = function () {
	var model = this.tree.getSelected();
	if(model != null){
		var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
		window.openDialog("chrome://jfac/content/vista/venta/EditarFacturaSecuencial.xul", "ixxi", features, model);
		this.dao.refresh(model);
		this.tree.updateSelected();
	}else{
		alert("Debe seleccionar un secuencial", "Editar");
	}
};
