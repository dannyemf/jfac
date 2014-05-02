function ReporteDao(){
};

ReporteDao.prototype = new Dao();

/**
 * Guarda el reporte
 * @param {Reporte} reporte
 * @return {Boolean}
 */
ReporteDao.prototype.guardar = function(reporte){		
	try {
		var model = new Reporte();
		model = reporte;			
		
		this.begin();			
		
		if(reporte.id == -1){			
			//Guarda la reporte
			this.create(reporte);
			
			//Guarda las tablas
			for ( var i = 0; i < reporte.tablas.length; i++) {
				this.create(reporte.tablas[i]);				
			}
			
			//Guarda las columnas
			for ( var i = 0; i < reporte.columnas.length; i++) {
				this.create(reporte.columnas[i]);				
			}
			
			//Guarda los filtros
			for ( var i = 0; i < reporte.filtros.length; i++) {
				this.create(reporte.filtros[i]);				
			}
		}		
			
		this.commit();
		
		return true;
	} catch (e) {
		logError(e);
		this.rollback();
		throw e;
	}	
	
	return false;
};

/**
 * Guarda el reporte
 * @param {Reporte} reporte
 * @return {Boolean}
 */
ReporteDao.prototype.eliminar = function(reporte){		
	try {
		var model = new Reporte();
		model = reporte;			
		
		this.begin();		
		
		//Guarda las tablas
		for ( var i = 0; i < reporte.tablas.length; i++) {
			this.deletee(reporte.tablas[i]);				
		}
		
		//Guarda las columnas
		for ( var i = 0; i < reporte.columnas.length; i++) {
			this.deletee(reporte.columnas[i]);				
		}
		
		//Guarda los filtros
		for ( var i = 0; i < reporte.filtros.length; i++) {
			this.deletee(reporte.filtros[i]);				
		}
		
		//Guarda la reporte
		this.deletee(reporte);
			
		this.commit();
		
		return true;
	} catch (e) {
		logError(e);
		this.rollback();
		throw e;
	}	
	
	return false;
};

ReporteDao.prototype.obtenerRelacionesTablas = function(tablas){
	var relaciones = new Array();
	
	try{
		for(var l in tablas){				
			var tl = tablas[l];		
			for(var r in tablas){
				var tr = tablas[r];
				if(l != r){
					var rls = this.obtenerRelaciones(tl, tr);
					for(var i=0; i < rls.length; i++){
						relaciones.push(rls[i]);
					}
				}
			}
		}
	}catch (e) {
		alert('ReporteDao.obtenerRelacionesTablas(...): '+e);
	}
	
	return relaciones;	
};

ReporteDao.prototype.obtenerRelaciones = function (LTabla, RTabla) {	
	var lst = new Array();
	
	try {
		var list = this.relation(LTabla.nombre, RTabla.nombre);
		if(list.length > 0){
			var rel = list[0];		
			var r = new Object();
			r.columnaOrigen = rel.column_name;
			r.columnaReferenciada = rel.referenced_column_name;
			r.tablaOrigen = LTabla.nombre;
			r.tablaReferenciada = RTabla.nombre;		
			lst.push(r);		
		}
	} catch (e) {
		alert('ReporteDao.obtenerRelaciones(...): ' + e);
	}
	
	return lst;
};


ReporteDao.prototype.buscarPorTexto = function(texto){
	texto = texto.trim();
	var like = texto.length > 0 ? "'%"+texo +"%'" : "'%'";
			
	var rep = new Reporte();
	var lista = this.readBy(rep, "WHERE nombre Like " + like + " OR titulo Like " + like + " OR descripcion Like " + like, 'ORDER BY nombre ASC' )
	return this.modelListTo(rep, lista, true, true);	
};