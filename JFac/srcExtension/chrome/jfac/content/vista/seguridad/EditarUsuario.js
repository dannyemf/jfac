window.onload = function () {
	self = new EditarUsuario();
};

function EditarUsuario(){
	this.usuarioDao = new UsuarioDao();
	this.rolDao = new RolDao();
	this.puntoDao = new PuntoFacturacionDao();
	this.localDao = new LocalDao();
	
	this.usuario = new Usuario();
	
	this.usuario = window.arguments[0];
	this.treeRoles = $Xul('treeRoles');
	
	var roles = this.rolDao.obtenerRolesUsuario(this.usuario);
	var allRoles = this.rolDao.obtnerTodosRoles();
	
	for (var i = 0; i < roles.length; i++) {
		roles[i].asignar = true;
	}
	
	for ( i = 0; i < allRoles.length; i++) {
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



EditarUsuario.prototype.inicializar = function () {
	
	$Xul("btnGuardar").addEventListener( 'command', this.cmdGuardar, true);
	$Xul("btnCancelar").addEventListener( 'command', this.cmdCancelar, true);
	this.treeRoles.addEventListener( 'click', this.cmdAsignar, true);
	$Xul('txtCodigo').bind(this.usuario, 'id');
	$Xul('txtCedula').bind(this.usuario, 'cedula');
	$Xul('txtLogin').bind(this.usuario, 'login');
	$Xul('txtNombres').bind(this.usuario, 'nombres');
	$Xul('txtApellidos').bind(this.usuario, 'apellidos');
	$Xul('txtClave').bind(this.usuario, 'clave');
	$Xul('chkActivo').bind(this.usuario, 'isActivo');
	
	var locales = this.localDao.obtenerTodos();
	var puntos = new Array();
	
	$Xul("cmbLocal").fillComboBox(locales, 'id', ['codigo','nombre'], '--Ninguno--');
	$Xul("cmbPunto").fillComboBox(puntos, 'id', ['codigo','nombre'], '--Ninguno--');
	
	//locales
	$Xul("cmbLocal").addEventListener( 'select', function(){
		var i = this.selectedIndex - 1;
		if(i == -1){
			self.usuario.local = new Local();
			puntos = new Array();
		}else{
			self.usuario.local = locales[i];
			puntos = self.puntoDao.buscarPorLocal(locales[i]);
		}
		
		$Xul("cmbPunto").fillComboBox(puntos, 'id', ['codigo','nombre'], '--Ninguno--');
		$Xul("cmbPunto").selectedIndex = 0;
	}, true);
	
	// puntos
	$Xul("cmbPunto").addEventListener( 'select', function(){
		var i = this.selectedIndex - 1;
		if(i == -1){
			self.usuario.punto = new PuntoFacturacion();
		}else{
			self.usuario.punto = puntos[i];
		}
	}, true);
	
	if(this.usuario.local.id == -1){
		$Xul("cmbLocal").selectedIndex = 0;
		$Xul("cmbPunto").selectedIndex = 0;
	}else{
		$Xul("cmbLocal").val(this.usuario.local.id);
		puntos = this.puntoDao.buscarPorLocal(this.usuario.local);
		$Xul("cmbPunto").fillComboBox(puntos, 'id', ['codigo','nombre'], '--Ninguno--');
		
		if(this.usuario.punto.id == -1){
			$Xul("cmbPunto").selectedIndex = 0;
		}else{
			$Xul("cmbPunto").val(this.usuario.punto.id);
		}
	}
	
	this.treeRoles.view = treeView;
	this.treeRoles.view.selection.select(0);
};

EditarUsuario.prototype.cmdGuardar = function () {self.guardar();};
EditarUsuario.prototype.cmdCancelar = function () {window.close();};
EditarUsuario.prototype.cmdAsignar = function (e) {self.asignar(e);};
EditarUsuario.prototype.cmdDesasignar = function () {self.desasignar();};

EditarUsuario.prototype.guardar = function () {
	var v = validar();
	if(v){
		
		var b = this.usuarioDao.guardar(this.usuario);
		if(b){
			this.rolDao.guardarRolesUsuario(datos, this.usuario);
		}
		if(b){
			window.close();
		}else{
			alert("No se pudo guardar el Usuario seleccionado");
		}
	}	
};

EditarUsuario.prototype.asignar = function (aEvent) {
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

EditarUsuario.prototype.cancelar = function () {
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
