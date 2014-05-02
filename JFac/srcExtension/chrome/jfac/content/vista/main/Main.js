var contexto = null;

window.onload = function () {
	try {
		contexto = new Context();
		var main = new Main(true);
		
		self = main;
		contexto.main = main;
		window.main = main;
		window.contexto = contexto;
		
		main.inicializarBasico();
		
		var con = contexto.testConection();
		if(con == true){		
			contexto.init();		
			main.inicializar();
		}else{
			alert('No se ha podido conectar con el servidor.\nVerifique la conexión, cierre esta aplicación y vuelva a intentar');
		}
		
	} catch (e) {
		alert("init main: " + e);
	}
};

window.onunload = function () {
	self.cerrar();
};

var Main = function(init){
	if(init){
		this.usuario = null;
		this.iframe = $Xul('ifmContenido');
		
		//this.menuBar = document.getElementById("menuBar");
		this.controlLateral = document.getElementById('boxControlesLaterales');
		this.prmDao = new ParametroDao();
		this.locDao = new LocalDao();
		this.listaLocales = new Array();
		this.winOpens = new Array();
		this.titulo = "";
	}
};

Main.prototype = new Object();

Main.prototype.inicializarBasico = function () {
	$Xul("btnFullScreen").addEventListener( 'command', this.cmdFullScreen, true);
	$Xul("btnLimpiar").addEventListener( 'command', this.cmdLimpiar, true);
	$Xul("btnLogOff").addEventListener( 'command', this.logoff, true);
	$Xul("btnErrorConsole").addEventListener( 'command', this.showConsole, true);		
	$Xul('btnPrefsExte').hide();
	
	//preferencias basicas
	$Xul('btnPrefsBase').addEventListener('command', function(e){
		try {
			var v = "chrome://jfac/content/vista/main/OpcionesBase.xul";
			var features = "chrome,maximized,centerscreen, resizable";
			var w = window.openDialog(v, "opciones", features);
		} catch (e) {alert(e);}
	}, true);
};

Main.prototype.inicializar = function () {
	try {
		this.titulo = contexto.nombreSistema + " - " + contexto.nombreEmpresa;
		document.title = this.titulo;	
		
		// preferencias extendidas
		$Xul('btnPrefsExte').addEventListener('command', function(e){
			try {
				var v = "chrome://jfac/content/vista/main/OpcionesExtendidas.xul";
				var features = "chrome,maximized,centerscreen, resizable";
				var w = window.openDialog(v, "opciones", features);
			} catch (e) {alert(e);}
		}, true);
	
		/*$Xul("btnPhpSes").addEventListener('command', function(e){
			try {
				self.db.verificarConexion();
			} catch (e) {alert(e);}
		}, true);*/
		
		$Xul('txtAbrirControl').addEventListener('keypress', function(e){
			if(e.keyCode == 13){self.abrirPorCodigo(this.value);}
		}, true);
		
			
				
		$Xul('ifmContenido').attr('src','chrome://jfac/content/vista/main/Login.xul');
	} catch (e) {
		throw e;
	}
};

Main.prototype.login=function(us){
	contexto.usuario = us;
	contexto.puntoFacturacion = us.punto;
	contexto.local = us.local;
	contexto.periodo = new PeriodoContableDao().obtenerPeriodoActivo(us.local);
	
	if(us.local){	
		document.title = this.titulo + " (" + us.local.codigo + " - " + us.local.nombre + ")";
	}else{
		document.title = this.titulo + " ( -- SIN LOCAL -- ) ";
	}
	
	this.usuario = us;
	this.cargarMenu();
	
	this.pageTo(this.iframe, 'main/Vacio.xul');
	this.cargarControles();
	
	this.cargarLoteCaja();
};

Main.prototype.cargarLoteCaja=function(){
	var us = contexto.usuario;
	if(us.punto != null && us.punto.id > 0){		
		var loteCaja = new LoteCajaDao().obtenerLoteCajaAbierto(us, us.punto);
		if(loteCaja.id == -1){
			var features = "chrome,modal,dependent=true,dialog,resizable,centerscreen,closeable=false";
			window.openDialog("chrome://jfac/content/vista/venta/AbrirCaja.xul", "ixxi", features, loteCaja);		
		}
		contexto.loteCaja = loteCaja;		
	}else{
		contexto.loteCaja = null;
	}
};

Main.prototype.showConsole=function(e){	
	try {				
		var features = null;
		var inType = 'global:console';
		var uri = 'chrome://global/content/console.xul';
		
		var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
		var windowManagerInterface = windowManager.QueryInterface(Components.interfaces.nsIWindowMediator);
		var topWindow = windowManagerInterface.getMostRecentWindow(inType);
		if (topWindow)
			topWindow.focus();
		else if (features)
		    window.open(uri, "_blank", features);
		else
			window.open(uri, "_blank", "chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar");
	} catch (e) {alert(e);}
};

Main.prototype.logoff=function(e){
	var c = confirmTitle("Desea cerrar la sesión?","Cerrar");
	if(c){
		self.reiniciar();
	}
};

Main.prototype.reiniciar=function(){
	// Cerramos la aplicación
	var appStartup = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);
	appStartup.quit(Components.interfaces.nsIAppStartup.eRestart | Components.interfaces.nsIAppStartup.eAttemptQuit);
};

Main.prototype.cerrar=function(){
	window.close();
	for(var i = 0; i < self.winOpens.length ; i++){
		var w = self.winOpens[i];
		try {
			w.close();
		} catch (e) {
		}
	}	
	// Cerramos la aplicación
	//var appStartup = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);
	//appStartup.quit(Components.interfaces.nsIAppStartup.eAttemptQuit);
};

Main.prototype.cargarControles=function(){
	try {
		$Xul('btnPrefsExte').show();
		$Xul('btnPrefsBase').hide();
		
		$Xul('lblUsuario').attr("label","Bienvenido [" + this.usuario.nombres + " " + this.usuario.apellidos +"]");
		$Xul('toolBarInf').hidden = false;			
	} catch (e) {
		alert("Main.cargarControles(): " + e);
	}
};

Main.prototype.cargarMenu=function(){
	try {
		var dao = new OpcionDao();
		var opciones = dao.obtnerMenu(this.usuario);
		window.opciones = opciones;
		var menu = new Menu(this, this.controlLateral, opciones);		
	} catch (e) {
		alert("Main.cargarMenu(): " + e);
	}
};

Main.prototype.cmdFullScreen=function(){
	window.fullScreen = ! window.fullScreen;
};

Main.prototype.cmdLimpiar=function(){
	self.pageTo(self.iframe, 'main/Vacio.xul');
};

Main.prototype.abrirPorCodigo = function(codigoVentana){
	if(window.contexto != null && window.contexto.usuario != null && window.contexto.usuario.id > 0){
		var dao = new OpcionDao();
		var opp = dao.obtnerVentana(window.contexto.usuario, codigoVentana);
		if(opp != null){
			if(opp.MODULO != null && opp.MODULO.length > 0){
				if(opp.IS_NUEVA_VENTANA == 1){
					self.abrir(opp.MODULO);
				}else{
					self.pageTo(self.iframe, opp.MODULO);
				}
			}
		}
	}else{
		alert('Necesita iniciar sesión para usar este control.');
	}
	
	$Xul('txtAbrirControl').select();
};

Main.prototype.abrir = function(vista){
	try {
		var v = "chrome://jfac/content/vista/" + vista;
		var features = "chrome,maximized,centerscreen, resizable";

		for ( var i = 0; i < this.winOpens.length; i++) {
			var wm = this.winOpens[i];
			try {
				if(wm.location==v){
					wm.focus();
					return;
				}
			} catch (e) {}
		}
		
		var w = window.open(v, vista, features, false);
		this.winOpens.push(w);
		w.contexto = contexto;
	} catch (e) {
		alert(e);
	}
};

Main.prototype.pageTo = function (iframe, src) {
	try{
		var pref = "chrome://jfac/content/vista/";
		
		if(src.length == 0){
			pref = "";
		}else{
			pref = "chrome://jfac/content/vista/";
		}
		
		var ruta = pref  + src;
		var frm = null;
		
		if(iframe instanceof String){
			frm = $Xul(iframe);
		}else{
			frm = iframe;
		}		
		
		frm.setAttribute('src', ruta);
		window.frames['ifmContenido'].contexto = contexto;		
	}catch(e){
		alert("Form.pageTo(): " + e);
	}
};
