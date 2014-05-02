function BancoConst(){	
};

BancoConst.prototype=new Object();

function Banco(id){
	this.classname = 'Banco';
	this.tablename = 'cont_banco';
	
	this.id = id ? id : -1;
	this.codigo = '';
	this.nombre = '';
	this.descripcion = '';
	this.estado = false;
	this.utilizaEmpresa = false;
};

Banco.prototype=new BancoConst();

Banco.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['codigo']	= q + this.codigo + q;	
	f['nombre']	= q + this.nombre + q;	
	f['descripcion']	= q + this.descripcion + q;
	f['estado']	= q + (this.estado ? 1 : 0)  + q;
	f['utilizaEmpresa']	= q + (this.utilizaEmpresa ? 1 : 0)  + q;
		
	return f;
};

Banco.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};