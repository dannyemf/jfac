window.onload = function () {
	self = new AdministrarMarcas();
};

function AdministrarMarcas(){
	this.dao = new MarcaDao();
	this.marcaEdicion = null;
	
	this.treeMarcas = new XulTree('treeMarcas', ['id', 'nombre']);
	this.txtNombre = null;
	this.inicializar();
	this.treeMarcas.setDatos(this.dao.obtnerTodos());
	this.nuevo();
};

AdministrarMarcas.prototype.inicializar = function () {
	this.txtNombre = $Xul('txtNombre');
	$Xul("btnNuevo").addEventListener('command', this.cmdNuevo, true);
	$Xul("btnEliminar").addEventListener('command', this.cmdEliminar, true);
	$Xul("btnGuardar").addEventListener('command', this.cmdGuardar, true);
	$Xul("treeMarcas").addEventListener('select', this.cmdEditar, false);
};

AdministrarMarcas.prototype.cmdEliminar = function () {
	self.eliminar();
};

AdministrarMarcas.prototype.cmdNuevo = function () {
	self.nuevo();
};

AdministrarMarcas.prototype.cmdEditar = function () {
	self.editar();
};
AdministrarMarcas.prototype.cmdGuardar = function () {
	self.guardar();
};

AdministrarMarcas.prototype.eliminar = function () {
	var us = this.treeMarcas.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			alert("Marca eliminada: " + us.nombre);
			this.treeMarcas.remove(us);
		}else{
			alert("No se pudo eliminar la Marca seleccionada");
		}
	}else{
		alert("Debe seleccionar un marca para eliminarla");
	}
};


AdministrarMarcas.prototype.nuevo = function () {
	this.marcaEdicion = new Marca();
	$Xul('txtNombre').val('');
};

AdministrarMarcas.prototype.editar = function () {
	try {
		var us = this.treeMarcas.getSelected();
		if(us != null){
			this.marcaEdicion = us;
		}else{
			this.marcaEdicion = new Marca();
		}
		$Xul('txtNombre').val(us.nombre);
	} catch (e) {}
};

AdministrarMarcas.prototype.guardar = function () {
	try {
		var a = validar();
		if(a){
			var v = $Xul('txtNombre').val();
			if(this.marcaEdicion != null){	
				this.marcaEdicion.nombre = v;
				this.dao.guardar(this.marcaEdicion);
				this.treeMarcas.setDatos(this.dao.obtnerTodos());
				this.nuevo();
			}
		}
	} catch (e) {
		alert(e);
	}
};
