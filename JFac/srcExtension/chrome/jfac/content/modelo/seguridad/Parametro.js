function ParametroConst (){		
	this.IVA = 'IVA';
	this.NOMBRE_EMPRESA = 'NOMBRE_EMPRESA';
	this.NOMBRE_PROPIETARIO = 'NOMBRE_PROPIETARIO';
	this.NOMBRE_SISTEMA = 'NOMBRE_SISTEMA';
	this.RUC_PROPIETARIO = 'RUC_PROPIETARIO';
	this.FAC_CONTRIBUYENTE = 'FAC_CONTRIBUYENTE';
	this.PRO_VALIDEZ = 'PRO_VALIDEZ';
	this.DIRECCION_EMPRESA = 'DIRECCION_EMPRESA';
	
	this.TIPO_SISTEMA = 'TIPO_SISTEMA';
	this.TIPO_PROVEEDOR = 'TIPO_PROVEEDOR';
	this.TIPO_AGENTE_RETENCION = 'TIPO_AGENTE_RETENCION';	
};
ParametroConst.prototype=new Object();

function Parametro (id){
	this.classname = 'Parametro';
	this.tablename = 'seg_parametro';
	
	this.id = id ? id : -1;
	this.codigo = '';
	this.valor= '';
	this.descripcion= '';
	this.isEditable = true;
	this.tipo = this.TIPO_SISTEMA;
};

Parametro.prototype=new ParametroConst();


Parametro.prototype.mapFields = function( q ) {
	var f = new Array();
	f['codigo']=q+ this.codigo + q;
	f['tipo']=q+ this.tipo + q;
	f['valor']	= q+this.valor+q;
	f['descripcion']= q+this.descripcion+q;
	f['isEditable']= q+(this.isEditable ? 1 : 0)+q;
	return f;
};

Parametro.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

