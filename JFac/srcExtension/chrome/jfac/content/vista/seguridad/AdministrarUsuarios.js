window.onload = function () {
	self = new AdministrarUsuarios();
};

function AdministrarUsuarios(){	
	this.dao = new UsuarioDao();
	this.treeUsuarios = new XulTree('treeUsuarios', ['id', 'cedula', 'login','isActivo', 'nombres','apellidos']);
	this.txtTexto = $Xul('txtTexto');
	this.inicializar();
};

AdministrarUsuarios.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', this.cmdBuscar, true);
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
	$Xul("txtTexto").addEventListener( 'keyup', this.keyBuscar, true);
};

AdministrarUsuarios.prototype.keyBuscar = function (event) {
	if(event.keyCode == 13){
		self.buscar();
	}
};
AdministrarUsuarios.prototype.cmdBuscar = function () {
	self.buscar();
};

AdministrarUsuarios.prototype.cmdEliminar = function () {
	self.eliminar();
};

AdministrarUsuarios.prototype.cmdNuevo = function () {
	self.nuevo();
};

AdministrarUsuarios.prototype.cmdEditar = function () {
	self.editar();
};

AdministrarUsuarios.prototype.buscar = function () {
	var texto = this.txtTexto.val;
	var criterio = $Xul('listaCriterios').val();
	
	var lista = new Array();
	var us = null;
	
	if(criterio == 'TODOS'){
		lista = this.dao.buscarTodos();
	}else{
		if(criterio == 'ID'){
			us = this.dao.buscarPorId(texto);
		}else{
			if(criterio == 'LOGIN'){
				us = this.dao.buscarPorLogin(texto);
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
	}
	if(us != null){
		lista.push(us);
	}
	this.treeUsuarios.setDatos(lista);
	this.txtTexto.select();
};

AdministrarUsuarios.prototype.eliminar = function () {
	var us = this.treeUsuarios.getSelected();
	if(us != null){
		if(confirm('Desea eliminar este usuario ' + us.login+'?','Eliminar')){
			var eliminado = this.dao.eliminar(us);
			if(eliminado){
				alert("Usuario eliminado: " + us.nombres + " " +us.apellidos);
				this.treeUsuarios.remove(us);
			}else{
				alert("No se pudo eliminar el Usuario seleccionado");
			}
		}
	}else{
		alert("Debe seleccionar un Usuario para eliminarlo");
	}
};

AdministrarUsuarios.prototype.nuevo = function () {
	var us = new Usuario();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/seguridad/EditarUsuario.xul", "ixxi", features, us);
	if(us.id > 0){
		this.treeUsuarios.add(us);
	}
};

AdministrarUsuarios.prototype.editar = function () {	
	var us = this.treeUsuarios.getSelected();
	if(us != null){
		us = this.dao.cargar(us.id);
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/seguridad/EditarUsuario.xul", "ixxi", features, us);
		this.dao.refresh(us);
		this.treeUsuarios.updateSelectedWithModel(us);
	}else{
		alert("Debe seleccionar un Usuario para editarlo");
	}
};
