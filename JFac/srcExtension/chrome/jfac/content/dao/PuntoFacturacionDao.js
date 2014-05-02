function PuntoFacturacionDao(){
};

PuntoFacturacionDao.prototype = new Dao();

PuntoFacturacionDao.prototype.guardar = function(punto){
	var guardado = false;
	if(punto.id == -1){
		guardado = this.create(punto);
	}else{
		guardado = this.update(punto);
	}	
	return guardado;
};

PuntoFacturacionDao.prototype.eliminar = function(punto){
	return this.deletee(punto);
};

PuntoFacturacionDao.prototype.obtenerTodos = function(){
	var punto = new PuntoFacturacion();
	var lista = this.readAll(punto);
	
	var lstModel =  this.modelListTo(punto, lista);
	/*for(var i = 0 ; i < lstModel.length; i++){
		lstModel[i].local = new Local(lstModel[i].id_local);
		this.read(lstModel[i].local);
	}*/
	
	return lstModel;	
};


PuntoFacturacionDao.prototype.buscarPorId = function(id){
	var punto = new PuntoFacturacion();
	var lista = new Array();
	
	try{
		lista = this.readBy(punto, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		var m =  this.modelTo(punto, lista[0]);
		m.local = new Local(m.id_local);
		this.read(m.local);
		return m;
	}
	return null;	
};

PuntoFacturacionDao.prototype.buscarPorLocal = function(local){
	var punto = new PuntoFacturacion();
	var lista = new Array();
	
	try{
		lista = this.readBy(punto, "where id_local = " + local.id);
	}catch(e){}
	
	return lista;	
};

/**
 * Verifica si existe un punto de facturaci�n con el mismo codigo
 * @param {PuntoFacturacion} punto
 * @return {Boolean}
 */
PuntoFacturacionDao.prototype.existeByCodigo = function(punto){
	try {
		var id = punto.id;
		var lista = this.readBy(punto, "where codigo = '" + punto.codigo + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};

