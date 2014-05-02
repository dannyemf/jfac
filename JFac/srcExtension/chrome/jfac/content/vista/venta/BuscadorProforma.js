window.onload = function () {
	try {
		self = new BuscadorProforma();		
	} catch (e) {
		alert('BuscadorProforma.onload(): '+e);
	}
};

function BuscadorProforma(){
	try {			
		this.contexto = new Context(); this.contexto = getContexto();
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		this.idLocal = this.contexto.local.id;
		this.idCliente = -1;
		this.idUsuario = this.contexto.usuario.id;
		this.estado = '';
		
		this.dao = new ProformaDao();		
		
		this.treeProformas = new XulTree('treeProformas', ['id', 'cliente', 'usuario','local','fecha', 'fechaVencimiento','estado', 'subtotal','iva','total'],'id');			
		this.treeProformas.setDateColumns([['fecha','yyyy-MM-dd'], ['fechaVencimiento','yyyy-MM-dd']]);
		
		this.inicializar();
	} catch (e) {
		alert("BuscadorProforma(): " + e);
	}
};

BuscadorProforma.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
	$Xul("txtTexto").addEventListener( 'keyup', function(event){if(event.keyCode == 13) self.buscar();}, true);	
	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
};

BuscadorProforma.prototype.editar = function () {
	try {
		var item = this.treeProformas.getSelected();		
		if(item != null){
			var fac = this.dao.load(new Proforma(), item.id);
			var features = "chrome,modal,dependent=true,centerscreen,resizable";
			window.openDialog("chrome://jfac/content/vista/venta/EditarProforma.xul", "editar:proforma", features, fac);
			
			var obj = this.dao.cacheQueryFirst('and id='+item.id);
			this.treeProformas.updateSelectedWithModel(obj);
		}else{
			alert("No ha seleccionado ninguna proforma para editarla");
		}
	} catch (e) {
		alert("BuscadorProforma.anular(): "+e);
	}
};

BuscadorProforma.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();
	
	if(criterio == 'TODOS'){
		criterio = null;
	}
	
	this.treeProformas.clear();
	showWait();
	
	var lista = new Array();
	
	var cli = $Xul("popupCliente").cliente; 
	this.idCliente = cli != null ? cli.id : null;
	
	lista = this.dao.vistaProformas(criterio, this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idCliente, this.estado, texto);
	
	this.treeProformas.setDatos(lista);
	$Xul('txtTexto').select();
	
	closeWait();
};