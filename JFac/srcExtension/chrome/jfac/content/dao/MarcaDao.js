function MarcaDao(){
};

MarcaDao.prototype = new Dao();

MarcaDao.prototype.guardar = function(marca){
	var guardado = false;
	try{
		this.begin();
		if(marca.id == -1){
			guardado = this.create(marca);
		}else{
			guardado = this.update(marca);
		}
		this.commit();
	}catch (e) {
		this.rollback();
		guardado = false;
		alert('MarcaDao.guardar(): '+e);
	}
	
	return guardado;
};

MarcaDao.prototype.eliminar = function(marca){
	return this.deletee(marca);
};

MarcaDao.prototype.obtnerTodos = function(){
	var marca = new Marca();
	var lista = this.readAll(marca);
	return this.modelListTo(marca, lista);
};

/**
 * Verifica si existe una marca con el mismo codigo
 * @param {Marca} marca
 * @return {Boolean}
 */
MarcaDao.prototype.existe = function(marca){
	try {
		var id = marca.id;
		var lista = this.readBy(marca, "where codigo = '" + marca.codigo + "' and id != " + id);
		if(lista.length > 0){
			return true;
		}
	} catch (e) {}
	return false; 
};