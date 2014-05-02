function ColumnaConst(){
	this.ORDENACION_NINGUNO = "";
	this.ORDENACION_ASC = "ASC";
	this.ORDENACION_DESC = "DESC";	
};
ColumnaConst.prototype=new Object();

function Columna(){
	this.classname = 'Columna';
	this.tablename = 'rep_columna';	
	
	this.id = -1;	
	this.nombre = '';
	this.tabla = '';
	this.tablaAlias = '';
	this.titulo = '';
	this.ordenacion = this.ORDENACION_NINGUNO;
	
	this.reporte = new Reporte();
};

Columna.prototype=new ColumnaConst();

Columna.prototype.mapFields = function( q ) {
	var f = new Array();			
	f['nombre']	= q+this.nombre+q;
	f['tabla']	= q+this.tabla+q;
	f['tablaAlias']	= q+this.tablaAlias+q;
	f['titulo']	= q+this.titulo+q;
	f['ordenacion']	= q+this.ordenacion+q;
	return f;
};

Columna.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Columna.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model		
	f['reporte'] = ['id_reporte','id', new Reporte()];
	return f;
};