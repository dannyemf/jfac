window.onload = function () {
	try {		
		self = new PagarCreditoDiferido();
	} catch (e) {
		alert("PagarCreditoDiferido.onload(): "+e);
	}
};

function PagarCreditoDiferido(){
	
	this.contexto = new Context(); this.contexto = getContexto();
	
	if(this.contexto == null){
		alert('No se inicializado el contexto');
	}
	
	this.model = window.arguments[0];
	
	this.dao = new CobroDao();
	this.bancoDao = new BancoDao();
	this.cuentaDao = new CuentaBancariaDao();
	
	this.bancosTodos = this.bancoDao.buscarTodos();
	this.bancosEmpresa = this.bancoDao.buscarTodosEmpresa();			
	
	this.cobro = new CobroItem();
	this.cobro = this.dao.load(new CobroItem(), this.model.id);
	
	this.cuotasPendiente = this.dao.obtenerCuotasPendientes(this.cobro.id);
	this.cuotasSeleccionadas = new Array();
	
	this.cobrarMora = true;
	
	this.tree = new XulTree('tree',['numeroCuota','fecha','isVencida()','monto','interes','mora','montoPagar'],'id');
	this.tree.setDateColumns([['fecha','dd/MM/yyyy']]);
	this.tree.setDatos(this.cuotasPendiente);
	
	this.cobroCuota = new CobroCuota();
	
	this.inicializar();
	
	this.calcular();
};

PagarCreditoDiferido.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	$Xul("cmbFormaPago").addEventListener( 'select', function(){self.eventFormaPago();}, true);
	$Xul("cmbBanco").addEventListener( 'select', function(){self.selectBanco();}, true);
	$Xul("cmbCuenta").addEventListener( 'select', function(){self.selectCuenta();}, true);
	$Xul("chkMora").addEventListener( 'command', function(){self.cobrarMora = this.checked; self.calcular();}, true);
	
	$Xul("tabFac").addEventListener('select', function(e){
		if(this.selectedIndex >= 1){
			self.calcular();
		}
		
		if(this.selectedIndex == 2){
			self.vistaPrevia();
		}
	},true);	
	
	$Xul('txtMoraP').val(this.cobro.porcentajeMora);
	$Xul('txtFechaReg').val(this.cobro.fecha.toString('dd/MM/yyyy HH:mm:ss'));
	$Xul('txtCliente').val(this.model.cliente);
	$Xul('txtFactura').val(this.model.numeroFactura);
	$Xul('txtMonto').val(this.cobro.monto);
	$Xul('txtSaldo').val(this.cobro.saldo);
	$Xul('txtFormaPago').val(this.cobro.formaPago);
	
	$Xul('cmbFormaPago').bind(this.cobroCuota, 'formaPago');
	$Xul('txtValorAPagar').bind(this.cobroCuota, 'monto');	
	$Xul('txtNumeroCuenta').bind(this.cobroCuota, 'numeroCuenta');
	
	$Xul('txtNumeroReferencia').bind(this.cobroCuota, 'numeroReferencia');
	$Xul('dpkFechaVencimiento').bind(this.cobroCuota, 'fechaVencimiento');
	$Xul('dpkFechaEmision').bind(this.cobroCuota, 'fechaEmision');
	
	this.cobroCuota.cobroItem = this.cobro;
	this.cobroCuota.local = this.contexto.local;
	this.cobroCuota.usuario = this.contexto.usuario;
	this.cobroCuota.cliente = new Cliente(this.model.id_cliente);
	this.cobroCuota.lote = this.contexto.loteCaja;
	
	var banco = this.cobroCuota.banco, cuenta = this.cobroCuota.cuenta;
	this.eventFormaPago();	
	$Xul('cmbBanco').val(banco.id);
	this.selectBanco();
	
	this.selectCuenta();
	$Xul('cmbCuenta').val(cuenta.id);
};

PagarCreditoDiferido.prototype.calcular = function () {	
	var rows = new Array();
	rows = this.tree.getSelectRows();
	
	this.cobroCuota.cobrarMora = this.cobrarMora;	
	this.cobroCuota.montoReal = 0;
	this.cobroCuota.montoInteres = 0;
	this.cobroCuota.montoMora = 0;
	this.cobroCuota.montoTotal = 0;
	
	
	
	//Recalcula interes y mora
	for ( var r = 0; r < this.cuotasPendiente.length; r++) {
		var c = new Cuota(); 
		c = this.cuotasPendiente[r];
		
		var diasMora = this.dao.daysToNow(c.fecha);
		c.calcularMora(this.cobro.porcentajeMora, diasMora);
		c.calcularMontoPagar();
		
		this.tree.updateIndex(r);
	};
	
	//Fija los seleccionados y calcula monto a pagar
	this.cuotasSeleccionadas = new Array();
	for ( var i = 0; i < rows.length; i++) {
		var r = rows[i];
		var c = new Cuota(); 
		c = this.cuotasPendiente[r];			
		this.cuotasSeleccionadas.push(c);		
		
		//Suma totales
		this.cobroCuota.montoTotal += c.montoPagar;
		this.cobroCuota.montoReal += c.monto;				
		this.cobroCuota.montoMora += c.mora;
		this.cobroCuota.montoInteres += c.interes;		
	}

	$Xul('txtValorAPagar').val(this.cobroCuota.montoTotal);
};

PagarCreditoDiferido.prototype.selectBanco = function () {
	var idBanco = $Xul("cmbBanco").val();
	
	var banco = ArrayUtil.singleKey(this.bancos, 'id', idBanco);	
	if(banco != null){
		this.cobroCuota.banco = banco;
		if(!this.cobroCuota.banco.cuentas){
			this.cobroCuota.banco.cuentas = this.cuentaDao.buscarPorBancoId(idBanco);
		}
	}else{
		this.cobroCuota.banco = new Banco();		
	}
	this.cobroCuota.cuenta = new CuentaBancaria();
	
	var cuentas = new Array();
	if(this.cobroCuota.banco.cuentas){
		cuentas = this.cobroCuota.banco.cuentas;
	}
	
	$Xul('cmbCuenta').fillComboBox(cuentas, 'id', ['numero','tipo'],'--Seleccione--',-1);
	$Xul('cmbCuenta').val(-1);
};

PagarCreditoDiferido.prototype.selectCuenta = function () {
	var idCuenta = $Xul("cmbCuenta").val();
	var cuenta = ArrayUtil.singleKey(this.cobroCuota.banco.cuentas ? this.cobroCuota.banco.cuentas : new Array(), 'id', idCuenta);
	if(cuenta != null){
		this.cobroCuota.cuenta =  cuenta;
	}else{
		this.cobroCuota.cuenta =  new CuentaBancaria();
	}
};

PagarCreditoDiferido.prototype.eventFormaPago = function () {	
	var tipo = $Xul("cmbFormaPago").val();
	var bancos = new Array();
	
	$Xul("cmbBanco").disable();
	$Xul('cmbCuenta').disable();
	$Xul("txtNumeroCuenta").disable();
	$Xul("txtNumeroReferencia").disable();
	$Xul("dpkFechaVencimiento").disable();
	$Xul("dpkFechaEmision").disable();
	
	if (tipo == 'DEPOSITO') {
		bancos = this.bancosEmpresa;		
		$Xul("cmbBanco").enable();
		$Xul('cmbCuenta').enable();
		$Xul("txtNumeroCuenta").enable();
		$Xul("txtNumeroReferencia").enable();
		$Xul("dpkFechaVencimiento").enable();
		$Xul("dpkFechaEmision").enable();
	}
	
	if (tipo == 'CHEQUE') {
		bancos = this.bancosTodos;
		
		$Xul("cmbBanco").enable();
		$Xul('cmbCuenta').disable();
		$Xul("txtNumeroCuenta").enable();
		$Xul("txtNumeroReferencia").enable();
		$Xul("dpkFechaVencimiento").enable();
		$Xul("dpkFechaEmision").enable();
	}
	
	if (tipo=='TRANSFERENCIA') {
		bancos = this.bancosEmpresa;		
		$Xul("cmbBanco").enable();
		$Xul('cmbCuenta').enable();
		$Xul("txtNumeroCuenta").enable();
		$Xul("txtNumeroReferencia").enable();
		$Xul("dpkFechaVencimiento").enable();
		$Xul("dpkFechaEmision").enable();
	}	
	
	this.bancos = bancos;
	$Xul('cmbBanco').fillComboBox(this.bancos, 'id', ['nombre'],'--Seleccione--',-1);
	$Xul('cmbBanco').val(-1);
};

PagarCreditoDiferido.prototype.validar = function () {	
	try {
		var v = window.validar();
		
		$Xul('cmbBanco').removeValidationError();
		$Xul('cmbCuenta').removeValidationError();
		$Xul('txtNumeroCuenta').removeValidationError();
		$Xul('txtNumeroReferencia').removeValidationError();
		$Xul('dpkFechaEmision').removeValidationError();
		$Xul('dpkFechaVencimiento').removeValidationError();			
		
		var tipo = $Xul("cmbFormaPago").val();				
		
		if (tipo == 'DEPOSITO' || tipo == 'CHEQUE' || tipo=='TRANSFERENCIA') {
			
			if(this.cobroCuota.banco.id == -1){
				v = false; $Xul("cmbBanco").addValidationError("Seleccione el banco");
			}		
			if(this.cobroCuota.numeroCuenta.trim().length == 0){
				v = false; $Xul("txtNumeroCuenta").addValidationError("Ingrese el número de cuenta");
			}
			if(this.cobroCuota.numeroReferencia.trim().length == 0){
				v = false; $Xul("txtNumeroReferencia").addValidationError("Ingrese el número de referencia");
			}
		}
		
		if (tipo == 'DEPOSITO' || tipo=='TRANSFERENCIA') {
			var cuentaId = $Xul('cmbCuenta').val();
			if(cuentaId){
				this.cobroCuota.cuenta = new CuentaBancaria(cuentaId);
			}else{
				v= false;
				$Xul('cmbCuenta').addValidationError('Seleccione la cuenta');
			}
		}		
	} catch (e) {
		alert(e);
		return false;
	}	
	return v;
};

PagarCreditoDiferido.prototype.guardar = function () {
	try {				
		var v = this.validar();
		if(v){
			try {
						
				var b = this.dao.guardar(this.cobroCuota, this.cuotasSeleccionadas); 
				this.model.saldo = this.cobroCuota.cobroItem.saldo.round(2);
				
				if(b){
					var x = confirm("El cobro se ha guardado correctamente; desea imprimirlo?");
					if(x){
						this.imprimir();						
					}
					window.close();
				}else{
					alert("No se pudo guardar el cobro");
				}			
			} catch (ex) {
				alert("PagarCreditoCorriente.guardar(): "+ex);
			}
		}
	} catch (e) {
		alert("Guardar: "+e);
	}
};

PagarCreditoDiferido.prototype.vistaPrevia = function () {	
	
	window.model = {
			cobro: this.cobroCuota,
			empresa : this.contexto.nombreEmpresa,
			ruc : this.contexto.rucEmpresa,
			direccionMatriz : this.contexto.direccionMatriz,
			direccion : this.contexto.local.direccion,
			propietario : this.contexto.nombrePropietario,
			telefono : this.contexto.local.telefono,
			local : this.contexto.local.nombre,
			contexto : this.contexto
	};
	
	var p = $Xul("print");
	p.attr("src","");
	p.attr("src","chrome://jfac/content/vista/print/print-cobro.html");
};

PagarCreditoDiferido.prototype.imprimir = function () {
	$Xul("tabFac").selectedIndex = 2;
	this.vistaPrevia();	
	imprimir('print','facventa');
};