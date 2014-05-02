function RetencionIvaConst(){	
};

RetencionIvaConst.prototype=new Object();

function RetencionIva(id){
	this.classname = 'RetencionIva';
	this.tablename = 'cont_retencion_iva';
	
	this.id = id ? id : -1;
	this.porcentajeBien = 0.0;
	this.porcentajeServicio = 0.0;
	this.tipoProveedor = '';
	this.tipoAgenteRetencion = '';
	
	this.planBien = new Plan();
	this.planServicio = new Plan();
};

RetencionIva.prototype=new RetencionIvaConst();

RetencionIva.prototype.mapFields = function( q ) {
	var f = new Array();		
	f['porcentajeBien']		= q + this.porcentajeBien + q;	
	f['porcentajeServicio']	= q + this.porcentajeServicio + q;	
	f['tipoProveedor']		= q + this.tipoProveedor + q;
	f['tipoAgenteRetencion']= q + this.tipoAgenteRetencion  + q;	
		
	return f;
};

RetencionIva.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model			
	f['planBien'] = ['id_plan_bien','id', new Plan()];
	f['planServicio'] 	 = ['id_plan_servicio','id', new Plan()];	
	return f;
};

RetencionIva.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};