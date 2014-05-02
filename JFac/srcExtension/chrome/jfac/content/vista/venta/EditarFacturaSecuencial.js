window.onload = function () {
	try {
		self = new EditarFacturaSecuencial();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function EditarFacturaSecuencial(){
	this.dao = new FacturaSecuencialDao();	
	this.daoPunto = new PuntoFacturacionDao();
	this.daoAutor = new AutorizacionSriDao();	
	this.secuencial = window.arguments[0];
	this.inicializar();
};

EditarFacturaSecuencial.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
		
	$Xul('txtDesde').bind(this.secuencial, 'desde');	
	$Xul('txtHasta').bind(this.secuencial, 'hasta');
	$Xul('txtSecuencial').bind(this.secuencial, 'secuencial');
	$Xul('cmbTipo').bind(this.secuencial, 'tipoDocumento');
	
	var auts = this.daoAutor.obtenerTodos();
	$Xul('cmbAutorizacion').fillComboBox(auts, 'id', ['numero']);
	$Xul('cmbAutorizacion').bind(this.secuencial, 'autorizacion.id', new AutorizacionSri());
	if(this.secuencial.autorizacion.id == -1){
		this.secuencial.autorizacion = auts.length > 0 ? auts[0] : this.secuencial.autorizacion;
		$Xul('cmbAutorizacion').selectedIndex = 0;
	}
	
	var puntos = this.daoPunto.obtenerTodos();
	$Xul('cmbPunto').fillComboBox(puntos, 'id', ['codigo','nombre']);
	$Xul('cmbPunto').bind(this.secuencial, 'punto.id', new PuntoFacturacion());
	if(this.secuencial.punto.id == -1){
		this.secuencial.punto = puntos.length > 0 ? puntos[0] : this.secuencial.punto;
		$Xul('cmbPunto').selectedIndex = 0;
	}
};


EditarFacturaSecuencial.prototype.guardar = function () {
	var v = validar();
	if(v){
		try {
			//if(this.dao.existeByCodigo(this.secuencial) == false){
				var b = this.dao.guardar(this.secuencial);
				if(b){
					window.close();
				}else{
					alert("No se pudo guardar el secuencial de facturación");
				}
			/*}else{
				alert("Ya existe un secuencial de facturación con el mismo código.");
			}*/
		} catch (ex) {
			// TODO: handle exception
			alert(ex);
		}
	}
};


EditarFacturaSecuencial.prototype.cancelar = function () {
	return true;
};
