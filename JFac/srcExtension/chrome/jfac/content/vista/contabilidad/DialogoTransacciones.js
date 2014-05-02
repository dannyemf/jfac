window.onload = function () {
	try {
		self = new DialogoTransacciones();			
	} catch (e) {
		alert(e);
	}
};

function DialogoTransacciones(){
	this.dao = new TransaccionDao();
	this.funcion = window.arguments[0];
	this.tree = new XulTree('tree', ['codigo', 'descripcion', 'estado','fechaCreacion'], 'id');
	this.tree.setDateColumns([['fechaCreacion', 'yyyy-MM-dd']]);
	this.inicializar();
	this.tree.setDatos(this.dao.buscarTodos());
}; 

DialogoTransacciones.prototype.inicializar = function () {
	$Xul('btnAceptar').addEventListener('command', function(){self.aceptar();}, true);	
	$Xul('btnCancelar').addEventListener('command', function(){self.cancelar();}, true);
};

DialogoTransacciones.prototype.aceptar = function () {
	try {
		var item = this.tree.getSelected();
		var r = this.funcion(item);
		if (r) window.close();
	} catch (e) {
		alert("DialogoTransacciones.aceptar(): " + e);
	}	
};

DialogoTransacciones.prototype.cancelar = function () {
	window.close();
};