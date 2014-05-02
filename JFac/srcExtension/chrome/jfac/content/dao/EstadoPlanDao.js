function EstadoPlanDao(){
	
};

EstadoPlanDao.prototype = new Dao();


EstadoPlanDao.prototype.guardar = function(estadoPlan){	
	try {
		this.begin();
		this.create(estadoPlan);
		
		for(var i = 0; i < estadoPlan.items.length; i++){
			this.create(estadoPlan.items[i]);
		}
		
		this.commit();
		
		return true;
	} catch (e) {
		this.rollback();
		logInfo(e);
		throw e;
	}
	return false;
};

/**
 * 
 * @param {Local} local
 * @return {Boolean}
 */
EstadoPlanDao.prototype.existeEstadoSituacionInicial = function(local){
	var model = new EstadoPlan();
	var cnt = this.query("SELECT COUNT(*) from " + model.tablename + " WHERE tipo = '" + model.TIPO_SITUACION_INICIAL + "' and id_local = " + local.id)[0][0];
	if(cnt > 0){
		return true;
	}
	return false;
};

EstadoPlanDao.prototype.crearEstadoSituacionInicial = function(){	
};

/**
 * Abre un periodo contable
 * @param {Local} local
 * @param {PeriodoContable} periodo
 * @return {Boolean}
 */
EstadoPlanDao.prototype.abrirPeriodoContable = function(local, periodo){
	try {
		var estadoPlan = new EstadoPlan();
		estadoPlan = this.obtenerEstadoPlanParaAbrirPeriodo(local);
					
		if(estadoPlan != null){
			//Inicia la transaccion
			this.begin();
			
			estadoPlan.estado = estadoPlan.ESTADO_FINALIZADO;
			this.updateField(estadoPlan, 'estado');
			
			var periodoLocal = new PeriodoContableLocal();
			periodoLocal.local = local;
			periodoLocal.periodo = periodo;
			periodoLocal.estado = periodoLocal.ESTADO_ABIERTO;
			this.create(periodoLocal);
			
			var lote = new LoteAsientos();
			lote.descripcion = 'Apertura de periodo contable con: ' + estadoPlan.tipo;
			lote.estado = lote.ESTADO_CONTABILIZADO;
			lote.local = local;
			lote.periodo = periodo;
			lote.fecha = new Date();
			
			this.create(lote);
			
			for(var i = 0; i < estadoPlan.items.length; i++){
				var it = new EstadoPlanItem();
				it = estadoPlan.items[i];
				
				if(it.debe > 0){
					var as = new AsientoContable();
					as.descripcion = 'EstadoSituacionInicial';
					as.local = lote.local;
					as.periodo = lote.periodo;
					as.plan = it.plan;
					as.lote = lote;
					as.monto = it.debe;
					as.origen = 'est_sit_ini';
					as.tipo = as.TIPO_DEBE;
					this.create(as);
				}
				
				if(it.haber > 0){
					var as = new AsientoContable();
					as.descripcion = 'EstadoSituacionInicial';
					as.local = lote.local;
					as.periodo = lote.periodo;
					as.plan = it.plan;
					as.lote = lote;
					as.monto = it.haber;
					as.origen = 'est_sit_ini';
					as.tipo = as.TIPO_HABER;
					this.create(as);
				}
			}
			
			//Confirma transaccion
			this.commit();
			return true;
		}
	} catch (e) {
		logInfo(e);
		this.rollback();
		throw e;
	}
	return false;
	
};

/**
 * Cierra un periodo contable para el local indicado
 * @param {Local} local
 * @param {PeriodoContable} periodo
 * @return {EstadoPlan}
 */
EstadoPlanDao.prototype.cerrarPeriodo = function(local, periodo){	
	try {			
		this.begin();
		
		//Cierra el periodo
		var modPL = new PeriodoContableLocal();
		this.query("UPDATE " + modPL.tablename + " SET estado = '" + modPL.ESTADO_CERRADO + "', fechaCierre='"+new Date().toString('yyyy-MM-dd HH:mm:ss')+"' WHERE id_local = " + local.id + " and id_periodo = " + periodo.id + " and estado = '" + modPL.ESTADO_ABIERTO+ "'");
		
		//Obtiene el balance actual y lo guarda en estado plan
		var daoCont = new ContabilidadDao();
		var lst = daoCont.generarBalance(periodo, local);
		
		var estadoPlan = new EstadoPlan();		
		estadoPlan.tipo = estadoPlan.TIPO_CIERRE_PERIODO;
		estadoPlan.descripcion = "Cierre de periodo contable: " + periodo.nombre+ "; local: " + local.nombre;
		estadoPlan.local = local;
		estadoPlan.periodo = periodo;
		this.create(estadoPlan);
		
		for(var i = 0; i < lst.length; i++){
			var it = lst[i];
			
			var item = new EstadoPlanItem();
			item.estadoPlan = estadoPlan;
			item.plan = new Plan(it.id_plan);
			item.debe = it.Debe * 1;
			item.haber = it.Haber * 1;
			this.create(item);
		}
		
		this.commit();
		return estadoPlan;
	} catch (e) {
		logInfo(e);
		this.rollback();
		throw e;
	}
	return null;
};

/***
 * 
 * @param {Local} local
 * @return {Array}
 */
EstadoPlanDao.prototype.obtenerTodosSinDetalle = function(local){
	var model = new EstadoPlan();
	var lst = this.readBy(model, 'WHERE id_local = ' + local.id);
	return this.modelListTo(model, lst, true, false);
};

/**
 * Obtiene el último estado del plan para abrir el periodo contable
 * @param {Local} local 
 * @return {EstadoPlan}
 */
EstadoPlanDao.prototype.obtenerEstadoPlanParaAbrirPeriodo = function(local){
	var model = new EstadoPlan();	
	var lst = this.readBy(model, "WHERE estado = '" + model.ESTADO_EMITIDO + "' and id_local = " + local.id);	
	if(lst.length > 0){
		return this.modelTo(model, lst[0]);
	}	
	return null;	
};

/**
 * Verifica si existen periodos pendientes
 * @param {Local} local
 * @return {Boolean}
 */
EstadoPlanDao.prototype.exsistenEstadoEmitido = function(local){
	var model = new EstadoPlan();	
	var exs = (this.query("SELECT COUNT(*) FROM " + model.tablename + " WHERE estado='" + model.ESTADO_EMITIDO+"' and id_local = " + local.id)[0][0]) * 1;
	if(exs > 0){
		return true;
	} 
	return false;
};