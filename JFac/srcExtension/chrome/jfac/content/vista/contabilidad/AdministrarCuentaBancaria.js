window.onload = function () {
	self = new AdministrarCuentaBancaria();
};

function AdministrarCuentaBancaria(){
	this.dao = new CuentaBancariaDao();
	this.tree = new XulTree('tree', ['banco.nombre', 'numero', 'tipo'], 'id');
	this.tree.setDatos(this.dao.buscarTodos());
	this.inicializar();
};

AdministrarCuentaBancaria.prototype.inicializar = function () {
	$Xul("btnNuevo").addEventListener( 'command', function(){self.nuevo();}, true);
	$Xul("btnEliminar").addEventListener( 'command', function(){self.eliminar();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
};

AdministrarCuentaBancaria.prototype.eliminar = function () {
	var us = this.tree.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Local eliminado: " + us.nombre);
			this.tree.remove(us);
		}else{
			alert("No se pudo eliminar la cuenta seleccionado");
		}
	}else{
		alert("Debe seleccionar una cuenta para eliminarla");
	}
};

AdministrarCuentaBancaria.prototype.nuevo = function () {
	var us = new CuentaBancaria();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarCuentaBancaria.xul", "editar-banco", features, us);
	
	if(us.id > 0){
		this.dao.refresh(us);
		this.tree.add(us);
	}
};

AdministrarCuentaBancaria.prototype.editar = function () {	
	var us = this.tree.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarCuentaBancaria.xul", "editar-banco", features, us);
		this.dao.refresh(us);
		this.tree.updateSelected();
	}else{
		alert("Debe seleccionar una cuenta para editarla");
	}
};
