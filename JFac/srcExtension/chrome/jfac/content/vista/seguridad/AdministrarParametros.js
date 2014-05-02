window.onload = function () {
	self = new AdministrarParametros();
};

function AdministrarParametros(){
	this.dao = new ParametroDao();
	this.treeParametros = new XulTree('treeParametros', ['codigo','tipo', 'valor', 'descripcion']);
	this.inicializar();
	
	this.treeParametros.setDatos(this.dao.obtenerTodos());
};

AdministrarParametros.prototype.inicializar = function () {
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);	
};

AdministrarParametros.prototype.cmdNuevo = function () {self.nuevo();};
AdministrarParametros.prototype.cmdEditar = function () {self.editar();};
AdministrarParametros.prototype.cmdEliminar = function () {self.eliminar();};

AdministrarParametros.prototype.editar = function () {	
	var prm = this.treeParametros.getSelected();
	if(prm != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/seguridad/EditarParametro.xul", "ixxi", features, prm);
		if(prm.guardado == true){
			this.dao.refresh(prm);
			this.treeParametros.updateSelected();
		}
	}else{
		alert("Debe seleccionar un Parámetro para editarlo");
	}
};

AdministrarParametros.prototype.eliminar = function () {	
	var prm = this.treeParametros.getSelected();
	if(prm != null){		
		if(prm.isEditable == true){
			if(confirm('Desea eliminar este parámetro?','Eliminar')){
				var b = this.dao.deletee(prm);
				if(b){
					this.treeParametros.remove(prm);
				}
				}
		}else{
			alert('Este parámetro no puede eliminarse', 'Eliminar');
		}
	}else{
		alert("Debe seleccionar un Parámetro para eliminarlo");
	}
};

AdministrarParametros.prototype.nuevo = function () {	
	var prm = new Parametro();	
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/seguridad/EditarParametro.xul", "ixxi", features, prm);
	if(prm.guardado == true){
		this.treeParametros.add(prm);
	}
};