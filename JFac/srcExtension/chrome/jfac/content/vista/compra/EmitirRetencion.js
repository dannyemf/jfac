window.onload = function () {
	try {
		self = new EmitirRetencion();
	} catch (e) {
		alert("EmitirRetencion.onload(): " + e);
	}
};

function EmitirRetencion(){
	this.contexto = new Context(); this.contexto = getContexto();
	this.dao = new RetencionDao();
	this.retencion = new Retencion();
	this.retencion = window.arguments[0];
	this.inicializar();	
};

EmitirRetencion.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.emitir();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	
	$Xul("btnImprimir").disable();
	
	if(this.retencion.id > 0){
		$Xul("btnGuardar").disable();
		$Xul("btnImprimir").enable();		
	}	
	this.vistaPrevia();
};

EmitirRetencion.prototype.vistaPrevia = function () {
	window.model = {
			retencion : this.retencion,
			contexto : this.contexto,			
			empresa : this.contexto.nombreEmpresa,		
			direccion : this.contexto.local.direccion,
			propietario : this.contexto.nombrePropietario,
			telefono : this.contexto.local.telefono,
			ruc : this.contexto.rucEmpresa,
			direccionMatriz : '',
			tipoDocumento: Constante.getNombreDocumento(this.retencion.compra.tipoDocumento)
	};
	$Xul('frmRetencion').attr('src', 'chrome://jfac/content/vista/print/print-retencion.html');
};

EmitirRetencion.prototype.imprimir = function () {		
	this.vistaPrevia();
	var retencion = this.retencion;
	var b = imprimir('frmRetencion', 'facventa', 'ComprobanteRetencion');
	if(b) { //imprime correctamente
		if(retencion.isImpresa == false){
			retencion.isImpresa = true; 
	    	this.dao.updateField(retencion, 'isImpresa');
		}
	}
};

EmitirRetencion.prototype.emitir = function () {
	try {
		var b = this.dao.guardarRetencionCompra(this.retencion.compra, this.retencion);		
		if(b){
			if(confirm('El comprobante de retención se ha guardado. Desea imprimirlo?')){
				this.vistaPrevia();
				this.imprimir();
			}
			window.close();
		}else{
			alert("No se pudo guardar la retención");
		}
	} catch (e) {
		alert(e);
	}	
};

EmitirRetencion.prototype.cancelar = function () {
	window.close();
};