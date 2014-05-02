function FiltroConst(){
	this.FILTRO_EQ = "eq";
	this.FILTRO_MEN = "men";
	this.FILTRO_MENEQ = "meneq";
	this.FILTRO_MAY = "may";
	this.FILTRO_MAYEQ = "mayeq";
	this.FILTRO_BETWEEN = "between";
	this.FILTRO_LIKE = "like";
	this.FILTRO_ILIKE = "ilike";
	this.FILTRO_RLIKE = "rlike";
	this.FILTRO_IN = "in";
	
	this.TIPO_DATO_INTEGER = 'INTEGER';
	this.TIPO_DATO_STRING = 'STRING';
	this.TIPO_DATO_DATE = 'DATE';
	
};
FiltroConst.prototype=new Object();

function Filtro(){
	this.classname = 'Filtro';
	this.tablename = 'rep_filtro';	
	
	this.id = -1;	
	this.columna = '';
	this.tabla = '';
	this.tablaAlias = '';
	this.operadorValor = '';
	this.operadorFiltro = '';
	this.tipoDato = this.TIPO_DATO_STRING;
	this.valor1 = '';
	this.valor2 = '';
	this.isValorPredefinido = true;		
	
	this.reporte = new Reporte();
};

Filtro.prototype=new FiltroConst();

Filtro.prototype.mapFields = function( q ) {
	var f = new Array();			
	f['columna']	= q+this.columna+q;
	f['tabla']	= q+this.tabla+q;
	f['tablaAlias']	= q+this.tablaAlias+q;	
	f['operadorValor']	= q+this.operadorValor+q;
	f['operadorFiltro']	= q+this.operadorFiltro+q;
	f['tipoDato']	= q+this.tipoDato+q;
	f['valor1']	= q+this.valor1+q;
	f['valor2']	= q+this.valor2+q;
	f['isValorPredefinido']	= q+(this.isValorPredefinido||this.isValorPredefinido == 1 ? 1:0) +q;
	return f;
};

Filtro.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Filtro.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model		
	f['reporte'] = ['id_reporte','id', new Reporte()];
	return f;
};