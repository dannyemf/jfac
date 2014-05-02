function FacturaVentaConst(){
	this.ESTADO_REGISTRADA = "Registrada";
	this.ESTADO_ANULADA = "Anulada";
	this.ESTADO_FINALIZADA = "Finalizada";
	
	this.FORMA_PAGO_CONTADO = "Contado";
};
FacturaVentaConst.prototype=new Object();

function FacturaVenta(id){
	this.classname = 'FacturaVenta';
	this.tablename = 'ven_fac_venta';
	
	this.id= id ? id : -1;
	this.fechaEmision = new Date();
	this.fechaInicio = new Date(); // se agrega
	this.fechaCaducidad = new Date();
	this.numeroFactura = "000-000-0000000";
	this.estado = this.ESTADO_REGISTRADA;
	this.formaPago = this.FORMA_PAGO_CONTADO;
	
	this.subtotal = 0.0;
	this.sobrecargo = 0.0;
	this.iva = 0.0;
	this.ivaPorcentaje = 0.0;
	this.descuento = 0.0;
	this.total = 0.0;
	this.isImpresa = false;
	this.tipoDocumento = Constante.TIPO_DOC_FACTURA;
	
	this.cliente = new Cliente();					
	this.usuario = new Usuario();
	this.local = new Local();	
	this.lote = new LoteCaja();	
	this.punto = new PuntoFacturacion();
	this.periodo = new PeriodoContable();
	this.autorizacionSri = new AutorizacionSri();
	
	this.retencion = new Retencion();
	
	this.subCero = 0.0;
	this.subDoce = 0.0;
	
	this.items = new Array();
};

FacturaVenta.prototype=new FacturaVentaConst();

FacturaVenta.prototype.mapFields = function( q ) {
	var f = new Array();
	f['fechaEmision']	= q + this.fechaEmision.toString('yyyy-MM-dd HH:mm:ss') + q;
	f['fechaInicio']	= q + this.fechaInicio.toString('yyyy-MM-dd') + q;	// se agrega
	f['fechaCaducidad']	= q + this.fechaCaducidad.toString('yyyy-MM-dd') + q;
	f['numeroFactura']	= q + this.numeroFactura + q;
	f['estado']			= q + this.estado + q;
	f['formaPago']		= q + this.formaPago + q;
	f['subtotal']		= q + this.subtotal + q;
	f['sobrecargo']		= q + this.sobrecargo + q;
	f['iva']			= q + this.iva + q;
	f['ivaPorcentaje']	= q + this.ivaPorcentaje + q;
	f['descuento']		= q + this.descuento + q;
	f['total']			= q + this.total + q;
	f['isImpresa']		= q + (this.isImpresa ? 1 : 0) + q;
	f['tipoDocumento']		= q + this.tipoDocumento + q;
	
	
	return f;
};

FacturaVenta.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['cliente'] = ['id_cliente','id', new Cliente()];
	f['usuario'] = ['id_usuario','id', new Usuario()];
	f['local'] 	 = ['id_local','id', new Local()];	
	f['lote']    = ['id_lote','id', new LoteCaja()];
	f['punto']   = ['id_punto','id', new PuntoFacturacion()];
	f['periodo'] = ['id_periodo','id', new PeriodoContable()];
	f['autorizacionSri'] = ['id_aut_sri','id', new AutorizacionSri()];
	f['retencion'] = ['id_retencion','id', new Retencion()];
	return f;
};

FacturaVenta.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['factura', 'id_facventa', 'id', new FacturaVentaItem()];
	return f;
};

FacturaVenta.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

FacturaVenta.prototype.agregarItem = function(item){
	try {
		var existe = false;
		var array = this.items;
		for ( var i = 0; i < array.length; i++) {
			var it = array[i];
			if(it.producto.id == item.producto.id){
				existe = true;
			}
		}
		if(existe == false){
			item.factura = this;
			this.items.push(item);
			return true;
		}
	} catch (e) {
		alert("FacturaVenta.agregarItem():  " + e);
	}
	return false;
};

FacturaVenta.prototype.removerItemByIndice = function(indice){
	try {
		this.items.splice(indice, 1);
		return true;
	} catch (e) {
		return false;
	}
};