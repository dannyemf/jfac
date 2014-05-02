window.onload = function () {
	try {		
		self = new EditarLoteAsientos();
	} catch (e) {
		alert("EditarLoteAsientos.onload(): "+e);
	}
};

function EditarLoteAsientos(){
	this.dao = new LoteAsientosDao();
	this.daoPeriodo = new PeriodoContableDao();
	this.daoLocal = new LocalDao();
	this.locales = this.daoLocal.obtenerTodos();
	
	this.loteAsientos = new LoteAsientos();
	this.loteAsientos = window.arguments[0];
	
	this.periodoActual = this.daoPeriodo.obtenerPeriodoActivo(this.loteAsientos.local);
	
	this.treeItems = new XulTree('treeItems', ['indice','plan.codigo','plan.nombre','descripcion','fecha', 'documento','tipo == "Debe" ? dat.monto : ""','tipo == "Haber" ? dat.monto : ""' ],'indice');
	this.treeItems.setDateColumns([['fecha', 'yyyy-MM-dd']]);
	this.treeItems.clear();
	
		
	
	this.inicializar();
};

EditarLoteAsientos.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	
	$Xul("btnEditarItem").addEventListener( 'command', function(){self.editarItem();}, true);
	$Xul("btnAgregarItem").addEventListener( 'command', function(){self.agregarItem();}, true);	
	$Xul("btnRemomerItem").addEventListener( 'command', function(){self.eliminarItem();}, true);	
	
	$Xul('txtDescripcion').bind(this.loteAsientos, 'descripcion');	
	$Xul('txtFecha').val(this.loteAsientos.fecha.toString('yyyy-MM-dd HH:mm:ss'));
		
	if(this.loteAsientos.periodo && this.loteAsientos.periodo.id == -1){
		this.loteAsientos.periodo = this.periodoActual;
	}
	
	if(this.loteAsientos.local && this.loteAsientos.local.id == -1){
		this.loteAsientos.local = getContexto().local; 
	}
	
	$Xul('cmbLocal').fillComboBox(this.locales, 'id', ['codigo','nombre']);
	$Xul('cmbLocal').bind(this.loteAsientos.local, 'id');	
	$Xul('txtPeriodo').val(this.loteAsientos.periodo.nombre);
	
	if(this.loteAsientos.estado == new LoteAsientosConst().ESTADO_CONTABILIZADO){
		$Xul("btnGuardar").disable();
		$Xul('txtDescripcion').disable();
		$Xul("btnEditarItem").disable();
		$Xul("btnAgregarItem").disable();			
		$Xul("btnRemomerItem").disable();
		$Xul("chkCont").disable();		
		$Xul('cmbLocal').disable();
	}
	
	this.loteAsientos.enumerarItems();
	this.treeItems.setDatos(this.loteAsientos.items);
	
	this.calcular();
};

EditarLoteAsientos.prototype.guardar = function () {
	var v = window.validar();
	this.calcular();
	
	//validación propia
	$Xul("treeItems").removeValidationError();	
	if(this.loteAsientos.items.length == 0){
		v = false;
		$Xul("treeItems").addValidationError("No existen items");
	}	
	
	if(this.loteAsientos.debe != this.loteAsientos.haber){
		v = false;
	}
	
	if(v){
		if($Xul("chkCont").checked){
			this.loteAsientos.estado = this.loteAsientos.ESTADO_CONTABILIZADO;
		}
		
		var b = this.dao.guardar(this.loteAsientos);		
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar el lote de asientos");
		}
	}	
};

EditarLoteAsientos.prototype.agregarItem = function () {
	var item = new AsientoContable();	
	item.lote = this.loteAsientos;
	item.origen = "LoteManual";
	item.periodo = this.loteAsientos.periodo;
	item.local = this.loteAsientos.local;
	
	var features = "chrome,modal,dependent=true,centerscreen,resizable";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarAsiento.xul", "editar-asiento", features, item);
	
	if(item.guardado){
		if(this.loteAsientos.agregarItem(item)){			
			this.treeItems.add(item);		
			this.calcular();
		}
	}
};

EditarLoteAsientos.prototype.editarItem = function () {
	var item = this.treeItems.getSelected();
	if(item){
		var features = "chrome,modal,dependent=true,centerscreen,resizable";	
		window.openDialog("chrome://jfac/content/vista/contabilidad/EditarAsiento.xul", "editar-asiento", features, item);		
		this.treeItems.updateSelected();
		this.calcular();
	}
};

EditarLoteAsientos.prototype.eliminarItem = function () {
	var item = this.treeItems.getSelected();
	if(item){
		var i = this.treeItems.getSelectedIndex();
		this.loteAsientos.removerItemIndice(i);		
		this.treeItems.removeByIndex(i);
		this.treeItems.updateAll();
		this.calcular();
	}
};

EditarLoteAsientos.prototype.calcular = function () {
	var debe = 0, haber = 0;
	var tipo = new AsientoContableConst();
	
	for(var i = 0; i < this.loteAsientos.items.length; i++){
		try {
			var item = this.loteAsientos.items[i];			
			var v = isNaN(item.monto) ? 0 : item.monto * 1;
			if(item.tipo == tipo.TIPO_DEBE){
				debe += v;
			}else{
				haber += v;
			}
		} catch (e) {
		}
	}
	
	$Xul('txtDebe').val(debe);
	$Xul('txtHaber').val(haber);
	$Xul('txtDebe').removeValidationError();
	if(debe != haber){
		$Xul('txtDebe').addValidationError("El debe no es igual al haber");
	}
	
	this.loteAsientos.debe = debe;
	this.loteAsientos.haber = haber;
};