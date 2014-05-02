function TransaccionConst(){
	this.ESTADO_ACTIVA = "Activa";
	this.ESTADO_INACTIVA = "Inactiva";
};
TransaccionConst.prototype=new Object();

function Transaccion(){
	this.classname = 'Transaccion';
	this.tablename = 'cont_transaccion';
	
	this.id = -1;
	this.codigo = '';
	this.descripcion = '';
	this.estado = this.ESTADO_ACTIVA;
	this.fechaCreacion = new Date();
	this.textoLote = '';
	
	this.items = new Array();
};

Transaccion.prototype=new TransaccionConst();

Transaccion.prototype.mapFields = function( q ) {
	var f = new Array();	
	f['codigo']	= 			q + this.codigo + q;
	f['descripcion'] = 		q + this.descripcion + q;
	f['estado']	= 			q + this.estado + q;
	f['textoLote']	= 			q + this.textoLote + q;	
	f['fechaCreacion'] =	q + this.fechaCreacion.toString('yyyy-MM-dd') + q;
	return f;
};

Transaccion.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['transaccion', 'id_transaccion', 'id', new TransaccionItem()];
	return f;
};

Transaccion.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Transaccion.prototype.agregarItem = function(item){
	try {
		var existe = false;
		var array = this.items;
		for ( var i = 0; i < array.length; i++) {
			var it = array[i];
			if(it.plan.id != -1 && it.plan.id == item.plan.id && it != item){
				existe = true;
			}
		}
		if(existe == false){
			item.transaccion = this;
			this.items.push(item);
			return true;
		}
	} catch (e) {
		alert("Transaccion.agregarItem():  " + e);
	}
	return false;
};