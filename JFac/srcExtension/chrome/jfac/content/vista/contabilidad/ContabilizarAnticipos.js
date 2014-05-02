window.onload = function () {
	try {			
		self = new ContabilizarAnticipos();
	} catch (e) {
		alert('ContabilizarAnticipos.onload(): '+e);
	}		
};

function ContabilizarAnticipos(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		this.idLocal = -1;
		this.idCliente = -1;
		this.idUsuario = -1;
		this.estado = new AnticipoConst().ESTADO_PENDIENTE;
		
		this.dao = new AnticipoDao();
		this.daoCont = new ContabilidadDao();		
		this.daoLocal = new LocalDao();			
		this.daoUsuario = new UsuarioDao();
		
		this.treeCompras = new XulTree('treeCompras', ['cliente.cedula', 'usuario.login',['local.codigo','local.nombre'],'fecha', 'fechaEmision', 'fechaVencimiento','formaPago','estado', 'descripcion', 'monto', 'saldo', 'banco.descripcion', 'numeroCuenta == null ? "--" : dat.numeroCuenta', 'numeroReferencia == null ? "--" : dat.numeroReferencia'],'id');
		this.treeCompras.setDateColumns([['fecha', 'yyyy-MM-dd'], ['fechaEmision', 'yyyy-MM-dd'], ['fechaVencimiento', 'yyyy-MM-dd']]);
		
		this.inicializar();
	} catch (e) {
		alert("ContabilizarAnticipos(): " + e);
	}
};

ContabilizarAnticipos.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnContabilizar").addEventListener( 'command', function(){self.contabilizar();}, true);
	$Xul('listaCriterios').addEventListener( 'select', function(){self.cambiarCriterio();}, true);
	
	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');	
	
	var listaLocales =this.daoLocal.obtenerTodos();
	var listaUsuarios = this.daoUsuario.buscarActivos();
		
	$Xul("cmbLocal").fillComboBox(listaLocales, 'id', ['codigo','nombre'],'--Todos--');
	$Xul("cmbUsuario").fillComboBox(listaUsuarios, 'id', ['nombres','apellidos'],'--Todos--');
		
	$Xul("cmbLocal").bind(this, 'idLocal');
	$Xul("cmbUsuario").bind(this, 'idUsuario');	
	
	$Xul("cmbUsuario").selectedIndex = 0;
	$Xul("cmbLocal").selectedIndex = 0;
	
	this.disableAll();	
};

ContabilizarAnticipos.prototype.cambiarCriterio = function () {
	var cri = $Xul('listaCriterios').val();		
	this.disableAll();		
	switch (cri) {
		case 'TODOS':			
			break;
		case 'FECH_EMI':
		case 'FECH_CAD':
			$Xul("dtpInicio").enable();
			$Xul("dtpFin").enable();
			break;
		default:
			break;
	}
};

ContabilizarAnticipos.prototype.disableAll = function () {
	$Xul("dtpInicio").disable();
	$Xul("dtpFin").disable();
};

ContabilizarAnticipos.prototype.enableAll = function () {
	$Xul("dtpInicio").enable();
	$Xul("dtpFin").enable();
};

ContabilizarAnticipos.prototype.contabilizar = function () {
	try {
		var noContabilizados = new Array();
		
		var rows = this.treeCompras.getSelectRows();
		if(rows.length > 0){
			if(confirm("Desea contabilizar los anticipos seleccionados")){
				showWait();
				
				for(var i = 0; i < rows.length; i++){
					var anticipo = this.treeCompras.getItemAt(rows[i]);					
					try {
						if(this.daoCont.contabilizarAnticipo(anticipo)){
							this.treeCompras.removeByIndex(rows[i]);
						}
					} catch (e) {
						anticipo.error = e;
						noContabilizados.push(anticipo);
					}
					
				}
				
				closeWait();
				
				if(noContabilizados.length > 0){
					var str = "";
					for(var i = 0; i < noContabilizados.length;i++){
						var a = noContabilizados[i];
						str += '\n\tANTICIPO: ' + a.id + '\t' + a.error;
					}
					alert('No se han contabilizado ' + noContabilizados.length + " anticipos\n" + str);
				}
			}
		}else{
			alert("No ha seleccionado ningún anticipo para contabilizarlo");
		}
	} catch (e) {
		alert(e);
	}
};

ContabilizarAnticipos.prototype.buscar = function () {
	var criterio = $Xul('listaCriterios').val();	
	var lista = new Array();
	
	this.treeCompras.clear();
	showWait();
	
	var cli = $Xul("popupCliente").cliente; 
	this.idCliente = cli != null ? cli.id : null;
	this.idUsuario  = $Xul("cmbUsuario").val();
	this.idLocal = $Xul("cmbLocal").val();
	
	if(criterio == 'TODOS'){
		lista = this.dao.buscarContabilizarUsuarioLocal(this.idUsuario, this.idLocal);
	}else{
		if(criterio == 'FECH_EMI'){
			lista = this.dao.buscarContabilizarPorUsuarioLocalFecha('fechaEmision', this.idUsuario, this.idLocal, this.fechaInicio, this.fechaFin);
		}else{
			if(criterio == 'FECH_CAD'){
				lista = this.dao.buscarContabilizarPorUsuarioLocalFecha('fechaVencimiento', this.idUsuario, this.idLocal, this.fechaInicio, this.fechaFin);			
			}			
		}
	}	
	this.treeCompras.setDatos(lista);
	
	closeWait();
};