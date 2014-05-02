function PeriodoContableDao(){
};

PeriodoContableDao.prototype = new Dao();

PeriodoContableDao.prototype.guardar = function(periodoContable){
	var guardado = false;
	if(periodoContable.id == -1){
		guardado = this.create(periodoContable);
	}else{
		guardado = this.update(periodoContable);
	}	
	return guardado;
};

PeriodoContableDao.prototype.eliminar = function(periodoContable){
	return this.deletee(periodoContable);
};

PeriodoContableDao.prototype.obtenerTodos = function(){
	var periodoContable = new PeriodoContable();
	var lista = this.readAll(periodoContable);
	var listaFinal = this.modelListTo(periodoContable, lista);
	return listaFinal; 
};

PeriodoContableDao.prototype.buscarPorId = function(id){
	var periodo = new PeriodoContable();
	var lista = new Array();	
	try{
		lista = this.readBy(periodo, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(periodo, lista[0]);
	}
	return null;	
};

/**
 * Obtiene el periodo activo
 * @param {Local} local
 * @return {PeriodoContable}
 */
PeriodoContableDao.prototype.obtenerPeriodoActivo = function(local){
	var model = new PeriodoContableLocal();
	var lista = this.readBy(model, "WHERE estado = '"+model.ESTADO_ABIERTO+"' and id_local = " + local.id);
	if(lista.length > 0){				
		return this.load(new PeriodoContable(), lista[0].id_periodo);		
	}
	return null; 
};

/**
 * Obtiene una lista con los periodos pendientes
 * @param {Local} local
 * @return {Array<PerodoContable>}
 */
PeriodoContableDao.prototype.obtenerPeriodosPendientes = function(local){
	var model = new PeriodoContable();
	var modelPL = new PeriodoContableLocal();
	var lst = this.query("SELECT p.* FROM "+model.tablename+" p WHERE p.id not in (SELECT pl.id_periodo FROM "+modelPL.tablename+" pl WHERE pl.id_local = "+local.id+")");	
	return this.modelListTo(model, lst); 
};

/**
 * Verifica si existen periodos pendientes
 * @param {Local} local
 * @return {Boolean}
 */
PeriodoContableDao.prototype.existenPeriodosPendientes = function(local){
	var model = new PeriodoContable();
	var modelPL = new PeriodoContableLocal();
	//var exs = this.query("SELECT COUNT(*) FROM " + model.tablename + " WHERE estado='" + model.ESTADO_PENDIENTE+"'")[0][0] * 1;
	var exs = (this.query("SELECT COUNT(*) FROM "+model.tablename+" p WHERE p.id not in (SELECT pl.id FROM "+modelPL.tablename+" pl WHERE pl.id_local = "+local.id+")")[0][0]) * 1;
	if(exs > 0){
		return true;
	} 
	return false;
};

/**
 * Verifica si existe un periodo activo
 * @param {Local} local
 * @return {Boolean}
 */
PeriodoContableDao.prototype.existePeriodoActivo = function(local){
	var model = new PeriodoContableLocal();
	var exs = (this.query("SELECT COUNT(*) FROM " + model.tablename + " WHERE estado='" + model.ESTADO_ABIERTO+"' and id_local = " + local.id)[0][0]) * 1;
	if(exs > 0){
		return true;
	} 
	return false;
};