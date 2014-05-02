function Menu(main, control, opciones){
	//this.menuBar = menuBar;
	this.controlLateral = control;
	this.opciones = opciones;
	this.crearMenu();
	this.crearControlesLaterales();
	this.main = main;
};

Menu.prototype.crearMenu = function(){
	var menues = this.obtenerMenues();
	var tree = $Xul('treeMenuCont');	
	$Xul('treeMenu').addEventListener('dblclick', this.eventoTreeMenu, true);	
	
	for(var i = 0; i < menues.length; i++){
		var opp = menues[i];
		var listasub = this.obtenerSubmenues(opp);
		
		/*var menu = document.createElement("menu");
		menu.setAttribute("label", opp.ETIQUETA);
		var popup = document.createElement("menupopup");
		menu.appendChild(popup);
		this.menuBar.appendChild(menu);
		this.crerEvento(menu, opp);*/	
		
		var tri = document.createElement('treeitem');
		tri.setAttribute('container', true);
		
		var tro = document.createElement('treerow');
		tri.appendChild(tro);
		var trc = document.createElement('treecell');
		tro.appendChild(trc);
		trc.setAttribute('label', opp.ETIQUETA);
		tree.appendChild(tri);
		var trch = document.createElement('treechildren');
		trch.setAttribute('open', true);
		tri.appendChild(trch);
		
		this.crearSubMenu(opp, popup, trch);
	}		
};

Menu.prototype.crearSubMenu = function(opcion, control, tree){
	var subs = this.obtenerSubmenues(opcion);
	
	for(var s = 0; s < subs.length; s++){
		var opp = subs[s];
		var lista = this.obtenerSubmenues(opp);
		if(lista.length > 0){
			/*var menu = document.createElement("menu");
			menu.setAttribute("label", opp.ETIQUETA);
			var popup = document.createElement("menupopup");
			menu.appendChild(popup);
			control.appendChild(menu);
			this.crerEvento(menu, opp);*/
			
			var tri = document.createElement('treeitem');
			tri.setAttribute('container', true);
			
			var tro = document.createElement('treerow');
			tri.appendChild(tro);
			var trc = document.createElement('treecell');
			tro.appendChild(trc);
			trc.setAttribute('label', opp.ETIQUETA);
			tree.appendChild(tri);
			var trch = document.createElement('treechildren');
			trch.setAttribute('open', true);
			tri.appendChild(trch);
			
			
			this.crearSubMenu(opp, popup, trch);
		}else{
			/*var menuitem = document.createElement("menuitem");
			menuitem.setAttribute("label", opp.ETIQUETA);
			control.appendChild(menuitem);
			this.crerEvento(menuitem, opp);*/
			
			var tri = document.createElement('treeitem');
			tri.opcion = opp;
			tri.setAttribute('id', "treeitem_men_"+opp.ID_OPCION);						
			
			var tro = document.createElement('treerow');
			tro.setAttribute('id', "treerow_men_"+opp.ID_OPCION);			
			
			tri.appendChild(tro);
			var trc = document.createElement('treecell');
			trc.setAttribute('id', "treecell_men_"+opp.ID_OPCION);			
			
			tro.appendChild(trc);
			trc.setAttribute('label', opp.ETIQUETA);
			tree.appendChild(tri);
		}
	}
};

Menu.prototype.crearControlesLaterales = function(){
	var menues = this.obtenerControlesLaterales();
	for(var i = 0; i < menues.length; i++){
		var opp = menues[i];
		
		var menu = document.createElement("button");		
		menu.attr('style', "margin: 3px; padding: 2px;");
		this.crerEvento(menu, opp);
		
		if(opp.ICONO_LATERAL_CONTROL != null&&opp.ICONO_LATERAL_CONTROL != ""){
			var img = document.createElement("image");
			img.attr('class', opp.ICONO_LATERAL_CONTROL );
			img.attr('style', "width: 32px; height: 32px");			
			menu.appendChild(img);
		}
		
		var label = document.createElement("label");
		menu.appendChild(label);
		label.setAttribute("value", opp.ETIQUETA);
		
		
		this.controlLateral.appendChild(menu);		
	}
};

Menu.prototype.eventoTreeMenu = function(){
	
   var tree = document.getElementById("treeMenu");
   var cellIndex = 0;   
   //var cellText = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(cellIndex));	   
   var treeItem = tree.view.getItemAtIndex(tree.currentIndex);
   var opcion = treeItem.opcion;

   if(opcion != null){
	   try {
		   if(opcion.IS_NUEVA_VENTANA == 0){
				self.pageTo(self.iframe, opcion.MODULO);
			}else{
				self.abrir(opcion.MODULO);
			}
		} catch (ex) {logInfo(ex);}
   }		
};

Menu.prototype.crerEvento = function(item, opcion){
	var self = this;
	try {
		if(opcion.MODULO){
			item.addEventListener('command', 
					function(){
						try {
							self.ejecutar(opcion);
						} catch (ex) {
							logInfo(ex);
						}
					},
					true
			);
		}
	} catch (e) {
		logInfo(e);
	}	
};

Menu.prototype.obtenerSubmenues = function(opcion){
	var menues = new Array();
	for(var j = 0; j < this.opciones.length; j++){
		var oppx = this.opciones[j];
		if(opcion.CODIGO == oppx.PADRE){
			menues.push(oppx);
		}
	}
	return menues;
};

Menu.prototype.obtenerMenues = function(){
	var menues = new Array();
	for(var m = 0; m < this.opciones.length; m++){
		var opp = this.opciones[m];
		if(! opp.PADRE){
			menues.push(opp);
		}
	}
	return menues;
};

Menu.prototype.obtenerControlesLaterales = function(){
	var menues = new Array();
	for(var m = 0; m < this.opciones.length; m++){
		var opp = this.opciones[m];
		//if(!opp.PADRE && opp.IS_LATERAL_CONTROL == 1){
		if(opp.IS_LATERAL_CONTROL == 1 && opp.MODULO != null && opp.MODULO != ""){
			menues.push(opp);
		}
	}
	return menues;
};

/*Menu.prototype.obtenerSubControlesLaterales = function(opcion){
	var menues = new Array();
	for(var j = 0; j < this.opciones.length; j++){
		var oppx = this.opciones[j];
		if(opcion.CODIGO == oppx.PADRE && oppx.IS_LATERAL_CONTROL == 1){
			menues.push(oppx);
		}
	}
	return menues;
};*/

Menu.prototype.ejecutar=function(opcion){
	if(opcion.IS_NUEVA_VENTANA == 0){
		this.main.pageTo(self.iframe, opcion.MODULO);
	}else{
		this.main.abrir(opcion.MODULO);
	}
};