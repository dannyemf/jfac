window.onload = function () {
	self = new AdministrarLineas();
};

function AdministrarLineas(){
	this.dao = new LineaDao();
	this.marcaEdicion = new Marca();
	this.treeLineas = new XulTree('treeLineas', ['codigo','nombre'],'id');
	this.inicializar();
	this.treeLineas.setDatos(this.dao.obtnerTodos());
	this.nuevo();
}; 

AdministrarLineas.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', this.cmdNuevo, true);
	$Xul('btnEliminar').addEventListener('command', this.cmdEliminar, true);
	$Xul('btnGuardar').addEventListener('command', this.cmdGuardar, true);
	$Xul("treeLineas").addEventListener('select', this.cmdEditar, false);
};

AdministrarLineas.prototype.cmdEliminar = function () {
	self.eliminar();
};

AdministrarLineas.prototype.cmdNuevo = function () {
	self.nuevo();
};

AdministrarLineas.prototype.cmdEditar = function () {
	self.editar();
};
AdministrarLineas.prototype.cmdGuardar = function () {
	self.guardar();
};

AdministrarLineas.prototype.eliminar = function () {
	var us = this.treeLineas.getSelected();
	if(us != null){
		var eliminado = this.dao.eliminar(us);
		if(eliminado){
			this.treeLineas.remove(us);
			alert("Línea eliminada: " + us.nombre);
		}else{
			alert("No se pudo eliminar la Línea seleccionada");
		}
	}else{
		alert("Debe seleccionar una Línea para eliminarla");
	}
};

AdministrarLineas.prototype.nuevo = function () {
	this.marcaEdicion = new Linea();
	$Xul('txtCodigo').val('');
	$Xul('txtNombre').val('');
};

AdministrarLineas.prototype.editar = function () {
	try {
		var us = this.treeLineas.getSelected();
		if(us != null){
			this.marcaEdicion = us;
		}else{
			this.marcaEdicion = new Linea();
		}
		$Xul('txtNombre').val(us.nombre);
		$Xul('txtCodigo').val(us.codigo);
	} catch (e) {}
};

AdministrarLineas.prototype.guardar = function () {
	var a = validar();
	if(a){
		var v =$Xul('txtNombre').val(); 
		var c =$Xul('txtCodigo').val();
		if(this.marcaEdicion != null){	
			this.marcaEdicion.nombre = v;
			this.marcaEdicion.codigo = c;
			
			var existe = this.dao.existe(this.marcaEdicion);
			if(existe == false){
				this.dao.guardar(this.marcaEdicion);
				this.treeLineas.setDatos(this.dao.obtnerTodos());
				this.nuevo();
			}else{
				alert("Ya existe una línea con el mismo código", "Guardar");
			}
		}
	}
};
