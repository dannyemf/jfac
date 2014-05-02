function TransaccionDao(){
};

TransaccionDao.prototype = new Dao();

TransaccionDao.prototype.guardar = function(transaccion){
	var guardado = false;
	var oldItems = new Array();
	
	if(transaccion.id == -1){
		guardado = this.create(transaccion);
	}else{
		oldItems = this.readBy(new TransaccionItem(), "where id_transaccion="+transaccion.id);
		guardado = this.update(transaccion);
	}
	
	if(guardado){
		var array = transaccion.items;
		for ( var i = 0; i < array.length; i++) {
			var item = array[i];
			if(item.id == -1){
				this.create(item);
			}else{
				this.update(item);
			}
		}
		
		var eliminados = this.getErased(oldItems, array);		
		for ( var i = 0; i < eliminados.length; i++) {
			this.deletee(new TransaccionItem(eliminados[i].id));
		}		
	}
	
	return guardado;
};

TransaccionDao.prototype.eliminar = function(transaccion){
	try {
		this.begin();		
		this.query('DELETE FROM ' + new TransaccionItem().tablename + " where id_transaccion = " + transaccion.id);
		this.deletee(transaccion);		
		this.commit();
		return true;
	} catch (e) {
		this.rollback();
		throw e;
	}
	return false;
};




/**
 * Busca todas todas las compras
 * 
 * @return {Array} Lista de FacturaCompra
 */
TransaccionDao.prototype.buscarTodos = function(){
	var transaccion = new Transaccion();
	var lista = this.readAllOrder(transaccion, 'ORDER BY codigo');
	return this.modelListTo(transaccion, lista);
	
};

/**
 * Verifica si existe una factura con el mismo numero
 * 
 * @param {FacturaCompra} factura
 * @return {Boolean} true o false segun el caso
 */
TransaccionDao.prototype.existeByCodigo = function(transaccion){		
	try{
		var lista = this.readBy(transaccion, "where codigo = '" + transaccion.codigo +"'");
		if(lista.length > 0){
			if (lista[0].id == transaccion.id){
				return false;
			}else{
				return true;
			}
		}
	}catch(e){
		alert(e);
	}
		
	return false;	
};

/**
 * Busca una factura por su id
 * 
 * @param {Number} id - El id de la compra
 * @return {FacturaCompra}
 */
TransaccionDao.prototype.buscarPorId = function(id){
	var transaccion = new Transaccion();
	var lista = new Array();
	
	try{
		lista = this.readBy(transaccion, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(transaccion, lista[0]);
	}
	return null;	
};

TransaccionDao.prototype.cargar = function(id){
	var transaccion = new Transaccion();
	transaccion.id = id;
	
	this.read(transaccion);
		
	var daoPlan = new PlanDao();			
	
	var it = new TransaccionItem();
	var items = this.readBy(it, "where id_transaccion = " + id);
	for(var i = 0 ; i < items.length; i++){
		var item = items[i];
		var x = this.modelTo(it, item);
		x.plan = daoPlan.buscarPorId(item.id_plan);
		x.transaccion = transaccion;
		transaccion.items.push(x);
	}	
		
	return transaccion;
};