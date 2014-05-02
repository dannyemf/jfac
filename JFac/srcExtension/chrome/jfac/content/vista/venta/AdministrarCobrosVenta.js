window.onload = function () {
	try {
		self = new AdministrarCobrosVenta();
	} catch (e) {
		alert("AdministrarAnticipos.onload(): "+e);
	}
};

function AdministrarCobrosVenta(){
	
	this.contexto = new Context();	this.contexto = getContexto();
	this.dao = new CobroDao();		
	
	this.tree = new XulTree('tree', ['cliente','numeroFactura','formaPago','monto','saldo'],'id');
	this.tree.setDateColumns([['fecha', 'yyyy-MM-dd']]);
	this.inicializar();
}; 

AdministrarCobrosVenta.prototype.inicializar = function () {	
	$Xul('btnBuscar').addEventListener('command', function(){self.buscar();}, true);
	$Xul('btnDevolver').addEventListener('command', function(){self.pagar();}, true);		
};

AdministrarCobrosVenta.prototype.pagar = function () {
	var model = this.tree.getSelected();
	if(model != null){
		
		var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
		if(model.formaPago == new CobroItemConst().CREDITO_CORRIENTE){					
			window.openDialog("chrome://jfac/content/vista/venta/PagarCreditoCorriente.xul", "pagar-credito-corriente", features, model);
		}else{
			window.openDialog("chrome://jfac/content/vista/venta/PagarCreditoDiferido.xul", "pagar-credito-diferido", features, model);
		}
			
		if(model.saldo > 0){
			this.tree.updateSelected();
		}else{
			this.tree.remove(model);
		}
		
	}else{
		alert("Debe seleccionar un cobro", "Pagar");
	}
};

AdministrarCobrosVenta.prototype.buscar = function () {
	try {
		this.tree.clear();	
		showWait();
		var cli = $Xul('popupCliente').cliente;
		var lista = this.dao.buscarPorCliente(cli, $Xul('txtNumeroFactura').val());
		
		this.tree.setDatos(lista);
	} catch (e) {
		alert(e);
	}
	
	closeWait();
};