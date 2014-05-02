var w = null;

function runJFac(evt) {	
	var features = "chrome,maximized,centerscreen, resizable";
	var online = navigator.onLine;	
	if(online == false){
		alert("Su navegador está en modo sin conexión.- \Desactive la opción del menú: Archivo-->Trabajar sin conexión");		
		return;
	}
	if(!window.status){
		var bd = new DataBase();
		var estado = bd.verificarConexion();
		 
		if(estado){
			var abrir = w ? w.closed : true;
			if(abrir){
				w = window.open("chrome://jfac/content/vista/main/Main.xul","main", features);
			}else{
				if(w) w.focus();
			}
		}else{
			alert("No se ha podido establecer la conexión con el servidor");
		}
	}
}

function popup(title, text) {  
	try {  
	  Components.classes['@mozilla.org/alerts-service;1'].  
	  getService(Components.interfaces.nsIAlertsService).  
	  showAlertNotification(null, title, text, false, '', null);  
	} catch(e) {  
		// prevents runtime error on platforms that don't implement nsIAlertsService  
	}  
};

function popup(title, msg) {  
    var image = null;  
    var win = Components.classes['@mozilla.org/embedcomp/window-watcher;1'].  
                        getService(Components.interfaces.nsIWindowWatcher).  
                        openWindow(null, 'chrome://global/content/alerts/alert.xul',  
                                    '_blank', 'chrome,titlebar=no,popup=yes', null);  
    win.arguments = [image, title, msg, false, ''];  
  };  