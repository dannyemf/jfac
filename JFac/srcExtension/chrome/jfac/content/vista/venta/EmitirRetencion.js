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
	
	this.factura = new FacturaVenta();
	this.factura = window.arguments[0];
	
	this.retencion = new Retencion();
	this.retencion = this.factura.retencion;	
	
	this.treeRetenciones = new XulTree('treeRetenciones',['impuesto','porcentaje','valor'], 'index');
	this.treeRetenciones.setDatos(this.retencion.items);
	
	this.inicializar();
};

EmitirRetencion.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.emitir();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	
	$Xul("btnAddRetIr").addEventListener( 'command', function(){self.agregarRetencionIr();}, true);
	$Xul("btnAddRetIva").addEventListener( 'command', function(){self.agregarRetencionIva();}, true);
	$Xul("btnRemRet").addEventListener( 'command', function(){self.removerRetencion();}, true);
	
	$Xul("btnImprimir").hide();
	
	if(this.retencion.id > 0){
		$Xul("btnGuardar").disable();		
		
		$Xul("btnAddRetIr").disable();
		$Xul("btnAddRetIva").disable();
		$Xul("btnRemRet").disable();
		
		$Xul('txtNumRet').disable();
		$Xul('dtpEmision').disable();
	}
	
	if(this.retencion.id == null || this.retencion.id == -1){
		this.retencion.local = this.contexto.local;
		this.retencion.punto = this.contexto.puntoFacturacion;
		this.retencion.periodo = this.contexto.periodo;
		this.retencion.usuario = this.factura.usuario;
		this.retencion.tipoRetencion = this.retencion.TIPO_RETENCION_VENTA;
	};
	
	$Xul('txtNumFac').val(this.factura.numeroFactura);
	$Xul('txtFacFecha').val(this.factura.fechaEmision.toString("dd/MM/yyyy HH:mm:ss"));
	$Xul('txtFacCli').val(this.factura.cliente.cedula + " - " + this.factura.cliente.getNombreCompleto());
	
	
	$Xul('txtTot').val(this.factura.total);
	$Xul('txtSub').val(this.factura.subtotal);
	$Xul('txtIva').val(this.factura.iva);
	
	$Xul('txtTotaRet').val(this.retencion.total);	
	$Xul('txtRegistro').val(this.retencion.fechaRegistro.toString("dd/MM/yyyy HH:mm:ss"));
	
	$Xul('dtpEmision').bind(this.retencion, 'fechaEmision');
	$Xul('txtNumRet').bind(this.retencion, 'numero');
	
};
EmitirRetencion.prototype.validar = function () {
	var v = window.validar();
	
	if(this.retencion.items.length == 0){
		v = false;
		$Xul('treeRetenciones').addValidationError("Ingrese los items de la retención");
	}
	
	return v;
};

EmitirRetencion.prototype.emitir = function () {
	try {
		if(this.validar()){
			var b = this.dao.guardarRetencionVenta(this.factura, this.retencion);		
			if(b){
				window.close();
			}else{
				alert("No se pudo guardar la retención");
			}
		}
	} catch (e) {
		alert(e);
	}	
};

EmitirRetencion.prototype.cancelar = function () {
	window.close();
};


EmitirRetencion.prototype.agregarRetencionIr = function () {
	
	try {
		var p = $Xul("txtPorcentajeRet").val() * 1;		
		var v = (this.factura.subtotal * p) / 100.0;
		
		if(v > 0){
		
			var it = this.retencion.crearItem();
			it.impuesto = 'IR';
			it.porcentaje = p;
			it.valor = v.round(2);
			
			this.retencion.add(it);		
			this.treeRetenciones.add(it);		
			this.calcularRetenciones();
		}
	} catch (e) {
		alert(e);
	}
	
	
};

EmitirRetencion.prototype.agregarRetencionIva = function () {
	try {
		var p = $Xul("txtPorcentajeRet").val() * 1;		
		var v = (this.factura.iva * p) / 100.0;
		if(v > 0){
			
			var it = this.retencion.crearItem();
			it.impuesto = 'IVA';
			it.porcentaje = p;
			it.valor = v.round(2);
			
			this.retencion.add(it);			
			this.treeRetenciones.add(it);			
			this.calcularRetenciones();
		}
	} catch (e) {
		alert(e);
	}
};

EmitirRetencion.prototype.removerRetencion = function () {
	try {
		var i = this.treeRetenciones.getSelectedIndex();
		if(i >= 0){		
			this.retencion.items.splice(i, 1);
			this.treeRetenciones.removeByIndex(i);
			this.calcularRetenciones();
		}
	} catch (e) {
		alert(e);
	}
};


EmitirRetencion.prototype.calcularRetenciones = function () {
	var t = 0;
	var ti = 0;
	var tir = 0;
	for(var i = 0; i < this.retencion.items.length; i++){
		t +=  this.retencion.items[i].valor;
		if(this.retencion.items[i].impuesto=="IVA"){
			ti += this.retencion.items[i].valor;
		}else{
			tir += this.retencion.items[i].valor;
		}
	}
	t = t.round(2);
	
	this.retencion.total = t;
	this.retencion.totalRetencionIVA = ti;
	this.retencion.totalRetencionIr = tir;
		
	$Xul('txtTotaRet').val(t);
};