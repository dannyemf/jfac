window.onload = function () {
	self = new AdministrarBancos();
};

function AdministrarBancos(){
	this.dao = new BancoDao();
	this.tree = new XulTree('tree', ['codigo', 'nombre', 'estado == true || dat.estao == 1 ? "Activo" : "Inactivo"', 'utilizaEmpreza == true || dat.utilizaEmpresa == 1 ? "Si" : "No"'], 'id');
	this.tree.setDatos(this.dao.buscarTodos());
	this.inicializar();
};

AdministrarBancos.prototype.inicializar = function () {
	$Xul("btnNuevo").addEventListener( 'command', function(){self.nuevo();}, true);
	$Xul("btnEliminar").addEventListener( 'command', function(){self.eliminar();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
};

AdministrarBancos.prototype.eliminar = function () {
	var us = this.tree.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Banco eliminado: " + us.nombre);
			this.tree.remove(us);
		}else{
			alert("No se pudo eliminar el banco seleccionado");
		}
	}else{
		alert("Debe seleccionar un banco para eliminarlo");
	}
};

AdministrarBancos.prototype.nuevo = function () {
	var us = new Banco();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarBanco.xul", "editar-banco", features, us);
	if(us.id > 0){
		this.tree.add(us);
	}
};

AdministrarBancos.prototype.editar = function () {	
	var us = this.tree.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarBanco.xul", "editar-banco", features, us);
		this.dao.refresh(us);
		this.tree.updateSelected();
	}else{
		alert("Debe seleccionar un banco para editarlo");
	}
};
