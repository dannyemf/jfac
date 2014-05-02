window.onload = function () {
	self = new DialogoClientes();
};

function DialogoClientes(){
	this.dao = new ClienteDao();
	
	this.funcion = window.arguments[0];
	
	this.treeClientes = new XulTree('treeClientes', ['id','cedula', 'nombres', 'apellidos', 'direccion', 'telefono', 'celular', 'fax', 'mail'],'id');
	this.inicializar();
};

DialogoClientes.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', this.cmdBuscar, true);
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
	$Xul("txtTexto").addEventListener( 'keyup', this.keyBuscar, true);
	
	$Xul('treeClientes').addEventListener( 'dblclick', function(e){
		self.seleccionar();
	}, true);
	
	$Xul('treeClientes').addEventListener( 'keyup', function(e){
		if(e.keyCode == 13){
			self.seleccionar();
		}		
	}, true);
};

DialogoClientes.prototype.keyBuscar = function (event) {
	if(event.keyCode == 13){
		self.buscar();
	}
};
DialogoClientes.prototype.cmdBuscar = function () {
	self.buscar();
};

DialogoClientes.prototype.cmdEliminar = function () {
	self.eliminar();
};

DialogoClientes.prototype.cmdNuevo = function () {
	self.nuevo();
};

DialogoClientes.prototype.cmdEditar = function () {
	self.editar();
};

DialogoClientes.prototype.seleccionar = function () {
	var dato = this.treeClientes.getSelected();
	if(dato){
		try {
			if(this.funcion(dato)){
				window.close();
			}
		} catch (e) {
			alert("No funcion: " + e);
		}
	}
};

DialogoClientes.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();
	
	var lista = new Array();
	var us = null;
	
	if(criterio == 'TODOS'){
		lista = this.dao.buscarTodos();
	}else{
		if(criterio == 'ID'){
			us = this.dao.buscarPorId(texto);
		}else{
			if(criterio == 'CEDULA'){
				lista = this.dao.buscarPorCedula(texto);
			}else{
				if(criterio == 'NOMBRES'){
					lista = this.dao.buscarPorNombres(texto);
				}else{
					if(criterio == 'APELLIDOS'){
						lista = this.dao.buscarPorApellidos(texto);
					}
				}
			}			
		}
	}
	if(us != null){
		lista.push(us);
	}
	this.treeClientes.setDatos(lista);
	$Xul("txtTexto").select();
};

DialogoClientes.prototype.eliminar = function () {
	var us = this.treeClientes.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Cliente eliminado: " + us.nombres + " " +us.apellidos);
			this.treeClientes.remove(us);
		}else{
			alert("No se pudo eliminar el Cliente seleccionado");
		}
	}else{
		alert("Debe seleccionar un Cliente para eliminarlo");
	}
};

DialogoClientes.prototype.nuevo = function () {
	var us = new Cliente();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/cliente/EditarCliente.xul", "ixxi", features, us);
	if(us.id > 0){
		this.treeClientes.add(us);
	}
};

DialogoClientes.prototype.editar = function () {	
	var us = this.treeClientes.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/cliente/EditarCliente.xul", "ixxi", features, us);
		this.dao.refresh(us);
		this.treeClientes.updateSelected();
	}else{
		alert("Debe seleccionar un Cliente para editarlo");
	}
};