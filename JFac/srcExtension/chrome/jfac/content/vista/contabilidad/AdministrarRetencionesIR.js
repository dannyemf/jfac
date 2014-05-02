window.onload = function () {
	try {
		self = new AdministrarRetencionesIR();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function AdministrarRetencionesIR(){
	this.dao = new RetencionDao();
	this.treeRetenciones = new XulTree('treeRetenciones', ['codigo', 'descripcion','nombreCorto', 'porcentajeRetencion',['plan.codigo','plan.nombre']], 'id');
	this.inicializar();
	this.treeRetenciones.setDatos(this.dao.obtenerRetencionesIR());
}; 

AdministrarRetencionesIR.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', this.cmdNuevo, true);	
	$Xul('btnEditar').addEventListener('command', this.cmdEditar, true);
	$Xul('btnEliminar').addEventListener('command', this.cmdEliminar, true);
};

AdministrarRetencionesIR.prototype.cmdEliminar = function () { self.eliminar(); };
AdministrarRetencionesIR.prototype.cmdNuevo = function () { self.nuevo(); };
AdministrarRetencionesIR.prototype.cmdEditar = function () { self.editar(); };

AdministrarRetencionesIR.prototype.eliminar = function () {
	var retencion = this.treeRetenciones.getSelected();
	if(retencion != null){
		var eliminado = this.dao.eliminarRetencionIR(retencion);
		if(eliminado){
			alert("Retención IR eliminada: " + retencion.codigo + " " + retencion.nombreCorto, "Eliminar");
			this.treeRetenciones.remove(retencion);
		}else{
			alert("No se pudo eliminar la Retención IR seleccionada", "Eliminar");
		}
	}else{
		alert("Debe seleccionar una Retención IR para eliminarla", "Eliminar");
	}
};

AdministrarRetencionesIR.prototype.nuevo = function () {
	var retencion = new RetencionIR();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarRetencionIR.xul", "ixxi", features, retencion);
	if(retencion.id > 0){
		this.treeRetenciones.add(retencion);
	}
};

AdministrarRetencionesIR.prototype.editar = function () {
	var retencionIR = this.treeRetenciones.getSelected();
	if(retencionIR != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarRetencionIR.xul", "ixxi", features, retencionIR);
		this.dao.refresh(retencionIR);
		this.treeRetenciones.updateSelected();
	}else{
		alert("Debe seleccionar una Retención IR para editarla");
	}
};