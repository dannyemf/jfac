/**
 * Carga las preferncias en el objeto printsettings
 * Usado en la impresion
 * 
 * @param {PrintSettings} settings
 * @param {String} prefijo
 * @return {void}
 */
function loadPrintSetting (settings, prefijo){			
	try {
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("jfac."+prefijo+".");
		prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
		
		settings.shrinkToFit 	= !prefs.getBoolPref("adjust_width");		
	    settings.marginTop 		= prefs.getCharPref("marginTop") * 1;
	    settings.marginLeft 	= prefs.getCharPref("marginLeft") * 1;
	    settings.marginBottom 	= prefs.getCharPref("marginBottom") * 1;
	    settings.marginRight 	= prefs.getCharPref("marginRight") * 1;
	    
	    settings.printBGColors 	= prefs.getBoolPref("printBGColors");
	    settings.printBGImages 	= prefs.getBoolPref("printBGImages");	    
	    settings.printInColor 	= prefs.getBoolPref("printInColor");
	    settings.printerName 	= prefs.getCharPref("printerName");
	    
	    settings.footerStrLeft 	= prefs.getCharPref("footerStrLeft");
	    settings.footerStrRight	= prefs.getCharPref("footerStrRight");
	    settings.headerStrCenter= prefs.getCharPref("headerStrCenter");
	    settings.headerStrLeft	= prefs.getCharPref("headerStrLeft");
	    settings.headerStrRight	= prefs.getCharPref("headerStrRight");	    
	    
	    //settings.title			= prefs.getCharPref("title");
	    settings.numCopies 		= prefs.getIntPref("numCopies");
	    //settings.scaling		= 100.0;	    
	    //settings.paperData=null;
	    
	    settings.paperSizeType	= settings.kPaperSizeDefined;
		settings.paperSizeUnit	= settings.kPaperSizeMillimeters;	
		
	    //settings.paperWidth 	= prefs.getCharPref("paperWidth") * 1;
	    //settings.paperHeight 	= prefs.getCharPref("paperHeight") * 1;
	    settings.paperName 		= prefs.getCharPref("paperName");	    	   
	    
		
	    
		//portrait = vertical o landscape = horizontal
	    var aOrientation = prefs.getCharPref("orientation"); 
	    var orientValue = (aOrientation == "portrait") ? settings.kPortraitOrientation : settings.kLandscapeOrientation;
	    if (settings.orientation != orientValue){
	    	settings.orientation = orientValue;
	    }
	} catch (e) {
		alert("loadPrintSetting() : "+e);
	}
}

/**
 * Exporta un reporte a pdf
 * @param {String} frameId
 * @param {String} nombreArchivo
 * @param {String} tituloVentana
 * @return {Boolean}
 */
function exportarReportePdf(frameId, nombreArchivo, tituloVentana){
	try {
		var doc = document.getElementById(frameId);
		
		var nsIFilePicker = Components.interfaces.nsIFilePicker;
	    var picker = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	    picker.init(doc.contentWindow, tituloVentana, nsIFilePicker.modeSave);
	    picker.appendFilter("PDF", "*.pdf");
	    picker.defaultExtension = "pdf";
	    picker.defaultString = nombreArchivo;
	    picker.show();	    
	    
	    var webBrowserPrint = doc.contentWindow.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebBrowserPrint);
	    var PSSVC = Components.classes["@mozilla.org/gfx/printsettings-service;1"].getService(Components.interfaces.nsIPrintSettingsService);
	    var printSettings = PSSVC.newPrintSettings;
	    
	    //loadPrintSetting(printSettings, "reporte");
	    printSettings.printBGColors   = true;
	    printSettings.printBGImages   = true;	    	    
        printSettings.footerStrCenter = '';
        printSettings.footerStrLeft   = '';
        printSettings.footerStrRight  = '';
        printSettings.headerStrCenter = '';
        printSettings.headerStrLeft   = '';
        printSettings.headerStrRight  = '';
	    
	    
	    printSettings.printToFile = true;
	    printSettings.toFileName  = picker.file.path;
	    printSettings.printSilent = true;
	    printSettings.outputFormat = Components.interfaces.nsIPrintSettings.kOutputFormatPDF;	    	   
	    webBrowserPrint.print(printSettings,null);
	    return true;
	} catch (e) {
		//alert(e);
		logInfo(e);
		return false;
	}
}

/**
 * Imprimie un reporte usando las preferencias [reporte]
 * @param {String} frameId
 * @return {Boolean}
 */
function imprimirReporte(frameId){
	try {		
		var doc = document.getElementById(frameId);
	    var req = doc.contentWindow.QueryInterface(Components.interfaces.nsIInterfaceRequestor);
	    var wbprint = req.getInterface(Components.interfaces.nsIWebBrowserPrint);
	    //var settings = PrintUtils.getPrintSettings();
	    
	    var PSSVC = Components.classes["@mozilla.org/gfx/printsettings-service;1"].getService(Components.interfaces.nsIPrintSettingsService);
	    var settings = PSSVC.newPrintSettings;
	    
	    loadPrintSetting(settings, "reporte");
	    wbprint.print(settings, null);
	    
	    return true;
	} catch (e) {
		logInfo(e);
		return false;
	}	
}

/**
 * Imprimie el frame indicado y carga la preferencias
 * @param {String} frameId
 * @param {String} prefs
 * @param {String} titulo
 * @return {Boolean}
 */
function imprimir(frameId, prefs, titulo){
	try {		
		var doc = document.getElementById(frameId);
	    var req = doc.contentWindow.QueryInterface(Components.interfaces.nsIInterfaceRequestor);
	    var wbprint = req.getInterface(Components.interfaces.nsIWebBrowserPrint);
	    //var settings = PrintUtils.getPrintSettings();
	    
	    var PSSVC = Components.classes["@mozilla.org/gfx/printsettings-service;1"].getService(Components.interfaces.nsIPrintSettingsService);
	    var settings = PSSVC.newPrintSettings;
	    
	    settings.title = titulo ? titulo : 'Impresion';
	    
	    loadPrintSetting(settings, prefs);
	    wbprint.print(settings, null);
	    
	    return true;
	} catch (e) {
		logInfo(e);
		return false;
	}	
}