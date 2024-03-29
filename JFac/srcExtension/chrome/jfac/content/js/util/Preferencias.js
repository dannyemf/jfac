var Preferencias = {
	prefs: null,
	server: "",
	mostrar_sql: true,
	
	// Initialize the extension
	
	startup: function()
	{
		// Register to receive notifications of preference changes
		
		this.prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("jfac.");
		this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
		this.prefs.addObserver("", this, false);
		
		this.server = this.prefs.getCharPref("server");
		this.mostrar_sql = this.prefs.getBoolPref("mostrar_sql");
		//this.refreshInformation();		
		//window.setInterval(this.refreshInformation, 10*60*1000);
	},
	
	// Clean up after ourselves and save the prefs
	
	shutdown: function()
	{
		this.prefs.removeObserver("", this);
	},
		
	
	// Called when events occur on the preferences
	
	/*observe: function(subject, topic, data)
	{
		if (topic != "nsPref:changed")
		{
			return;
		}

		switch(data)
		{
			case "server":
				this.tickerSymbol = this.prefs.getCharPref("server").toUpperCase();
				this.refreshInformation();
				break;
		}
	},*/
	
	// Switches to watch a different stock, by symbol
	
	setServer: function(newServer){
		this.prefs.setCharPref("server", newServer);
	}
	
	// Refresh the stock information
	
	/*refreshInformation: function()
	{
		var httpRequest = null;
		
		// Because we may be called as a callback, we can't rely on
		// "this" referring to the right object, so we need to reference
		// it by its full name here.
		
		var symbol = StockWatcher.tickerSymbol;
		
		var fullUrl = "http://quote.yahoo.com/d/quotes.csv?f=sl1d1t1c1ohgv&e=.csv&s="
				+ symbol;
		
		function infoReceived()
		{
			var samplePanel = document.getElementById('stockwatcher2');
			var output = httpRequest.responseText;
				
			if (output.length)
			{
				
				// Remove whitespace from the end of the string;
				// this gets rid of the end-of-line characters

				output.replace(/\W*$/, "");				
				
				// Build the tooltip string

				var fieldArray = output.split(",");
				samplePanel.label = symbol + ": " + fieldArray[1];
				samplePanel.tooltipText = "Chg: " + fieldArray[4] + " | " +
						"Open: " + fieldArray[5] + " | " +
						"Low: " + fieldArray[6] + " | " +
						"High: " + fieldArray[7] + " | " +
						"Vol: " + fieldArray[8];
			}
		}
		
		httpRequest = new XMLHttpRequest();
		
		httpRequest.open("GET", fullUrl, true);
		httpRequest.onload = infoReceived;
		httpRequest.send(null);
	}*/
};

// Install load and unload handlers

//window.addEventListener("load", function(e) { Preferencias.startup(); }, false);
//window.addEventListener("unload", function(e) { Preferencias.shutdown(); }, false);