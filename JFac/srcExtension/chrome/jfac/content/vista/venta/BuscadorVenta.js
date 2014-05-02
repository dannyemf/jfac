window.onload = function () {
	try {
		self = new BuscadorVenta();		
	} catch (e) {
		alert('BuscadorVenta.onload(): '+e);
	}
};

function BuscadorVenta(){
	try {			
		this.contexto = new Context(); this.contexto = getContexto();
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		this.idLocal = this.contexto.local.id;
		this.idCliente = -1;
		this.idUsuario = this.contexto.usuario.id;
		this.estado = '';
		
		this.dao = new FacturaVentaDao();		
		
		this.treeCompras = new XulTree('treeCompras', ['numeroFactura', 'cliente', 'usuario','local','fechaEmision', 'fechaCaducidad','estado', 'subtotal','iva','descuento','sobrecargo','total','id_retencion == null ? "NO":"SI"'],'id');			
		this.treeCompras.setDateColumns([['fechaEmision','yyyy-MM-dd HH:mm:ss'], ['fechaCaducidad','yyyy-MM-dd']]);
		
		this.inicializar();
	} catch (e) {
		alert("BuscadorCompra(): " + e);
	}
};

BuscadorVenta.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
	$Xul("btnAnular").addEventListener( 'command', function(){self.anular();}, true);
	$Xul("btnRetencion").addEventListener( 'command', function(){self.generarRetencion();}, true);
	$Xul("txtTexto").addEventListener( 'keyup', function(event){if(event.keyCode == 13) self.buscar();}, true);	
	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
};

BuscadorVenta.prototype.anular = function () {
	try {		
		var item = this.treeCompras.getSelected();
		
		if(item != null){
			if(item.estado == new FacturaVentaConst().ESTADO_REGISTRADA){
				if(confirm('Desea anular esta factura')){
					var fac = this.dao.load(new FacturaVenta(), item.id);
					var b = this.dao.anular(fac);
					if(b){						
						var obj = this.dao.cacheQueryFirst('and id='+item.id);
						this.treeCompras.updateSelectedWithModel(obj);
					}
				}
			}else{
				alert('Solo se puede anular ventas en estado registrada');
			}
		}else{
			alert("No ha seleccionado ningúna venta para anularla");
		}
	} catch (e) {
		alert("BuscadorVenta.anular(): "+e);
	}
};

BuscadorVenta.prototype.editar = function () {
	try {
		var item = this.treeCompras.getSelected();		
		if(item != null){
			var fac = this.dao.load(new FacturaVenta(), item.id);
			var features = "chrome,modal,dependent=true,centerscreen,resizable";
			window.openDialog("chrome://jfac/content/vista/venta/EditarFacturaVenta.xul", "editar:facventa", features, fac);
			
			var obj = this.dao.cacheQueryFirst('and id='+item.id);
			this.treeCompras.updateSelectedWithModel(obj);
		}else{
			alert("No ha seleccionado ningúna venta para editarla");
		}
	} catch (e) {
		alert("BuscadorVenta.anular(): "+e);
	}
};

BuscadorVenta.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();
	
	if(criterio == 'TODOS'){
		criterio = null;
	}
	
	this.treeCompras.clear();
	showWait();
	
	var lista = new Array();
	
	var cli = $Xul("popupCliente").cliente; 
	this.idCliente = cli != null ? cli.id : null;
	
	lista = this.dao.vistaVentas(criterio, this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idCliente, null, texto);
	
	this.treeCompras.setDatos(lista);
	$Xul('txtTexto').select();
	
	closeWait();
};

BuscadorVenta.prototype.generarRetencion = function () {	
	var cmp = this.treeCompras.getSelected();
	
	if(cmp != null){
		if(cmp.id_retencion == null){
			if(cmp.estado == new FacturaVentaConst().ESTADO_FINALIZADA){
				var venta = this.dao.load(new FacturaVenta, cmp.id);
				var features = "chrome,modal,dependent=true,centerscreen,resizable";
				window.openDialog("chrome://jfac/content/vista/venta/EmitirRetencion.xul", "emitir-retencion", features, venta);
				
				var obj = this.dao.cacheQueryFirst('and id='+cmp.id);
				this.treeCompras.updateSelectedWithModel(obj);
			}else{
				alert('No se puede ingresar una retención si la venta está en estado ' + cmp.estado);
			}
		}else{
			if(confirm('Ya se ha generado la retención para esta compra. Desea verla?','Retención Existente')){
				var venta = this.dao.load(new FacturaVenta, cmp.id);
				this.dao.refresh(venta.retencion);
				
				var features = "chrome,modal,dependent=true,centerscreen,resizable";
				window.openDialog("chrome://jfac/content/vista/venta/EmitirRetencion.xul", "emitir-retencion", features, venta);
			}			
		}
	}else{
		alert("Debe seleccionar una venta para generar la retención");
	}
};