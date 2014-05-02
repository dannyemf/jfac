window.onload = function () {
	try {
		self = new RepLibroDiario();		
	} catch (e) {
		alert('RepLibroDiario.onload(): '+e);
	}
};

function RepLibroDiario(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		this.dao = new ContabilidadDao();		
		this.daoParam = new ParametroDao();
		
		this.locales = this.contexto.getLocales();
		this.periodos = this.contexto.getPeriodosContables();
		
		this.inicializar();
	} catch (e) {
		alert("RepLibroDiario(): " + e);
	}
};

RepLibroDiario.prototype.pdf = function () {	
	exportarReportePdf('frameReporte', 'LibroDiario', 'Exportar reporte a pdf');
};

RepLibroDiario.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepLibroDiario.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);
	
	$Xul('cmbPeriodo').fillComboBox(this.periodos, 'id', ['nombre'], 'Todos',-1);
	$Xul('cmbLocal').fillComboBox(this.locales, 'id', ['nombre','nombre'], 'Todos',-1);
	
	$Xul("cmbPeriodo").selectedIndex=0;
	$Xul("cmbLocal").selectedIndex=0;
	
	$Xul('listaCriterios').addEventListener( 'select', function(){self.cambiarCriterio();}, true);	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
};

RepLibroDiario.prototype.buscar = function () {	
	
	showWait();
	
	try {
		var criterio = $Xul('listaCriterios').val();	
		var il = $Xul("cmbLocal").val();
		var ip = $Xul("cmbPeriodo").val();	
		var lotes = new Array();
		var local = ArrayUtil.singleKey(this.locales, 'id', il);
		var periodo = ArrayUtil.singleKey(this.periodos, 'id', ip);
		
		
		if(criterio == 'PERIODO_LOCAL_FECHA'){
			lotes = this.dao.buscarLibroDiarioPorPeriodoLocalFechas(ip, il, this.fechaInicio, this.fechaFin);
		}else{
			lotes = this.dao.buscarLibroDiarioPorPeriodoLocal(ip,il);
		}
		
		
		window.model = {
				lista : null,
				fechaInicio: this.fechaInicio,
				fechaFin: this.fechaFin,
				empresa : this.contexto.nombreEmpresa,
				ruc : this.contexto.rucEmpresa,
				direccion : this.contexto.local.direccion,
				propietario : this.contexto.nombrePropietario,
				telefono : this.contexto.local.telefono,
				lotes : lotes,
				contexto : this.contexto,
				criterio : criterio,
				local : local,
				periodo : periodo
		};
		
		$Xul('frameReporte').attr("src", "");
		$Xul('frameReporte').attr("src", "RepLibroDiario.html");	
	} catch (e) {
	}
	
	closeWait();
};