window.onload = function () {
	try {
		self = new AdministrarAnticipos();
	} catch (e) {
		alert("AdministrarAnticipos.onload(): "+e);
	}
};

function AdministrarAnticipos(){
	
	this.contexto = new Context();	this.contexto = getContexto();
	this.dao = new AnticipoDao();
		
	this.estado = 'Todos';
	
	this.tree = new XulTree('tree', [['cliente.cedula','cliente.nombres','cliente.apellidos'],'fecha','estado','formaPago','monto','saldo'],'id');
	this.tree.setDateColumns([['fecha', 'yyyy-MM-dd']]);
	this.inicializar();
}; 

AdministrarAnticipos.prototype.inicializar = function () {	
	$Xul('btnBuscar').addEventListener('command', function(){self.buscar();}, true);
	$Xul('btnNuevo').addEventListener('command', function(){self.nuevo();}, true);
	$Xul('btnEditar').addEventListener('command', function(){self.editar();}, true);
	$Xul('btnDevolver').addEventListener('command', function(){self.devolver();}, true);
	$Xul('btnAnular').addEventListener('command', function(){self.anular();}, true);
	
	$Xul('cmbEstado').bind(this, 'estado');
};

AdministrarAnticipos.prototype.devolver = function () {
	var us = this.tree.getSelected();
	if(us != null){
		if(us.estado == new AnticipoConst().ESTADO_PENDIENTE){
			var c = confirmTitle("Desea devolver el anticipo seleccionado?");
			if(!c) return;
			
			try {
				var e = this.dao.devolver(us);
				if(e){			
					alert("El anticipo ha sido devuelto", "Devolver");
				}else{
					alert("No se pudo devolver el anticipo","Devolver");
				}
				this.buscar();
			} catch (e) {
				alert(e);
			}			
		}else{
			alert("Solo se puede devolver en estado " + new AnticipoConst().ESTADO_PENDIENTE, "Devolver");
		}
	}else{
		alert("Debe seleccionar un anticipo");
	}
};

AdministrarAnticipos.prototype.anular = function () {
	var us = this.tree.getSelected();
	if(us != null){
		if(us.estado == new AnticipoConst().ESTADO_PENDIENTE){
			if(us.monto == us.saldo){
				var c = confirmTitle("Desea anular el anticipo seleccionado?");
				if(!c) return;
				
				try {
					var e = this.dao.anular(us);
					if(e){			
						alert("El anticipo ha sido anulado", "Anular");
					}else{
						alert("No se pudo anular el anticipo","Anular");
					}
					this.buscar();
				} catch (e) {
					alert(e);
				}	
			}else{
				alert("No se puede anular un anticipo que se esté usando", "Anular");
			}
		}else{
			alert("Solo se puede anular en estado " + new AnticipoConst().ESTADO_PENDIENTE, "Anular");
		}
	}else{
		alert("Debe seleccionar un anticipo");
	}
};

AdministrarAnticipos.prototype.nuevo = function () {	
	var model = new Anticipo();
	model.usuario = this.contexto.usuario;
	model.local = this.contexto.local;
	model.lote = this.contexto.loteCaja;
	
	if(model.lote != null){
		var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
		window.openDialog("chrome://jfac/content/vista/venta/EditarAnticipo.xul", "editar-anticipo", features, model);
		if(model.id > 0){
			this.dao.refresh(model);
			this.tree.add(model);
		}
	}else{
		alert("No se puede crear un anticipo sin haber aperturado caja", "Nuevo");
	}
};

AdministrarAnticipos.prototype.editar = function () {
	var model = this.tree.getSelected();
	if(model != null){
		var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
		window.openDialog("chrome://jfac/content/vista/venta/EditarAnticipo.xul", "editar-anticipo", features, model);
		this.tree.updateSelectedWithModel(this.dao.buscarPorId(model.id));
	}else{
		alert("Debe seleccionar un anticipo", "Editar");
	}
};

AdministrarAnticipos.prototype.buscar = function () {
	this.tree.clear();	
	showWait();
	var cli = $Xul('popupCliente').cliente;
	var lista = this.dao.buscarPorClienteEstadoFecha(cli, this.estado);
	this.tree.setDatos(lista);
	
	closeWait();
};