function ProformaConst(){
	this.ESTADO_REGISTRADA = "Registrada";
	this.ESTADO_FINALIZADA = "Finalizada";
};
ProformaConst.prototype = new Object();

function Proforma(id){
	this.classname = 'Proforma';
	this.tablename = 'ven_proforma';
	
	this.id= id ? id : -1;
	this.fecha = new Date();
	this.fechaVencimiento = new Date();
	this.estado = this.ESTADO_REGISTRADA;		
	this.subtotal = 0;
	this.iva = 0;
	this.total = 0;
	
	this.cliente = new Cliente();
	this.usuario = new Usuario();
	this.local = new Local();
	
	this.items = new Array();	
};

Proforma.prototype=new ProformaConst();

Proforma.prototype.mapFields = function( q ) {
	var f = new Array();
	f['fecha']				= q + this.fecha.toString('yyyy-MM-dd') + q;
	f['fechaVencimiento']	= q + this.fechaVencimiento.toString('yyyy-MM-dd') + q;
	f['estado']				= q + this.estado + q;	
	f['subtotal']			= q + this.subtotal + q;
	f['iva']				= q + this.iva + q;
	f['total']				= q + this.total + q;
	
	return f;
};

Proforma.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Proforma.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['cliente'] = ['id_cliente','id', new Cliente()];
	f['usuario'] = ['id_usuario','id', new Usuario()];
	f['local'] 	 = ['id_local','id', new Local()];		
	
	return f;
};

Proforma.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['proforma', 'id_proforma', 'id', new ProformaItem()];
	return f;
};

Proforma.prototype.agregarItem = function(item){
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
			item.proforma = this;
			this.items.push(item);
			return true;
		}
	} catch (e) {
		alert("FacturaVenta.agregarItem():  " + e);
	}
	return false;
};