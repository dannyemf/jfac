window.onload = function () {
	try {
		self = new RepBalanceGeneral();
	} catch (e) {
		alert('RepBalanceGeneral.onload(): '+e);
	}	
};

function RepBalanceGeneral(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		this.dao = new ContabilidadDao();		
		this.daoParam = new ParametroDao();
		
		this.locales = this.contexto.getLocales();
		this.periodos = this.contexto.getPeriodosContables();
		
		this.inicializar();
	} catch (e) {
		alert("RepBalanceGeneral(): " + e);
	}
};

RepBalanceGeneral.prototype.pdf = function () {	
	exportarReportePdf('frameReporte', 'BalanceGeneral', 'Exportar reporte a pdf');
};

RepBalanceGeneral.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepBalanceGeneral.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);
	
	$Xul('cmbPeriodo').fillComboBox(this.periodos, 'id', ['nombre'], 'Todos', -1);
	$Xul('cmbLocal').fillComboBox(this.locales, 'id', ['codigo','nombre'], 'Todos', -1);
	
	$Xul("cmbPeriodo").selectedIndex=0;
	$Xul("cmbLocal").selectedIndex=0;
};

RepBalanceGeneral.prototype.buscar = function () {	
	try {
		showWait();
		var il = $Xul("cmbLocal").selectedIndex-1;
		var ip = $Xul("cmbPeriodo").selectedIndex-1;
		
		var local = il >= 0 ? this.locales[il] : null;
		var periodo = ip >= 0 ? this.periodos[ip] : null;
		
		var lista = this.dao.generarBalance(periodo, local);
		
		window.model = {
				lista : lista,
				empresa : this.contexto.nombreEmpresa,
				ruc : this.contexto.rucEmpresa,
				direccion : this.contexto.local.direccion,
				propietario : this.contexto.nombrePropietario,
				telefono : this.contexto.local.telefono,
				contexto : this.contexto,
				local : local,
				periodo : periodo
		};
		
		$Xul('frameReporte').attr("src", "");
		$Xul('frameReporte').attr("src", "RepBalanceGeneral.html");
		closeWait();
	} catch (e) {
		logInfo(e);
	}	
	closeWait();
};