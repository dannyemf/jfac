window.onload = function () {
	try {		
		self = new ContabilizarCompras();
	} catch (e) {
		alert("ContabilizarCompras.onload(): "+e);
	}
	
	
};

function ContabilizarCompras(){
	try {
		this.contexto = new Context(); this.contexto = getContexto();
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		this.idLocal = -1;
		this.idProveedor = -1;
		this.idUsuario = -1;
		this.estado = new FacturaCompra().ESTADO_REGISTRADA;
		
		this.dao = new FacturaCompraDao();
		this.daoCont = new ContabilidadDao();
		this.daoLocal = new LocalDao();	
		this.daoProveedor = new ProveedorDao();
		this.daoUsuario = new UsuarioDao();
		
		this.treeCompras = new XulTree('treeCompras', ['numeroFactura', 'numeroAutorizacion', 'fechaEmision', 'fechaRegistro', 'fechaCaducidad','estado', 'total'],'id');			
		this.treeCompras.setDateColumns([['fechaEmision','dd/MM/yyyy'], ['fechaRegistro','dd/MM/yyyy'], ['fechaCaducidad','dd/MM/yyyy']]);
		
		this.inicializar();
	} catch (e) {
		alert("BuscadorCompra(): " + e);
	}
};

ContabilizarCompras.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnContabilizar").addEventListener( 'command', function(){self.contabilizar();}, true);
	$Xul("txtTexto").addEventListener( 'keyup', function(){if(event.keyCode == 13) self.buscar();}, true);
	$Xul('listaCriterios').addEventListener( 'select', function(){self.cambiarCriterio();}, true);
	
	$Xul("dtpInicio").bind(this, 'fechaInicio');
	$Xul("dtpFin").bind(this, 'fechaFin');
	
	var listaProveedores = this.daoProveedor.buscarTodos();
	var listaLocales =this.daoLocal.obtenerTodos();
	var listaUsuarios = this.daoUsuario.buscarActivos();
	
	$Xul("cmbProveedor").fillComboBox(listaProveedores, 'id', ['identificacion','razonSocial'],'--Todos--');
	$Xul("cmbLocal").fillComboBox(listaLocales, 'id', ['codigo','nombre'],'--Todos--');
	$Xul("cmbUsuario").fillComboBox(listaUsuarios, 'id', ['nombres','apellidos'],'--Todos--');
	
	$Xul("cmbProveedor").bind(this, 'idProveedor');
	$Xul("cmbLocal").bind(this, 'idLocal');
	$Xul("cmbUsuario").bind(this, 'idUsuario');
	$Xul("cmbUsuario").selectedIndex = 0;
	
	$Xul("cmbProveedor").selectedIndex = 0;
	$Xul("cmbLocal").val(this.contexto.local.id);
	this.disableAll();	
};

ContabilizarCompras.prototype.cambiarCriterio = function () {
	var cri = $Xul('listaCriterios').val();		
	this.disableAll();		
	switch (cri) {
		case 'TODOS':			
			break;
		case 'FECH_EMI':
		case 'FECH_REG':
		case 'FECH_CAD':
			$Xul("dtpInicio").enable();
			$Xul("dtpFin").enable();
			break;
		case 'NUM_FAC':						
		case 'NUM_AUT':	
			$Xul('txtTexto').enable();
			break;
		default:
			break;
	}
};

ContabilizarCompras.prototype.disableAll = function () {
	$Xul('txtTexto').disable();
	$Xul("dtpInicio").disable();
	$Xul("dtpFin").disable();
};

ContabilizarCompras.prototype.enableAll = function () {
	$Xul('txtTexto').enable();
	$Xul("dtpInicio").enable();
	$Xul("dtpFin").enable();
};

ContabilizarCompras.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();	
	
	var lista = new Array();
	this.treeCompras.clear();
	showWait();
		
	if(criterio == 'TODOS'){
		lista = this.dao.buscarByUsLocProv(this.idUsuario, this.idLocal, this.idProveedor, this.estado);
	}else{
		if(criterio == 'FECH_EMI'){
			lista = this.dao.buscarByFechaUsLocProv('fechaEmision',this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idProveedor, this.estado );
		}else{
			if(criterio == 'FECH_REG'){
				lista = this.dao.buscarByFechaUsLocProv('fechaRegistro',this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idProveedor, this.estado);
			}else{
				if(criterio == 'FECH_CAD'){
					lista = this.dao.buscarByFechaUsLocProv('fechaCaducidad',this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idProveedor, this.estado);
				}else{
					if(criterio == 'NUM_FAC'){
						lista = this.dao.buscarByPropiedadUsLocProv('numeroFactura', texto, this.idUsuario, this.idLocal, this.idProveedor, this.estado);
					}else{
						if(criterio == 'NUM_AUT'){
							lista = this.dao.buscarByPropiedadUsLocProv('numeroAutorizacion', texto, this.idUsuario, this.idLocal, this.idProveedor, this.estado);
						}
					}
				}
			}			
		}
	}
	
	this.treeCompras.setDatos(lista);
	closeWait();
	
	$Xul('txtTexto').select();	
};

ContabilizarCompras.prototype.contabilizar = function () {
	try {
		var rows = this.treeCompras.getSelectRows();
		if(rows.length > 0){
			if(confirm("Desea contabilizar los las compras seleccionadas")){
				for(var i = 0; i < rows.length; i++){
					var com = this.treeCompras.getItemAt(rows[i]);
					if(this.daoCont.contabilizarCompra(com)){
						this.treeCompras.removeByIndex(rows[i]);
					}
				}			
			}
		}else{
			alert("No ha seleccionado ningúna compra para contabilizarla");
		}
	} catch (e) {
		alert(e);
	}
};