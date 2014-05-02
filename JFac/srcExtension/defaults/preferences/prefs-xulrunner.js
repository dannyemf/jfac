
// ==================================== XUL RUNNER ===================================================

// Esta linea es para hacerlo correr con xulrunner
pref("toolkit.defaultChromeURI", "chrome://jfac/content/vista/main/Main.xul");

//Ignora el idioma del sistema operativo como locale por defecto
pref("intl.locale.matchOS", "false");
// Locale por defecto
pref("general.useragent.locale", "es");

//Previene que xulrunner ejecute multiples instancias de la aplicación (singleton) 
pref("toolkit.singletonWindowType", "jfac:main");

// XulRunner debug
pref("browser.dom.window.dump.enabled", true);
pref("javascript.options.showInConsole", true);
pref("javascript.options.strict", true);
pref("nglayout.debug.disable_xul_cache", true);
pref("nglayout.debug.disable_xul_fastload", true);
//XRE_CONSOLE_LOG=/path/to/logfile