window.onload = function () {
	try {
		self = new RepProforma();
	} catch (e) {
		alert(e);
	}	
};

function RepProforma(){
	try {
		this.contexto = new Context();	this.contexto = getContexto();
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		this.idLocal = this.contexto.local.id;
		this.idCliente = -1;
		this.idUsuario = this.contexto.usuario.id;
		this.estado = null;
		
		this.dao = new ProformaDao();
		this.usuarios = this.contexto.getUsuarios();
		this.locales = this.contexto.getLocales();
		
		this.inicializar();
	} catch (e) {
		alert("BuscadorCompra(): " + e);
	}
};

RepProforma.prototype.pdf = function () {	
	exportarReportePdf('frameReporte', 'ReporteProformas', 'Exportar reporte a pdf');
};

RepProforma.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepProforma.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);	
	$Xul("txtTexto").addEventListener( 'keyup', function(event){if(event.keyCode == 13) self.buscar();}, true);
	
	$Xul("cmbLocal").fillComboBox(this.locales, 'id', ['codigo','nombre'], '--Todos--',-1);	
	$Xul("cmbUsuario").fillComboBox(this.usuarios, 'id', ['login'], '--Todos--',-1);	
		
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
	$Xul("cmbUsuario").bind(this, 'idUsuario');
	$Xul("cmbLocal").bind(this, 'idLocal');
	
};

RepProforma.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();
	if(criterio == 'TODOS'){
		criterio = null;
	};
	
	var lista = new Array();	
	var cli = $Xul("popupCliente").cliente; 
	this.idCliente = cli != null ? cli.id : null;
	
	var lista = this.dao.vistaProformas(criterio, this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idCliente, null, texto);
	
	window.model = {
			cliente : cli,
			lista : lista,
			fechaInicio: this.fechaInicio,
			fechaFin: this.fechaFin,
			empresa : this.contexto.nombreEmpresa,
			ruc : this.contexto.rucEmpresa,
			direccion : this.contexto.local.direccion,
			propietario : this.contexto.nombrePropietario,
			telefono : this.contexto.local.telefono,
			contexto : this.contexto,
			numero : texto,
			criterio : criterio
	};
	
	$Xul('frameReporte').attr("src", "");
	$Xul('frameReporte').attr("src", "RepProforma.html");
	
	$Xul('txtTexto').select();
};