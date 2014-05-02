window.onload = function () {
	self = new AdministrarRetencionesIva();
};

function AdministrarRetencionesIva(){
	this.dao = new RetencionDao();
	this.tree = new XulTree('tree', ['tipoAgenteRetencion', 'tipoProveedor', 'porcentajeBien',['planBien.codigo','planBien.nombre'],'porcentajeServicio', ['planServicio.codigo','planServicio.nombre']], 'id');
	this.tree.setDatos(this.dao.obtenerRetencionesIva());
	this.inicializar();
};

AdministrarRetencionesIva.prototype.inicializar = function () {
	$Xul("btnNuevo").addEventListener( 'command', function(){self.nuevo();}, true);	
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
	$Xul("btnEliminar").addEventListener( 'command', function(){self.eliminar();}, true);
};

AdministrarRetencionesIva.prototype.eliminar = function () {
	var us = this.tree.getSelected();
	if(us != null){
		if(confirm('Desea eliminar esta configuración de retención','Eliminar')){
			var eliminado = this.dao.eliminarRetencionIva(us);
			if(eliminado){
				this.tree.remove(us);
			}else{
				alert("No se pudo eliminar la configuración seleccionado");
			}
		}
	}else{
		alert("Debe seleccionar una configuración para eliminarla");
	}
};

AdministrarRetencionesIva.prototype.nuevo = function () {
	var us = new RetencionIva();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarRetencionIva.xul", "editar-retencion-iva", features, us);
	if(us.id > 0){
		this.tree.add(us);
	}
};

AdministrarRetencionesIva.prototype.editar = function () {	
	var us = this.tree.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarRetencionIva.xul", "editar-retencion-iva", features, us);
		this.dao.refresh(us);
		this.tree.updateSelected();
	}else{
		alert("Debe seleccionar una configuración para editarla");
	}
};
