const Cc = Components.classes;
const Ci = Components.interfaces;

var gTreeData = new Array();

// Page initialization
window.onload = function() {
  initTreeView();
};

function initTreeView() {
  var tabList = document.getElementById("treex");
  
  var o0 = new Object();
  o0.label = 'zzz';
  o0.open = true;
  o0.checked = true;
  
  var o1 = new Object();
  o1.label = 'zzz';
  o1.open = true;
  o1.checked = false;
  
  gTreeData.push(o0);
  gTreeData.push(o1);
  
  tabList.view = treeView;
  tabList.view.selection.select(0);
}

function onListClick(aEvent) {
  if (aEvent.button == 2)//don't react to right-clicks
    return;
  
  var row = {}, col = {};
  treeView.treeBox.getCellAt(aEvent.clientX, aEvent.clientY, row, col, {});
  if (col.value) {
    if (col.value.id == "chk")
      toggleRowChecked(row.value);
  }
}

function onListKeyDown(aEvent) {
  switch (aEvent.keyCode){
  case KeyEvent.DOM_VK_SPACE:
    toggleRowChecked(document.getElementById("treex").currentIndex);
    break;
  case KeyEvent.DOM_VK_RETURN:
    var ix = document.getElementById("treex").currentIndex;
    if (aEvent.ctrlKey && !treeView.isContainer(ix))
      //restoreSingleTab(ix, aEvent.shiftKey);
    break;
  case KeyEvent.DOM_VK_UP:
  case KeyEvent.DOM_VK_DOWN:
  case KeyEvent.DOM_VK_PAGE_UP:
  case KeyEvent.DOM_VK_PAGE_DOWN:
  case KeyEvent.DOM_VK_HOME:
  case KeyEvent.DOM_VK_END:
    aEvent.preventDefault(); // else the page scrolls unwantedly
    break;
  }
}


function toggleRowChecked(aIx) {
  var item = gTreeData[aIx];
  item.checked = !item.checked;
  treeView.treeBox.invalidateRow(aIx);
}

// Tree controller
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

  //get rowCount()                     { return gTreeData.length; },
  setTree: function(treeBox)         { this.treeBox = treeBox; },
  getCellText: function(idx, column) { return gTreeData[idx].label; },
  isContainer: function(idx)         { return "open" in gTreeData[idx]; },
  getCellValue: function(idx, column){ return gTreeData[idx].checked; },
  isContainerOpen: function(idx)     { return gTreeData[idx].open; },
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
    for (var t = after + 1; t < gTreeData.length; t++)
      if (this.getLevel(t) <= thisLevel)
        return this.getLevel(t) == thisLevel;
    return false;
  },

  toggleOpenState: function(idx) {
    /*if (!this.isContainer(idx))
      return;
    var item = gTreeData[idx];
    if (item.open) {
      // remove this window's tab rows from the view
      var thisLevel = this.getLevel(idx);
      for (var t = idx + 1; t < gTreeData.length && this.getLevel(t) > thisLevel; t++);
      var deletecount = t - idx - 1;
      gTreeData.splice(idx + 1, deletecount);
      this.treeBox.rowCountChanged(idx + 1, -deletecount);
    }
    else {
      // add this window's tab rows to the view
      var toinsert = gTreeData[idx].tabs;
      for (var i = 0; i < toinsert.length; i++)
        gTreeData.splice(idx + i + 1, 0, toinsert[i]);
      this.treeBox.rowCountChanged(idx + 1, toinsert.length);
    }
    item.open = !item.open;*/
    //this.treeBox.invalidateRow(idx);
  },

  getCellProperties: function(idx, column, prop) {
    if (column.id == "chk" && this.isContainer(idx) && gTreeData[idx].checked === 0)
      prop.AppendElement(this._getAtom("partial"));
    if (column.id == "lbl")
      prop.AppendElement(this._getAtom(this.getImageSrc(idx, column) ? "icon" : "noicon"));
  },

  getRowProperties: function(idx, prop) {
    var winState = gTreeData[idx].parent || gTreeData[idx];
    if (winState.ix % 2 != 0)
      prop.AppendElement(this._getAtom("alternate"));
  },

  getImageSrc: function(idx, column) {
    if (column.id == "lbl")
      return gTreeData[idx].src || null;
    return null;
  },

  getProgressMode : function(idx, column) { },
  cycleHeader: function(column) { },
  cycleCell: function(idx, column) { },
  selectionChanged: function() { },
  performAction: function(action) { },
  performActionOnCell: function(action, index, column) { },
  getColumnProperties: function(column, prop) { }
};

