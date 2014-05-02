window.onload = function () {
	try {
		window.contexto = window.parent.contexto ? window.parent.contexto : window.opener.contexto;
		self = new PagarVenta();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function PagarVenta(){
	//this.dao = new LoteCajaDao();
	this.daoAnticipos = new AnticipoDao();
	
	this.factura = new FacturaVenta();	
	this.factura = window.arguments[0];
	
	this.anticipos = this.daoAnticipos.buscarPendientesPorCliente(this.factura.cliente);
	this.totalAnt = 0;
	
	this.inicializar();
};

PagarVenta.prototype.inicializar = function () {
	$Xul('txtAnticipo').disable();
	$Xul('txtAnticipo').val(0);
	$Xul("txtRecibe").val(this.factura.total);
	
	for(var i = 0; i < this.anticipos.length;i++){
		this.totalAnt += this.anticipos[i].saldo * 1;
	}
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	
	$Xul("txtAnticipo").addEventListener( 'keyup', function(){self.calcular();}, true);
	$Xul("txtRecibe").addEventListener( 'keyup', function(){self.calcular();}, true);	
	$Xul("chkAnticipo").addEventListener( 'command', function(){
		if($Xul("chkAnticipo").checked == false){
			$Xul('txtAnticipo').val(0);		
			$Xul('txtAnticipo').disable();
		}else{
			if(self.factura.total <= self.totalAnt){
				$Xul('txtAnticipo').val(self.factura.total);
			}else{
				$Xul('txtAnticipo').val(self.totalAnt);
			}			
			$Xul('txtAnticipo').enable();
		}
		self.calcular();
	}, true);
	
	
	$Xul('txtTotal').val(this.factura.total);
	$Xul('txtTotalAnticipos').val(this.totalAnt);
	
	if(this.totalAnt == 0){
		$Xul('chkAnticipo').disable();
		$Xul('chkAnticipo').checked = false;
		
		$Xul('chkDevolcerSobrante').disable();
		$Xul('chkDevolcerSobrante').checked = false;
		
		$Xul('txtAnticipo').val(0);		
		$Xul('txtAnticipo').disable();
	}
	
	this.calcular();
};

PagarVenta.prototype.calcular = function () {
	
	var recibe = $Xul('txtRecibe').val() * 1;	
	var anticipo = $Xul('txtAnticipo').val() * 1;
	var cambio = 0;
	
	if ($Xul('chkAnticipo').checked == true){
		if(anticipo > this.totalAnt){
			anticipo = this.totalAnt;
			 $Xul('txtAnticipo').val(anticipo);
		}
		
		cambio = recibe + anticipo - this.factura.total;		
	}else{
		cambio = recibe - this.factura.total;
	}
	
	var sobrante = this.totalAnt - anticipo;
	$Xul('txtSobrante').val(sobrante);
	
	if ($Xul('chkDevolcerSobrante').checked == true){
		cambio += sobrante;
	}
	
	$Xul('txtCambio').val(cambio);
		
};

PagarVenta.prototype.usarAnticipo = function () {
	
	var usar = false;
	var residuo = this.totalAnt;
	
	if ($Xul('chkAnticipo').checked == true && residuo > 0){
		this.factura.anticipos = this.anticipos;		
		for ( var int = 0; int < this.factura.anticipos.length; int++) {
			if (residuo > 0){
				if (residuo >= this.factura.anticipos[int].saldo){
					this.factura.anticipos[int].estado = new AnticipoConst().ESTADO_FINALIZADO;
					residuo = residuo - this.factura.anticipos[int].saldo;
				} else if(residuo < this.factura.anticipos[int]){
					this.factura.anticipos[int].saldo = this.factura.anticipos[int].saldo - residuo;
				}
			}
		}
	}
};

PagarVenta.prototype.guardar = function () {	
	this.factura.anticipo = $Xul('txtAnticipo').val() * 1;
	this.factura.cambio = $Xul('txtCambio').val() * 1;
	this.factura.cash = $Xul('txtRecibe').val() * 1;
	this.factura.sobrante = $Xul('txtSobrecargo').val() * 1;
	this.factura.usuarAnticipos = $Xul('chkAnticipo').checked;
	this.factura.devolverSobrante = $Xul('chkDevolcerSobrante').checked;
	this.factura.anticipos = this.anticipos;
	
	window.close();
};
