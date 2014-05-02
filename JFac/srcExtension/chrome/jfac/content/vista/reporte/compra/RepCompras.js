window.onload = function () {
	try {
		self = new RepCompras();
	} catch (e) {
		alert('RepCompras.onload(): ' + e);
	}
};

function RepCompras(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		
		this.idLocal = this.contexto.local.id;
		this.idProveedor = -1;
		this.idUsuario = -1;
		this.estado = null;
		
		this.dao = new FacturaCompraDao();
		
		this.locales = this.contexto.getLocales();
		this.proveedores = this.contexto.getProveedores();
		this.usuarios = this.contexto.getUsuarios();
		
		this.inicializar();
	} catch (e) {
		alert("RepCompras(): " + e);
	}
};

RepCompras.prototype.pdf = function () {	
	exportarReportePdf('frameReporte', 'ReporteCompras', 'Exportar reporte a pdf');
};

RepCompras.prototype.imprimir = function () {
	imprimirReporte('frameReporte');
};

RepCompras.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnImprimir").addEventListener( 'command', function(){self.imprimir();}, true);
	$Xul("btnPdf").addEventListener( 'command', function(){self.pdf();}, true);	
	$Xul("txtTexto").addEventListener( 'keyup', function(event){if(event.keyCode == 13) self.buscar();}, true);		
	
	$Xul("cmbLocal").fillComboBox(this.locales, 'id', ['codigo','nombre'], '--Todos--',-1);
	$Xul("cmbProveedor").fillComboBox(this.proveedores, 'id', ['razonSocial'], '--Todos--',-1);
	$Xul("cmbUsuario").fillComboBox(this.usuarios, 'id', ['login'], '--Todos--',-1);
	
	$Xul("cmbUsuario").bind(this, 'idUsuario');
	$Xul("cmbLocal").bind(this, 'idLocal');
	$Xul("cmbProveedor").bind(this, 'idProveedor');
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
		
};

RepCompras.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();			
	
	if(criterio == 'TODOS'){
		criterio = null;
	}
	
	//(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal, idProveedor, estado, numeroFactura){
	var lista = this.dao.vistaCompras(criterio, this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idProveedor, null, texto);
		
	window.model = {
			proveedor : ArrayUtil.singleKey(this.proveedores, 'id', this.idProveedor),
			local : ArrayUtil.singleKey(this.locales, 'id', this.idLocal),
			usuario : ArrayUtil.singleKey(this.usuarios, 'id', this.idUsuario),
			lista : lista,
			fechaInicio: this.fechaInicio,
			fechaFin: this.fechaFin,
			empresa : this.contexto.nombreEmpresa,
			ruc : this.contexto.rucEmpresa,
			direccion : this.contexto.local.direccion,
			propietario : this.contexto.nombrePropietario,
			telefono : this.contexto.local.telefono,
			criterio : criterio,
			numero : texto,
			contexto : this.contexto
	};
	
	$Xul('frameReporte').attr("src", "");
	$Xul('frameReporte').attr("src", "RepCompras.html");
	
	$Xul('txtTexto').select();
};