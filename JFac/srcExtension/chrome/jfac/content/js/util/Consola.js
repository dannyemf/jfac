//Components.utils.reportError(new Error('xxx'));	

function logMensaje(mensaje, nivel){
  var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
  var scriptError = Components.classes["@mozilla.org/scripterror;1"].createInstance(Components.interfaces.nsIScriptError);
  /*
   * aFlags: 
   * nsIScriptError.errorFlag = 0, 
   * nsIScriptError.warningFlag = 1, 
   * nsIScriptError.exceptionFlag = 2 and 
   * nsIScriptError.strictFlag = 4.
   * 
   * aCategory: nsIScriptError.idl
   * 
  */
  var aSourceName = null; 
  var aSourceLine = null; 
  var aLineNumber = null;
  var aColumnNumber = null;
  var aFlags = nivel;// scriptError.warningFlag;
  var aCategory = scriptError.idl;
  scriptError.init(mensaje, aSourceName, aSourceLine, aLineNumber,aColumnNumber, aFlags, aCategory);
  consoleService.logMessage(scriptError);
};

function logInfo(aMessage){
	var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
	consoleService.logStringMessage(aMessage);
};

function logAlerta(aMessage){
	logMensaje(aMessage, 1);
};

function logError(aMessage){
	logMensaje(aMessage, 0);
};

/**
 * Presenta un popup con un mensaje
 * @param {String} titulo
 * @param {String} mensaje
 * @return void
 */
function popup(titulo, mensaje) {
  try {
    Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService).
              showAlertNotification(null, titulo, mensaje, false, '', null);
  } catch(e) {
    // prevents runtime error on platforms that don't implement nsIAlertsService
  }
};