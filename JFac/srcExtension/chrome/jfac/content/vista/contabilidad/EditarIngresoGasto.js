window.onload = function () {
	try {
		self = new EditarIngresoGasto();
	} catch (e) {
		alert("EditarIngresoGasto.onload(): "+ e);
	}
};

function EditarIngresoGasto(){
	
	this.contexto = new Context(); this.contexto = getContexto();		
	
	if(this.contexto.loteCaja == null || this.contexto.loteCaja.id == -1){
		alert("Usuario no autorizado para registrar Ingresos/Gastos");			
		window.close();			
	};
	
	this.ingresogastoDao = new IngresoGastoDao();
	this.ingresogasto = new IngresosGastos();
	this.ingresogasto.usuario = this.contexto.usuario;
	this.ingresogasto.lote = this.contexto.loteCaja;	
	this.ingresogasto.local = this.contexto.local;
	
	this.inicializar();
};

EditarIngresoGasto.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
			
	$Xul('txtDescripcion').bind(this.ingresogasto, 'descripcion');
	$Xul('listTipo').bind(this.ingresogasto, 'tipo');
	$Xul('txtValor').bind(this.ingresogasto, 'valor');
	
	$Xul('txtLoteCaja').val(this.ingresogasto.lote.id);
};

EditarIngresoGasto.prototype.cmdGuardar = function () {self.guardar();};
EditarIngresoGasto.prototype.cmdCancelar = function () {window.close();};

EditarIngresoGasto.prototype.guardar = function () {
	var v = validar();
	if(isNaN(this.ingresogasto.valor) || (this.ingresogasto.valor * 1 <= 0)){
		v = false;
		$Xul('txtValor').addValidationError("El valor debe ser mayor a cero");
	}
	
	if(v){
		var b = this.ingresogastoDao.guardar(this.ingresogasto);
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar el Ingreso/Gasto");
		}
	}
};

EditarIngresoGasto.prototype.cancelar = function () {
	return true;
};