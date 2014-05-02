window.onload = function () {
	self = new AdministrarProveedores();
};

function AdministrarProveedores(){
	this.dao = new ProveedorDao();
	this.treeProveedores = new XulTree('treeProveedores', ['id', 'identificacion', 'razonSocial','contacto', 'telefono','fax','celular']);
	this.txtTexto = $Xul('txtTexto');
	this.inicializar();
};

AdministrarProveedores.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', this.cmdBuscar, true);
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
	$Xul("txtTexto").addEventListener( 'keyup', this.keyBuscar, true);
};

AdministrarProveedores.prototype.keyBuscar = function (event) {
	if(event.keyCode == 13){
		self.buscar();
	}
};

AdministrarProveedores.prototype.cmdBuscar = function () {self.buscar();};
AdministrarProveedores.prototype.cmdEliminar = function () {self.eliminar();};
AdministrarProveedores.prototype.cmdNuevo = function () {self.nuevo();};
AdministrarProveedores.prototype.cmdEditar = function () {self.editar();};

AdministrarProveedores.prototype.buscar = function () {
	var texto = this.txtTexto.val();
	var criterio = $Xul('listaCriterios').val();
	
	var lista = new Array();
	var us = null;
	
	if(criterio == 'TODOS'){
		lista = this.dao.buscarTodos();
	}else{
		if(criterio == 'ID'){
			us = this.dao.buscarPorId(texto);
		}else{
			if(criterio == 'IDENTIFICACION'){
				lista = this.dao.buscarPorIdentificacion(texto);
			}else{
				if(criterio == 'RAZON'){
					lista = this.dao.buscarPorRazon(texto);
				}
			}
		}
	}
	if(us != null){
		lista.push(us);
	}
	this.treeProveedores.setDatos(lista);
	this.txtTexto.select();
};

AdministrarProveedores.prototype.eliminar = function () {
	var us = this.treeProveedores.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Proveedor eliminado: " + us.razonSocial);
			this.treeProveedores.remove(us);
		}else{
			alert("No se pudo eliminar el Proveedor seleccionado");
		}
	}else{
		alert("Debe seleccionar un Proveedor para eliminarlo");
	}
};

AdministrarProveedores.prototype.nuevo = function () {
	var us = new Proveedor();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/compra/EditarProveedor.xul", "ixxi", features, us);
	if(us.id > 0){
		this.treeProveedores.add(us);
	}
};

AdministrarProveedores.prototype.editar = function () {	
	var us = this.treeProveedores.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/compra/EditarProveedor.xul", "ixxi", features, us);
		this.dao.refresh(us);
		this.treeProveedores.updateSelected();
	}else{
		alert("Debe seleccionar un Proveedor para editarlo");
	}
};