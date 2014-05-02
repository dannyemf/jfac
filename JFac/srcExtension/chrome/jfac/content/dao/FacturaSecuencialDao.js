function FacturaSecuencialDao(){
};

FacturaSecuencialDao.prototype = new Dao();

FacturaSecuencialDao.prototype.guardar = function(secuencial){
	var guardado = false;
	if(secuencial.id == -1){
		guardado = this.create(secuencial);
	}else{
		guardado = this.update(secuencial);
	}	
	return guardado;
};

FacturaSecuencialDao.prototype.eliminar = function(secuencial){
	return this.deletee(secuencial);
};

FacturaSecuencialDao.prototype.obtenerTodos = function(){
	var secuencial = new FacturaSecuencial();
	var lista = this.readAll(secuencial);	
	var a = this.modelListTo(secuencial, lista);	
	return a;	
};

FacturaSecuencialDao.prototype.obtenerSecuencial = function(punto,tipoDocumento){
	var model = new FacturaSecuencial();
	model.tablename = "vista_secuencial";
	
	var secs = this.readBy(model, "where id_punto="+punto.id +" and tipoDocumento ='"+ tipoDocumento +"'");
	
	if(secs.length > 0){
		var m = this.modelTo(new FacturaSecuencial(), secs[0]);		
		return m;
	}
	
	return null;
};

/**
 * Obtiene el secuencial para un documento específico, en donde el docuemnto debe tener los atributos:
 * - tipoDocumento: String
 * - punto:			PuntoFacturacion
 * @param {Object} documento
 * @return {FacturaSecuencial}
 */
FacturaSecuencialDao.prototype.generarSecuencial = function(documento){
	var s = this.obtenerSecuencial(documento.punto, documento.tipoDocumento);
	if(s != null){
		if(s.secuencial * 1 > s.hasta * 1){
			throw new Error("Secuencial agotado(sec:" + s.secuencial+'; desde: ' + s.desde + '; hasta: '+s.hasta+'; id: '+s.id+')');
		}
		var nx = "00000000"+s.secuencial;
		nx = nx.substring(nx.length-7, nx.length);
		s.numero = s.punto.codigo +"-"+ nx; 
		s.secuencial = (s.secuencial * 1) + 1;
		
		return s; 
	}
	throw new Error("No se puede generar el número de documento." +
			"\ntipoDocuemnto : " + documento.tipoDocumento+
			"\npuntoFacturac : " + documento.punto+
			"\n\nSolicite al administrador del sistema que verifique la configuración de secuenciales.");
};

FacturaSecuencialDao.prototype.buscarPorId = function(id){
	var secuencial = new FacturaSecuencial();
	var lista = new Array();
	
	try{
		lista = this.readBy(secuencial, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		
		
		var m =  this.modelTo(secuencial, lista[0]);
		m.punto = new PuntoFacturacion(m.id_punto);
		m.autorizacion = new AutorizacionSri(m.id_autorizacion);
		
		this.read(m.punto);
		this.read(m.autorizacion);
		return m;
	}
	return null;	
};