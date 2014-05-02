/**
 * Controlador de un árbol simple.
 * 
 * @param {String} id Id del tree (Obligatorio)
 * @param {Array} idscols Nombre de los atributos del objeto modelo que ira en cada fila (Obligatorio) (ej: para una persona: ['id','codigo','nombre']) 
 * @param {String} idmodel Nombre del atributo del objeto modelo en caso de que el primer elemento de idscols no sea un campo único. (Opcional)
 */
function XulTree(id, idscols, idmodel){
	this.id = id;
	this.control = null;
	this.idmodel = (idmodel == null ? idscols[0] : idmodel);
	this.columnasNumericas = []; // Numero de las columnas
	this.columnasDates = []; // [['columna',formato'],['columna',formato']]
	this.marcarRowConainers = []; // [['columna','valor condicion']]
	
	this.datos = new Array();
	this.idcols = idscols;
	this._currentIndex = 0;
		
	try {
		this.control = document.getElementById(id);
		var treechildren = this.control.childNodes.item(1);
		treechildren.setAttribute('id', this.id + '_treechildren');
	} catch (e) {
		alert("XulTree(): " + e);
	}
};

XulTree.prototype = new Object();

/**
 * Coloca el evento de seleccion
 * @param evento
 * @return void
 */
XulTree.prototype.setSelectEvent = function(evento){
	this.control.addEventListener('select', evento, false);
};

XulTree.prototype.select = function(index){
	this.control.view.selection.select(index);
};

XulTree.prototype.setNumericCols = function(columnas){
	this.columnasNumericas = columnas;	
};

XulTree.prototype.setRowsConinersWhereColumns = function(columnas){
	this.marcarRowConainers = columnas;	
};

/**
 * Fija las columnas que deben mostrar fechas
 * @param columnas Columnas en formato: [['propiedad1','dd/MM/yyyy'], ['propiedad2','dd/MMM/yyyy']]
 * @return
 */
XulTree.prototype.setDateColumns = function(columnas){
	this.columnasDates = columnas;	
};

XulTree.prototype.getSelectRows = function(){
	var selectedRows = new Array();
	var start = new Object();
	var end = new Object();
	var numRanges = this.control.view.selection.getRangeCount();
	for (var t=0; t<numRanges; t++){
	 this.control.view.selection.getRangeAt(t,start,end);
	  for (var v=start.value; v<=end.value; v++){
	     //alert("Item "+v+" is selected.");
		  selectedRows.push(v);
		  //alert(start.value + " - to - " + end.value + ' - v : ' + v);
	  }
	}
	return selectedRows;
};

/**
 * Fija el arreglo de datos que debe monstrar el árbol
 * @param {Array} datos La lista de datos
 * @return void
 */
XulTree.prototype.setDatos = function(datos){
	this.datos = datos;
	this.actualizarTree();
};

XulTree.prototype.getDatos = function(){
	return this.datos;
};

/**
 * Agrega un objeto a la lista de datos que muestra el ábol
 * @param {Object} dato El objeto a agregar (Ejm: un objeto persona, cliente, etc) 
 * @return void
 */
XulTree.prototype.add = function(dato){
	this._currentIndex = this._currentIndex + 1;
	
	var ti = document.getElementById(this.id + '_treechildren');
	
	this.datos.push(dato);
	
	var dat = dato;
	dat.index = this._currentIndex;
	var idDato = eval('dat.' + this.idmodel);	
	
	var tii = document.createElement("treeitem");
	var idti = this.id + '_treeitem_' + idDato;
	tii.setAttribute('id', idti);	
	ti.appendChild(tii);
	
	var tiii = document.createElement("treerow");
	var idtr = this.id + '_treerow_' +  idDato;
	tiii.setAttribute('id', idtr);	
	tii.appendChild(tiii);
	
	for (var j = 0; j < this.idcols.length; j++) {		
		try {					
			var tiiii = document.createElement("treecell");			
			var idtc = this._getTreeCellId(dat, this.idcols[j]);			
			var str = this._getTreeCellText(dat, this.idcols[j]);
			
			for ( var rc = 0; rc < this.marcarRowConainers.length; rc++) {
				var rcd = this.marcarRowConainers[rc];
				if(this.idcols[j] == rcd[0] && str==rcd[1]){
					tii.setAttribute('container', 'true');
				}
			}
			
			
			tiiii.setAttribute('label', str);			
			tiiii.setAttribute('id', idtc);	
			
			tiii.appendChild(tiiii);
		}catch (e) {
			logInfo(e);
		}
	}
};

/**
 * Remueve un objeto de la lista de datos mostrados en el árbol
 * @param {Object} dato
 * @return void
 */
XulTree.prototype.remove = function(dato){
	
	try {
		var idDato = eval('dato.'+ this.idmodel);
		var idti = this.id + '_treeitem_' + idDato;
		var treeitem = document.getElementById(idti);
		treeitem.parentNode.removeChild(treeitem);
		
		var newArrar = new Array();
		
		for(var i = 0; i < this.datos.length; i++){
			var dat = this.datos[i];
			var idDatoi = eval('dat.'+ this.idmodel);
			if(idDato != idDatoi){
				newArrar.push(this.datos[i]);
			}else{			
			}
		}
		
		// Fija los nuevos datos
		this.datos = newArrar;		
	} catch (e) {
		logInfo(e);
	}
};

/**
 * Remueve los objetos de la lista de datos mostrados en el árbol usando la variable model y la expresión
 * @param {String} expresion - Expresion booleana, ejm: model.total > 0
 * @return void
 */
XulTree.prototype.removeByExp = function(expresion){
	
	try {	
		var newArrar = new Array();		
		for(i = 0; i < this.datos.length; i++){
			var model = this.datos[i];
			var ev = eval(expresion);
			if(ev == false){
				newArrar.push(this.datos[i]);
			}else{
				var idDato = eval('model.'+ this.idmodel);
				var idti = this.id + '_treeitem_' + idDato;
				var treeitem = document.getElementById(idti);
				treeitem.parentNode.removeChild(treeitem);
			}			
		}
		this.datos = newArrar;
	} catch (e) {
		alert(e);
		logInfo(e);
	}
};

XulTree.prototype.removeByIndex = function(index){	
	try {
		var dato = this.datos[index];
		this.remove(dato);
	} catch (e) {
		alert(e);
		logInfo(e);
	}
};

/**
 * Actualiza los datos mostrados en el arbol cuando se haya modificado algun atributo de uno  o varios objetos de la lista de datos
 * @return void
 */
XulTree.prototype.updateAll = function(){
	for(i = 0; i < this.datos.length; i++){
		this.updateIndex(i);
	}
};

/**
 * Actualiza la vista unicamente del objeto que esta seleccionado
 * @return void
 */
XulTree.prototype.updateSelected = function(){
	try {
		var currentIndex = this.control.currentIndex;
		this.updateIndex(currentIndex);
	} catch (e) {
		alert(e);
	}
};

XulTree.prototype.updateSelectedWithModel = function(model){
	var currentIndex = this.control.currentIndex;
	
	try {
		this.datos[currentIndex] = model;
		this.updateIndex(currentIndex);
	} catch (e) {
		// TODO: handle exception
	}
};

XulTree.prototype._getTreeCellId = function(dat, idCol){
	try {				
		var idDato = eval('dat.'+ this.idmodel);
		
		var lista = new Array();
		if(typeof(idCol) == "string"){
			lista.push(idCol);
		}else{
			lista = idCol;
		}
		
		var idtrecell = this.id + '_treecell_' + idDato + '_' + lista[0];						
		return idtrecell;
		
			
	} catch (e) {
		logInfo('XulTree._getTreeCellId(): '+e);
		//alert("XulTree._getTreeCellId(): " + e);
		return '';
	}
};

XulTree.prototype._getTreeCellText = function(dat, idcol){
	try {						
			var lista = new Array();
			if(typeof(idcol) == "string"){
				lista.push(idcol);
			}else{
				lista = idcol;
			}
			
			var str = "";
			
			for(var k = 0; k < lista.length; k++){
				var v = eval('dat.'+lista[k]);
				if(typeof(v) == 'boolean'){
					v = v ? 'SI' : 'NO';
				}
				
				for(var f = 0; f < this.columnasDates.length; f++){
					if(this.columnasDates[f][0] == lista[k]){
						try{
							if(v instanceof Date || typeof(v) == 'object'){
								v = v.toString(this.columnasDates[f][1]);
							}else{
								var d = toDate(v);
								v = d.toString(this.columnasDates[f][1]);
							}
						}catch(ex){
							//v = 's/f: ' + ex;
							v = '--';
						}
					}
				}
				str += (k == 0 ? "":"-") + v;
			}
			
			return str;
		//}
			
	} catch (e) {
		logInfo("XulTree._getTreeCellText(): " + e);		
		return '--';
	}
};

/**
 * Actualiza el indice indicado
 * @param {Number} index 
 * @return void
 */
XulTree.prototype.updateIndex = function(index){
	try {		
		var currentIndex = index;
		var dat = this.datos[currentIndex];
		
		for (var j = 0; j < this.idcols.length; j++) {
			
			var idtreecell = this._getTreeCellId(dat, this.idcols[j]);
			var texttreecell = this._getTreeCellText(dat, this.idcols[j]);
			
			document.getElementById(idtreecell).setAttribute('label', texttreecell);
		}
		
	} catch (e) {
		logInfo(e);
		alert("XulTree.updateIndex(): "+e);
	}
};

/**
 * Devuelve el objeto que actualmente está seleccionado
 * @return {Object} El objeto si está seleccionado o null de lo contrario
 */
XulTree.prototype.getSelected = function(){
	var currentIndex = this.control.currentIndex;
	try {
		return this.datos[currentIndex];
	} catch (e) {
		return null;
	}
};

/**
 * Devuelve el objeto en la posicion index
 * @return {Object} El objeto indicado con el indice o null de lo contrario
 */
XulTree.prototype.getItemAt = function(index){
	try {
		return this.datos[index];
	} catch (e) {
		return null;
	}
};

/**
 * Devuelve el objeto que actualmente está seleccionado
 * @return {int} El objeto si está seleccionado o -1 de lo contrario
 */
XulTree.prototype.getSelectedIndex = function(){
	var currentIndex = this.control.currentIndex;
	try {
		return currentIndex;
	} catch (e) {
		return -1;
	}
};

/**
 * Remueve todas las filas y datos del árbol
 * @return void
 */
XulTree.prototype.clear = function(){
	try {
		var ti = document.getElementById(this.id + "_treechildren");
		this.control.removeChild(ti);
		var tinew = document.createElement("treechildren");
		tinew.setAttribute('id', this.id + '_treechildren');
		this.control.appendChild(tinew);
		this.datos = new Array();
		this._currentIndex = 0;
	} catch (e) {
		alert(e);
	}
};

/**
 * Actualiza las filas del arbol con los nuevos datos de los objetosd
 * @return void
 */
XulTree.prototype.actualizarTree = function(){
	// Respalda y restaura los datos
	var oldDatos = this.datos ? this.datos : new Array();
	this.clear();
	this._currentIndex = 0;
	// Listo
	
	for(var i = 0; i < oldDatos.length; i++){
		var dat = oldDatos[i];		
		this.add(dat);
	}
};


