function TransferenciaDao(){
};

TransferenciaDao.prototype = new Dao();

/**
 * Guarda una transferencia
 * @param {Transferencia} transferencia
 * @param {Boolean} enviar
 * @return {Boolean}
 */
TransferenciaDao.prototype.guardar = function(transferencia, enviar){
	
	var oldItems = new Array();
	var oldEstado = transferencia.estado;
	
	try {
		this.begin();
		
		if(enviar == true){
			transferencia.estado = transferencia.ESTADO_ENVIADA;
		}
		
		//Guarda la transferencia
		if(transferencia.id == -1){
			transferencia.fechaRecepcion = null;
			this.create(transferencia);		
		}else{
			oldItems = this.readBy(new TransferenciaItem(), "where id_transferencia="+transferencia.id);
			this.update(transferencia);
		}	
		
		//Guarda los items
		var array = transferencia.items;
		for ( var i = 0; i < array.length; i++) {			
			var item = array[i];			
			if(item.id == -1){
				this.create(item);
			}else{
				this.update(item);
			}
		}

		//Borra los items eliminados
		var eliminados = this.getErased(oldItems, array);		
		for ( var i = 0; i < eliminados.length; i++) {
			this.deletee(new TransferenciaItem(eliminados[i].id));
		}		
		
		
		// Afectar stock
		if(enviar == true){
			new StockDao().descargarTransferencia(transferencia, transferencia.localOrigen);
		}
		
		this.commit();
		return true;
		
	} catch (e) {
		this.rollback();
		transferencia.estado = oldEstado;
		throw e;
	}
	return false;
};

/**
 * Recepta la transferencia
 * @param {Transferencia} transferencia
 * @return {Boolean}
 */
TransferenciaDao.prototype.receptar = function(transferencia){
	var oldEstado = transferencia.estado;
	try {
		this.begin();
		
		//Actualiza campos de la transferencia
		transferencia.fechaRecepcion = new Date().toString('yyyy-MM-dd HH:mm:ss');
		this.updateStrField(transferencia, "fechaRecepcion");
		transferencia.fechaRecepcion = new Date();
		
		transferencia.estado = new TransferenciaConst().ESTADO_RECEPTADA;
		this.updateStrField(transferencia, "estado");	
		
		//Actualiza cantidad recibida
		var array = transferencia.items;
		for (var i = 0; i < array.length; i++) {
			var item = array[i];
			this.updateStrField(item, "cantidadRecibida");
		}
		
		//Afecta stock
		new StockDao().receptarTransferencia(transferencia, transferencia.localDestino);
		
		this.commit();
		return true;
	} catch (e) {
		transferencia.estado = oldEstado;
		this.rollback();
		throw e;
	}
	return false;
};

/**
 * Elimina la transferencia
 * @param {Transferencia} transferencia
 * @return {Boolean}
 */
TransferenciaDao.prototype.eliminar = function(transferencia){
	try {
		this.begin();
		
		this.deleteBy(new TransferenciaItem(), 'id_transferencia='+transferencia.id);
		this.deleteBy(new Transferencia(), 'id='+transferencia.id);
		
		this.commit();
		return true;
	} catch (e) {
		this.rollback();
		throw e;
	}
	return false;
};

/**
 * Busca todas todas las transferencias
 * 
 * @return {Array} Lista de Transferencia
 */
TransferenciaDao.prototype.buscarTodos = function(){
	var transferencia = new Transferencia();
	var lista = this.readAll(transferencia);
	return this.modelListTo(transferencia, lista);
	
};

/**
 * Busca todas las transferencias en un determinado estado
 * 
 * @param {String} estado - El estado de la transferencia o nulo para todas
 * @return {Array} Lista de Transferencia
 */
TransferenciaDao.prototype.buscarByEst = function(estado){
	var transferencia = new Transferencia();
	var lista = this.readBy(transferencia, "WHERE estado = '" + estado+"'");
	return this.modelListTo(transferencia, lista, true, false);
};

/**
 * Busca las transferencias enviadas a un local
 * 
 * @param {Number} idLocal - El id del local o nulo para todos
 * @return {Array} Lista de Transferencia
 */
TransferenciaDao.prototype.buscarByLocEst = function(idLocalDestino, estado){
	var transferencia = new Transferencia();
	var lista = this.readBy(transferencia, "where " +								 
			this.fkSql('id_local_destino', idLocalDestino) + " and " +			
			this.fkSql('estado', ("'" + estado + "'"))			
		);
	
	return this.modelListTo(transferencia, lista);	
};

/**
 * Busca las transferencias por local y usuario
 * 
 * @param {Number} idLocal - El id del local o nulo para todos
 * @param {Number} idUsuario - El id del usuario o nulo para todos
 * @param {Number} estado - El estado de la transferencia o nulo para todas
 * @return {Array} Lista de Transferencia
 */
TransferenciaDao.prototype.buscarByUsLoc = function(tipoFecha, fechaInicio, fechaFin, idLocalOrigen, idLocalDestino){
	var transferencia = new Transferencia();
	var lista = this.readBy(transferencia, "where " +
			tipoFecha + ">='" + fechaInicio + "' and " +
			tipoFecha  + "<='" + fechaFin + "' and " +
			tipoFecha + ">='" + fechaInicio + "' and " +
			tipoFecha + "<='" + fechaFin + "' and " +						 
			this.fkSql('id_local_origen', idLocalOrigen) + " and " +			
			this.fkSql('id_local_destino', idLocalDestino)			
		);
	
	return this.modelListTo(transferencia, lista);	
};

/**
 * Busca las transferencias de acuerdo al tipo de fecha en el rango indicado, por local
 * 
 * @param {String} tipoFecha - Se puede poner fechaCreacion, fechaRecepcion
 * @param {Date} fechaInicio 
 * @param {Date} fechaFin
 * @param {Number} idLocal - Id de local o nulo para todos 
 * @return {Array} Lista de Transferencia
 */
TransferenciaDao.prototype.buscarByFechaUsLoc = function(tipoFecha, fechaInicio, fechaFin){
	fechaInicio = toStringFecha(fechaInicio);
	fechaFin = toStringFecha(fechaFin);
	
	var transferencia = new Transferencia();
	var lista = this.readBy(transferencia, "where " + 
			tipoFecha +">='" +fechaInicio + "' and " + 
			tipoFecha +"<='" +fechaFin + "'"
		);
	return this.modelListTo(transferencia, lista);	
};

/**
 * Busca las transferencias por local de origen
 * 
 * @param {Number} local - El id del local o nulo para todos
 * @return {Array} Lista de Transferencia
 */
TransferenciaDao.prototype.buscarByLocalOrigen = function(local){
	var transferencia = new Transferencia();
	var lista = this.readBy(transferencia, "where " +									 
			this.fkSql('id_local_origen', local)			
		);
	
	return this.modelListTo(transferencia, lista);	
};

/**
 * Busca las transferencias por local de destino
 * 
 * @param {Number} local - El id del local o nulo para todos
 * @return {Array} Lista de Transferencia
 */
TransferenciaDao.prototype.buscarByLocalDestino = function(idLocal){
	var transferencia = new Transferencia();
	var lista = this.readBy(transferencia, "where " +									 
			this.fkSql('id_local_destino', idLocal)			
		);
	
	return this.modelListTo(transferencia, lista);	
};

/**
 * Busca las compras por una propiedad su valor e id del local
 * 
 * @param {String} propiedad - Nombre del atributo
 * @param {String} valorPropiedad - Valor del atributo
 * @param {Number} idLocal - Id del local o nulo para todos
 * @return {Array} Lista de Transferencia
 */
TransferenciaDao.prototype.buscarByPropiedadUsLoc = function(propiedad, valorPropiedad, idUsuario, idLocal, estado){		
	var transferencia = new Transferencia();
	var lista = new Array();	
	try{
		lista = this.readBy(transferencia,"where " +
				propiedad + " Like '" + valorPropiedad+"%' and " + 
				this.fkSql('id_usuario', idUsuario) + " and " + 
				this.fkSql('id_local', idLocal) + " and " +
				this.strSql('estado', estado)
		);
	}catch(e){}	
	return this.modelListTo(transferencia, lista);	
};

/**
 * Busca una transferencia por su id
 * 
 * @param {Number} id - El id de la transferencia
 * @return {Transferencia}
 */
TransferenciaDao.prototype.buscarPorId = function(id){
	var transferencia = new Transferencia();
	var lista = new Array();
	
	try{
		lista = this.readBy(transferencia, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(transferencia, lista[0]);
	}
	return null;	
};

TransferenciaDao.prototype.loadInnerEntitys = function(id){
	var transferencia = new Transferencia();
	transferencia.id = id;
	
	this.read(transferencia);
	var daop = new ProductoDao();
	
	transferencia.usuario = new UsuarioDao().buscarPorId(transferencia.id_usuario);
	transferencia.local = new LocalDao().buscarPorId(transferencia.id_local);
	
	var it = new TransferenciaItem();
	var items = this.readBy(it, "where id_transferencia = " + id);
	for(var i = 0 ; i < items.length; i++){
		var item = items[i];
		var x = this.modelTo(it, item);
		x.producto = daop.buscarPorId(item.id_producto);
		x.transferencia = transferencia;
		transferencia.items.push(x);
	}	
		
	return transferencia;
};