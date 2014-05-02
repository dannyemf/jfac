var EXPORTED_SYMBOLS = ["Usuario","foo", "bar", "dummy"];
 
function Usuario() {
	this.nombres = 'nombres';
	this.apellidos = 'apellidos';
}
Usuario.prototype = new Object();

Usuario.prototype.test = function(){
	return this.nombres + ' ' + this.apellidos;
};



// Las funciones se importan y se puede crear nuevas instancias de ellas
// Cada instancia es nueva
function foo(){
	return 'foo';
}

//Para compartir entres scopes se utiliza esta forma
// La variable es compartida entre scopes
var bar = {
		name : "bar",
		size : 3,
		dummy: "dummy_0"
};

// La variable no se comparte entre scopes
// Se intancia cada vez
var dummy = "dummy_0";