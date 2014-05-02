window.onload = function () {
	try {
		self = new EditarPuntoFacturacion();
	} catch (e) {
		alert('EditarPuntoFacturacion.onload(): '+e);
	}
};

function EditarPuntoFacturacion(){
	this.contexto = new Context(); this.contexto = getContexto();
	this.dao = new PuntoFacturacionDao();		
	this.punto = window.arguments[0];
	this.inicializar();
};

EditarPuntoFacturacion.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
		
	$Xul('txtCodigo').bind(this.punto, 'codigo');	
	$Xul('txtNombre').bind(this.punto, 'nombre');
	
	var locales = this.contexto.getLocales();
	$Xul('cmbLocal').fillComboBox(locales, 'id', ['codigo','nombre']);
	$Xul('cmbLocal').bind(this.punto, 'local.id', new Local());
	if(this.punto.local.id == -1){
		this.punto.local = locales.length > 0 ? locales[0] : this.punto.local;
		$Xul('cmbLocal').selectedIndex = 0;
	}
};


EditarPuntoFacturacion.prototype.guardar = function () {
	var v = validar();
	if(v){
		try {
			 //if(this.dao.existeByCodigo(this.punto) == false){
				var b = this.dao.guardar(this.punto);
				if(b){
					window.close();
				}else{
					alert("No se pudo guardar el punto de facturación");
				}
			/*}else{
				alert("Ya existe un punto de facturación con el mismo código.");
			}*/
		} catch (ex) {
			// TODO: handle exception
			alert(ex);
		}
	}
};


EditarPuntoFacturacion.prototype.cancelar = function () {
	return true;
};
