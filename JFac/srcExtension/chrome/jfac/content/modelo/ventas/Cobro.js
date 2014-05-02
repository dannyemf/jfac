function CobroConst(){
};
CobroConst.prototype = new Object();

function Cobro(id){	
	this.classname = 'Cobro';
	this.tablename = 'ven_cobro';
	
	this.id= id ? id : -1;	
	
	this.total = 0;
	this.totalEfectivo = 0;
	this.totalCheques = 0;
	this.totalAnticipos = 0;
	this.totalCreditoDiferido = 0;
	this.totalCreditoCorriente = 0;
	
	this.sobranteAnticipos = 0.0;
	this.devolverSobranteAnticipos = false;
	
	this.venta = new FacturaVenta();
		
	/**
	 * Lista de CobroItem
	 */
	this.items = new Array();
};

Cobro.prototype=new CobroConst();

Cobro.prototype.mapFields = function( q ) {
	var f = new Array();
	f['total']						= q + this.total + q;
	f['totalEfectivo']				= q + this.totalEfectivo + q;
	f['totalCheques']				= q + this.totalCheques + q;
	f['totalAnticipos']				= q + this.totalAnticipos + q;
	f['totalCreditoDiferido']		= q + this.totalCreditoDiferido + q;
	f['totalCreditoCorriente']		= q + this.totalCreditoCorriente + q;
	f['sobranteAnticipos']			= q + this.sobranteAnticipos + q;
	f['devolverSobranteAnticipos']	= q + this.devolverSobranteAnticipos ? 1 : 0 + q;
	
	return f;
};

Cobro.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Cobro.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model
	f['venta'] = ['id_venta','id', new FacturaVenta()];	
	return f;
};

Cobro.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['items'] 	 = ['cobro', 'id_cobro', 'id', new CobroItem()];
	return f;
};

Cobro.prototype.agregarItem = function(item){
	try {
		item.cobro = this;
		this.items.push(item);
		return true;
	} catch (e) {
		alert("Cobro.agregarItem():  " + e);
	}
	return false;
};

Cobro.prototype.removerItem = function(indice){
	try {
		this.items.splice(indice, 1);
	} catch (e) {
		// TODO: handle exception
	}
};

/**
 * Verifica si existe una forma de pago el la lista de items
 * 
 * @param formaPago {String} formaPago
 * @return {Boolean} 
 */
Cobro.prototype.existeFormaPago = function(formaPago){
	try {
		for(var i = 0; i < this.items.length; i++){
			if(this.items[i].formaPago == formaPago){
				return true;				
			}
		}
	} catch (e) {
		alert('Cobro.existeFormaPago(): '+e);
	}
	return false;
};