window.onload = function () {
	try {
		self = new ContabilizarVentas();
	} catch (e) {
		alert('ContabilizarVentas.onload(): '+e);
	}	
};

function ContabilizarVentas(){
	try {			
		this.contexto = new Context(); this.contexto = getContexto();
		this.fechaInicio = new Date();
		this.fechaFin = new Date();
		this.idLocal = -1;
		this.idCliente = -1;
		this.idUsuario = -1;
		this.estado = new FacturaVentaConst().ESTADO_REGISTRADA;
		
		this.dao = new FacturaVentaDao();
		this.daoCont = new ContabilidadDao();
		
		this.daoLocal = new LocalDao();			
		this.daoUsuario = new UsuarioDao();
		
		this.treeCompras = new XulTree('treeCompras', ['numeroFactura', 'cliente.cedula', 'usuario.login',['local.codigo','local.nombre'],'fechaEmision', 'fechaCaducidad','estado', 'subtotal','iva','descuento','sobrecargo','total'],'id');			
		this.treeCompras.setDateColumns([['fechaEmision','dd/MM/yyyy'], ['fechaCaducidad','dd/MM/yyyy']]);
		this.inicializar();
	} catch (e) {
		alert("ContabilizarVentas(): " + e);
	}
};

ContabilizarVentas.prototype.inicializar = function () {
	$Xul("btnBuscar").addEventListener( 'command', function(){self.buscar();}, true);
	$Xul("btnContabilizar").addEventListener( 'command', function(){self.contabilizar();}, true);
	$Xul("txtTexto").addEventListener( 'keyup', function(){if(event.keyCode == 13) self.buscar();}, true);
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
	
	$Xul("cmbLocal").val(this.contexto.local.id);
	
	this.disableAll();	
};

ContabilizarVentas.prototype.cambiarCriterio = function () {
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
		case 'NUM_FAC':
			$Xul('txtTexto').enable();
			break;
		default:
			break;
	}
};

ContabilizarVentas.prototype.disableAll = function () {
	$Xul('txtTexto').disable();
	$Xul("dtpInicio").disable();
	$Xul("dtpFin").disable();
};

ContabilizarVentas.prototype.enableAll = function () {
	$Xul('txtTexto').enable();
	$Xul("dtpInicio").enable();
	$Xul("dtpFin").enable();
};

ContabilizarVentas.prototype.contabilizar = function () {
	try {
		var rows = this.treeCompras.getSelectRows();
		if(rows.length > 0){
			if(confirm("Desea contabilizar los las ventas seleccionadas")){
				for(var i = 0; i < rows.length; i++){
					var venta = this.treeCompras.getItemAt(rows[i]);
					if(this.daoCont.contabilizarVenta(venta)){
						this.treeCompras.removeByIndex(rows[i]);
					}
				}			
			}
		}else{
			alert("No ha seleccionado ningúna venta para contabilizarla");
		}
	} catch (e) {
		alert(e);
	}
};

ContabilizarVentas.prototype.buscar = function () {
	var texto = $Xul('txtTexto').val();
	var criterio = $Xul('listaCriterios').val();	
	
	var lista = new Array();
	this.treeCompras.clear();
	showWait();
	
	var cli = $Xul("popupCliente").cliente; 
	this.idCliente = cli != null ? cli.id : null;	
	
	if(criterio == 'TODOS'){
		lista = this.dao.buscarByUsLocCli(this.idUsuario, this.idLocal, this.idCliente, this.estado);
	}else{
		if(criterio == 'FECH_EMI'){
			lista = this.dao.buscarByFechaUsLocCli('fechaEmision',this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idCliente, this.estado );
		}else{
			if(criterio == 'FECH_REG'){
				lista = this.dao.buscarByFechaUsLocCli('fechaRegistro',this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idCliente, this.estado);
			}else{
				if(criterio == 'FECH_CAD'){
					lista = this.dao.buscarByFechaUsLocCli('fechaCaducidad',this.fechaInicio, this.fechaFin, this.idUsuario, this.idLocal, this.idCliente, this.estado);
				}else{
					if(criterio == 'NUM_FAC'){
						lista = this.dao.buscarByPropiedadUsLocCli('numeroFactura', texto, this.idUsuario, this.idLocal, this.idCliente, this.estado);
					}else{
						if(criterio == 'NUM_AUT'){
							lista = this.dao.buscarByPropiedadUsLocCli('numeroAutorizacion', texto, this.idUsuario, this.idLocal, this.idCliente, this.estado);
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