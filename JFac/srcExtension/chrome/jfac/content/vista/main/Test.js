


window.onload = function(){
	
	Components.utils.import("resource://rec/Contexto.js");
	try {
		/*alert(foo());         // displays "foo"
		alert(bar.size + 3);  // displays "6"
		alert(dummy);  */
		
		var f = new Usuario();
		f.nombres = 'new nombre en test';
		alert('nombres test: '+f.nombres);		
		
		alert('olddummy: ' + bar.dummy);
		bar.dummy = bar.dummy + "_1";
		alert('newdummy: ' + bar.dummy);
		
		document.getElementById("test").addEventListener('command', function(){
			var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen";
			window.openDialog("chrome://jfac/content/vista/main/Test1.xul", "test", features);
		}, true);
	} catch (e) {
		alert('error: '+e);
	}


};