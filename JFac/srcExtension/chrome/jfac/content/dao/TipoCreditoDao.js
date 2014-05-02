function TipoCreditoDao(){
};

TipoCreditoDao.prototype = new Dao();

TipoCreditoDao.prototype.guardar = function(tipoCredito){
	var guardado = false;
	if(tipoCredito.id == -1){
		guardado = this.create(tipoCredito);
	}else{
		guardado = this.update(tipoCredito);
	}	
	return guardado;
};

TipoCreditoDao.prototype.eliminar = function(tipoCredito){
	return this.deletee(tipoCredito);
};

TipoCreditoDao.prototype.buscarTodos = function(){
	var tipoCredito = new TipoCredito();
	var lista = this.readAll(tipoCredito);
	return this.modelListTo(tipoCredito, lista);
	
};

TipoCreditoDao.prototype.buscarPorId = function(id){
	var tipoCredito = new TipoCredito();
	var lista = new Array();
	
	try{
		lista = this.readBy(tipoCredito, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(tipoCredito, lista[0]);
	}
	return null;	
};

TipoCreditoDao.prototype.buscarPorDescripcion = function(descripcion){
	var tipoCredito = new TipoCredito();
	var lista = this.readBy(tipoCredito, "where descripcion LIKE '" + descripcion + "%'");
	return this.modelListTo(tipoCredito, lista);	
};