window.onload = function () {
	try {
		window.contexto = window.parent.contexto ? window.parent.contexto : window.opener.contexto;
		self = new IngresarCuotas();
	} catch (e) {
		// TODO: handle exception
		alert(e);
	}
};

function IngresarCuotas(){
	//this.dao = new LoteCajaDao();		
	this.model = window.arguments[0];
	this.cobro = new Cobro();
	this.item = new CobroItem();
	
	this.cobro = this.model.cobro;
	this.item = this.model.item;
	this.control = this.model.control;	
	this.saldo = this.item.monto;
	this.tiposCredito = new TipoCreditoDao().buscarTodos();
	this.interes = 0;
	
	this.tree = new XulTree('treeItems',['numeroCuota','fecha', 'monto','interes','montoPagar'], 'index');
	//his.tree.setNumericCols([1,2]);
	this.tree.setDateColumns([['fecha','ddd, dd-MM-yyyy']]);
	
	this.inicializar();
};

IngresarCuotas.prototype.inicializar = function () {	
	
	$Xul("cmbTipo").fillComboBox(this.tiposCredito, 'id',['descripcion','tipo']);
	$Xul("cmbTipo").addEventListener('select', function(){self.select();}, true);
	$Xul("cmbTipo").selectedIndex = 0;
	this.select();
	
	$Xul('txtTotal').val(this.item.monto);	
	
	$Xul("btnAceptar").addEventListener( 'command', function(){self.aceptar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	$Xul("btnGenerar").addEventListener( 'command', function(){self.generar();}, true);
};

IngresarCuotas.prototype.select = function () {
	try {
		var i = $Xul("cmbTipo").selectedIndex;
		var tipo = this.tiposCredito[i];
		
		$Xul('txtInteres').val(tipo.interes);
		$Xul('txtMora').val(tipo.mora);
		$Xul('txtCuotas').val(tipo.numeroCuotas);
		
		var cuotas = new Array();
		cuotas = this.generarCuotas();
		
		var hoy = new Date();
		var fin = new Date();		
		if(cuotas.length > 0){
			fin = cuotas[cuotas.length - 1].fecha.clone();
		}
		var dias = new Dao().daysFromTo(hoy, fin);
		this.interes = (((( this.item.monto * tipo.interes ) / 100.0) / 30.0) * dias).round(2);
		
		this.item.porcentajeMora = tipo.mora;
		this.item.porcentajeInteres = tipo.interes;		
		
		$Xul('txtInteresValor').val(this.interes);
		$Xul('txtTotalPagar').val(this.item.monto +  this.interes);
	} catch (e) {
		alert(e);
	}
};

IngresarCuotas.prototype.generar = function () {
	try {
		this.tree.clear();		
		this.item.cuotas = this.generarCuotas();
		this.tree.setDatos(this.item.cuotas);
	} catch (e) {
		alert('IngresarCuotas.addPagoItem(): '+e);
	}
};

IngresarCuotas.prototype.generarCuotas = function () {
	var n = $Xul("txtCuotas").val() * 1;
	var tipoCredito = this.tiposCredito[ $Xul("cmbTipo").selectedIndex];
	var pInteres = $Xul('txtInteres').val() * 1;
	var pMora = $Xul('txtMora').val() * 1;
	var interes = this.interes;
	
	var date = new Date();
	var m = (this.item.monto /n).round(2);
	var mi = (interes / n).round(2);
	var cuotas = new Array();
	
	if(n > 0){
		for(var i = 0; i < n ; i++){				
			var c = this.control.crearCuota(this.item);
			
			switch (tipoCredito.tipo) {
				case "MENSUAL": date = date.addMonths(1); break;
				case "QUINCENAL": date = date.addDays(15); break;
				case "SEMANAL": date = date.addWeeks(1); break;
				case "DIARIO": date = date.addDays(1); break;
				default: break;
			}
			
			c.fecha = date.clone();				
			c.monto = m;
			c.interes = mi;
			c.numeroCuota = i + 1;
			c.tipo = tipoCredito.tipo;
			c.calcularMontoPagar();
			cuotas.push(c);
		}
	}
		
	return cuotas;
};

IngresarCuotas.prototype.aceptar = function () {			
	this.model.aceptar = true;	
	window.close();
};

IngresarCuotas.prototype.cancelar = function () {
	this.model.aceptar = false;
	window.close();
};
