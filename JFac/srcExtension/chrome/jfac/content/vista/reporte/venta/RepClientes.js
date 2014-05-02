window.onload = function () {
	try {
		self = new RepClientes();
	} catch (e) {
		alert('RepClientes.onload(): ' + e);
	}
};

function RepClientes(){
	try {
		this.contexto = new Context();	this.contexto = getContexto();
		this.idCliente = -1;		
		this.dao = new ClienteDao();
		this.daoParam = new ParametroDao();
		this.inicializar();
	} catch (e) {
		alert("RepClientes(): " + e);
	}
};

RepClientes.prototype.pdf = function () {	
	exportarReportePdf('frameReporte', 'ReporteClientes', 'Exportar reporte a pdf');
};

RepClientes.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepClientes.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);
	$Xul("txtTexto").addEventListener( 'keyup', function(){if(event.keyCode == 13) self.buscar();}, true);
};

RepClientes.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();	
	var lista = new Array();	
	lista = this.dao.buscarPorTexto(texto);
	
	window.model = {
			lista : lista,
			empresa : this.contexto.nombreEmpresa,
			ruc : this.contexto.rucEmpresa,
			direccion : this.contexto.local.direccion,
			propietario : this.contexto.nombrePropietario,
			telefono : this.contexto.local.telefono,
			contexto : this.contexto
	};
	
	$Xul('frameReporte').attr("src", "");
	$Xul('frameReporte').attr("src", "RepClientes.html");
};