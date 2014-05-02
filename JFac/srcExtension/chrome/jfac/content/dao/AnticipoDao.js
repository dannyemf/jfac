function AnticipoDao(){
};

AnticipoDao.prototype = new Dao();

AnticipoDao.prototype.guardar = function(anticipo){	
	try {	
		var ant = new Anticipo();
		ant = anticipo;

		if(ant.estado == ant.ESTADO_PENDIENTE){
			
			this.begin();
			
			ant.saldo = ant.monto;
			
			if(ant.id == -1){
				//Guarda el anticipo			
				var ga = this.create(ant);			
				
				//AL HACER DEVOLUCIONES O AL CAMBIAR DE CRITERIO (DE CHEQUE A EFECTIVO), SE DEBE CAMBIAR EL ESTADO DEL CHEQUE
				if(ga){
					if(ant.formaPago ==  new AnticipoConst().FORMA_PAGO_CHEQUE){
						var ch = new Cheque();
						ch.banco = ant.banco;
						//ch.cuenta No se utiliza ya que la cuenta es solo para la empresa
						ch.fechaEmision = ant.fechaEmision;
						ch.fechaVencimiento = ant.fechaVencimiento;
						ch.monto = ant.monto;				
						//Con este numero se liga el cheque con el anticipo
						ch.numero = ant.numeroReferencia;
						ch.cliente = ant.cliente;
						
						var gc = this.create(ch);
						if(!gc){
							throw new Error('NO_CREATE ANTICIPO CHEQUE');
						}					
					}
					
					//Contabiliza el anticipo
					new ContabilidadDao().contabilizarAnticipo(ant);				
				}else{
					throw new Error('NO_CREATE ANTICIPO');
				}
			}else{
				var antModel = new Anticipo(anticipo.id);
				var chqModel = new Cheque();
				
				var oldAnt = new Anticipo(ant.id);
				oldAnt = this.load(oldAnt, oldAnt.id);

					//this.query('SELECT formaPago, numeroReferencia from ' + antModel.tablename + ' where id = ' + antModel.id)[0];
				
				//Si cambia la forma de pago. Se anula el cheque
				if(oldAnt.formaPago != ant.FORMA_PAGO_CHEQUE){
					this.query("UPDATE " + chqModel.tablename + " SET estado = '" + chqModel.ESTADO_ANULADO + "' WHERE numero = '" + oldAnt.numeroReferencia + "'");
				}
				
				this.update(anticipo);
				
				/**=====Contabiliza el anticipo======**/			
				// Si cambia la formaPago o el monto
				if(oldAnt.formaPago != ant.formaPago || oldAnt.monto != ant.monto){
					oldAnt.estado = oldAnt.ESTADO_ANULADO;
					//1. Ajuste (Crean asiento para anular contablemente)
					new ContabilidadDao().contabilizarAnticipo(oldAnt);
					//2. Creacion de nuevos asientos
					new ContabilidadDao().contabilizarAnticipo(anticipo);
				}else{
					//NO AFECTA LA CONTABILIDAD
				}								
			}
			
			this.commit();
			return true;
			
		}else{
			throw new Error('Estado ' + anticipo.estado + 'no válido');
		}		
	} catch (e) {
		logInfo(e);
		this.rollback();
		throw e;
	}
	return false;
};

AnticipoDao.prototype.eliminar = function(anticipo){
	return this.deletee(anticipo);
};

AnticipoDao.prototype.devolver = function(anticipo){
	var oldSaldo = anticipo.saldo;
	try {
		
		if(getContexto().loteCaja == null){
			throw new Error("No se puede devolver, porque no se ha abierto caja");
		}
		
		this.begin();
		
		anticipo.estado = new AnticipoConst().ESTADO_DEVUELTO;
		anticipo.loteDevuelve = getContexto().loteCaja;
		anticipo.montoDevuelve = anticipo.saldo;
		anticipo.saldo = 0;
		
		//Cambia el estado al cheque, si es que aun esta como registrado, si está finalizado ya no se hace la devolución
		if(anticipo.formaPago == new AnticipoConst().FORMA_PAGO_CHEQUE){
			var chqModel = new Cheque();
			var lstChq = this.readBy(chqModel, "WHERE numero = '" + anticipo.numeroReferencia + "'")[0];
			if(lstChq.estado == chqModel.ESTADO_REGISTRADO){
				this.query("UPDATE " + chqModel.tablename + " SET estado = '"+ chqModel.ESTADO_ANULADO + "' WHERE numero = '" + anticipo.numeroReferencia + "'");
			}else{
				throw new Error('No se puede devolver, porque el cheque ya ha sido finalizado.');
			}
		}
		
		this.update(anticipo);
		
		new ContabilidadDao().contabilizarAnticipo(anticipo);
		
		this.commit();
		return true;
	} catch (e) {
		this.rollback();
		anticipo.saldo = oldSaldo;
		throw e;
	}
	return false;
};

AnticipoDao.prototype.anular = function(anticipo){
	try {						
		this.begin();
		
		anticipo.estado = new AnticipoConst().ESTADO_ANULADO;
		anticipo.loteDevuelve = getContexto().loteCaja;
		
		//Cambia el estado al cheque, si es que aun esta como registrado, si está finalizado ya no se hace la devolución
		if(anticipo.formaPago == new AnticipoConst().FORMA_PAGO_CHEQUE){
			var chqModel = new Cheque();
			var lstChq = this.readBy(chqModel, "WHERE numero = '" + anticipo.numeroReferencia + "'")[0];
			if(lstChq.estado == chqModel.ESTADO_REGISTRADO){
				this.query("UPDATE " + chqModel.tablename + " SET estado = '"+ chqModel.ESTADO_ANULADO + "' WHERE numero = '" + anticipo.numeroReferencia + "'");
			}else{
				throw new Error('No se puede anular, porque el cheque ya ha sido finalizado.');
			}
		}
		
		this.update(anticipo);
		
		new ContabilidadDao().contabilizarAnticipo(anticipo);
		
		this.commit();
		return true;
	} catch (e) {
		this.rollback();
		throw e;
	}
	return false;
};

/**
 * Busca todas las compras
 * 
 * @return {Array} Lista de FacturaCompra
 */
AnticipoDao.prototype.buscarTodos = function(){
	var anticipo = new Anticipo();
	var lista = this.readAll(anticipo);
	return this.modelListTo(anticipo, lista);	
};

/**
 * Busca una factura por su id
 * 
 * @param {Number} id - El id de la compra
 * @return {FacturaCompra}
 */
AnticipoDao.prototype.buscarPorId = function(id){
	var anticipo = new Anticipo();
	var lista = new Array();
	try{
		lista = this.readBy(anticipo, "where id = '" + id+"'");
	}catch(e){}
	
	if(lista.length > 0){
		return this.modelTo(anticipo, lista[0]);
	}
	return null;	
};

AnticipoDao.prototype.buscarPorCliente = function(cliente){
	var anticipo = new Anticipo();
	var lista = new Array();	
	try{
		lista = this.readBy(anticipo, "where id_cliente = " + cliente.id);
	}catch(e){}
	return this.modelTo(anticipo, lista[0]);
};

AnticipoDao.prototype.buscarPendientesPorCliente = function(cliente){
	var anticipo = new Anticipo();
	var lista = new Array();	
	try{
		lista = this.readBy(anticipo, "where estado = '"+ new AnticipoConst().ESTADO_PENDIENTE +"' and id_cliente = " + cliente.id);
	}catch(e){}
	return this.modelListTo(anticipo, lista);
};

/*
AnticipoDao.prototype.buscarContabilizarUsuarioLocal = function(usuario, local){
	var anticipo = new Anticipo();
	var lista = new Array();	
	try{		
		lista = this.readBy(anticipo, "where isContabilizado = 0 and (estado = '"+ anticipo.ESTADO_PENDIENTE + "' OR estado = '"+anticipo.ESTADO_DEVUELTO+"') and " + this.fkSql('id_usuario', usuario) + " and  " + this.fkSql('id_local', local));
	}catch(e){}
	return this.modelListTo(anticipo, lista);
};

AnticipoDao.prototype.buscarContabilizarPorUsuarioLocalFecha = function(tipoFecha, usuario, local, fechaInicio, fechaFin){
	var anticipo = new Anticipo();
	var lista = new Array();	
	try{		
		lista = this.readBy(anticipo, "where isContabilizado = 0 and " +
				this.strSql('id_usuario', usuario ? usuario.id : null) +
				" and (estado ='"+ anticipo.ESTADO_PENDIENTE + "' OR estado = '"+anticipo.ESTADO_DEVUELTO+"') and " +
				tipoFecha + " >= '" + toShortDateString(fechaInicio) + "' and " +
				tipoFecha + " <= '" + toShortDateString(fechaFin) + "'"
				);
	}catch(e){}
	return this.modelListTo(anticipo, lista);
};*/

AnticipoDao.prototype.buscarPorClienteEstadoFecha = function(cliente, estado){
	var anticipo = new Anticipo();
	var lista = new Array();	
	try{		
		lista = this.readBy(anticipo, "where " +
				this.strSql('id_cliente', cliente ? cliente.id : null) +
				" and estado Like '" + (estado == 'Todos' ? '%' : estado) + "'"
				);
	}catch(e){}
	return this.modelListTo(anticipo, lista);
};