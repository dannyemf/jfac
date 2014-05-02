function CobroDao(){
};

CobroDao.prototype = new Dao();

/**
 * Busca todas todas los bancos
 * @param {Cliente} cliente
 * @return {Array} Lista de Banco
 */
CobroDao.prototype.buscarPorCliente = function(cliente, numeroFactura){
	
	var mCobr = new Cobro();
	var mCobi = new CobroItem();
	var mFact = new FacturaVenta();
	var mClie = new Cliente();
	
	var lst = this.query('SELECT ' +
			"ci.id, ci.monto, ci.saldo, ci.formaPago, f.numeroFactura, c.id_venta, f.id_cliente, f.id_local, concat(cli.cedula,' - ',cli.nombres,' ', cli.apellidos) as cliente" + 			
			' FROM ' + mCobr.tablename +" c, " + mCobi.tablename + " ci, "+mFact.tablename + " f, " + mClie.tablename + ' cli ' +
			" WHERE c.id = ci.id_cobro and c.id_venta = f.id and cli.id = f.id_cliente" +
			" and (ci.formaPago='" + mCobi.CREDITO_CORRIENTE + "' OR ci.formaPago='" + mCobi.CREDITO_DIFERIDO + "')" +
			" and ci.saldo > 0" +
			" and " + this.fkSql('f.id_cliente', cliente == null ? -1 : cliente.id) +
			" and f.numeroFactura Like '" + numeroFactura + "%'"
	);
	
	return lst;	
};

/**
 * Guarda
 * @param {CobroCuota} cobroCuota
 * @param {Array} cuotasSeleccionadas
 * @return {Boolen}
 */
CobroDao.prototype.guardar = function(cobroCuota, cuotasSeleccionadas){
	var oldSaldo = cobroCuota.cobroItem.saldo;
	try {
		this.begin();
		
		//Guarda al cobro
		this.create(cobroCuota);
		
		//Actualiza el saldo		
		cobroCuota.cobroItem.saldo = cobroCuota.cobroItem.saldo - cobroCuota.montoReal;
		this.updateField(cobroCuota.cobroItem, 'saldo');
		
		if(cuotasSeleccionadas){
			for(var i = 0; i < cuotasSeleccionadas.length; i++){
				var c = new Cuota();
				c = cuotasSeleccionadas[i];				
				this.query("UPDATE " + c.tablename + " SET estado = '" + c.ESTADO_FINALIZADA + "', montoPagar='" + c.montoPagar + "', mora="+c.mora + " WHERE id = " + c.id);
			}
		}
		
		//Crea el cheque
		if(cobroCuota.formaPago == cobroCuota.CHEQUE){
			var ch = new Cheque();
			ch.banco = cobroCuota.banco;
			//ch.cuenta No se utiliza ya que la cuenta es solo para la empresa
			ch.fechaEmision = cobroCuota.fechaEmision;
			ch.fechaVencimiento = cobroCuota.fechaVencimiento;
			ch.monto = cobroCuota.monto;				
			//Con este numero se liga el cobrocuota con el anticipo
			ch.numero = cobroCuota.numeroReferencia;
			ch.cliente = cobroCuota.cliente;
			
			this.create(ch);			
		}
		
		//Contabiliza el cobro
		new ContabilidadDao().contabilizarCobroCuota(cobroCuota);
		
		this.commit();
		return true;
	} catch (e) {
		this.rollback();
		cobroCuota.cobroItem.saldo = oldSaldo;
		throw e;
	}
	return false;
};

/**
 * @param idCobroItem
 * @return {Array}
 */
CobroDao.prototype.obtenerCuotasPendientes = function(idCobroItem){
	var lista = this.readBy(new Cuota(), 'WHERE id_cobro_item = '+ idCobroItem + " and estado = '" + new CuotaConst().ESTADO_REGISTRADA + "'");	
	return this.modelListTo(new Cuota(), lista, false, false);	
};
