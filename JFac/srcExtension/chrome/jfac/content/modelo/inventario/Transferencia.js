function TransferenciaConst(){
	this.ESTADO_REGISTRADA = "Registrada";
	this.ESTADO_ENVIADA = "Enviada";
	this.ESTADO_RECEPTADA = "Receptada";
	this.ESTADO_ANULADA = "Anulada";
};
TransferenciaConst.prototype=new Object();

function Transferencia(){
	this.classname = 'Transferencia';
	this.tablename = 'inv_transferencia';
	
	this.id= -1;
	this.estado = this.ESTADO_REGISTRADA;
	this.observacion = '';
	
	this.localOrigen = new Local();
	this.localDestino = new Local();
	this.usuario = new Usuario();
	
	this.fechaCreacion = new Date();
	this.fechaRecepcion = new Date();
	
	this.items = new Array();
};

Transferencia.prototype=new TransferenciaConst();

Transferencia.prototype.mapFields = function( q ) {
	var f = new Array();	
	f['fechaCreacion']	= q + this.fechaCreacion.toString('yyyy-MM-dd') + q;
	f['fechaRecepcion']	=    (this.fechaRecepcion ? q + this.fechaRecepcion.toString('yyyy-MM-dd') + q:  'NULL') ;		
	f['estado']			= q + this.estado + q;	
	f['observacion']	= q + this.observacion + q;
	
	return f;
};

Transferencia.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Transferencia.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['usuario'] = ['id_usuario','id', new Usuario()];
	f['localOrigen'] = ['id_local_origen','id', new Local()];
	f['localDestino'] = ['id_local_destino','id', new Local()];
	return f;
};

Transferencia.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['transferencia', 'id_transferencia', 'id', new TransferenciaItem()];
	return f;
};

Transferencia.prototype.agregarItem = function(item){
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
			item.transferencia = this;
			this.items.push(item);
			return true;
		}
	} catch (e) {
		alert("Transferencia.agregarItem():  " + e);
	}
	return false;
};

Transferencia.prototype.removerItemByIndice = function(indice){
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