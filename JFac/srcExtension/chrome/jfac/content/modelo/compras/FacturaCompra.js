function FacturaCompraConst(){
	this.ESTADO_REGISTRADA = "Registrada";
	this.ESTADO_FINALIZADA = "Finalizada";
};
FacturaCompraConst.prototype=new Object();

function FacturaCompra(){
	this.classname = 'FacturaCompra';
	this.tablename = 'com_fac_compra';
	
	this.id= -1;
	this.fechaEmision = new Date();  //fecha factura
	this.fechaRegistro = new Date(); // Fecha cuando se registro en el sistema
	this.fechaCaducidad = new Date(); // Autorizacion sri
	this.fechaAutorizacion = new Date(); // Autorizacion sri
	
	this.numeroFactura = "000-000-0000000";
	this.numeroAutorizacion = "";
	this.estado = this.ESTADO_REGISTRADA;
	
	this.tipoDocumento = Constante.TIPO_DOC_FACTURA;
	
	this.ivaPorcentaje = 0.0;
	
	this.subtotal = 0;
	this.sobrecargo = 0;
	this.iva = 0;
	this.descuento = 0;
	this.total = 0;
	
	this.proveedor = new Proveedor();
	this.usuario = new Usuario();
	this.local = new Local();
	this.periodo = new PeriodoContable();
	this.retencion = new Retencion();
	
	this.items = new Array();
};

FacturaCompra.prototype=new FacturaCompraConst();

FacturaCompra.prototype.mapFields = function( q ) {
	var f = new Array();
	f['fechaEmision']	= q + this.fechaEmision.toString("yyyy-MM-dd") + q;
	f['fechaRegistro']	= q + this.fechaRegistro.toString("yyyy-MM-dd HH:mm:ss") + q;
	f['fechaCaducidad']	= q + this.fechaCaducidad.toString("yyyy-MM-dd") + q;
	f['fechaAutorizacion']	= q + this.fechaAutorizacion.toString("yyyy-MM-dd") + q;
	
	f['ivaPorcentaje']	= q+this.ivaPorcentaje+q;
	f['tipoDocumento']	= q+this.tipoDocumento+q;
	
	f['numeroFactura']	= q+this.numeroFactura+q;
	f['numeroAutorizacion']	= q+this.numeroAutorizacion+q;
	f['estado']	= q+this.estado+q;
	f['subtotal']	= q+this.subtotal+q;
	f['sobrecargo']	= q+this.sobrecargo+q;
	f['iva']	= q+this.iva+q;
	f['descuento']	= q+this.descuento+q;
	f['total']	= q+this.total+q;
	
	return f;
};

FacturaCompra.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

FacturaCompra.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model			
	f['usuario'] = ['id_usuario','id', new Usuario()];
	f['proveedor'] 	 = ['id_proveedor','id', new Proveedor()];
	f['local'] = ['id_local','id', new Local()];
	f['periodo'] = ['id_periodo','id', new PeriodoContable()];
	f['retencion'] = ['id_retencion','id', new Retencion()];
	return f;
};

FacturaCompra.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['factura', 'id_faccompra', 'id', new FacturaCompraItem()];
	return f;
};

FacturaCompra.prototype.agregarItem = function(item){
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
		alert("FacturaCompra.agregarItem():  " + e);
	}
	return false;
};

FacturaCompra.prototype.removerItemByIndice = function(indice){
	var datos = new Array();
	var e = false;
	for(var i = 0; i < this.items.length; i++){
		if(i != indice){
			datos.push(this.items[i]);
		}else{
			e = true;
		}
	}	
	this.items = datos;
	return e;
};