window.onload = function () {
	try {		
		self = new AdministrarTransferencias();
	} catch (e) {		
		alert('AdministrarTransferencias.onload(): ' + e);
	}	
};

function AdministrarTransferencias(){
	try {
		this.contexto = new Context();	this.contexto = getContexto();
		this.fechaInicio = new Date();
		this.fechaFin = new Date();		
		
		this.idUsuario = this.contexto.usuario.id;		
		this.dao = new TransferenciaDao();
		this.daoLocal = new LocalDao();		
		this.idLocalOrigen = -1;
		this.idLocalDestino = -1;
		
		this.treeTransferencias = new XulTree('treeTransferencias', ['id', 'estado', 'observacion', 'localOrigen.nombre', 'localDestino.nombre', 'fechaCreacion'],'id');
		this.treeTransferencias.setDateColumns([['fechaCreacion', 'dd-MM-yyyy']]);
		
		this.inicializar();
	} catch (e) {
		alert("AdministrarTransferencias(): " + e);
	}
};

AdministrarTransferencias.prototype.inicializar = function () {
	$Xul("btnNuevo").addEventListener( 'command', function(){self.nuevo();}, true);
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);
	$Xul("btnEliminar").addEventListener( 'command', function(){self.eliminar();}, true);	
	$Xul('listaCriterios').addEventListener( 'select', function(){self.cambiarCriterio();}, true);
	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
	
	var listaLocalesOrigen =this.daoLocal.obtenerTodos();
	var listaLocalesDestino =this.daoLocal.obtenerTodos();
	
	$Xul("cmbLocalOrigen").fillComboBox(listaLocalesOrigen, 'id', ['codigo','nombre'],'--Todos--');
	$Xul("cmbLocalOrigen").bind(this, 'idLocalOrigen');
	$Xul("cmbLocalDestino").fillComboBox(listaLocalesDestino, 'id', ['codigo','nombre'],'--Todos--');
	$Xul("cmbLocalDestino").bind(this, 'idLocalDestino');	
			
	$Xul("cmbLocalOrigen").selectedIndex = 0;
	$Xul("cmbLocalDestino").selectedIndex = 0;
	
	this.disableAll();
	
};

AdministrarTransferencias.prototype.cambiarCriterio = function () {
	var cri = $Xul('listaCriterios').val();		
	this.disableAll();		
	switch (cri) {
		case 'TODOS':			
			break;
		case 'FECH_CRE':
		case 'FECH_REC':
			$Xul("dtpInicio").enable();
			$Xul("dtpFin").enable();
			break;
		case 'LOCAL_ORI':
		case 'LOCAL_DES':
			$Xul("cmbLocalOrigen").enable();
			$Xul("cmbLocalDestino").enable();
			break;
		default:
			break;
	}
};

AdministrarTransferencias.prototype.disableAll = function () {
	$Xul("dtpInicio").disable();
	$Xul("dtpFin").disable();
	$Xul("cmbLocalOrigen").disable();
	$Xul("cmbLocalDestino").disable();
};

AdministrarTransferencias.prototype.enableAll = function () {
	$Xul("dtpInicio").enable();
	$Xul("dtpFin").enable();
	$Xul("cmbLocalOrigen").enable();
	$Xul("cmbLocalDestino").enable();
};

AdministrarTransferencias.prototype.buscar = function () {
	var criterio = $Xul('listaCriterios').val();
	
	var lista = new Array();
	
	if(criterio == 'TODOS'){
		lista = this.dao.buscarByEst(new TransferenciaConst().ESTADO_REGISTRADA);
	}else{
		if(criterio == 'FECH_CRE'){
			lista = this.dao.buscarByFechaUsLoc('fechaCreacion',this.fechaInicio, this.fechaFin);
		}else{
			if(criterio == 'LOCAL_ORI'){
				lista = this.dao.buscarByLocalOrigen(this.idLocalOrigen);
			}else{
				if(criterio == 'LOCAL_DES'){
					lista = this.dao.buscarByLocalDestino(this.idLocalDestino);
				}
			}
		}
	}	
	this.treeTransferencias.setDatos(lista);
};

AdministrarTransferencias.prototype.editar = function () {	
	var cmp = this.treeTransferencias.getSelected();
	
	if(cmp != null){
		cmp = this.dao.load(new Transferencia(), cmp.id);		
		
		var features = "chrome,modal,dependent=true,centerscreen,resizable";
		window.openDialog("chrome://jfac/content/vista/inventario/EditarTransferencia.xul", "editar:transferencia", features, cmp);
		
		if(cmp.estado == cmp.ESTADO_REGISTRADA){
			this.dao.refresh(cmp);
			this.treeTransferencias.updateSelectedWithModel(cmp);
		}else{
			this.treeTransferencias.remove(cmp);
		}		
	}else{
		alert("Debe seleccionar una transferencia para editarla");
	}
};

AdministrarTransferencias.prototype.nuevo = function () {
	var us = new Transferencia();
	us.usuario = this.contexto.usuario;	
	
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/inventario/EditarTransferencia.xul", "EditarTransferencia", features, us);
	if(us.id > 0){
		us.localorigen = us.localOrigen.nombre;
		us.localdestino = us.localDestino.nombre;
		this.treeTransferencias.add(us);
	}
};

AdministrarTransferencias.prototype.eliminar = function () {
	var us = this.treeTransferencias.getSelected();
	if(us != null){
		try {
			if(confirm('Desea elimiar esta transferencia?','Eliminar')){
				if(this.dao.eliminar(us)){
					this.treeTransferencias.remove(us);
				}else{
					alert("No se pudo eliminar la Transferencia seleccionada");
				}
			}
		} catch (e) {
			alert(e);
		}
	}else{
		alert("Debe seleccionar una Transferencia para eliminarla");
	}
};