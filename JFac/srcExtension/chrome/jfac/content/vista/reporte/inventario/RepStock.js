window.onload = function () {
	try {		
		self = new RepStock();
	} catch (e) {
		alert('RepStock.onload(): ' + e);
	}
};

function RepStock(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		this.idLocal = this.contexto.local.id;
		
		this.dao = new StockDao();
		this.daoParam = new ParametroDao();				
		
		this.listaLocales = new Array();
		this.listaLocales.push({id:-1,nombre:'--Todos--'},{id:-2, nombre:'--Empresa--'});
		var locs = this.contexto.getLocales();
		for(var p = 0 ; p < locs.length; p++){
			this.listaLocales.push(locs[p]);
		}		
		
		this.inicializar();
	} catch (e) {
		alert("RepStock(): " + e);
	}
};

RepStock.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepStock.prototype.pdf = function () {
	 exportarReportePdf('frameReporte','ReporteStock','Exportar reporte a pdf');
};

RepStock.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);
	$Xul("txtTexto").addEventListener( 'keyup', function(){if(event.keyCode == 13) self.buscar();}, true);

	var cmbLocal = $Xul('listaLocales');
	cmbLocal.fillComboBox(this.listaLocales, "id", ["nombre"]);
	
	cmbLocal.selectedIndex = 0;
};

RepStock.prototype.buscar = function () {	
	try {
		var texto = $Xul('txtTexto').val();	
		var local = $Xul('listaLocales').val();
		
		var loc = null;
		var lista = new Array();
		
		lista = this.dao.buscarStockPorLocal(local, texto);
		loc = local > 0? new LocalDao().load(new Local(), local) : null;
				
		window.model = {
			lista : lista,
			empresa : this.contexto.nombreEmpresa,
			ruc : this.contexto.rucEmpresa,
			direccion : this.contexto.local.direccion,
			propietario : this.contexto.nombrePropietario,
			telefono : this.contexto.local.telefono,
			contexto : this.contexto,
			local : loc,
			criterio: local
		};
		
		$Xul('frameReporte').attr("src", "");
		$Xul('frameReporte').attr("src", "RepStock.html");
	} catch (e) {
		alert('RepStock.buscar(): '+e);
	}
};