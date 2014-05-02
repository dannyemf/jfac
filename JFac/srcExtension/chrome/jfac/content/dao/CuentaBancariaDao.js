function CuentaBancariaDao(){
};

CuentaBancariaDao.prototype = new Dao();

CuentaBancariaDao.prototype.guardar = function(cuenta){
	var guardado = false;	
	
	if(cuenta.id == -1){
		guardado = this.create(cuenta);
	}else{
		guardado = this.update(cuenta);
	}
	
	return guardado;
};

CuentaBancariaDao.prototype.eliminar = function(cuenta){
	return this.deletee(cuenta);
};




/**
 * Busca todas todas los cuentas
 * 
 * @return {Array} Lista de Banco
 */
CuentaBancariaDao.prototype.buscarTodos = function(){
	var cuenta = new CuentaBancaria();
	var lista = this.readAll(cuenta);
	return this.modelListTo(cuenta, lista);
	
};

/**
 * Busca una CuentaBancaria por su id
 * 
 * @param {Number} id - El id del CuentaBancaria
 * @return {CuentaBancaria}
 */
CuentaBancariaDao.prototype.buscarPorId = function(id){
	var cuenta = new CuentaBancaria();
	var lista = new Array();
	
	try{
		lista = this.readBy(cuenta, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(cuenta, lista[0]);
	}
	return null;	
};

/**
 * Busca una CuentaBancaria por su id
 * 
 * @param {Number} id - El id del CuentaBancaria
 * @return {CuentaBancaria}
 */
CuentaBancariaDao.prototype.buscarPorBancoId = function(id){
	var cuenta = new CuentaBancaria();
	var lista = new Array();
	
	try{
		lista = this.readBy(cuenta, "where id_banco = '" + id+"'");
	}catch(e){}
	
	return this.modelListTo(cuenta, lista);	
};

/**
 * Verifica si existe un cuenta con el mismo codigo
 * @param {CuentaBancaria} cuenta
 * @return {Boolean}
 */
CuentaBancariaDao.prototype.existe = function(cuenta){
	try {
		var id = cuenta.id;
		var lista = this.readBy(cuenta, "where numero = '" + cuenta.numero + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};