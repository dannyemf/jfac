window.onload = function () {
	try {
		self = new ReceptarTransferencia();
	} catch (e) {
		alert('ReceptarTransferencia.onload(): '+e);
	}	
};

function ReceptarTransferencia(){
	try{
		this.contexto = new Context();	this.contexto = getContexto();
		this.dao = new TransferenciaDao();
		this.daoParam = new ParametroDao();
		this.daoStock = new StockDao();
		
		this.transferencia = new Transferencia();							
		this.treeItems = new XulTree('treeItems', ['producto.codigo','cantidadEnviada','producto.nombre', 'cantidadRecibida'],'producto.codigo');
			
		this.editar(window.arguments ? window.arguments[0] : null);
		
		this.inicializar();
	}catch(a){
		alert("ReceptarTransferencia(): " + a);
	}		
};

ReceptarTransferencia.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.receptar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	$Xul('treeItems').addEventListener( 'dblclick', function(e){self.editarItem();}, true);
};

ReceptarTransferencia.prototype.inicializarBind = function () {
	
	var listaLocalesOrigen = this.contexto.getLocales();
	this.transferencia.fechaRecepcion = new Date();
	
	$Xul('txtObservacion').bind(this.transferencia, 'observacion');	
	$Xul('txtUsuario').val(this.transferencia.usuario.nombres + " " + this.transferencia.usuario.apellidos);
	
	$Xul("cmbLocalOrigen").fillComboBox(listaLocalesOrigen, 'id', ['codigo','nombre']);
	$Xul("cmbLocalOrigen").bind(this.transferencia.localOrigen, 'id');
		
	this.treeItems.clear();
	this.treeItems.setDatos(this.transferencia.items);	
};

ReceptarTransferencia.prototype.editar = function (transferencia) {
	try {			
		if(transferencia){
			this.transferencia = transferencia;			
		}else{
			throw new Error('No se ha enviado una transferencia');
		}
		
		//Fija la cantidad
		for(var i = 0; i < this.transferencia.items.length; i++){
			var it = this.transferencia.items[i];
			it.cantidadRecibida = it.cantidadEnviada;
		}
		
		this.inicializarBind();
	} catch (e) {
		alert("ReceptarTransferencia.editar(): " + e);
	}
};

ReceptarTransferencia.prototype.receptar = function () {
	try {
		if(this.validar()){			
			var b = this.dao.receptar(this.transferencia);
			if(b){								
				window.close();				
			}else{
				alert("La transferencia no se pudo receptar");
			}
		}
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

ReceptarTransferencia.prototype.cancelar = function () {return true;};

ReceptarTransferencia.prototype.editarItem = function(){
	var item = this.treeItems.getSelected();
	if(item != null){
		var features = "chrome,modal,dependent=true,dialog,centerscreen";
		window.openDialog("chrome://jfac/content/vista/inventario/EditarItemRecibido.xul", "editar item", features, item);
		this.treeItems.updateSelectedWithModel(item);
	}
};

ReceptarTransferencia.prototype.validar = function(){	
	var valid = window.validar();
	
	$Xul("treeItems").removeValidationError();
	
	if(this.transferencia.items.length == 0){
		$Xul("treeItems").addValidationError("Ingrese los items");
		valid = false;
	}	
	return valid;
};