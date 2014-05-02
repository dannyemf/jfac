window.onload = function () {
	try {
		self = new BuscadorLevantamientos();
	} catch (e) {
		alert('BuscadorLevantamientos.onload(): '+e);
	}	
};

function BuscadorLevantamientos(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		
		this.idLocal = -1;
		this.idUsuario = this.contexto.usuario.id;	
		
		this.dao = new LevantamientoDao();
		
		this.treeLevantamientos = new XulTree('treeLevantamientos', ['local', 'usuario','observacion', 'fecha'],'id');			
		this.treeLevantamientos.setDateColumns([['fecha','dd/MM/yyyy HH:mm:ss']]);
		this.inicializar();
	} catch (e) {
		alert("BuscadorLevantamientos(): " + e);
	}
};

BuscadorLevantamientos.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnNuevo").addEventListener( 'command', function() {self.nuevo();}, true);
	$Xul("btnEditar").addEventListener( 'command', function(){self.editar();}, true);	
	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');	
		
	var listaLocales = this.contexto.getLocales();
	
	$Xul("cmbLocal").fillComboBox(listaLocales, 'id', ['codigo','nombre'],'--Todos--',-1);	
	$Xul("cmbLocal").bind(this, 'idLocal');	
	$Xul("cmbLocal").val(this.contexto.local.id);	
};

BuscadorLevantamientos.prototype.buscar = function () {
	var criterio = $Xul('listaCriterios').val();
	
	var lista = new Array();	
	this.treeLevantamientos.clear();
	
	showWait();
		
	if(criterio == 'TODOS'){
		criterio = null;
	}
	
	lista = this.dao.vistaLevantamientos(criterio, this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal);
	
	this.treeLevantamientos.setDatos(lista);
	
	closeWait();
};

BuscadorLevantamientos.prototype.nuevo = function () {
	var us = new Levantamiento();
	var features = "chrome,modal,dependent=true,dialog,centerscreen";
	window.openDialog("chrome://jfac/content/vista/inventario/EditarLevantamiento.xul", "editar:levantamiento", features, us);
	if(us.id > 0){
		this.treeLevantamientos.add(us);
	}
};

BuscadorLevantamientos.prototype.editar = function () {	
	var cmp = this.treeLevantamientos.getSelected();
	
	if(cmp != null){		
		
		cmp = this.dao.load(new Levantamiento(), cmp.id);
		
		var features = "chrome,modal,dependent=true,centerscreen,resizable";
		window.openDialog("chrome://jfac/content/vista/inventario/EditarLevantamiento.xul", "editar:levantamiento", features, cmp);
				
		if(cmp.editada == true){
			var obj = this.dao.cacheQueryFirst('and id='+cmp.id);
			this.treeLevantamientos.updateSelectedWithModel(obj);
		}
	}else{
		alert("Debe seleccionar un levantamiento para editarlo");
	}
};