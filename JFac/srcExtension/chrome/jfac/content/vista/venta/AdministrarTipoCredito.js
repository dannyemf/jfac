window.onload = function () {
	self = new AdministrarTipoCredito();
};

function AdministrarTipoCredito(){
	this.dao = new TipoCreditoDao();
	this.treeTipoCredito = new XulTree('treeTipoCredito', ['id', 'descripcion', 'tipo', 'numeroCuotas', 'interes', 'mora'],'id');
	this.inicializar();
};

AdministrarTipoCredito.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', this.cmdBuscar, true);
	$Xul("btnNuevo").addEventListener( 'command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener( 'command', this.cmdEliminar, true);
	$Xul("btnEditar").addEventListener( 'command', this.cmdEditar, true);
	$Xul("txtTexto").addEventListener( 'keyup', this.keyBuscar, true);
};

AdministrarTipoCredito.prototype.keyBuscar = function (event) {
	if(event.keyCode == 13){
		self.buscar();
	}
};
AdministrarTipoCredito.prototype.cmdBuscar = function () {
	self.buscar();
};

AdministrarTipoCredito.prototype.cmdEliminar = function () {
	self.eliminar();
};

AdministrarTipoCredito.prototype.cmdNuevo = function () {
	self.nuevo();
};

AdministrarTipoCredito.prototype.cmdEditar = function () {
	self.editar();
};

AdministrarTipoCredito.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();
	
	var lista = new Array();
	
	if(criterio == 'TODOS'){
		lista = this.dao.buscarTodos();
	}else{
		if(criterio == 'DESCRIPCION'){
			lista = this.dao.buscarPorDescripcion(criterio);
		}
	}
	
	this.treeTipoCredito.setDatos(lista);
	$Xul('txtTexto').select();
};

AdministrarTipoCredito.prototype.eliminar = function () {
	var us = this.treeTipoCredito.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Tipo de crédito eliminado: " + us.descripcion);
			this.treeTipoCredito.remove(us);
		}else{
			alert("No se pudo eliminar el Tipo de crédito seleccionado");
		}
	}else{
		alert("Debe seleccionar un Tipo de crédito para eliminarlo");
	}
};

AdministrarTipoCredito.prototype.nuevo = function () {
	var us = new TipoCredito();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/venta/EditarTipoCredito.xul", "ixxi", features, us);
	if(us.id > 0){
		this.treeTipoCredito.add(us);
	}
};

AdministrarTipoCredito.prototype.editar = function () {	
	var us = this.treeTipoCredito.getSelected();
	if(us != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/venta/EditarTipoCredito.xul", "ixxi", features, us);
		this.dao.refresh(us);
		this.treeTipoCredito.updateSelected();
	}else{
		alert("Debe seleccionar un Tipo de crédito para editarlo");
	}
};