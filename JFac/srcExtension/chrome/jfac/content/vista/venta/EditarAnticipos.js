window.onload = function () {
	try {		
		self = new EditarAnticipos();
	} catch (e) {
		alert("EditarAnticipos.onload(): "+e);
	}
};

function EditarAnticipos(){
	this.contexto = new Context(); this.contexto = getContexto();
	
	this.model = window.arguments[0];
	
	this.anticipos = new Array();	
	this.anticipos = this.model.anticipos;
	
	this.totalAnticipos = this.model.totalAnticipos;
	this.monto = this.model.monto;	
	this.totalActual = 0;
	this.sobrante = 0;
	
	this.treeItems =  $Xul('treeItems');	
	this.inicializar();
};

EditarAnticipos.prototype.asignar = function (aEvent) {
	if (aEvent.button == 2)//don't react to right-clicks
	    return;
	  var row = {}, col = {};
	  treeView.treeBox.getCellAt(aEvent.clientX, aEvent.clientY, row, col, {});
	  if (col.value) {
	    if (col.value.id == "asg"){
	    	var aIx = row.value;
	    	var item = datos[aIx];
	    	item.asignar = !item.asignar;
	    	this.calcularMontoTotal();
	    	
	    	treeView.treeBox.invalidateRow(aIx);	    		    
	    }
	  }
};

EditarAnticipos.prototype.inicializar = function () {
	
	try {
		$Xul('cmbMontoCubrir').val(this.monto);
		$Xul('cmbTotalAnticipos').val(this.totalAnticipos);		
		
		$Xul("btnAceptar").addEventListener( 'command', function(){self.aceptar();}, true);
		$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);		
		this.treeItems.addEventListener( 'click', function(e){self.asignar(e);}, true);
		
		datos = this.anticipos;
		this.treeItems.view = treeView;
		
		this.calcularMontoTotal();
	} catch (e) {
		alert('inicializar(): '+e);
	}
};

EditarAnticipos.prototype.calcularMontoTotal = function () {
	this.totalActual = 0;
	for(var i = 0; i < datos.length; i++){
		if(datos[i].asignar == true){
			this.totalActual += datos[i].saldo * 1;
		}
	}

	this.sobrante = this.totalActual >= this.monto ? this.totalActual - this.monto : 0;
	
	$Xul('cmbMontoTotal').val(this.totalActual);
	$Xul('cmbMontoSobrante').val(this.sobrante);
	
};

EditarAnticipos.prototype.aceptar = function () {	
	this.model.aceptar = true;
	this.model.sobrante = this.sobrante;
	this.model.devolver = $Xul('chkDevolverSobrante').checked;
	
	var total = $Xul('cmbMontoTotal').val() * 1;
	if(total >= this.monto){
		window.close();
	}else{
		alert('Seleccione más anticipos hasta cubrir el monto');
	}
	
};

EditarAnticipos.prototype.cancelar = function () {			
	this.model.aceptar = false;	
	window.close();
};

const Cc = Components.classes;
const Ci = Components.interfaces;
var datos = new  Array();	
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
	  if(column.id == 'fecha'){
		  return datos[idx].fecha.toString('dd/MM/yyyy');
	  }
	  if(column.id == 'monto'){
		  return datos[idx].monto;
	  }
	  if(column.id == 'saldo'){
		  return datos[idx].saldo;
	  }
	  
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


