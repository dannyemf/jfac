window.onload = function () {
	try {
		window.contexto = window.parent.contexto ? window.parent.contexto : window.opener.contexto;
		self = new EditarCheque();
	} catch (e) {
		alert('EditarCheque.onload(): '+e);
	}
};

function EditarCheque(){
	this.daoCheque = new ChequeDao();
	
	this.model = window.arguments[0];
	
	this.cheque = new Cheque();
	this.cheque = this.model.cheque;
	this.cheque.monto = this.model.monto;
	
	this.bancos = new BancoDao().buscarTodos();	
	this.cuentas = new Array();	
	
	this.inicializar();
};

EditarCheque.prototype.inicializar = function () {	
	$Xul("btnAceptar").addEventListener( 'command', function(){self.aceptar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	
	$Xul("cmbBanco").addEventListener( 'select', function(){self.selectBanco();}, true);
	$Xul("cmbCuenta").addEventListener( 'select', function(){self.selectCuenta();}, true);
	
	$Xul("cmbBanco").fillComboBox(this.bancos, 'id', ['nombre']);
	$Xul("cmbBanco").selectedIndex = 0;
	
	$Xul('txtMonto').bind(this.cheque, 'monto');
	$Xul('txtNumero').bind(this.cheque, 'numero');
	
	this.selectBanco();
};

EditarCheque.prototype.selectCuenta = function () {
	try {
		var i = $Xul("cmbCuenta").selectedIndex;		
		var b = this.bancos[i];
		this.cheque.cuenta = b;
	} catch (e) {
		this.cheque.cuenta.id = -1;
	}
};

EditarCheque.prototype.selectBanco = function () {
	try {
		var i = $Xul("cmbBanco").selectedIndex;
		var b = this.bancos[i];
		this.cheque.banco = b;
		
		this.cuentas = new CuentaBancariaDao().buscarPorBancoId(b.id);
		$Xul("cmbCuenta").fillComboBox(this.cuentas, 'id', ['numero']);
		$Xul("cmbCuenta").selectedIndex = 0;
		this.selectCuenta();
	} catch (e) {
		this.cheque.banco.id = -1;
		
		this.cuentas = new Array();
		$Xul("cmbCuenta").fillComboBox(this.cuentas, 'id', ['numero']);
		$Xul("cmbCuenta").selectedIndex = 0;
		this.selectCuenta();		
	}	
};

EditarCheque.prototype.aceptar = function () {	
	this.model.aceptar = true;	
	window.close();
};

EditarCheque.prototype.cancelar = function () {	
	this.model.aceptar = false;
	window.close();
};
