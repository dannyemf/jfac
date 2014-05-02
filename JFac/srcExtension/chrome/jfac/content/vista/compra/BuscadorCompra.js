window.onload = function () {
	try {		
		self = new BuscadorCompra();
	} catch (e) {
		alert('BuscadorCompra.onload(): '+e);
	}	
	
};

function BuscadorCompra(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		
		this.idLocal = -1;
		this.idProveedor = -1;
		this.idUsuario = this.contexto.usuario.id;	
		
		this.dao = new FacturaCompraDao();
		this.daoProveedor = new ProveedorDao();
		this.daoRet = new RetencionDao();
		
		this.treeCompras = new XulTree('treeCompras', ['numeroFactura', 'proveedor','local', 'numeroAutorizacion', 'fechaEmision', 'fechaRegistro', 'fechaCaducidad','estado', 'total','id_retencion==null?"NO":"SI"'],'id');			
		this.treeCompras.setDateColumns([['fechaEmision','dd-MM-yyyy'], ['fechaRegistro','dd-MM-yyyy HH:mm:ss'],['fechaCaducidad','dd-MM-yyyy']]);
		this.inicializar();
	} catch (e) {
		alert("BuscadorCompra(): " + e);
	}
};

BuscadorCompra.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
	$Xul("btnRetencion").addEventListener( 'command', function(){self.generarRetencion();}, true);
	$Xul("txtTexto").addEventListener( 'keyup', function(event){if(event.keyCode == 13) self.buscar();}, true);	
	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');	
	
	var listaProveedores = this.daoProveedor.buscarTodos();
	var listaLocales = this.contexto.getLocales();
	
	$Xul("cmbProveedor").fillComboBox(listaProveedores, 'id', ['identificacion','razonSocial'],'--Todos--',-1);
	$Xul("cmbLocal").fillComboBox(listaLocales, 'id', ['codigo','nombre'],'--Todos--',-1);
	
	$Xul("cmbProveedor").bind(this, 'idProveedor');
	$Xul("cmbLocal").bind(this, 'idLocal');
	
	$Xul("cmbProveedor").selectedIndex = 0;
	$Xul("cmbLocal").val(this.contexto.local.id);	
};

BuscadorCompra.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();
	
	var lista = new Array();	
	this.treeCompras.clear();
	
	showWait();
		
	if(criterio == 'TODOS'){
		criterio = null;
	}
	
	//(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal, idProveedor, estado, numeroFactura){
	lista = this.dao.vistaCompras(criterio, this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idProveedor, null, texto);
	
	this.treeCompras.setDatos(lista);
	$Xul('txtTexto').select();
	
	closeWait();
};

BuscadorCompra.prototype.editar = function () {	
	var cmp = this.treeCompras.getSelected();
	
	if(cmp != null){		
		
		cmp = this.dao.load(new FacturaCompra(), cmp.id);
		
		var features = "chrome,modal,dependent=true,centerscreen,resizable";
		window.openDialog("chrome://jfac/content/vista/compra/EditarFacturaCompra.xul", "editar:facccompra", features, cmp);
				
		if(cmp.editada == true){
			var obj = this.dao.cacheQueryFirst('and id='+cmp.id);
			this.treeCompras.updateSelectedWithModel(obj);
		}
	}else{
		alert("Debe seleccionar una compra para editarla");
	}
};

BuscadorCompra.prototype.generarRetencion = function () {	
	var cmp = this.treeCompras.getSelected();
	
	if(cmp != null){
		if(cmp.id_retencion == null){
			
			var compra = this.dao.load(new FacturaCompra(), cmp.id);
			showWait();
			var retencion = this.daoRet.generarRetencionCompra(compra);
			closeWait();
			if(retencion.total > 0){
				var features = "chrome,modal,dependent=true,centerscreen,resizable";
				window.openDialog("chrome://jfac/content/vista/compra/EmitirRetencion.xul", "emitir-retencion", features, retencion);
			}else{
				alert('No se puede emit la retencion, porque su total es cero.');
			}			
		}else{
			if(confirm('Ya se ha generado la retención para esta compra. Desea verla?','Retención Existente')){
				var compra = this.dao.load(new FacturaCompra(), cmp.id);
				var retencion = compra.retencion;
				this.dao.refresh(retencion);
				retencion.compra = compra;				
				var features = "chrome,modal,dependent=true,centerscreen,resizable";
				window.openDialog("chrome://jfac/content/vista/compra/EmitirRetencion.xul", "emitir-retencion", features, retencion);
			}
		}
	}else{
		alert("Debe seleccionar una compra para generar la retención");
	}
};