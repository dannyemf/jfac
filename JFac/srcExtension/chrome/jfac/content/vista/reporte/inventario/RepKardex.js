window.onload = function () {
	try {		
		self = new RepKardex();
	} catch (e) {
		alert('RepKardex.onload(): ' + e);
	}
};

function RepKardex(){
	try {
		this.contexto = new Context();	this.contexto = getContexto();
		this.idLocal = this.contexto.local.id;
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		
		this.dao = new KardexDao();
		this.daoParam = new ParametroDao();				
		
		this.listaLocales = new Array();
		this.listaLocales.push({id:-1,nombre:'--Todos--'});
		var locs = this.contexto.getLocales();
		for(var p = 0 ; p < locs.length; p++){
			this.listaLocales.push(locs[p]);
		}		
		
		this.inicializar();
	} catch (e) {
		alert("RepKardex(): " + e);
	}
};

RepKardex.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepKardex.prototype.pdf = function () {
	 exportarReportePdf('frameReporte','ReporteKardex','Exportar reporte a pdf');
};

RepKardex.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
	$Xul("txtTexto").addEventListener( 'keyup', function(){if(event.keyCode == 13) self.buscar();}, true);

	var cmbLocal = $Xul('listaLocales');
	cmbLocal.fillComboBox(this.listaLocales, "id", ["nombre"]);	
	cmbLocal.selectedIndex = 0;
	
	cmbLocal.bind(this, 'idLocal');
};

RepKardex.prototype.buscar = function () {	
	try {
		var texto = $Xul('txtTexto').val();	
		var local = $Xul('listaLocales').val();
		var fecha = $Xul('listaCriterios').val();
		
		var loc = null;
		var lista = new Array();
		
		if(fecha == 'TODOS'){
			lista = this.dao.vistaKardex(null, null, this.idLocal, texto);
		}else{
			lista = this.dao.vistaKardex(this.fechaInicio, this.fechaFin, this.idLocal, texto);
		}
			
		loc = local > 0? new LocalDao().load(new Local(), local) : null;
				
		window.model = {
			fechaInicio: this.fechaInicio,
			fechaFin: this.fechaFin,
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
		$Xul('frameReporte').attr("src", "RepKardex.html");
	} catch (e) {
		alert('RepKardex.buscar(): '+e);
	}
};