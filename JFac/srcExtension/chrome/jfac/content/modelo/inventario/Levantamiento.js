function Levantamiento(id){
	this.classname = 'Levantamiento';
	this.tablename = 'inv_levantamiento';

	this.id = id ? id : -1;
	this.observacion='';
	this.fecha=new Date();

	this.local = new Local();
	this.usuario = new Usuario();
	
	this.items = new Array();
};

Levantamiento.prototype=new Object();

Levantamiento.prototype.mapFields = function( q ) {
	var f = new Array();	
	f['observacion']	= q+this.observacion+q;
	f['fecha']			= q+this.fecha.toString('yyyy-MM-dd HH:mm:ss')+q;
	return f;
};

Levantamiento.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Levantamiento.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model	
	f['local'] 	 = ['id_local','id', new Local()];
	f['usuario'] = ['id_usuario','id', new Usuario()];
	return f;
};

Levantamiento.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['levantamiento', 'id_levantamiento', 'id', new LevantamientoItem()];
	return f;
};

Levantamiento.prototype.agregarItem = function(item){
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
			item.levantamiento = this;
			this.items.push(item);
			return true;
		}
	} catch (e) {
		alert("Levantamiento.agregarItem():  " + e);
	}
	return false;
};

Levantamiento.prototype.removerItemByIndice = function(indice){
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