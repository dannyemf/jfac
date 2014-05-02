/**
 * Retorna una fecha en formato yyyy-mm-dd HH:mm:ss
 * @param fechita
 * @return
 */
function toStringFecha(fechita){
	try{	
	  	if(fechita instanceof Date){ 		
	 		return fechita.toString("yyyy-MM-dd HH:mm:ss");
	  	}	  	
	}catch(e){ 		 	
		return fechita.substring(0, 10);
	}
};

/**
 * Retorna una fecha en formato cadena yyyy-mm-dd
 * 
 * @param {Date} fechita La fecha
 * @return {String} La fecha formateada
 */
function toShortDateString(fechita){
	  try{	
	  	if(fechita instanceof Date){
	 		/*var anio = fechita.getYear()+1900;
	 		var mes = '';
	 		var dia = '';
	 		if((fechita.getMonth()+1)<10){
	 			 mes = '0'+(fechita.getMonth()+1);
	 		}else{	
	 			mes = ''+(fechita.getMonth()+1);
	 		}if((fechita.getDate())<10){
	 			 dia = '0'+(fechita.getDate());
	 		}else{	
	 			dia = ''+(fechita.getDate());
	 		}
	 		var fecha = anio+"-"+mes+"-"+dia;*/		
	 		return fechita.toString("yyyy-MM-dd");
	  	}
	  	return fechita;
 	}catch(e){ 		 	
 		return fechita.substring(0, 10);
 	}
};

/**
 * Transforma una cadena en formato yyyy-mm-dd HH:mm:ss a un objeto Date
 * @param {String} dateString La cadena de fecha
 * @return {Date} La fecha transformada
 */
function toDate(dateString){
	var fr = new Date();
	try{		
		//2011-02-32 00:00:00
		if(dateString instanceof Date){
			fr = dateString;
		}else{
			var fecha = dateString.substring(0,10);
			var hora = dateString.substring(11);		
			var fa = fecha.split("-");
			var ha = hora.split(":");			
			fr = new Date(fa[0],fa[1]-1,fa[2], ha[0], ha[1], ha[2]);
			//logInfo(dateString + " ==> " + fr.toString("yyyy-MM-dd HH:mm:ss"));
		}		
	}catch(e){
		//alert("toDate(): " + e);
		fr = null;
	}
	return fr;
};