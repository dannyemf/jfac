if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}

/**
 * Redondea un numero
 * @param {Number} fractionDigits Numero de decimales a considerar
 * @return {Number} El numero formateado 
 */
Number.prototype.round = function(fractionDigits){
	var v = 0; 
	try {
		fractionDigits = fractionDigits ? fractionDigits : 2; 
		var fm = {aSep:'', aDec:'.', mDec:fractionDigits};	
		v = $j.fn.autoNumeric.Format('id',this,fm );
		if(isNaN(v)){ 
			v = 0;
		}else{
			v = v * 1;
		}		
	} catch (e) {
		alert(e);
	}
	return v;
};

/**
 * Redondea un numero
 * @param {Number} fractionDigits Numero de decimales a considerar
 * @return {String} El numero formateado 
 */
Number.prototype.format = function(fractionDigits){
	var v = "";
	try {
		fractionDigits = fractionDigits ? fractionDigits : 2; 
		var fm = {aSep:'', aDec:'.', mDec:fractionDigits};	
		var v = $j.fn.autoNumeric.Format('id',this,fm );
		if(isNaN(v)) v = "0";		
	} catch (e) {
	}
	return v;
};


function ArrayUtil(){};
ArrayUtil.prototype=new Object();

/**
 * Retorna el primer elemento que coincida con la clave y valor
 * @param {Array} array
 * @param {String} key
 * @param {Object} value
 * @return {Object}
 */
ArrayUtil.singleKey = function(array, key, value){
	for(var k = 0; k < array.length; k++){
		var model = array[k];
		if(key != null){			
			if(eval('model.'+key +'==value')){
				return model;
			}
		}else{
			if(model == value) return model;
		}
	}
	return null;
};

/**
 * Retorna el primer elemento que coincida con el valor
 * @param {Array} array
 * @param {Object} value
 * @return {Object}
 */
ArrayUtil.singleValue = function(array, value){
	for(var k = 0; k < array.length; k++){
		var model = array[k];		
		if(model == value) return model;		
	}
	return null;
};

/**
 * Retorna un Array con los elementos donde coincida el key con value
 * @param {Array} array
 * @param {String} key
 * @param {Object} value
 * @return {Array}
 */
ArrayUtil.whereKey = function(array, key, value){
	var lst = new Array();
	for(var k = 0; k < array.length; k++){
		var model = array[k];
		if(key != null){			
			if(eval('model.'+key +'==value')){
				lst.push(model);
			}
		}else{
			if(model == value) lst.push(model);;
		}
	}
	return lst;
};