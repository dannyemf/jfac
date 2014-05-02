function FacturaCompraDao(){
};

FacturaCompraDao.prototype = new Dao();

/**
 * Guarda la factura de compra
 * @param {FacturaCompra} factura
 * @param {Boolean} afectarStock
 * @return {Boolean}
 */
FacturaCompraDao.prototype.guardar = function(factura, afectarStock){
	try {		
		var oldItems = new Array();
		
		this.begin();
		
		if(factura.estado != factura.ESTADO_REGISTRADA){
			throw new Error('Operación guardar no soportada para el estado: ' + +factura.estado);
		}
		
		if(afectarStock == true){
			factura.estado = factura.ESTADO_FINALIZADA;
		}
		
		//Guarda la factura
		if(factura.id == -1){
			this.create(factura);
		}else{
			oldItems = this.readBy(new FacturaCompraItem(), "where id_faccompra="+factura.id);
			this.update(factura);
		}	
		
		// Guarda los items
		var array = factura.items;
		for ( var i = 0; i < array.length; i++) {
			var item = new FacturaCompraItem();
			item = array[i];
			if(item.id == -1){
				this.create(item);				
			}else{
				this.update(item);
			}
			
			this.query("UPDATE " + item.producto.tablename + " SET precioCompra=" + 
					item.producto.precioCompra + ", precioVenta="+item.producto.precioVenta + 
					" WHERE id="+item.producto.id
					);
		}	
		
		//Borra los items eliminados
		var eliminados = this.getErased(oldItems, array);			
		for ( var i = 0; i < eliminados.length; i++) {
			this.deletee(new FacturaCompraItem(eliminados[i].id));
		}
		
		//Afecta stock de los productos
		if(afectarStock == true){
			new StockDao().cargarCompra(factura, factura.local);
			
			//Contabiliza la compra
			new ContabilidadDao().contabilizarCompra(factura);
		}
		
		this.commit();
		return true;
	} catch (e) {
		factura.estado = factura.ESTADO_REGISTRADA;
		logInfo(e);
		this.rollback();
		throw e;
	}
	return false;
};

FacturaCompraDao.prototype.eliminar = function(factura){
	return this.deletee(factura);
};

/**
 * Busca todas todas las compras
 * 
 * @return {Array} Lista de FacturaCompra
 */
FacturaCompraDao.prototype.buscarTodos = function(){
	var factura = new FacturaCompra();
	var lista = this.readAll(factura);
	return this.modelListTo(factura, lista);	
};

/**
 * Busca las compras por local y proveedor
 * 
 * @param {Number} idLocal - El id del local o nulo para todos
 * @param {Number} idProveedor - El id del proveedor o nulo para todos
 * @return {Array} Lista de FacturaCompra
 */
FacturaCompraDao.prototype.buscarByUsLocProv = function(idUsuario, idLocal, idProveedor, estado){
	var factura = new FacturaCompra();
	var lista = this.readBy(factura, "where " +
			this.fkSql('id_usuario', idUsuario) + " and " + 
			this.fkSql('id_local', idLocal) + " and " + 
			this.fkSql('id_proveedor', idProveedor) + " and " +
			this.strSql('estado', estado)
		);
	return this.modelListTo(factura, lista);
};

/**
 * Busca las compras el tipo de fecha en el rango indicado, por local y proveedor
 * 
 * @param {String} tipoFecha - Se puede poner fechaRegistro, fechaEmision, fechaCaducidad
 * @param {Date} fechaInicio 
 * @param {Date}fechaFin
 * @param {Number} idLocal - Id de local o nulo para todos
 * @param {Number} idProveedor - Id del proveedor o nulo para todos
 * @return {Array} Lista de FacturaCompra
 */
FacturaCompraDao.prototype.buscarByFechaUsLocProv = function(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal, idProveedor, estado){
	var factura = new FacturaCompra();
	var lista = this.readBy(factura, "where date(" + 
			tipoFecha + ") >='" + fechaInicio.toString('yyyy-MM-dd') + "' and date(" + 
			tipoFecha + ") <='" + fechaFin.toString('yyyy-MM-dd') + "' and "  +
			this.fkSql('id_usuario', idUsuario) + " and " + 
			this.fkSql('id_local', idLocal) + " and " + 
			this.fkSql('id_proveedor', idProveedor)  + " and " +
			this.strSql('estado', estado)
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
FacturaCompraDao.prototype.buscarByPropiedadUsLocProv = function(propiedad, valorPropiedad, idUsuario, idLocal, idProveedor, estado){		
	var factura = new FacturaCompra();
	var lista = new Array();	
	try{
		lista = this.readBy(factura,"where " +
				propiedad + " Like '" + valorPropiedad+"%' and " + 
				this.fkSql('id_usuario', idUsuario) + " and " + 
				this.fkSql('id_local', idLocal) + " and " + 
				this.fkSql('id_proveedor', idProveedor) + " and " +
				this.strSql('estado', estado)
		);
	}catch(e){}	
	return this.modelListTo(factura, lista);
};

/**
 * Verifica si existe una factura con el mismo número
 * 
 * @param {FacturaCompra} factura
 * @return {Boolean} true o false según el caso
 */
FacturaCompraDao.prototype.existeByNumero = function(factura){		
	try{
		var lista = this.readBy(factura, "where numeroFactura = '" + factura.numeroFactura +"'");
		if(lista.length > 0){
			if (lista[0].id == factura.id){
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
FacturaCompraDao.prototype.buscarPorId = function(id){
	var factura = new FacturaCompra();
	var lista = new Array();
	
	try{
		lista = this.readBy(factura, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(factura, lista[0]);
	}
	return null;	
};

FacturaCompraDao.prototype.loadInnerEntitys = function(id){
	var factura = new FacturaCompra();
	factura.id = id;
	
	this.read(factura);
	var daop = new ProductoDao();
	var daoprov = new ProveedorDao();
	
	factura.proveedor = daoprov.buscarPorId(factura.id_proveedor);
	factura.usuario = new UsuarioDao().buscarPorId(factura.id_usuario);
	factura.local = new LocalDao().buscarPorId(factura.id_local);
	factura.periodo = new PeriodoContableDao().buscarPorId(factura.id_periodo);	
	
	var it = new FacturaCompraItem();
	var items = this.readBy(it, "where id_faccompra = " + id);
	for(var i = 0 ; i < items.length; i++){
		var item = items[i];
		var x = this.modelTo(it, item);
		x.producto = daop.buscarPorId(item.id_producto);
		x.factura = factura;
		factura.items.push(x);
	}	
		
	return factura;
};

FacturaCompraDao.prototype.vistaCompras = function(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal, idProveedor, estado, numeroFactura){
	
	var q = "SELECT * FROM vista_compras WHERE " +			
			this.fkSql('id_usuario', idUsuario) + " and " +
			this.fkSql('id_local', idLocal) + " and " +
			this.fkSql('id_proveedor', idProveedor)  + " and " +
			this.strSql('estado', estado) + ' and ' +
			"numeroFactura Like '%"  + (numeroFactura ? numeroFactura : '') + "%' ";
			
			if(tipoFecha){
				q += "and date("+tipoFecha + ") >='" + fechaInicio.toString('yyyy-MM-dd') + "' "; 
				q += "and date("+tipoFecha + ") <='" + fechaFin.toString('yyyy-MM-dd') + "' ";
			}
			
	getContexto().cacheQuery = q;
	return this.query(q);
};