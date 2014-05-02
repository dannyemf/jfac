function CuotaConst(){
	this.ESTADO_REGISTRADA = "Registrada";
	this.ESTADO_FINALIZADA = "Finalizada";
	
	//Los mismo de TipoCredito
	this.TIPO_MENSUAL = "MENSUAL";
	this.TIPO_QUINCENAL = "QUINCENAL";
	this.TIPO_SEMANAL = "SEMANAL";
	this.TIPO_DIARIO = "DIARIO";
	
};
CuotaConst.prototype = new Object();

function Cuota(){
	this.classname = 'Cuota';
	this.tablename = 'ven_cuota';
	
	this.id= -1;
	this.numeroCuota = 0;
	this.estado = this.ESTADO_REGISTRADA;
	this.monto = 0.0;
	
	this.interes = 0.0;
	this.mora = 0.0;
	this.montoPagar = 0.0;
	
	
	this.fecha = new Date();
	this.cobroItem = new CobroItem();
	this.tipo = this.TIPO_MENSUAL;
	
};

Cuota.prototype = new CuotaConst();

Cuota.prototype.mapFields = function( q ) {
	var f = new Array();
	f['estado']		= q + this.estado + q;
	f['monto']	= q + this.monto + q;
	f['interes']	= q + this.interes + q;
	f['mora']	= q + this.mora + q;
	f['montoPagar']	= q + this.montoPagar + q;
	
	f['numeroCuota']	= q + this.numeroCuota + q;
	f['fecha']	= q + this.fecha.toString('yyyy-MM-dd') + q;
	f['tipo']	= q + this.tipo + q;
	
	return f;
};

Cuota.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['cobroItem'] = ['id_cobro_item','id', new CobroItem()];			
	return f;
};

Cuota.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

/**
 * Verifica si la cuota ya esta vencida
 * @return {Boolean}
 */
Cuota.prototype.isVencida = function( ) {
	try {
		var th = new Date();
		var tf = this.fecha;	
		
		if(tf < th){
			return true;
		}
	} catch (e) {
	}
	return false;
};

/**
 * Calcula la mora
 * @param {Number} porcentaje
 * @param {Number} diasMora
 * @return {Number}
 */
Cuota.prototype.calcularMora = function(porcentaje, diasMora) {
	this.mora = 0;
	
	if(diasMora > 0){
		//Mora mensual
		this.mora = ((this.monto * porcentaje ) / 100.0);
		//Mora solo por los dias atrasados
		this.mora = ((this.mora / 30.0) * diasMora).round(2);				
	}		
};

/**
 * Calcula el monto pagado
 * @return
 */
Cuota.prototype.calcularMontoPagar = function() {
	this.montoPagar = this.monto + this.interes + this.mora;
};