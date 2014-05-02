window.onload = function () {
	try {
		window.contexto = window.parent.contexto ? window.parent.contexto : window.opener.contexto;		
		self = new AdministrarLotesAsientos();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function AdministrarLotesAsientos(){
	this.dao = new LoteAsientosDao();
	this.daoPeriodo = new PeriodoContableDao();
	
	this.idPeriodo = null;
	this.fechaIni = new Date();
	this.fechaFin = new Date();
	
	this.tree = new XulTree('tree', ['periodo.nombre', 'descripcion','estado','fecha'], 'id');
	this.tree.setDateColumns([['fecha', 'yyyy-MM-dd HH:mm:ss']]);
	this.inicializar();		
}; 

AdministrarLotesAsientos.prototype.inicializar = function () {
	$Xul('btnNuevo').addEventListener('command', function(){self.nuevo();}, true);	
	$Xul('btnEditar').addEventListener('command', function(){self.editar();}, true);
	$Xul('btnEliminar').addEventListener('command', function(){self.eliminar();}, true);
	$Xul('btnBuscar').addEventListener('command', function(){self.buscar();}, true);
	$Xul('btnContabilizar').addEventListener('command', function(){self.contabilizar();}, true);
	
	
	var periodos = this.daoPeriodo.obtenerTodos();
	$Xul("cmbPeriodo").fillComboBox(periodos, 'id', ['nombre'], '--Todos--');
	$Xul("cmbPeriodo").bind(this, 'idPeriodo');
	$Xul("cmbPeriodo").selectedIndex = 0;
	
	$Xul("dtpFI").bind(this, 'fechaIni');
	$Xul("dtpFF").bind(this, 'fechaFin');
};

AdministrarLotesAsientos.prototype.eliminar = function () {
	var model = this.tree.getSelected();
	if(model != null){
		var eliminado = this.dao.eliminar(model);
		if(eliminado){
			alert("Cuenta Contable eliminada: " + model.descripcion, "Eliminar");
			this.tree.remove(model);
		}else{
			alert("No se pudo eliminar el lote de asiento", "Eliminar");
		}
	}else{
		alert("Debe seleccionar un lote para eliminarlo", "Eliminar");
	}
};

AdministrarLotesAsientos.prototype.buscar = function () {
	this.tree.setDatos(this.dao.buscarPorPeriodoFechas(this.idPeriodo, this.fechaIni, this.fechaFin));
};

AdministrarLotesAsientos.prototype.contabilizar = function () {
	var rows = this.tree.getSelectRows();
	if(rows.length > 0){
		if(confirm("Desea contabilizar los lotes seleccionados")){
			for(var i = 0; i < rows.length; i++){
				var lote = this.tree.getItemAt(rows[i]);
				this.dao.contabilizar(lote);
				this.tree.updateIndex(rows[i]);
			}			
		}
	}else{
		alert("No ha seleccionado ningún lote para contabilizar");
	}
};

AdministrarLotesAsientos.prototype.nuevo = function () {
	var model = new LoteAsientos();
	model.local = window.contexto.local;
	
	var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarLoteAsientos.xul", "ixxi", features, model);
	if(model.id > 0){
		this.dao.refresh(model);
		this.tree.add(model);
	}
};

AdministrarLotesAsientos.prototype.editar = function () {
	var model = this.tree.getSelected();
	if(model != null){
		var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarLoteAsientos.xul", "ixxi", features, model);
		this.dao.refresh(model);		
		this.tree.updateSelectedWithModel(model);
	}else{
		alert("Debe seleccionar un lote para editarlo", "Editar");
	}
};