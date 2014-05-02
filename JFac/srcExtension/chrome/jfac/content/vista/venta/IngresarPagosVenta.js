window.onload = function () {
	try {
		window.contexto = getContexto();
		self = new IngresarPagosVenta();
	} catch (e) {
		alert('IngresarPagosVenta.onload(): '+e);
	}
};

function IngresarPagosVenta(){
	//this.dao = new LoteCajaDao();
	this.daoAnticipos = new AnticipoDao();
	
	this.factura = new FacturaVenta();
	this.cobro = new Cobro();
	this.model = window.arguments[0];
	this.cobro = this.model.cobro;
	this.factura = this.model.factura;	
	this.control = this.model.control;	
	this.cobro.total = (this.factura.total * 1).round(3);	
	this.saldo = this.cobro.total;
	
	this.retencion = new Retencion();
	
	this.retencion = this.factura.retencion;
	this.retencion.local = this.factura.local;
	this.retencion.punto = this.factura.punto;
	this.retencion.periodo = this.factura.periodo;
	this.retencion.usuario = this.factura.usuario;	
	
	this.anticipos = this.daoAnticipos.buscarPendientesPorCliente(this.factura.cliente);
	this.totalAnt = 0;
	
	this.tree = new XulTree('treeItems',['formaPago','fecha','monto','saldo', 'id_documento'], 'index');
	this.tree.setDateColumns([['fecha','dd-MM-yyyy']]);
	
	this.treeRetenciones = new XulTree('treeRetenciones',['impuesto','porcentaje','valor'], 'index');
	
	this.inicializar();
};

IngresarPagosVenta.prototype.inicializar = function () {
	for(var i = 0; i < this.anticipos.length;i++){
		this.totalAnt += this.anticipos[i].saldo * 1;
	}
	this.totalAnt = this.totalAnt.round(3);
	
	$Xul("txtRecibe").val  (this.cobro.total);
	$Xul('txtMonto').val(this.cobro.total);
	$Xul('txtSaldo').val(this.saldo);
	$Xul("txtAnticiposCli").val(this.totalAnt);
	$Xul('txtTotal').val(this.cobro.total);
	$Xul('txtValorPagar').val(this.cobro.total);	
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);
	$Xul("btnAdd").addEventListener( 'command', function(){self.addPagoItem();}, true);
	$Xul("btnRem").addEventListener( 'command', function(){self.remPagoItem();}, true);
	$Xul("txtRecibe").addEventListener( 'change', function(){self.calcular();}, true);
	$Xul("chkDevolverSob").addEventListener( 'command', function(){
		self.cobro.devolverSobranteAnticipos = this.checked;
		self.calcular();		
	}, true);
	
	$Xul("btnAddRetIr").addEventListener( 'command', function(){self.agregarRetencionIr();}, true);
	$Xul("btnAddRetIva").addEventListener( 'command', function(){self.agregarRetencionIva();}, true);
	$Xul("btnRemRet").addEventListener( 'command', function(){self.removerRetencion();}, true);
	
	
	if(this.totalAnt == 0){
		//Remueve la formaPago Anticipos y ocultas los visores de anticipos
		$Xul("cmbFormaPago").childNodes[0].removeChild($Xul("cmbFormaPago").childNodes[0].childNodes[1]);
		$Xul("rowTotAntDis").hide();
		$Xul("rowTotAntUsa").hide();
		$Xul("rowTotAntSob").hide();
	}
	
	this.calcular();
};

IngresarPagosVenta.prototype.verificarControlesRetenciones = function () {
	if(this.cobro.items.length > 0){
		$Xul("btnAddRetIr").disable();
		$Xul("btnAddRetIva").disable();
		$Xul("btnRemRet").disable();
	}else{
		$Xul("btnAddRetIr").enable();
		$Xul("btnAddRetIva").enable();
		$Xul("btnRemRet").enable();
	}
};

IngresarPagosVenta.prototype.agregarRetencionIr = function () {
	
	try {
		var p = $Xul("txtPorcentajeRet").val() * 1;		
		var v = (this.factura.subtotal * p) / 100.0;
		
		if(v > 0){
		
			var it = this.retencion.crearItem();
			it.impuesto = 'IR';
			it.porcentaje = p;
			it.valor = v.round(2);
			
			this.retencion.add(it);		
			this.treeRetenciones.add(it);		
			this.calcularRetenciones();
		}
	} catch (e) {
		alert(e);
	}
	
	
};

IngresarPagosVenta.prototype.agregarRetencionIva = function () {
	try {
		var p = $Xul("txtPorcentajeRet").val() * 1;		
		var v = (this.factura.iva * p) / 100.0;
		if(v > 0){
			
			var it = this.retencion.crearItem();
			it.impuesto = 'IVA';
			it.porcentaje = p;
			it.valor = v.round(2);
			
			this.retencion.add(it);			
			this.treeRetenciones.add(it);			
			this.calcularRetenciones();
		}
	} catch (e) {
		alert(e);
	}
};

IngresarPagosVenta.prototype.removerRetencion = function () {
	try {
		var i = this.treeRetenciones.getSelectedIndex();
		if(i >= 0){		
			this.retencion.items.splice(i, 1);
			this.treeRetenciones.removeByIndex(i);
			this.calcularRetenciones();
		}
	} catch (e) {
		alert(e);
	}
};


IngresarPagosVenta.prototype.calcularRetenciones = function () {
	var t = 0;
	var ti = 0;
	var tir = 0;
	for(var i = 0; i < this.retencion.items.length; i++){
		t +=  this.retencion.items[i].valor;
		if(this.retencion.items[i].impuesto=="IVA"){
			ti += this.retencion.items[i].valor;
		}else{
			tir += this.retencion.items[i].valor;
		}
	}
	t = t.round(2);
	
	this.retencion.total = t;
	this.retencion.totalRetencionIVA = ti;
	this.retencion.totalRetencionIr = tir;
	
	this.cobro.total = (this.factura.total - t).round(2);	
	$Xul('txtTotaRet').val(t);
	$Xul('txtTotal').val(this.cobro.total);
	
	this.calcular();
};



IngresarPagosVenta.prototype.calcular = function () {
	
	this.verificarControlesRetenciones();
	
	var recibe = $Xul('txtRecibe').val() * 1;	
	var cambio = 0;
	
	this.cobro.totalCheques = 0;
	this.cobro.totalCreditoCorriente = 0;	
	this.cobro.totalCreditoDiferido = 0;
	this.cobro.totalEfectivo = 0;
	var cons = new CobroItemConst();	
	for(var i = 0; i < this.cobro.items.length; i ++){
		var it = this.cobro.items[i];
		//sobrante += cons.ANTICIPO == it.formaPago ? (it.anticipo.newsaldo) : 0;
		this.cobro.totalCheques += cons.CHEQUE == it.formaPago ? (it.monto*1) : 0;
		this.cobro.totalCreditoCorriente += cons.CREDITO_CORRIENTE == it.formaPago ? (it.monto*1) : 0;		
		this.cobro.totalCreditoDiferido += cons.CREDITO_DIFERIDO == it.formaPago ? (it.monto * 1) : 0;
		this.cobro.totalEfectivo += cons.EFECTIVO == it.formaPago ? (it.monto * 1) : 0; 
	}	
	
	this.saldo = (
			this.cobro.total - (
				this.cobro.totalEfectivo + 
				this.cobro.totalAnticipos + 
				this.cobro.totalCheques + 
				this.cobro.totalCreditoCorriente + 
				this.cobro.totalCreditoDiferido
			)
		).toFixed(3) * 1;
	
	if(this.saldo < 0){
		this.saldo = 0;
	}
	
	cambio = this.cobro.totalEfectivo > 0 ? (recibe - this.cobro.totalEfectivo) : 0;	
	cambio = cambio + (this.cobro.devolverSobranteAnticipos ? this.cobro.sobranteAnticipos : 0);	
	
	$Xul('txtAnticiposUsa').val(this.cobro.totalAnticipos);	
	$Xul('txtAnticiposSob').val(this.cobro.sobranteAnticipos);
	
	$Xul('txtSaldo').val(this.saldo);
	
	if(this.cobro.sobranteAnticipos > 0){
		$Xul('chkDevolverSob').checked = this.cobro.devolverSobranteAnticipos;
		$Xul('chkDevolverSob').enable();
	}else{
		$Xul('chkDevolverSob').checked = false;
		$Xul('chkDevolverSob').disable();
	}
	
	$Xul('txtCambio').val(cambio.round(3));	
};

IngresarPagosVenta.prototype.addPagoItem = function () {
	try {
		var monto = $Xul('txtMonto').val() * 1;
		var formaPago = $Xul('cmbFormaPago').val();
		
		if(this.saldo > 0){
			if(monto <= this.saldo && monto > 0){
				
				var ci = new CobroItem();
				ci = this.control.crearItemCobro();			
				ci.monto = monto;
				ci.formaPago = formaPago;
				ci.saldo = monto;			
				
				if(	ci.formaPago == ci.EFECTIVO || 
					ci.formaPago == ci.CREDITO_CORRIENTE || 
					ci.formaPago == ci.CREDITO_DIFERIDO){
					if(ci.formaPago == ci.EFECTIVO){
						ci.saldo = 0;
					}
					if(ci.formaPago == ci.CREDITO_CORRIENTE){
						ci.fecha.addMonths(1);
					}
					if(this.cobro.existeFormaPago(ci.formaPago)){
						alert('Ya existe un item con esta forma de pago','Forma Pago');
						return;
					}
				}			
					
				// Seleccionamos los anticipos
				if(	ci.formaPago == ci.ANTICIPO){
					if(this.anticipos.length > 0){
						if(monto <= this.totalAnt){
							if(monto <= this.saldo){
							var model = {
								anticipos: this.anticipos,
								aceptar: false,
								totalAnticipos: this.totalAnt,
								monto : monto,
								sobrante: 0,
								devolver: false
							};						
													
							var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
							window.openDialog("chrome://jfac/content/vista/venta/EditarAnticipos.xul", "editar-anticipos", features, model);					
							if(model.aceptar){							
								this.tree.removeByExp("model.formaPago == '" + $Xul('cmbFormaPago').val()+"'");
								this.cobro.totalAnticipos = monto;
								this.cobro.sobranteAnticipos = model.sobrante;
								this.cobro.devolverSobranteAnticipos = model.sobrante > 0 ? model.devolver : false;
								var m = monto;
								for ( var i = 0; i < this.anticipos.length; i++) {
									var ant = this.anticipos[i];
									ant.saldo = ant.saldo * 1;
									
									if(ant.asignar){
										var cb = new CobroItem();
										cb = this.control.crearItemCobro();
										cb.formaPago = $Xul('cmbFormaPago').val();
										if(m > 0){
											if(m <= ant.saldo){
												cb.monto = m;
												m = 0;
												
												ant.newsaldo = ant.saldo - cb.monto;
												ant.sobrante = ant.saldo - ant.newsaldo;
												ant.montoPago = cb.monto;												
											}else{
												cb.monto = ant.saldo;
												m = m - cb.monto;
												
												ant.newsaldo = 0;
												ant.sobrante = 0;
												ant.montoPago = cb.monto;
											}
											
																						
										}else{
											ant.newsaldo = ant.saldo; // Puede ir cero si se devuelve el saldo(guardar)
											ant.sobrante = ant.saldo;
											ant.montoPago = 0; 
										}
										
																			
										cb.id_documento = ant.id;
										cb.anticipo = ant;
										
										var b = this.cobro.agregarItem(cb);
										if(b && cb.monto > 0){										
											this.tree.add(cb);										
										}	
									}
								}
							}
							}else{
								alert('El monto ha sobrepasa al saldo');
							}
						}else{
							alert('El monto debe ser mayor a cero y menor o igual al total de anticipos del cliente: ' + monto );
						}
					}else{
						alert('No existen anticipos para este cliente');
					}
				}else{
					
					if(ci.formaPago == ci.CHEQUE){
						var cheque = new Cheque();
						cheque = this.control.crearCheque();
						
						var model ={
							aceptar : false,
							monto	: monto,
							cliente	: this.factura.cliente,
							cheque  : cheque
						};
						var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
						window.openDialog("chrome://jfac/content/vista/venta/EditarCheque.xul", "editar-cheque", features, model);
						
						if(model.aceptar){
							ci.cheque = model.cheque;
							ci.saldo = 0;
							
							var b = this.cobro.agregarItem(ci);
							if(b){							
								this.tree.add(ci);
							}						
						}
						
					}else{					
						if(ci.formaPago == ci.CREDITO_DIFERIDO){
							
							var model = {
									control: this.control,
									aceptar : false,
									item : ci,
									cobro:this.cobro
							};
							
							var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
							window.openDialog("chrome://jfac/content/vista/venta/IngresarCuotas.xul", "editar-cuotas", features, model);
							if(model.aceptar){
								//Pone la fecha de la ultima cuota
								ci.fecha = ci.cuotas[ci.cuotas.length-1].fecha;
								var b = this.cobro.agregarItem(ci);
								if(b){
									this.tree.add(ci);
								}
							}
						}else{
							var b = this.cobro.agregarItem(ci);
							if(b){
								this.tree.add(ci);
							}							
						}
					}
				}
				
				this.calcular();
				$Xul('txtMonto').val(this.saldo);
				
			}else{
				alert('El monto debe ser menor o igual al saldo y mayor a cero');
			}
		}else{
			alert('El saldo ha sido cubierto en su totalidad');
		}
		
	} catch (e) {
		alert('IngresarPagosVenta.addPagoItem(): '+e);
	}
};

IngresarPagosVenta.prototype.remPagoItem = function () {
	try{
		var index = this.tree.getSelectedIndex();
		if(index >= 0){
			var item = this.cobro.items[index];
			
			if(item.formaPago == new CobroItemConst().ANTICIPO){
				var c = confirm('Si elimina un item con forma de pago [ANTICIPO],\n se eliminarán todos los items con esta forma de pago.\n\nDesea continuar?');
				if(c){
					for(var i = 0; i< this.cobro.items.length ; i++){
						this.cobro.removerItem(i);
					}
					this.tree.clear();
					this.tree.setDatos(this.cobro.items);
					this.cobro.totalAnticipos = 0;
				}
			}else{
				this.cobro.removerItem(index);
				this.tree.removeByIndex(index);
			}
			
			this.calcular();			
			$Xul('txtSaldo').val(this.saldo);
		}
	}catch(e){
		alert(e);
	}
};

IngresarPagosVenta.prototype.guardar = function () {	
	try {
		if(this.saldo == 0){
			this.factura.cambio = $Xul('txtCambio').val() * 1;
			this.factura.cash = $Xul('txtRecibe').val() * 1;
			this.factura.anticipos = this.anticipos;
			this.factura.retencion.numero = $Xul('txtNumeroRet').val();
			
			if(this.factura.retencion.total > 0){
				if(this.factura.retencion.numero.length != 15){
					alert('Ingrese correctamente el número de la retención');
					return;
				}
			}
			
			if(this.cobro.items.length == 0){ 
				// Sin no hay pagos por defecro agrgeamos un pago en efectivo
				var ci = new CobroItem();
				ci = this.control.crearItemCobro();			
				ci.monto = this.cobro.total;
				ci.formaPago = new CobroItemConst().EFECTIVO;
				ci.monto = this.cobro.total;
				var b = this.cobro.agregarItem(ci);
				this.calcular();
			}
			
			this.model.guardar = true;
			window.close();
		}else{
			alert('Aún no ha cubierto todo el saldo');
		}
	} catch (e) {
		alert(e);
	}
};

IngresarPagosVenta.prototype.cancelar = function () {
	this.model.guardar = false;
	window.close();
};