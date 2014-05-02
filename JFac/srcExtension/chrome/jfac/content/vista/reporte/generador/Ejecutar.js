window.onload = function () {
	try {
		self = new Ejecutar();
	} catch (e) {
		alert('Ejecutar.onload(): ' + e);
	}
};

function Ejecutar(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		this.dao = new ReporteDao();
		this.reporte = new Reporte();
		this.reporte = window.arguments[0];		
		this.inicializar();
		this.cargarRelaciones();
		//this.ejecutar();
	} catch (e) {
		alert("Ejecutar(): " + e);
	}
};

Ejecutar.prototype.pdf = function () {	
	exportarReportePdf('frameReporte', 'Reporte: ' + this.reporte.nombre, 'Exportar reporte a pdf');
};

Ejecutar.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

Ejecutar.prototype.inicializar = function () {	
	$Xul("btnEjecutar").addEventListener( 'command', function(){self.ejecutar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);
	
	$Xul('lblTitulo').val('Nombre reporte: ' + this.reporte.nombre);
};

Ejecutar.prototype.cargarFiltros = function(){
	for(var f = 0; f < this.reporte.filtros.length; f++){
		var filtro = new Filtro();
		filtro = this.reporte.filtros[f];
		
		if((filtro.isValorPredefinido==true || filtro.isValorPredefinido == 1) == false){
			var msj = 'Ingrese el valor de: ' + filtro.tabla+'.'+filtro.columna+'('+filtro.tipoDato+')';
			var isbetween = filtro.operadorValor == filtro.FILTRO_BETWEEN ? true : false;
			
			var v1 = prompt(msj + (isbetween ? ' (BETWEEN VALOR1)' : ''));
			filtro.valor1 = v1;
			
			if(isbetween){
				var v2 = prompt(msj + (isbetween ? ' (BETWEEN '+v1+' AND VALOR2)' : ''));
				filtro.valor2 = v2;
			}
		}					
	}
};

Ejecutar.prototype.cargarRelaciones = function(){
	this.reporte.relaciones = this.dao.obtenerRelacionesTablas(this.reporte.tablas);
};

Ejecutar.prototype.ejecutar = function () {
	this.cargarFiltros();
	var sql = this.reporte.generarSql();
	
	var lista = this.dao.query(sql);
	var fech = new Date().toString('dd/MM-yyyy HH:mm');
	
	window.model = {
		reporte: this.reporte,
		lista : lista,			
		contexto : this.contexto,
		empresa : this.contexto.nombreEmpresa,
		ruc : this.contexto.rucEmpresa,
		direccion : this.contexto.local.direccion,
		propietario : this.contexto.nombrePropietario,
		telefono : this.contexto.local.telefono,
		fecha: fech,
		usuario: this.contexto.usuario.nombres + " " + this.contexto.usuario.apellidos
	};
	
	$Xul('frameReporte').attr("src", "");
	$Xul('frameReporte').attr("src", "Ejecutar.html");
};