window.onload = function () {
	try {		
		self = new RepCierreCaja();
	} catch (e) {
		alert('RepCierreCaja.onload(): ' + e);
	}
};

function RepCierreCaja(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();		
		this.idPunto = -1;
		this.idUsuario = this.contexto.usuario.id;
		
		this.dao = new LoteCajaDao();		
		this.daoPunto = new PuntoFacturacionDao();
		
		this.listaPuntos = this.daoPunto.obtenerTodos();
		this.listaUsuarios = this.contexto.getUsuarios();
		
		this.inicializar();
	} catch (e) {
		alert("RepCierreCaja(): " + e);
	}
};

RepCierreCaja.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepCierreCaja.prototype.pdf = function () {
	 exportarReportePdf('frameReporte','ReporteCierreCaja','Exportar reporte a pdf');
};

RepCierreCaja.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);

	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
	
	var cmbPunto = $Xul('listaPuntos');
	cmbPunto.fillComboBox(this.listaPuntos, "id", ["nombre"],'--Todos--',-1);
	cmbPunto.bind(this, 'idPunto');
	
	var cmbUsuario = $Xul('listaUsuarios');
	cmbUsuario.fillComboBox(this.listaUsuarios, "id", ["login"],'--Todos--',-1);
	cmbUsuario.bind(this, 'idUsuario');
};

RepCierreCaja.prototype.buscar = function () {	
	try {
		var criterio = $Xul('listaCriterios').val();			
		if(criterio == 'TODOS'){
			criterio = null;
		}
		
		var punto = ArrayUtil.singleKey(this.listaPuntos, 'id', this.idPunto);
		var usuario = ArrayUtil.singleKey(this.listaUsuarios, 'id', this.idUsuario);
		
		var lista = new Array();
		lista = this.dao.vistaCierresCaja(criterio, this.fechaInicio, this.fechaFin, this.idUsuario, this.idPunto);		
		
		window.model = {
				lista : lista,
				fechaInicio: this.fechaInicio,
				fechaFin: this.fechaFin,
				empresa : this.contexto.nombreEmpresa,
				ruc : this.contexto.rucEmpresa,
				direccion : this.contexto.local.direccion,
				propietario : this.contexto.nombrePropietario,
				telefono : this.contexto.local.telefono,
				contexto : this.contexto,
				criterio : criterio,
				punto : punto,
				usuario : usuario
		};
		
		$Xul('frameReporte').attr("src", "");
		$Xul('frameReporte').attr("src", "RepCierreCaja.html");
	} catch (e) {
		alert('RepCierreCaja.buscar(): '+e);
	}
};