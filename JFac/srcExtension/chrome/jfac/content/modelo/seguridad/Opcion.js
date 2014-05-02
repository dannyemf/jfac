function Opcion(id){
	this.classname = 'Opcion';
	this.tablename = 'seg_opcion';
	
	this.id= id ? id : -1;
	this.codigo = '';
	this.padre = '';
	this.modulo = '';
	this.etiqueta = '';
	this.isNuevaVentana = false;
	this.codigoVentana = '';
	this.isLateralControl = false;
	this.iconoLateralCotrol = '';
};

Opcion.prototype=new Object();

Opcion.prototype.mapFields = function( q ) {
	var f = new Array();
	f['codigo']	= q+this.codigo+q;
	f['padre']	= q+this.padre+q;
	f['modulo']	= q+this.modulo+q;
	f['etiqueta']	= q+this.etiqueta+q;
	f['isNuevaVentana']	= q+(this.isNuevaVentana ? 1:0)+q;
	f['codigoVentana']	= q+this.codigoVentana+q;
	f['isLateralControl']	= q+(this.isLateralControl ? 1:0)+q;
	f['iconoLateralControl']	= q+this.iconoLateralControl+q;
	return f;
};

Opcion.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

