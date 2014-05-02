window.onload = function () {
	try {		
		self = new EditarAnticipo();
	} catch (e) {
		alert("EditarAnticipo.onload(): "+e);
	}
};

function EditarAnticipo(){
	this.contexto = new Context(); this.contexto = getContexto();
	if(this.contexto == null){
		alert('No se inicializado el contexto');
	}
	
	this.dao = new AnticipoDao();
	this.bancoDao = new BancoDao();
	this.cuentaDao = new CuentaBancariaDao();
	
	this.bancosTodos = this.bancoDao.buscarTodos();
	this.bancosEmpresa = this.bancoDao.buscarTodosEmpresa();
	
	this.anticipo = new Anticipo();
	
	this.anticipo = window.arguments[0];
	this.inicializar();
};

EditarAnticipo.prototype.inicializar = function () {	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){window.close();}, true);
	$Xul("cmbFormaPago").addEventListener( 'select', function(){self.eventFormaPago();}, true);
	$Xul("cmbBanco").addEventListener( 'select', function(){self.selectBanco();}, true);
	$Xul("cmbCuenta").addEventListener( 'select', function(){self.selectCuenta();}, true);	
	$Xul("tabFac").addEventListener( 'select', function(e){if(this.selectedIndex == 1){ self.anticipo.autoprint=false; self.vistaPrevia();}},true);
	
	$Xul('txtEstado').bind(this.anticipo, 'estado');	
	$Xul('cmbFormaPago').bind(this.anticipo, 'formaPago');
	$Xul('txtMonto').bind(this.anticipo, 'monto');
	$Xul('txtDescripcion').bind(this.anticipo, 'descripcion');
	$Xul('popupCliente').cliente = this.anticipo.cliente.id == -1 ? null :this.anticipo.cliente;
	$Xul('txtFecha').val(this.anticipo.fecha.toString('dd-MM-yyyy'));
	
	$Xul('txtNumeroCuenta').bind(this.anticipo, 'numeroCuenta');
	$Xul('txtNumeroReferencia').bind(this.anticipo, 'numeroReferencia');
	$Xul('dpkFechaVencimiento').bind(this.anticipo, 'fechaVencimiento');
	$Xul('dpkFechaEmision').bind(this.anticipo, 'fechaEmision');		
	
	if(this.anticipo.estado != this.anticipo.ESTADO_PENDIENTE && this.anticipo.monto == this.anticipo.saldo){
		$Xul("btnGuardar").disable();
	}
	
	if(this.anticipo.lote.id != this.contexto.loteCaja.id){
		$Xul('txtMonto').disable();
		$Xul('cmbFormaPago').disable();
	}
	
	var banco = this.anticipo.banco, cuenta = this.anticipo.cuenta;
	this.eventFormaPago();	
	$Xul('cmbBanco').val(banco.id);
	this.selectBanco();
	
	this.selectCuenta();
	$Xul('cmbCuenta').val(cuenta.id);
};

EditarAnticipo.prototype.selectBanco = function () {
	var idBanco = $Xul("cmbBanco").val();
	
	var banco = ArrayUtil.singleKey(this.bancos, 'id', idBanco);	
	if(banco != null){
		this.anticipo.banco = banco;
		if(!this.anticipo.banco.cuentas){ 
			this.anticipo.banco.cuentas = this.cuentaDao.buscarPorBancoId(idBanco);
		}
	}else{
		this.anticipo.banco = new Banco();		
	}
	this.anticipo.cuenta = new CuentaBancaria();
	
	var cuentas = new Array();
	if(this.anticipo.banco.cuentas){
		cuentas = this.anticipo.banco.cuentas;
	}
	
	$Xul('cmbCuenta').fillComboBox(cuentas, 'id', ['numero','tipo'],'--Seleccione--',-1);
	$Xul('cmbCuenta').val(-1);
};

EditarAnticipo.prototype.selectCuenta = function () {
	var idCuenta = $Xul("cmbCuenta").val();
	var cuenta = ArrayUtil.singleKey(this.anticipo.banco.cuentas ? this.anticipo.banco.cuentas : new Array(), 'id', idCuenta);
	if(cuenta != null){
		this.anticipo.cuenta =  cuenta;
	}else{
		this.anticipo.cuenta =  new CuentaBancaria();
	}
};

EditarAnticipo.prototype.eventFormaPago = function () {	
	var tipo = $Xul("cmbFormaPago").val();
	var bancos = new Array();
	
	$Xul("cmbBanco").disable();
	$Xul('cmbCuenta').disable();
	$Xul("txtNumeroCuenta").disable();
	$Xul("txtNumeroReferencia").disable();
	$Xul("dpkFechaVencimiento").disable();
	$Xul("dpkFechaEmision").disable();
	
	if (tipo == 'Deposito') {
		bancos = this.bancosEmpresa;		
		$Xul("cmbBanco").enable();
		$Xul('cmbCuenta').enable();
		$Xul("txtNumeroCuenta").enable();
		$Xul("txtNumeroReferencia").enable();
		$Xul("dpkFechaVencimiento").enable();
		$Xul("dpkFechaEmision").enable();
	}
	
	if (tipo == 'Cheque') {
		bancos = this.bancosTodos;
		
		$Xul("cmbBanco").enable();
		$Xul('cmbCuenta').disable();
		$Xul("txtNumeroCuenta").enable();
		$Xul("txtNumeroReferencia").enable();
		$Xul("dpkFechaVencimiento").enable();
		$Xul("dpkFechaEmision").enable();
	}
	
	if (tipo=='Transferencia') {
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

EditarAnticipo.prototype.validar = function () {	
	try {
		var v = window.validar();		
		$Xul('popupCliente').mensaje='';
		$Xul('cmbBanco').removeValidationError();
		$Xul('cmbCuenta').removeValidationError();
		$Xul('txtNumeroCuenta').removeValidationError();
		$Xul('txtNumeroReferencia').removeValidationError();
		$Xul('dpkFechaEmision').removeValidationError();
		$Xul('dpkFechaVencimiento').removeValidationError();	
		
		if($Xul('popupCliente').cliente == null){
			$Xul('popupCliente').mensaje='Seleccione el cliente';
			v = false;
		}
		
		var tipo = $Xul("cmbFormaPago").val();
		
		if (tipo == 'Deposito' || tipo == 'Cheque' || tipo=='Transferencia') {
			
			if(this.anticipo.banco.id == -1){
				v = false; $Xul("cmbBanco").addValidationError("Seleccione el banco");
			}		
			if(this.anticipo.numeroCuenta.trim().length == 0){
				v = false; $Xul("txtNumeroCuenta").addValidationError("Ingrese el número de cuenta");
			}
			if(this.anticipo.numeroReferencia.trim().length == 0){
				v = false; $Xul("txtNumeroReferencia").addValidationError("Ingrese el número de referencia");
			}				
		}
		
		if (tipo == 'Deposito' || tipo=='Transferencia') {
			var cuentaId = $Xul('cmbCuenta').val();
			if(cuentaId){
				this.anticipo.cuenta = new CuentaBancaria(cuentaId);
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

EditarAnticipo.prototype.guardar = function () {
	try {				
		var v = this.validar();		
		if(v){
			try {
				this.anticipo.cliente = $Xul('popupCliente').cliente;
				var b = this.dao.guardar(this.anticipo);
				if(b){
					var x = confirm("El anticipo se ha guardado correctamente; desea imprimirlo?");
					if(x){
						this.imprimir();
					}
				}else{
					alert("No se pudo guardar el anticipo");
				}			
			} catch (ex) {
				alert("EditarAnticipo.guardar(): "+ex);
			}
		}
	} catch (e) {
		alert("Guardar: "+e);
	}
};

EditarAnticipo.prototype.vistaPrevia = function () {
	this.anticipo.cliente = $Xul('popupCliente').cliente;
	
	window.model = {
			anticipo: this.anticipo,
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
	p.attr("src","chrome://jfac/content/vista/print/print-anticipo.html");
};

EditarAnticipo.prototype.imprimir = function () {
	$Xul("tabFac").selectedIndex = 1;
	this.vistaPrevia();	
	imprimir('print','facventa');
};