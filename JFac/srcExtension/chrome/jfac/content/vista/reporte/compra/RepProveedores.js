window.onload = function () {
	try {		
		self = new RepProveedores();
	} catch (e) {
		alert('RepProveedores.onload(): ' + e);
	}
};

function RepProveedores(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		this.idProveedor = -1;
		
		this.dao = new ProveedorDao();
		this.daoParam = new ParametroDao();
		
		this.inicializar();
	} catch (e) {
		alert("RepProveedores(): " + e);
	}
};

RepProveedores.prototype.pdf = function () {	
	exportarReportePdf('frameReporte', 'RepProveedores', 'Exportar reporte a pdf');
};

RepProveedores.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepProveedores.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);
	$Xul("txtTexto").addEventListener( 'keyup', function(){if(event.keyCode == 13) self.buscar();}, true);
};

RepProveedores.prototype.buscar = function () {
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
	$Xul('frameReporte').attr("src", "RepProveedores.html");
};