window.onload = function () {
	try {
		self = new CerrarCaja();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function CerrarCaja(){	
	this.contexto = new Context(); this.contexto = getContexto();

	this.dao = new LoteCajaDao();
	this.caja = new LoteCaja();
	
	this.f;
	
	if(this.contexto.loteCaja == null || this.contexto.loteCaja.id == -1){
		alert("No se ha podido cerrar caja");			
		window.close();		
		return;
	};	
	
	this.caja = this.contexto.loteCaja;	
	this.dao.generarItems(this.caja);	
	
	this.treeItems = new XulTree('treeItems', ['documento','descripcion',"tipo=='INGRESO' ? ''+dat.valor : '--'","tipo=='SALIDA' ? '' + dat.valor : '--'"]);
	
	this.inicializar();
};

CerrarCaja.prototype.inicializar = function () {	
	
	this.caja.valorApertura.round(2);	
	
	$Xul('txtValorApertura').bind(this.caja, 'valorApertura');
	$Xul('txtValorCierre').bind(this.caja, 'valorCierre');
	$Xul('txtValorReal').addEventListener( 'change', function(e){self.calcular();}, false);
	$Xul('txtValorFaltante').bind(this, 'f');		
	
	this.treeItems.setDatos(this.caja.items);
	this.calcular();
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);	
};

CerrarCaja.prototype.guardar = function () {
	var v = window.validar();
	var vr = $Xul('txtValorReal').val();
	
	if(isNaN(vr) || (vr * 1 < 0)){
		v = false;
		$Xul('txtValorReal').addValidationError("El valor debe ser mayor o igual a cero");
	}
	
	this.caja.valorReal = vr;
	
	if(v){
		try {		
			if(!confirm('¿Desea cerrar caja?')) return;
			this.caja.estado = this.caja.ESTADO_CERRADA;
			var b = this.dao.guardar(this.caja);
			if(b){
				this.contexto.loteCaja = null;
				window.close();
			}else{
				alert("No se pudo cerrar caja");
				window.close();
			}
		} catch (ex) {
			alert(ex);
		}
	}
};

CerrarCaja.prototype.calcular = function () {
	var total = $Xul('txtValorApertura').val() * 1;
	var real = $Xul('txtValorReal').val();
	
	if(isNaN(real)){
		real = 0;
		$Xul('txtValorReal').val(0.00);
	}
	
	real = real * 1;
	
	try {			
		var inggas = new LoteCajaItemConst();
		
		var valorItem = this.caja.items;
		for (var i = 0; i < valorItem.length; i++){
			var it = valorItem[i];
			if(valorItem[i].tipo == inggas.TIPO_SALIDA){
				total -= it.valor * 1;
			} else{
				total += it.valor * 1;
			}
		}
		this.f = (total - real) * 1;
	} catch (ex) {
		alert(ex);
	}
	$Xul('txtValorCierre').val(total.round(2));
	$Xul('txtValorFaltante').val(this.f.round(2));
};