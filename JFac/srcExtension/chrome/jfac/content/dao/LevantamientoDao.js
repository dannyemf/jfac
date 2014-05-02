function LevantamientoDao(){
};

LevantamientoDao.prototype = new Dao();

/**
 * 
 * @param {Levantamiento} entidad
 * @return {Boolean}
 */
LevantamientoDao.prototype.guardar = function(entidad){
	try {
		this.begin();		
		this.create(entidad);
		var kardexDao = new KardexDao();
		
		for(var i = 0; i < entidad.items.length;i++){
			if(entidad.items[i].cantidadActual != entidad.items[i].cantidadConteo){
				
				this.create(entidad.items[i]);
				
				var lst = this.query("SELECT id_local, id_producto, existencia FROM " + new StockProducto().tablename + " WHERE id_producto = " + entidad.items[i].producto.id + " and id_local = " + entidad.local.id);
				
				if(lst.length > 0){					
					this.query("UPDATE " + new StockProducto().tablename + " SET existencia = " + entidad.items[i].cantidadConteo + "  WHERE id_producto = " + entidad.items[i].producto.id + " and id_local = " + entidad.local.id);
					kardexDao.entrada(entidad.local, entidad.items[i].producto, 'Inventario inicial', entidad.items[i].cantidadConteo, 0);					
				}else{ 
					var st = new StockProducto();
					st.producto = entidad.items[i].producto;
					st.local = entidad.local;
					st.existencia = entidad.items[i].cantidadConteo;
					this.create(st);					
					kardexDao.entrada(entidad.local, entidad.items[i].producto, 'Inventario inicial', entidad.items[i].cantidadConteo, 0);
				}
				
				
				
				
				
			}
		}
		
		this.commit();
		return true;
	} catch (e) {
		this.rollback();
		throw e;
	}
	return false;
};

LevantamientoDao.prototype.eliminar = function(entidad){
	return this.deletee(entidad);
};

LevantamientoDao.prototype.buscarTodos = function(){
	var entidad = new Levantamiento();
	var lista = this.readAll(entidad);
	return this.modelListTo(entidad, lista);
	
};

/*LevantamientoDao.prototype.buscarPorLocal = function(local){
	var stock = new Levantamiento();
	var lista = new Array();
	try{
		lista = this.readBy(stock, "WHERE id_local = '" + local.id +"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(stock, lista[0]);
	}
	return null;	
};

LevantamientoDao.prototype.buscarStockPorLocal = function(idLocal, texto){
	var stock = new Levantamiento();
	var producto = new Producto();
	var local = new Local();
	var lista = new Array();
	
	texto = texto.trim();
	if(texto.length == 0){texto = "'%'";}
	else{texto = "'" + texto + "%'";}	
	
	try{
		if(idLocal == -1){
			lista = this.query('SELECT p.id, l.nombre as local, p.codigo, p.nombre, s.existencia as existencia from ' 
					   +  stock.tablename + ' s, ' + producto.tablename + ' p, ' + local.tablename 
					   + ' l where s.id_producto = p.id and s.id_local = l.id and p.nombre like ' + texto + ';');
		}else if(idLocal == -2){
			lista = this.query('SELECT p.id, p.codigo, p.nombre, sum(s.existencia) as existencia from ' 
					   +  stock.tablename + ' s, ' + producto.tablename + 
					   ' p where s.id_producto = p.id and p.nombre like ' + texto + ' group by p.id;');
		}else{
			lista = this.query('SELECT p.id, p.codigo, p.nombre, sum(s.existencia) as existencia from ' 
						   +  stock.tablename + ' s, ' + producto.tablename + 
						   ' p where s.id_producto = p.id and p.nombre like ' + texto + 
						   ' and ' + this.fkSql('s.id_local', idLocal) + ' group by p.id;');
		}
	}catch(e){}	
	return lista;
};*/

/**
 * Busca el stock por codigo o nombre del producto y por el local
 * @param {String} referencia Codigo o nombre
 * @param {Local} local o nulo para todos
 * @return
 */
/*LevantamientoDao.prototype.buscarPorReferencia = function(referencia, local){
	var stock = new Levantamiento();
	stock.tablename = 'vista_stock_producto';
	
	var lista = new Array();
	try{
		lista = this.readBy(stock, "WHERE " +
				" (codigo Like '" + referencia + "%'" + 
				" or nombre Like '" + referencia + "%')" +
				" and id_local " + (local ? " = " + local.id : " is not null")
				);
	}catch(e){}
	return lista;
};

LevantamientoDao.prototype.buscarPorProducto = function(producto){
	var stock = new Levantamiento();
	var lista = new Array();
	try{
		lista = this.readBy(stock, "where id_producto = '" + producto.id +"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(stock, lista[0]);
	}
	return null;	
};

LevantamientoDao.prototype.buscarPorProductoLocal = function(producto, local){
	var stock = new Levantamiento();
	var lista = new Array();
	try{
		lista = this.readBy(stock, "WHERE id_producto = " + producto.id + " and id_local = " + local.id);
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(stock, lista[0]);
	}
	return null;	
};

LevantamientoDao.prototype.buscar = function(producto, local){
	var entidad = new Levantamiento();
	entidad.id = -1;
	entidad.local = local;
	entidad.producto = producto;
	
	this.readBy(new Levantamiento(), 'WHERE id_producto = ' + producto.id + ' and id_local = ' + local.id);
	if(this.oDb.lista.length > 0){
		var obj = this.oDb.lista[0];
		var model = this.modelTo(new Levantamiento(), obj);
		model.id = 1;
		return model;
	}else{		
		return entidad;		
	}
};*/

LevantamientoDao.prototype.vistaLevantamientos = function(tipoFecha, fechaInicio, fechaFin, idUsuario, idLocal){
	
	var q = "SELECT * FROM vista_levantamientos WHERE " +			
			this.fkSql('id_usuario', idUsuario) + " and " +
			this.fkSql('id_local', idLocal);
			
			if(tipoFecha){
				q += " and date("+tipoFecha + ") >='" + fechaInicio.toString('yyyy-MM-dd') + "' "; 
				q += " and date("+tipoFecha + ") <='" + fechaFin.toString('yyyy-MM-dd') + "' ";
			}
			
	getContexto().cacheQuery = q;
	return this.query(q);
};