window.onload = function () {
	try {		
		self = new AdministrarTransferenciasEnviadas();
	} catch (e) {		
		alert('AdministrarTransferenciasEnviadas.onload(): ' + e);
	}	
};

function AdministrarTransferenciasEnviadas(){
	try {
		this.contexto = new Context();	this.contexto = getContexto();
		this.fechaInicio = new Date();
		this.fechaFin = new Date();		
		
		this.idUsuario = this.contexto.usuario.id;		
		this.dao = new TransferenciaDao();		
		this.idLocalOrigen = -1;
		this.idLocalDestino = -1;
		
		this.treeTransferencias = new XulTree('treeTransferencias', ['id', 'estado', 'observacion', 'localOrigen.nombre', 'fechaCreacion'],'id');
		this.treeTransferencias.setDateColumns([['fechaCreacion', 'dd-MM-yyyy']]);
		
		this.inicializar();
	} catch (e) {
		alert("AdministrarTransferenciasEnviadas(): " + e);
	}
};

AdministrarTransferenciasEnviadas.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.receptar();}, true);
	$Xul('listaCriterios').addEventListener( 'select', function(){self.cambiarCriterio();}, true);
	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
	
	var listaLocalesOrigen = this.contexto.getLocales();
	
	$Xul("cmbLocalOrigen").fillComboBox(listaLocalesOrigen, 'id', ['codigo','nombre'],'--Todos--');
	$Xul("cmbLocalOrigen").bind(this, 'idLocalOrigen');	
	$Xul("cmbLocalOrigen").val(this.contexto.local.id);
	
	this.disableAll();	
};

AdministrarTransferenciasEnviadas.prototype.cambiarCriterio = function () {
	var cri = $Xul('listaCriterios').val();		
	this.disableAll();		
	switch (cri) {
		case 'TODOS':			
			break;
		case 'FECH_CRE':
			$Xul("dtpInicio").enable();
			$Xul("dtpFin").enable();
			break;
		case 'LOCAL_ORI':
			$Xul("cmbLocalOrigen").enable();
			break;
		default:
			break;
	}
};

AdministrarTransferenciasEnviadas.prototype.disableAll = function () {
	$Xul("dtpInicio").disable();
	$Xul("dtpFin").disable();
	$Xul("cmbLocalOrigen").disable();
};

AdministrarTransferenciasEnviadas.prototype.enableAll = function () {
	$Xul("dtpInicio").enable();
	$Xul("dtpFin").enable();
	$Xul("cmbLocalOrigen").enable();
};

AdministrarTransferenciasEnviadas.prototype.buscar = function () {
	var criterio = $Xul('listaCriterios').val();
	
	var lista = new Array();
	
	if(criterio == 'TODOS'){
		lista = this.dao.buscarByLocEst(this.contexto.local.id, new TransferenciaConst().ESTADO_ENVIADA);
	}else{
		if(criterio == 'FECH_CRE'){
			lista = this.dao.buscarByFechaUsLoc('fechaCreacion',this.fechaInicio, this.fechaFin);
		}else{			
			if(criterio == 'LOCAL_ORI'){
				lista = this.dao.buscarByLocalOrigen(this.idLocalOrigen);
			}
		}
	}
	
	this.treeTransferencias.setDatos(lista);
};

AdministrarTransferenciasEnviadas.prototype.receptar = function () {	
	var cmp = this.treeTransferencias.getSelected();
	
	if(cmp != null){
		if(cmp.estado == cmp.ESTADO_ENVIADA){
			var features = "chrome,modal,dependent=true,centerscreen,resizable";
			window.openDialog("chrome://jfac/content/vista/inventario/ReceptarTransferencia.xul", "receptar:transferencia", features, cmp);
			this.dao.refresh(cmp);
			this.treeTransferencias.updateSelected();
		}else{
			alert("Solo se pueden receptar transferencias en estado: " + cmp.ESTADO_ENVIADA);
		}
	}else{
		alert("Debe seleccionar una transferencia para receptar");
	}
};