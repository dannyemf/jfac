function Expresion(control, prop, model, atr){	
	this.control = control;
	this.propiedad = prop;
	this.modelo = model;
	this.atributo = atr;
	
	try {
		var x = 'this.control.' + prop + ' = this.modelo.' + this.atributo + ';';
		eval(x);
		
		this.control.addEventListener('change', this.change, true);
		this.control.bind = this;
	} catch (e) {
		alert("Expresion(): " + e);
	}	
};

Expresion.prototype = new Object();

Expresion.prototype.change = function(){
	try{
		var x = 'this.bind.modelo.' + this.bind.atributo + '= this.bind.control.value;';
		eval(x);
	}catch(e){
		alert("Expresion.change(): " + e);
	}
};