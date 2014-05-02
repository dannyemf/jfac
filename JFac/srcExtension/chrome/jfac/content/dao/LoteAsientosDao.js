function LoteAsientosDao(){
};

LoteAsientosDao.prototype = new Dao();

LoteAsientosDao.prototype.guardar = function(lote){
	var guardado = false;
	var oldItems = new Array();
	
	if(lote.id == -1){
		guardado = this.create(lote);
	}else{
		oldItems = this.readBy(new AsientoContable(), "where id_lote="+lote.id);
		guardado = this.update(lote);
	}	
	if(guardado){
		var array = lote.items;
		for ( var i = 0; i < array.length; i++) {
			var item = array[i];
			item.local = lote.local;
			if(item.id == -1){
				this.create(item);
			}else{
				this.update(item);
			}
		}
		
		var eliminados = this.getErased(oldItems, array);		
		for ( var i = 0; i < eliminados.length; i++) {
			this.deletee(new AsientoContable(eliminados[i].id));
		}		
	}
	
	return guardado;
};

LoteAsientosDao.prototype.eliminar = function(lote){
	return this.deletee(lote);
};




/**
 * Busca todas todas los lotes de asientos
 * 
 * @return {Array} Lista de LoteAsientos
 */
LoteAsientosDao.prototype.buscarTodos = function(){
	var lote = new LoteAsientos();
	var lista = this.readAll(lote);
	return this.modelListTo(lote, lista);	
};

LoteAsientosDao.prototype.buscarPorEstado = function(estado){
	var lote = new LoteAsientos();
	var lista = this.readBy(lote, "where estado = '" + estado + "'");
	return this.modelListTo(lote, lista);	
};

LoteAsientosDao.prototype.contabilizar = function(lote){
	var estados = new LoteAsientosConst();
	if(lote.estado == estados.ESTADO_REGISTRADO){
		lote.estado = estados.ESTADO_CONTABILIZADO;
		this.updateStrField(lote, 'estado');		
		return true;
	}		
	return false;
};

LoteAsientosDao.prototype.buscarPorPeriodoFechas = function(id_periodo, fechaInicio, fechaFin){
	var lote = new LoteAsientos();
	var lista = this.readBy(lote, "where " + 
			this.fkSql('id_periodo', id_periodo) + " and " +
			"date(fecha) >= '" + fechaInicio.toString('yyyy-MM-dd') + "' and " +
			"date(fecha) <= '" + fechaFin.toString('yyyy-MM-dd') + "'"
	);
	var lst = this.modelListTo(lote, lista);	
	return lst;
};

/**
 * Busca un lote por su id
 * 
 * @param {Number} id - El id del lote
 * @return {LoteAsientos}
 */
LoteAsientosDao.prototype.buscarPorId = function(id){
	var lote = new LoteAsientos();
	var lista = new Array();
	
	try{
		lista = this.readBy(lote, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(lote, lista[0]);
	}
	return null;	
};

LoteAsientosDao.prototype.cargar = function(id){
	var lote = new LoteAsientos(id);
	this.read(lote);
	lote.periodo = new PeriodoContable(lote.id_periodo);
	this.read(lote.periodo);
	
	var daoPlan = new PlanDao();
	
	var it = new AsientoContable();
	var items = this.readBy(it, "where id_lote = " + id);
	for(var i = 0 ; i < items.length; i++){
		var item = items[i];
		var x = this.modelTo(it, item);
		x.plan = daoPlan.buscarPorId(item.id_plan);
		x.lote = lote;
		lote.items.push(x);
	}	
		
	return lote;
};