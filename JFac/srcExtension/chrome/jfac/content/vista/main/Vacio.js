window.onload = function () {
	new Vacio();
};

function Vacio(){	
	this.inicializar();
};

Vacio.prototype.inicializar = function () {
	try {
		var contexto = getContexto();
		
		document.getElementById("logoSistema").setAttribute('value', contexto.nombreSistema);
		document.getElementById("logoEmpresa").setAttribute('value', contexto.nombreEmpresa);
		/*document.getElementById("test").addEventListener('command', function(){
			var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
			window.openDialog("chrome://jfac/content/vista/main/Test.xul", "test", features);
		}, true);*/
		
	} catch (e) {
		alert(e);
	}
};