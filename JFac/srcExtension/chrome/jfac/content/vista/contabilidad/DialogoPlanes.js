window.onload = function () {
	try {
		self = new DialogoPlanes();			
	} catch (e) {
		alert(e);
	}
};

function DialogoPlanes(){
	this.dao = new PlanDao();
	this.funcion = window.arguments[0];	
	this.oldLista = new Array();
	
	this.tree = new XulTree('tree', ['codigo', 'nombre', 'tipo','movimiento'], 'id');
	this.tree.setRowsConinersWhereColumns([['movimiento',0]]);
	this.inicializar();
	this.tree.setDatos(getContexto().cacheListaPlanes);
}; 

DialogoPlanes.prototype.inicializar = function () {
	$Xul('btnAceptar').addEventListener('command', function(){self.aceptar();}, true);	
	$Xul('btnCancelar').addEventListener('command', function(){self.cancelar();}, true);
	$Xul('btnBuscar').addEventListener('command', function(){self.buscar();}, true);	
};

DialogoPlanes.prototype.buscar = function () {
	var filtro = $Xul("txtFiltro").val();
	this.tree.clear();
	this.oldLista = this.dao.buscarPorCriterio(filtro);
	this.tree.setDatos(this.oldLista);
	getContexto().cacheListaPlanes = this.oldLista;
};

DialogoPlanes.prototype.aceptar = function () {
	try {
		var item = this.tree.getSelected();
		if(item){
			var r = this.funcion(item);
			if (r) window.close();
		}else{
			alert("No ha seleccionado un plan");
		}
	} catch (e) {
		alert("DialogoPlanes.aceptar(): " + e);
	}	
};

DialogoPlanes.prototype.cancelar = function () {
	window.close();
};