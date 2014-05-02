window.onload = function () {
	try {
		self = new AdministrarTransacciones();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function AdministrarTransacciones(){
	this.dao = new TransaccionDao();
	this.tree = new XulTree('tree', ['codigo', 'descripcion', 'estado','fechaCreacion'], 'id');
	this.tree.setDateColumns([['fechaCreacion', 'yyyy-MM-dd']]);
	this.inicializar();
	this.tree.setDatos(this.dao.buscarTodos());
}; 

AdministrarTransacciones.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', this.cmdNuevo, true);	
	$Xul('btnEditar').addEventListener('command', this.cmdEditar, true);
	$Xul('btnEliminar').addEventListener('command', this.cmdEliminar, true);
};

AdministrarTransacciones.prototype.cmdEliminar = function () {self.eliminar();};
AdministrarTransacciones.prototype.cmdNuevo = function () {self.nuevo();};
AdministrarTransacciones.prototype.cmdEditar = function () {self.editar();};

AdministrarTransacciones.prototype.eliminar = function () {
	var model = this.tree.getSelected();
	if(model != null){
		if(confirm(model.codigo + '\nDesea eliminiar esta transacción?', 'Eliminar')){
			try {
				var eliminado = this.dao.eliminar(model);
				if(eliminado){
					this.tree.remove(model);
				}
			} catch (e) {
				alert("No se pudo eliminar la transacción seleccionada\n"+e, "Eliminar");
			}
		}
	}else{
		alert("Debe seleccionar una transacción para eliminarla", "Eliminar");
	}
};

AdministrarTransacciones.prototype.nuevo = function () {
	var model = new Transaccion();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarTransaccion.xul", "ixxi", features, model);
	if(model.id > 0){
		this.tree.add(model);
	}
};

AdministrarTransacciones.prototype.editar = function () {
	var model = this.tree.getSelected();
	if(model != null){
		model = this.dao.cargar(model.id);
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarTransaccion.xul", "ixxi", features, model);
		this.dao.refresh(model);
		this.tree.updateSelectedWithModel(model);
	}else{
		alert("Debe seleccionar una transacción para editarla");
	}
};