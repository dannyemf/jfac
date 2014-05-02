
function onLoad() {
	try {
		// Query available and selected locales	
		var chromeRegService = Components.classes["@mozilla.org/chrome/chrome-registry;1"].getService();
		var xulChromeReg = chromeRegService.QueryInterface(Components.interfaces.nsIXULChromeRegistry);
		var toolkitChromeReg = chromeRegService.QueryInterface(Components.interfaces.nsIToolkitChromeRegistry);
		
		var selectedLocale = xulChromeReg.getSelectedLocale("jfac");
		var availableLocales = toolkitChromeReg.getLocalesForPackage("jfac");
		
		
		// Render locale menulist
		//const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
		
		var localeCombo = document.getElementById("locale-combo");
		var localePopup = document.getElementById("locale-popup");
		
		var selIndex = 0;
		var i = -1;
		while(availableLocales.hasMore()) {
			i++;
			var locale = availableLocales.getNext();
			
			//var listitem = document.createElementNS(XUL_NS, "menuitem");
			var listitem = document.createElement("menuitem");
			listitem.setAttribute("value", locale);
			listitem.setAttribute("label", locale);
			//listitem.setAttribute("class", "listitem-iconic");
			//listitem.setAttribute("image", "./" + locale + ".png");			
			
			if (locale == selectedLocale) {
				// Is this the current locale?
				//selectedItem = listitem;
				selIndex = i;
			}
			
			localePopup.appendChild(listitem);
		}
		
		// Highlight current locale
		//localeListbox.selectedItem = selectedItem;
		localeCombo.selectedIndex = selIndex;		
	} catch (err) {	
		alert ("Failed to render locale menulist: " + err);	
	}	
}


function changeLocale() {
	try {
		// Which locale did the user select?
		var localeCombo = document.getElementById("locale-combo");
		var newLocale = localeCombo.selectedItem.value;
		
		// Write preferred locale to local user config
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		prefs.setCharPref("general.useragent.locale", newLocale);
		
		// Restart application
		var appStartup = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);
		appStartup.quit(Components.interfaces.nsIAppStartup.eRestart | Components.interfaces.nsIAppStartup.eAttemptQuit);
	} catch(err) {	
		alert("Couldn't change locale: " + err);
	}
}
