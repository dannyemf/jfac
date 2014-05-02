function TablaConst(){
};
TablaConst.prototype=new Object();

function Tabla(){
	this.classname = 'Tabla';
	this.tablename = 'rep_tabla';	
	this.id = -1;	
	this.nombre = '';
	this.alias = '';
	
	this.reporte = new Reporte();
};

Tabla.prototype=new TablaConst();

Tabla.prototype.mapFields = function( q ) {
	var f = new Array();			
	f['nombre']	= q+this.nombre+q;
	f['alias']	= q+this.alias+q;
	return f;
};

Tabla.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Tabla.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model		
	f['reporte'] = ['id_reporte','id', new Reporte()];
	return f;
};