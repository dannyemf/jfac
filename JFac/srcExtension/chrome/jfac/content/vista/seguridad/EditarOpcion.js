window.onload = function () {
	self = new EditarOpcion();
};

function EditarOpcion(){
	this.opcionDao = new OpcionDao();
	this.rolDao = new RolDao();
	this.opcion = window.arguments[0];
	this.treeRoles = new $Xul('treeRoles');
	
	var roles =this.rolDao.obtenerRolesOpcion(this.opcion); 
	var allRoles =this.rolDao.obtnerTodosRoles(); 
	
	for ( var i = 0; i < roles.length; i++) {
		roles[i].asignar = true;
	}
	
	for (var i = 0; i < allRoles.length; i++) {
		var a = allRoles[i];
		var asgo = false; 
		for (var j = 0; j < roles.length; j++) {
			var r = roles[j];
			if(a.id == r.id){
				asgo = true;
				break;
			}
		}
		if(asgo == false){
			a.asignar = false;
			roles.push(a);
		}
	}	
	
	datos = roles;
	this.inicializar();
};

EditarOpcion.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
	this.treeRoles.addEventListener( 'click', this.cmdAsignar, true);
	
	//$Xul('txtId').bind(this.opcion, 'id');
	$Xul('txtCodigo').bind(this.opcion, 'codigo');
	$Xul('txtPadre').bind(this.opcion, 'padre');
	$Xul('txtModulo').bind(this.opcion, 'modulo');
	$Xul('txtEtiqueta').bind(this.opcion, 'etiqueta');
	$Xul("chkNuevaVentana").bind(this.opcion, 'isNuevaVentana');
	$Xul("chkControlLateral").bind(this.opcion, 'isLateralControl');	
	$Xul('txtCodigoVent').bind(this.opcion, 'codigoVentana');
	$Xul('cmbIcoLat').bind(this.opcion, 'iconoLateralControl');	
	
	this.treeRoles.view = treeView;
	this.treeRoles.view.selection.select(0);
	
};

EditarOpcion.prototype.cmdGuardar = function () {self.guardar();};
EditarOpcion.prototype.cmdCancelar = function () {window.close();};
EditarOpcion.prototype.cmdAsignar = function (e) {self.asignar(e);};

EditarOpcion.prototype.validar = function () {
	var v = window.validar();
	
	var ecd = this.opcionDao.count(this.opcion, " where codigo = '"+this.opcion.codigo+"' and id != " + this.opcion.id);
	var ecv = this.opcionDao.count(this.opcion, " where codigoVentana != '' and codigoVentana = '"+this.opcion.codigoVentana+"' and id != " + this.opcion.id);
	
	if(ecv){
		$Xul('txtCodigoVent').addValidationError('Código de ventana duplicado'); v= false;
	}
	
	if(ecd){			
		$Xul('txtCodigo').addValidationError('Código duplicado'); v= false;
	}
		
	return v;
};

EditarOpcion.prototype.guardar = function () {
	var v = this.validar();
	if(v){
		var b = this.opcionDao.guardar(this.opcion);
		if(b){
			this.rolDao.guardarRolesOpcion(datos, this.opcion);
		}
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar la Opción seleccionada");
		}
	}
};

EditarOpcion.prototype.asignar = function (aEvent) {
	if (aEvent.button == 2)//don't react to right-clicks
	    return;
	  var row = {}, col = {};
	  treeView.treeBox.getCellAt(aEvent.clientX, aEvent.clientY, row, col, {});
	  if (col.value) {
	    if (col.value.id == "asg"){
	    	var aIx = row.value;
	    	var item = datos[aIx];
	    	item.asignar = !item.asignar;
	    	treeView.treeBox.invalidateRow(aIx);
	    }
	  }
};

EditarOpcion.prototype.cancelar = function () {
	return true;
};


const Cc = Components.classes;
const Ci = Components.interfaces;
var datos = new Array();
var treeView = {
  _atoms: {},
  _getAtom: function(aName){
    if (!this._atoms[aName]) {
      var as = Cc["@mozilla.org/atom-service;1"].getService(Ci.nsIAtomService);
      this._atoms[aName] = as.getAtom(aName);
    }
    return this._atoms[aName];
  },
  treeBox: null,
  selection: null,
  get rowCount()                     { return datos.length; },
  setTree: function(treeBox)         { this.treeBox = treeBox; },
  getCellText: function(idx, column) { 
	  if(column.id == 'nom'){
		  return datos[idx].nombre;
	  }
	  return datos[idx].descripcion;
  },
  isContainer: function(idx)         { return "open" in datos[idx]; },
  getCellValue: function(idx, column){ return datos[idx].asignar; },
  isContainerOpen: function(idx)     { return datos[idx].open; },
  isContainerEmpty: function(idx)    { return false; },
  isSeparator: function(idx)         { return false; },
  isSorted: function()               { return false; },
  isEditable: function(idx, column)  { return false; },
  getLevel: function(idx)            { return this.isContainer(idx) ? 0 : 1; },
  getParentIndex: function(idx) {
    if (!this.isContainer(idx))
      for (var t = idx - 1; t >= 0 ; t--)
        if (this.isContainer(t))
          return t;
    return -1;
  },
  hasNextSibling: function(idx, after) {
    var thisLevel = this.getLevel(idx);
    for (var t = after + 1; t < datos.length; t++)
      if (this.getLevel(t) <= thisLevel)
        return this.getLevel(t) == thisLevel;
    return false;
  },
  toggleOpenState: function(idx) {},
  getCellProperties: function(idx, column, prop) {
    if (column.id == "asg" && this.isContainer(idx) && datos[idx].checked === 0)
      prop.AppendElement(this._getAtom("partial"));
  },
  getRowProperties: function(idx, prop) {
    var winState = datos[idx].parent || datos[idx];
    if (winState.ix % 2 != 0) prop.AppendElement(this._getAtom("alternate"));
  },
  getImageSrc: function(idx, column) {return null;},
  getProgressMode : function(idx, column) { },
  cycleHeader: function(column) { },
  cycleCell: function(idx, column) { },
  selectionChanged: function() { },
  performAction: function(action) { },
  performActionOnCell: function(action, index, column) { },
  getColumnProperties: function(column, prop) { }
};

