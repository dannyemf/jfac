window.addEventListener("load", function(e) { 
	window.alert = alertTitle;
	window.alertTitle = alertTitle;
	
	window.confirm = confirmTitle;
	window.confirmTitle = confirmTitle;
	
	window.$Xul = fn;
	window.validar = validar;	
}, true);


/**
 * function $()
 * @param {String} id
 * @return {Element}
 */
Window.prototype.$Xul = function(id){return new Element();};

/**
 * function validar()
 * @return {boolean}
 */
Window.prototype.validar = function(){return true;};

Window.prototype.elementos = new Array();

Window.prototype.arguments = new Array();

var $Xul = fn;
function fn(id){
	var elm = document.getElementById(""+id);
	try {			
		if(elm != null){
			var existe = false;
			var tag = elm.tagName;
			
			for ( var i = 0; i < window.elementos.length ;i++) {
				if(window.elementos[i].getAttribute("id") == id){
					existe = true;
				}
			}
			if(existe == false){
				if(tag == 'textbox'){					
					elm.addEventListener("change", function(){this.validate();}, true);
				}else{
					if(tag == 'menulist'){
						elm.addEventListener("select", function(){this.validate();}, true);
					}
				}
				
				//elm.addEventListener("command", function(){this.validate();}, true);
				window.elementos.push(elm);
				
				var text = elm.getAttribute("text");
				if(text == 'int'){
					elm.numeric('');
					//if(elm.getAttribute("type") == "");
					//elm.setAttribute("type", "number");
					//elm.setAttribute("type", "number");
				}else{
					if(text == 'double'){
						elm.numeric('.');
						//elm.setAttribute("decimalplaces", 3);
						//elm.setAttribute("hidespinbuttons", true);												
					}else{
						if(text == 'factura'){
							elm.addEventListener('input',function(e){
								var cad = "" + this.value;
								var p = this.selectionStart;
								
								cad=cad.replace(/\D/g,""); 
								cad=cad.replace(/^(\d{3})(\d)/,"$1-$2"); 
								cad=cad.replace(/^(\d{3})\-(\d{3})(\d)/,"$1-$2-$3");
								
								
								try {
									if(cad.substring(p-1, p) == '-' ){
										p = p + 1;
									} 
								} catch (e) {}
								
								if( cad.length  > 15){
				    				cad =  cad.substring(0,15);
				    			}
								
								this.value = cad;
								this.selectionStart = p;
								this.selectionEnd = p;
							},true);
						}
					}
				}
			}
		}else{
			logInfo("$Xul(" + id +"): No se ha encontrado el elemento");
		}
	} catch (e) {
		alert(e);
	}
	return elm;
};

function alertTitle(mensaje, titulo){
	titulo = (titulo == null ? 'Alerta' : titulo);
	mensaje = (mensaje == null ? 'null' : mensaje);
	var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);     
	prompts.alert(null, titulo, mensaje);
};

function confirmTitle(mensaje, titulo){
	titulo = (titulo == null ? 'Confirmar' : titulo);
	mensaje = (mensaje == null ? 'null' : mensaje);
	var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);     
	return prompts.confirm(null, titulo, mensaje);
	// nsIDOMWindow
}

function validarEmail(elm){
	var str = ""+elm;
	var re = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
	var done = re.test(str);
	return done;
}

function validarUrl(elm){
	var str = ""+elm;
	var re = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
	var done = re.test(str);
	return done;
}


function validarFactura(elm){
	var str = elem;
	var re = /^[\w-]+(\.[\w-]+)*-([\w-]+\.)+[a-zA-Z]{2,7}$/;
	var done = str.match(re);
	done= !(done==null);
	return done;
}



/**
 * Fija el valor al atributo indicado
 * 
 * @param name Nombre del atributo
 * @param value Valor del atributo
 * @return void en set y valor en get
 */
Element.prototype.attr = function(name, value){
	//get
	if(value == null){
		return this.getAttribute(name);
	}
	this.setAttribute(name, value);
};

Element.prototype.remove = function(){
	try {
		this.parentNode.removeChild(this);
	} catch (e) {}
};


Element.prototype.isNumeric = function(){
	var n = this.getAttribute("text");
	if(n=='double' || n=='int'){
		return true;
	}
};

/**
 * Fija el value de un elemento si se indica el valor, de lo contrario retorna el valor
 * @param value
 * @return
 */
Element.prototype.val = function(valor){
	if(valor == null){
		var v = this.value;
		
		if(this.isNumeric()){
			if(isNaN(v)){
				v = 0;
			}
			v = v * 1;
		}
		
		return v;
	}
	
	if(this.nodeName == 'datepicker'){
		try {
			this.dateValue = new Date(valor.getFullYear(), valor.getMonth(), valor.getDate());
		} catch (e) {
			alert('$Xul('+this.id+').val('+valor+')' + e);
		}
		
	}else{	
		this.value = valor;
	}
	
	try {
		this.change();
	} catch (e) {}
	
	try {
		// fija el valor en el objeto bind
		if(this.objeto){
			eval("this.objeto." + this.atributo + " = valor;");
		}
	} catch (e) {
		logInfo("bind.val('"+valor+"'): " + e);
	}
};

Element.prototype.disable = function() {
	this.setAttribute('disabled', true);	
};

Element.prototype.enable = function() {
	this.removeAttribute('disabled');	
};

Element.prototype.hide = function() {
	this.style.display = 'none';
};
 
Element.prototype.show = function() {
	this.style.display = 'block';
};
 
Element.prototype.conceal = function() {
	this.style.visibility = 'hidden';
};
 
Element.prototype.reveal = function() {
	this.style.visibility = 'visible';
};

Element.prototype.addEvent = function(tipo, evento, init){
	
};

/*Element.prototype.getSelectedItem = function(){
	if(this.lista){
		return this.lista[this.selectedIndex];
	}
	return null;
};*/

Element.prototype.fillComboBox = function(lista, value, labels, nullLabel, nullValue){		
	try {
		if(this.childNodes){
			this.removeChild(this.childNodes[0]);
		}
		this.lista = lista;
	} catch (e) {}
	try {
		if(lista != 'undefined'){
			
			if(nullLabel){
				this.appendItem ( nullLabel , (nullValue ? nullValue : null), '');
			}
			
			for(var i = 0; i< lista.length; i++){
				var val = lista[i][value];
				
				var lbl = "";
				if(labels instanceof String){
					lbl = lista[i][labels];				
				}else{
					if(labels instanceof Array){
						for(var l = 0; l < labels.length; l++){
							lbl += lista[i][labels[l]];
							if(l + 1 < labels.length) lbl += " - ";						
						}
					}else{
						throw new Error("Labels no soportado");
					}
				}								
				
				this.appendItem ( lbl , val , '');
			}
		}
	} catch (e) {
		alert("ComboBox(): " + e);
	}
};

Element.prototype.addClass = function(clase){
	var clas = this.getAttribute("class");
	this.setAttribute("class", clas + " " + clase);
};

Element.prototype.removeClass = function(clase){
	var clas = this.getAttribute("class");
	this.setAttribute("class", clas.replace(clase, ""));
};

Element.prototype.getValidationMessage = function(){
	var id = this.attr("id");
	var validators = document.getElementsByTagName("validation");
	for ( var i = 0; i < validators.length; i++) {
		var v = validators.item(i);
		if(v.getAttribute('for') == id){
			return v;
		}
	}
	return null;
};

Element.prototype.addValidationError = function(label){
	try {
		var lbl = this.getValidationMessage();
		
		this.addClass("error");
		if(lbl != null){
			if(lbl.value.length == 0){
				lbl.value = label;
			}
		}
	} catch (exr) {
		alert("addValidationError(): " + exr);
	}
};

Element.prototype.removeValidationError = function(){
	try {
		this.removeClass("error");
		var elm = this.getValidationMessage();
		if(elm != null){
			elm.value = '';
		}
	} catch (exr) {
		alert("removeValidationError(): " + exr);
	}
};

Element.prototype.validate = function(){
	try {
		var n = this;
		var b = true;
		var tag = n.tagName;
		var id = n.getAttribute("id");
		var val = "";
		if(tag=='textbox'){
			val = this.value.trim();					
		}else{
			if(tag=='checkbox'){
				val = this.checked;
			}else{
				if(tag=='menulist'){
					val = this.getAttribute('value');
				}
			}
		}
	
		if(tag == "textbox" || tag == "checkbox" || tag == "menulist"){
			
			n.removeValidationError();
			
			var required = n.attr("required");
			var maxlength = n.attr("maxlength");
			var minlength = n.attr("minlength");
			var mail = n.attr("mail");
			var ruc = n.attr("ruc");
			var cedula = n.attr("cedula");
			var max = n.attr("max"); // max num
			var min = n.attr("min"); // min num
			var may = n.attr("may"); // max num
			var men = n.attr("men"); // min num
			var range = n.attr("range"); // rango 0..-9..
			var text = n.attr("text"); // int o double					
			
			if(text){				
			}
			
			if(required == 'true'){
				if(val.length == 0){
					n.addValidationError("Campo requerido");
					b = false;
				}
			}
			 
			if(maxlength != ''){
				if(val.length > (maxlength * 1)){
					n.addValidationError("Longitud máxima de " + maxlength);
					b = false;
				}
			}
			
			if(minlength != ''){
				if(val.length < minlength){
					n.addValidationError("Longitud mínima de " + minlength);
					b = false;
				}
			}
			
			if(mail = ''){
				if (val.length > 0){
					var va = validarEmail(val);
					if(va == false){
						n.addValidationError("Ingrese un correo válido");
						b = false;
					}
				}
			}
			
			if(cedula == 'true'){
				var v = ValidarDocumento(val); 
				if(v.IsValid==false){
					n.addValidationError(v.Message);
					b = false;
				}
			}
			
			if(ruc != ''){
				var v = isRucValido(ruc);
				if(v==false){
					n.addValidationError("Ingrese un ruc válido");
					b = false;
				}
			}
			
			if(text == 'factura'){
				if(val.length != 15){
					n.addValidationError("Ingrese el número de factura");
					b = false;
				}
			}
			
			if(min){
				if(isNaN(min) == false){
					if(isNaN(val) || val*1 < min*1){
						n.addValidationError("El valor mínimo acpetado es " + min);
						b = false;
					}
				}
			}
			
			if(max){
				if(isNaN(max) == false){
					if(isNaN(val) || val*1 > max*1){
						n.addValidationError("El valor máximo acpetado es " + max);
						b = false;
					}
				}
			}
			
			if(may){
				if(isNaN(may) == false){
					if(isNaN(val) || val*1 <= may*1){
						n.addValidationError("El valor debe ser mayor a " + may);
						b = false;
					}
				}
			}
			
			if(men){
				if(isNaN(men) == false){
					if(isNaN(val) || val*1 >= men*1){
						n.addValidationError("El valor debe ser mayor a " + men);
						b = false;
					}
				}
			}
		}
		return b;
	
	} catch (e) {
		alert("validate(" + this.attr("id") + "): " + e);
	}
	return false;
};

/**
 * Liga un editor (Caja de Texto, ComboBox, etc) a la propiedad de un objeto,
 * es decir si cambia el valor del componente cambiar� tambien en el modelo.
 * 
 * @param objeto El objeto a observar
 * @param atributo El atributo sobre el que se afecta los cambios
 * @return
 */
Element.prototype.bind = function(objeto, atributo, clase){
	try {
		this.objeto = objeto;
		this.atributo = atributo;
		this.clase = clase;
	} catch (e) {
		alert("Element.bind(" + objeto + "," + atributo +"): "+e);
		return;
	}
	
	// texto
	if(this.tagName == "textbox"){
		try {
			this.value = eval("objeto." + atributo);
		} catch (e) {
			alert("Element.bind().setValue: " + e);
		}
		/*this.addEventListener('change', function(e){
			try {				
				eval("this.objeto." + this.atributo + " = this.value;");
			} catch (e) {
				alert("Element.bind(): " + e);
			}
		}, true);*/
		this.addEventListener('input', function(e){
			try {	
				var text = this.getAttribute('text');				
				var v = this.value;
				
				if(text && text == 'int' || text == 'double'){
					if(isNaN(v)) v = 0;
					v = (v * 1);
					eval("this.objeto." + this.atributo + " = v;");
				}else{
					eval("this.objeto." + this.atributo + " = v;");
				}
				
			} catch (e) {
				alert("Element.bind(): " + e);
			}
		}, true);
	}
	
	//fechas
	if(this.tagName == "datepicker"){
		var x = eval('objeto.' + atributo);
		if(x == null){
			x = new Date();
		}
		if (typeof x == 'string'){
			var s = x.substring(0, 10).split('-');
			x = new Date(s[0], s[1] - 1, s[2]);
		}else{
			if (typeof x == 'object'){
				x = x;
			}else{
				x = new Date();
			}
		}
		
		try {			
			this.dateValue = new Date(x.getFullYear(), x.getMonth(), x.getDate());
			eval("this.objeto." + this.atributo + " = (this.dateValue);");
		} catch (e) {
			alert("Element.bind(fecha): " + e);
		}
		
		this.addEventListener('change', function(e){
			try {
				eval("this.objeto." + this.atributo + " = (this.dateValue);");
			} catch (e) {
				alert("Element.bind(change): " + e);
			}
		}, true);
	}
	
	//combo
	if(this.tagName == "menulist"){
		try {
			var valor = eval('objeto.' + this.atributo);			
			if(!valor || valor == '-1'){
				this.selectedIndex = 0;
			}else{				
				this.value = valor;
			}
		} catch (e) {
			alert("MenuList.value=" + e);
		}
		this.addEventListener('select', function(e){
			try {
				var attrs = this.atributo.split('.');				
				if(attrs.length > 1){
					if(this.clase){
						var prt = attrs[0];
						this.objeto[prt] = eval('new ' + this.clase.classname +'();');
					}else{
						throw new Error('Element.bind(select): No se ha definido la clase para ' + this.atributo );
					}
				}				
				eval('this.objeto.' + this.atributo + '= this.value;');
			} catch (e) {
				alert("Element.bind(): " + e);
			}
		}, true);
	}
	
	if(this.tagName == "checkbox"){
		try {
			var v = eval('objeto.' + atributo);
			if(v == true || v == 1){
				v = true;				
			}else{
				v = false;
			}
			this.checked = v;
			eval('objeto.' + atributo + " = v;");
		} catch (e) {
			alert("Checkbox.Expresion(): " + e);
		}
		
		this.addEventListener('command', function(e){
			try {
				try{					
					eval('this.objeto.' + this.atributo + '= this.checked;');
				}catch(e){
					alert("ComboBox.Expresion.change(): " + e);
				}
			} catch (e) {
				alert("Element.bind(): " + e);
			}
		}, true);
		
		
	}
};



var validar = function(){
	var b = true;
	var f = false;
	try {
		var nodos = window.elementos;
		for (var i = 0; i < nodos.length; i++) {
			var n = nodos[i];
			var tag = n.tagName;
			if(tag == "textbox" || tag == "checkbox" || tag == "menulist"){
				var bf = n.validate();
				if(bf == false){
					b = false;
				}
				if(b == false){
					if(f == false){
						n.focus();
						f = true;
					}
				}
			}
		}
	} catch (e) {
		// TODO: handle exception
		alert("validar: " + e);
	}
	return b;
};


function toDateC (fecha){
	try{
		fecha = fecha.substring(0,10);		
		var fechita = fecha.split("-");
		return new Date(fechita[0],fechita[1]-1,fechita[2]);
	}catch(e){
		alert("transformar_cadena_fecha" + e);	
	}
};

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}

Math.roundTo = function(valor, decimales){
	var v = 0;
	try {
		valor = valor ? ""+valor : "0";
		var fm = {aSep:'', aDec:'.', mDec:decimales};	
		v = $j.fn.autoNumeric.Format('id', ""+valor,fm );
		if(isNaN(v)) v = 0;
		else v = v * 1;
	} catch (e) {
		v = 0;
	}
	return v;
};



/**
 * Obtiene el primer elemento donde que cumpla la expresion indicada
 * Para evaluar la expresion se debe utilizar model como si se tratase del item 
 * 
 * @param {String} expresion
 * @return {Object}
 */
function firstIn(array, expresion){
	for(var i = 0; i < array.length; i++){
		var item = array[i];
		try {
			if(eval(expresion)){
				return item;
			}
		} catch (e) {}
	}
	return null;
};

function showWait(e){	
	try {				
		var features = 'chrome,dependent,dialog,centerscreen';
		var inType = 'jfac:wait';
		var uri = 'chrome://jfac/content/vista/main/Esperar.xul';		
		var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
		var windowManagerInterface = windowManager.QueryInterface(Components.interfaces.nsIWindowMediator);
		var topWindow = windowManagerInterface.getMostRecentWindow(inType);
		if (topWindow){
			topWindow.focus();
		}else{
		    //window.open(uri, "_blank", features);
			window.openDialog(uri, "esperar", features, this);
		}
	} catch (e) {
		alert(e);
	}
};

function closeWait(){
	try {						
		var inType = 'jfac:wait';
		var uri = 'chrome://jfac/content/vista/main/Esperar.xul';		
		var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
		var windowManagerInterface = windowManager.QueryInterface(Components.interfaces.nsIWindowMediator);
		var topWindow = windowManagerInterface.getMostRecentWindow(inType);
		if (topWindow){
			topWindow.close();
		}
	} catch (e) {
		alert(e);
	}
};

function getMainWindow(){
	try {
		var inType = 'jfac:main';		
		var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
		var windowManagerInterface = windowManager.QueryInterface(Components.interfaces.nsIWindowMediator);
		var topWindow = windowManagerInterface.getMostRecentWindow(inType);
		if (topWindow){
			return topWindow;
		}
	} catch (e) {
		alert(e);
	}
	return null;
};