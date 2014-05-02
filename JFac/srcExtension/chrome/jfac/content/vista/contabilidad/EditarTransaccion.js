window.onload = function () {
	self = new EditarTransaccion();
};

function EditarTransaccion(){
	this.dao = new TransaccionDao();
	this.daoPlan = new PlanDao();
	
	this.transaccion = new Transaccion();
	this.transaccion = window.arguments[0];
	
	this.treeItems = new XulTree('treeItems', ['plan.codigo','plan.nombre','tipo','formula','aplicaA'],'id');
	
	this.inicializar();
};



EditarTransaccion.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	
	$Xul("btnAgregarItem").addEventListener( 'command', function(){self.agregarItem();}, true);
	$Xul("btnEditarItem").addEventListener( 'command', function(){self.editarItem();}, true);
	$Xul("btnRemomerItem").addEventListener( 'command', function(){self.eliminarItem();}, true);
	
	$Xul('txtCodigo').bind(this.transaccion, 'codigo');
	$Xul('txtDescripcion').bind(this.transaccion, 'descripcion');
	$Xul('cmbEstado').bind(this.transaccion, 'estado');
	$Xul('txtFecha').bind(this.transaccion, 'fechaCreacion');
	$Xul('txtTexto').bind(this.transaccion, 'textoLote');
	
	
	for(var i = 0; i < this.transaccion.items.length; i++){
		if(this.transaccion.items[i].plan == null){
			this.transaccion.items[i].plan = new Plan();
			this.transaccion.items[i].plan.codigo = "[AUTOMATICO]";			
			this.transaccion.items[i].plan.nombre = "[AUTOMATICO]";
		}
	}
	
	this.treeItems.setDatos(this.transaccion.items);
};

EditarTransaccion.prototype.guardar = function () {
	var v = window.validar();
	
	//validacion propia
	if(this.dao.existeByCodigo(this.transaccion)){
		$Xul('txtCodigo').addValidationError("Código duplicado");
		v = false;
	}
	
	if(v){
		var b = this.dao.guardar(this.transaccion);	
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar la transacción");
		}
	}	
};

EditarTransaccion.prototype.agregarItem = function () {
	var item = new TransaccionItem();
	item.transaccion  = this.transaccion;
	item.plan.codigo = '[AUTOMATICO]';
	item.plan.nombre = '[AUTOMATICO]';
	
	var args = {guardado : false, model : item};
	
	var features = "chrome,modal,dependent=true,centerscreen";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarTransaccionItem.xul", "editar:tarnitem", features, args);
	
	if(args.guardado){
		this.dao.read(item.plan);
		if(this.transaccion.agregarItem(item)){
			this.treeItems.add(item);
		}else{
			alert("El plan ya existe");
		}		
	}
};

EditarTransaccion.prototype.editarItem = function () {
	var item = this.treeItems.getSelected();	
	var args = {guardado : false, model : item};
	var features = "chrome,modal,dependent=true,centerscreen,resizable";	
	window.openDialog("chrome://jfac/content/vista/contabilidad/EditarTransaccionItem.xul", "editar:tarnitem", features, args);		
	this.treeItems.updateSelected();
};

EditarTransaccion.prototype.eliminarItem = function () {
	try {
		var item = this.treeItems.getSelected();
		if(item){
			var i = this.treeItems.getSelectedIndex();
			this.treeItems.removeByIndex(i);
			this.transaccion.items.splice(i,1);					
		}
	} catch (e) {
		alert("EditarTransaccion.eliminarItem(): " + e);
	}
};

