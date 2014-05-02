window.onload = function () {
	self = new AdministrarReportes();
};

function AdministrarReportes(){
	this.dao = new ReporteDao();
	this.treeReportes = new XulTree('treeReportes', ['nombre', 'titulo','descripcion'],'id');
	this.txtTexto = $Xul('txtTexto');
	this.inicializar();
};

AdministrarReportes.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', this.cmdBuscar, true);
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
	$Xul("btnEjecutar").addEventListener( 'command', this.cmdEjecutar, true);
	$Xul("txtTexto").addEventListener( 'keyup', this.keyBuscar, true);
};

AdministrarReportes.prototype.keyBuscar = function (event) {
	if(event.keyCode == 13){
		self.buscar();
	}
};

AdministrarReportes.prototype.cmdBuscar = function () {self.buscar();};
AdministrarReportes.prototype.cmdEliminar = function () {self.eliminar();};
AdministrarReportes.prototype.cmdNuevo = function () {self.nuevo();};
AdministrarReportes.prototype.cmdEditar = function () {self.editar();};
AdministrarReportes.prototype.cmdEjecutar = function () {self.ejecutar();};

AdministrarReportes.prototype.buscar = function () {
	var texto = this.txtTexto.val();		
	var lista = new Array();	
	lista = this.dao.buscarPorTexto(texto);	
	this.treeReportes.setDatos(lista);
	this.txtTexto.select();
};

AdministrarReportes.prototype.eliminar = function () {
	var rep = this.treeReportes.getSelected();
	if(rep != null){
		if(confirm('¿Desea eliminar este reporte: '+rep.nombre+'?','Eliminar')){
			var eliminado = this.dao.eliminar(rep);
			if(eliminado){
				alert("Reporte eliminado: " + rep.nombre);
				this.treeReportes.remove(rep);
			}else{
				alert("No se pudo eliminar el reporte seleccionado");
			}
		}
	}else{
		alert("Debe seleccionar un reporte para eliminarlo");
	}
};

AdministrarReportes.prototype.nuevo = function () {
	var rep = new Reporte();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/reporte/generador/Generador.xul", "ixxi", features, rep);
	if(rep.id > 0){
		this.treeReportes.add(rep);
	}
};

AdministrarReportes.prototype.editar = function () {	
	var rep = this.treeReportes.getSelected();
	if(rep != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/reporte/generador/Generador.xul", "ixxi", features, rep);
		this.dao.refresh(rep);
		this.treeReportes.updateSelected();
	}else{
		alert("Debe seleccionar un reporte para editarlo");
	}
};

AdministrarReportes.prototype.ejecutar = function () {	
	var rep = this.treeReportes.getSelected();
	if(rep != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/reporte/generador/Ejecutar.xul", "ixxi", features, rep);	
	}else{
		alert("Debe seleccionar un reporte para ejecutarlo");
	}
};