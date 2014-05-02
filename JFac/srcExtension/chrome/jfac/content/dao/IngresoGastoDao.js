function IngresoGastoDao(){
};

IngresoGastoDao.prototype = new Dao();

/**
 * Guarda un ingreso gasto
 * @param ingresogasto
 * @return
 */
IngresoGastoDao.prototype.guardar = function(ingresogasto){	
	try {
		if(ingresogasto.id == -1){
			this.begin();
			//Guarada
			this.create(ingresogasto);
			
			//Contabiliza
			new ContabilidadDao().contabilizarIngresoGasto(ingresogasto);
			
			this.commit();
			return true;
		}else{
			//guardado = this.update(ingresogasto);
			throw new Error('No se puede actualiar un ingreso o gasto');
		}	
	} catch (e) {
		this.rollback();
		throw e;
	}
	return false;
};

IngresoGastoDao.prototype.eliminar = function(ingresogasto){
	return this.deletee(ingresogasto);
};

IngresoGastoDao.prototype.obtnerTodos = function(){
	var ingresogasto = new IngresosGastos();
	var lista = this.readAll(ingresogasto);
	return this.modelListTo(ingresogasto, lista);
};