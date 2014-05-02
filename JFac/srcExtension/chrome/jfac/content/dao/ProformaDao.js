function ProformaDao(){
};

ProformaDao.prototype = new Dao();

ProformaDao.prototype.guardar = function(proforma){
	var guardado = false;
	if(proforma.id == -1){
		guardado = this.create(proforma);
	}else{
		guardado = this.update(proforma);
	}	
	
	if(guardado){
		var array = proforma.items;
		for ( var i = 0; i < array.length; i++) {
			var item = array[i];
			if(item.id == -1){
				this.create(item);
			}else{
				this.update(item);
			}
		}
	}
	
	return guardado;
};

ProformaDao.prototype.eliminar = function(proforma){
	return this.deletee(proforma);
};

ProformaDao.prototype.buscarTodos = function(){
	var proforma = new Proforma();
	var lista = this.readAll(proforma);
	return this.modelListTo(proforma, lista);
	
};

ProformaDao.prototype.buscarPorId = function(id){
	var proforma = new Proforma();
	var lista = new Array();
	
	try{
		lista = this.readBy(proforma, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(proforma, lista[0]);
	}
	return null;	
};


/**
 * Busca las compras por local y proveedor
 * 
 * @param {Number} idLocal - El id del local o nulo para todos
 * @param {Number} idProveedor - El id del proveedor o nulo para todos
 * @return {Array} Lista de FacturaVenta
 */
ProformaDao.prototype.buscarByUsLocCli = function(idUsuario, idLocal, idCliente, estado){
	var factura = new Proforma();
	var lista = this.readBy(factura, "where " +
			this.fkSql('id_usuario', idUsuario) + " and " + 
			this.fkSql('id_local', idLocal) + " and " + 
			this.fkSql('id_cliente', idCliente) + " and " +
			"estado Like '"+  estado + "%'"
		);
	
	return this.modelListTo(factura, lista);	
};

/**
 * Busca las compras el tipo de fecha en el rango indicado, por local y porveedor
 * 
 * @param {String} tipoFecha - Se puede poner fechaRegistro, fechaEmision, fechaCaducidad
 * @param {Date} fechaInicio 
 * @param {Date}fechaFin
 * @param {Number} idLocal - Id de local o nulo para todos
 * @param {Number} idProveedor - Id del proveedor o nulo para todos
 * @return {Array} Lista de FacturaCompra
 */
ProformaDao.prototype.buscarByFechaUsLocCli = function(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal, idCLiente, estado){
	var factura = new Proforma();
	var lista = this.readBy(factura, "where date(" + 
			tipoFecha +") >='" +fechaInicio.toString('yyyy-MM-dd') + "' and date(" + 
			tipoFecha +") <='" +fechaFin.toString('yyyy-MM-dd') + "' and "  +
			this.fkSql('id_usuario', idUsuario) + " and " + 
			this.fkSql('id_local', idLocal) + " and " + 
			this.fkSql('id_cliente', idCLiente)  + " and " +
			"estado Like '"+  estado + "%'"
		);
	return this.modelListTo(factura, lista);	
};

/**
 * Busca las compras por una propiedad su valor, id del local  e id del proveedor
 * 
 * @param {String} propiedad - Nombre del atributo
 * @param {String} valorPropiedad - Valor del atributo
 * @param {Number} idLocal - Id del local o nulo para todos
 * @param {Number} idProveedor - Id del proveedor o nulo para todos
 * @return {Array} Lista de FacturaCompra
 */
ProformaDao.prototype.buscarByPropiedadUsLocCli = function(propiedad, valorPropiedad, idUsuario, idLocal, idCliente, estado){		
	var factura = new Proforma();
	var lista = new Array();	
	try{
		lista = this.readBy(factura,"where " +
				propiedad + " Like '" + valorPropiedad+"%' and " + 
				this.fkSql('id_usuario', idUsuario) + " and " + 
				this.fkSql('id_local', idLocal) + " and " + 
				this.fkSql('id_cliente', idCliente) + " and " +
				"estado Like '"+  estado + "%'"
		);
	}catch(e){}	
	return this.modelListTo(factura, lista);	
};

ProformaDao.prototype.vistaProformas = function(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal, idCliente, estado, numero){	
	
	var q = "SELECT * FROM vista_proformas WHERE " +			
			this.fkSql('id_usuario', idUsuario) + " and " +
			this.fkSql('id_local', idLocal) + " and " +
			this.fkSql('id_cliente', idCliente)  + " and " +
			this.strSql('estado', estado) + ' and ' +
			"concat(id,'') Like '%"  + (numero ? numero : '') + "%' ";
			
			if(tipoFecha){
				q += "and date("+tipoFecha + ") >='" + fechaInicio.toString('yyyy-MM-dd') + "' "; 
				q += "and date("+tipoFecha + ") <='" + fechaFin.toString('yyyy-MM-dd') + "' ";
			}
			
	getContexto().cacheQuery = q;
	return this.query(q);
};