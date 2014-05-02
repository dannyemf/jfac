function PlanDao(){
};

PlanDao.prototype = new Dao();

PlanDao.prototype.guardar = function(plan){
	var guardado = false;
	if(plan.id == -1){
		guardado = this.create(plan);
	}else{
		guardado = this.update(plan);
	}	
	return guardado;
};

PlanDao.prototype.eliminar = function(plan){
	return this.deletee(plan);
};

/**
 * Busca una Plan por su id
 * 
 * @param {Number} id - El id de la Plan
 * @return {FacturaCompra}
 */
PlanDao.prototype.buscarPorId = function(id){
	var plan = new Plan();
	var lista = new Array();
	
	try{
		lista = this.readBy(plan, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(plan, lista[0]);
	}
	return null;	
};

PlanDao.prototype.obtnerTodos = function(){
	var plan = new Plan();
	var lista = this.readAllOrder(plan, 'ORDER BY codigo');
	var listaFinal = this.modelListTo(plan, lista);
	return listaFinal; 
};

/**
 * 
 * @param {String} filtro
 * @return
 */
PlanDao.prototype.buscarPorCriterio = function(filtro){	
	var plan = new Plan();
	var lista = this.readBy(plan, "where codigo Like '%" + filtro + "' or codigo Like '"+ filtro +"%' or nombre Like '%" + filtro + "%' or nombre Like '"+filtro+"%'");
	var listaFinal = this.modelListTo(plan, lista);
	return listaFinal; 
};

PlanDao.prototype.existe = function(plan){
	try {
		var id = plan.id;
		var lista = this.readBy(plan, "where codigo = '" + plan.codigo + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};