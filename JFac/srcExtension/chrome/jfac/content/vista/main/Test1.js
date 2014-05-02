


window.onload = function(){
	
	Components.utils.import("resource://rec/Contexto.js");
	try {
		/*alert(foo());         // displays "foo"
		alert(bar.size + 3);  // displays "6"
		alert(dummy);  */
		
		var f = new Usuario();
		alert(f.nombres);
		alert('nombres test1: '+f.nombres);
		
		alert('olddummy: ' + bar.dummy);
		bar.dummy = bar.dummy + "_2";
		alert('newdummy: ' + bar.dummy);
	} catch (e) {
		alert('error: '+e);
	}


};