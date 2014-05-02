/**
 * Mensaje de validacion. Por defecto el mensaje es vacío y IsValid es true
 * 
 * @param {String} message El mensaje de validacion. IsInvalid = false cuando recibe un mensaje no nulo.
 */
function ValidationReturn(message){
	this.IsValid = true;
	this.Message = '';
	if(message != null){
		this.Message = message;
		this.IsValid = false;
	}
};
ValidationReturn.prototype = new Object();

/**
 * Valida una cedula, ruc o pasaporte ya sea de una persona natural o juridica
 * @param {String} numero El numero de docuemtno a validar
 * @return {ValidationReturn}
 */
function ValidarDocumento (numero) {
	
	var suma = 0;
	var residuo = 0;
	var pri = false;
	var pub = false;
	var nat = false;
	var numeroProvincias = 22;
	var modulo = 11;
	
	// valido la longitud
	if((numero.length == 10 || numero.length == 13 || numero.length == 14) == false){
		return new ValidationReturn("Ingrese 10, 13 o 14 dígitos");
	}
	
	// Valido que solo sean numeros
	if(isNaN(numero)){
		return new ValidationReturn("Ingrese solo números");
	}
	
	/* Verifico que el campo no contenga letras */
	var valProv = numero.substring(0,2);
	if((valProv > 0 && valProv <= numeroProvincias) == false){
		//El código de la provincia (2 primeros dígitos) es inválido'
		return new ValidationReturn("Dos primeros dígitos son incorrectos");
	}		
				
	/* Aqui almacenamos los digitos de la cedula en variables. */
	var d1 = (numero.substring(0,1));
	var d2 = (numero.substring(1,2));
	var d3 = (numero.substring(2,3));
	var d4 = (numero.substring(3,4));
	var d5 = (numero.substring(4,5));
	var d6 = (numero.substring(5,6));
	var d7 = (numero.substring(6,7));
	var d8 = (numero.substring(7,8));
	var d9 = (numero.substring(8,9));
	var d10 =(numero.substring(9,10));
			
	var p1=0; var p2=0;	var p3=0;var p4=0;var p5=0;var p6=0;var p7=0;var p8=0;var p9=0;
	
	/* El tercer digito es: */
	/* 9 para sociedades privadas y extranjeros */
	/* 6 para sociedades publicas */
	/* menor que 6 (0,1,2,3,4,5) para personas naturales */
	
	if (d3==7 || d3==8){
		return new ValidationReturn("El tercer dígito es incorrecto");
	}
	
	/* Solo para personas naturales (modulo 10) */
	if (d3 < 6){
		nat = true;
		p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
		p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
		p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
		p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
		p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
		p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
		p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
		p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
		p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
		modulo = 10;
	}
	/* Solo para sociedades publicas (modulo 11) */
	/* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
	else if(d3 == 6){
		pub = true;
		p1 = d1 * 3;
		p2 = d2 * 2;
		p3 = d3 * 7;
		p4 = d4 * 6;
		p5 = d5 * 5;
		p6 = d6 * 4;
		p7 = d7 * 3;
		p8 = d8 * 2;
		p9 = 0;
	}
	
	/* Solo para entidades privadas (modulo 11) */
	else if(d3 == 9) {
		pri = true;
		p1 = d1 * 4;
		p2 = d2 * 3;
		p3 = d3 * 2;
		p4 = d4 * 7;
		p5 = d5 * 6;
		p6 = d6 * 5;
		p7 = d7 * 4;
		p8 = d8 * 3;
		p9 = d9 * 2;
	}
	
	suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
	residuo = suma % modulo;
	
	/* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
	var digitoVerificador = residuo==0 ? 0: modulo - residuo;
	
	/* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
	if (pub==true){
		if (digitoVerificador != d9){
			return new ValidationReturn("Ruc de empresa pública incorrecto");
		}
		/* El ruc de las empresas del sector publico terminan con 0001*/
		if ( numero.substring(10,13) != "0001" ){
			return new ValidationReturn("Ruc de empresa pública debe terminar en 0001");
		}
	}
	else if(pri == true){
		if (digitoVerificador != d10){
			return new ValidationReturn("Ruc de empresa privada es incorrecto");
		}
		if ( numero.substring(10,12) != "001" ){
			return new ValidationReturn("Ruc de empresa privada debe terminar en 001");
		}
	}
	
	else if(nat == true){
		if (digitoVerificador != d10){
			return new ValidationReturn("Cédula de persona natural incorrecto");
		}
		if (numero.length > 10 && numero.substring(10,12) != "001" ){
			return new ValidationReturn("Ruc de persona natural debe terminar en 001");
		}
	}
	return new ValidationReturn();	
};


