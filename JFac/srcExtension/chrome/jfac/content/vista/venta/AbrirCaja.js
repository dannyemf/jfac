window.onload = function () {
	try {
		self = new AbrirCaja();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function AbrirCaja(){
	this.dao = new LoteCajaDao();
	this.caja = new LoteCaja();
	
	this.caja = window.arguments[0];
	this.inicializar();
};

AbrirCaja.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);		
	$Xul('txtValor').bind(this.caja, 'valorApertura');	
};

AbrirCaja.prototype.guardar = function () {
	var v = validar();
	if(isNaN(this.caja.valorApertura) || (this.caja.valorApertura * 1 < 0)){
		v = false;
		$Xul('txtValor').addValidationError("El valor debe ser mayor o igual a cero");
	}	
	if(v){
		try {
			var b = this.dao.guardar(this.caja);
			if(b){
				window.close();
			}else{
				alert("No se pudo guardar la caja");
				window.close();
			}
		} catch (ex) {
			alert(ex);
		}
	}
};
