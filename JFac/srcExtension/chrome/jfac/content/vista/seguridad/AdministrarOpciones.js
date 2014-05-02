window.onload = function () {
	self = new AdministrarOpciones();
};

function AdministrarOpciones(){
	this.dao = new OpcionDao();
	this.treeOpciones = new XulTree('treeOpciones', ['codigo', 'padre', 'modulo','etiqueta','codigoVentana'],'id');
	this.inicializar();
	
	this.treeOpciones.setDatos(this.dao.obtnerTodosOpciones());
};

AdministrarOpciones.prototype.inicializar = function () {
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
};

AdministrarOpciones.prototype.cmdEliminar = function () {
	self.eliminar();
};

AdministrarOpciones.prototype.cmdNuevo = function () {
	self.nuevo();
};

AdministrarOpciones.prototype.cmdEditar = function () {
	self.editar();
};

AdministrarOpciones.prototype.eliminar = function () {
	var us = this.treeOpciones.getSelected();
	if(us != null){
		if(confirm('Desea eliminar esta opción ' + us.codigo,'Eliminar')){
			var eliminado = this.dao.eliminar(us);
			if(eliminado){
				this.treeOpciones.remove(us);
			}else{
				alert("No se pudo eliminar la Opción seleccionada");
			}
		}
	}else{
		alert("Debe seleccionar una Opción para eliminarla");
	}
};

AdministrarOpciones.prototype.nuevo = function () {
	var us = new Opcion();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/seguridad/EditarOpcion.xul", "ixxi", features, us);
	if(us.id > 0){
		this.treeOpciones.add(us);
	}
};

AdministrarOpciones.prototype.editar = function () {	
	var us = this.treeOpciones.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/seguridad/EditarOpcion.xul", "ixxi", features, us);		
		this.treeOpciones.setDatos(this.dao.obtnerTodosOpciones());
	}else{
		alert("Debe seleccionar una Opción para editarla");
	}
};
