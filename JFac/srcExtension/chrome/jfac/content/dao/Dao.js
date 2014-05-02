function Dao() {
	this.oDb = new DataBase();
};

Dao.prototype=new Object();

Dao.prototype.create = function(model) {	
	if (this.oDb) {
		this.oDb.setTable(model);
		return this.oDb.create();
	}	
	return false;
}; 

Dao.prototype.update = function(model){
	if (this.oDb) {
		this.oDb.setTable(model);
		return this.oDb.update();
	}	
	return false;
}  ;

Dao.prototype.updateWhere = function(model, where){
	if (this.oDb) {
		this.oDb.setTable(model);
		return this.oDb.updateWhere(where);
	}	
	return false;
}  ; 

Dao.prototype.read = function(model)
{
	if (this.oDb) {
		this.oDb.setTable(model);
		return this.oDb.read();
	}
	return false;
} ; 

Dao.prototype.begin = function()
{
	if (this.oDb) {
		return this.oDb.beginTransaction();
	}
	return false;
};

Dao.prototype.commit = function()
{
	if (this.oDb) {
		return this.oDb.commitTransaction();
	}
	return false;
};

Dao.prototype.rollback = function()
{
	if (this.oDb) {
		return this.oDb.rollbackTransaction();
	}
	return false;
};

/**
 * Carga una entidad mediante su modelo e id
 * @param  {Model} model
 * @param  {Number} id
 * @return {Model}
 */
Dao.prototype.load = function(model, id)
{
	try {
		if(this.oDb){
			this.oDb.setTable(model);
			var lst = this.oDb.readBy("where id = " + id);			
			if(this.oDb.lista.length > 0){
				return this.modelTo(model, this.oDb.lista[0]);
			}
		}
	} catch (e) {
		alert('Dao.load(): ' + e);
		return null;
	}
};

Dao.prototype.fkSql = function(propiedad, valor){
	return propiedad + (valor && valor != -1 && valor != 'undefined'? "="+valor : " is not null");
};

Dao.prototype.strSql = function(propiedad, valor){
	return propiedad + (valor ? "='"+valor+"'" : " is not null");
};

Dao.prototype.numSql = function(propiedad, valor){
	return propiedad + (valor ? "="+valor : " is not null");
};

/***
 * Retorna un arrreglo de objetos
 * @param {String} sql
 * @return {Array}
 */
Dao.prototype.query = function(sql)
{
	if (this.oDb) {
		return this.oDb.query(sql);
	}	
	return new Array();
};

Dao.prototype.relation = function(ltable, rtable)
{
	if (this.oDb) {
		return this.oDb.relation(ltable, rtable);
	}	
	return new Array();
};

Dao.prototype.cacheQueryList = function(){
	if (this.oDb) {
		return this.oDb.query(getContexto().cacheQuery);
	}	
	return new Array();
};

Dao.prototype.cacheQueryFirst = function(sql){
	if (this.oDb) {
		var lst = this.oDb.query(getContexto().cacheQuery + ' ' + sql);
		if(lst.length > 0){
			return lst[0];
		}
	}	
	return null;
};

/**
 * Obtiene el numero de dias transcurridos desde la fecha del sistema hasta la fecha enviada
 * @param {Date} fechaInicial
 * @param {Date} fechaFinal
 * @return {Number}
 */
Dao.prototype.daysToNow = function(fecha)
{
	var d = 0;
	if (this.oDb) {
		d = (this.oDb.query("SELECT DATEDIFF(curdate(),'"+fecha.toString('yyyy-MM-dd')+"') as dias;")[0][0]) * 1;
	}	
	return d;
};

Dao.prototype.daysFromTo = function(fechaInicio, fechaFinal)
{
	var d = 0;
	if (this.oDb) {
		d = (this.oDb.query("SELECT DATEDIFF('"+fechaFinal.toString('yyyy-MM-dd')+"','"+fechaInicio.toString('yyyy-MM-dd')+"') as dias;")[0][0]) * 1;
	}	
	return d;
};

Dao.prototype.count = function(model, where)
{
	var d = 0;
	if (this.oDb) {
		d = (this.oDb.query("SELECT COUNT(*) as numeroRegistros FROM " + model.tablename + (where ? " " + where : ""))[0][0]) * 1;
	}	
	return d;
};

Dao.prototype.updateStrField = function(model, field)
{
	if (this.oDb) {
		this.oDb.setTable(model);
		return this.oDb.updateStrField(field);
	}	
	return false;
};

Dao.prototype.updateField = function(model, field)
{
	if (this.oDb) {
		this.oDb.setTable(model);
		return this.oDb.updateField(field);
	}	
	return false;
};


Dao.prototype.refresh = function(model)
{
	if (this.oDb) {
		this.oDb.setTable(model);
		this.oDb.read(model);		
		return this.modelToSelf(model, this.oDb.lista[0]);
	}	
	return null;
} ; 

/**
 * Obtiene un [[],[]] de una determinada entidad
 * @param {Entity} model
 * @param {Number} limit
 * @return {Array}
 */
Dao.prototype.readAll = function(model, limit)
{
	if (this.oDb) {
		this.oDb.setTable(model);
		this.oDb.readAll(limit);
	}
	return this.oDb.lista;
}  ;  

Dao.prototype.readBy = function( model, where, order )
{
	if (this.oDb) {
		this.oDb.setTable(model);
		this.oDb.readBy( where, order );
	}
	
	return this.oDb.lista;
};

Dao.prototype.readAllOrder = function( model, orderBy )
{
	if (this.oDb) {
		this.oDb.setTable(model);
		this.oDb.readAllOrder( orderBy );		
	}
	
	return this.oDb.lista;
};

Dao.prototype.getErased = function(lista1, lista2){
	var d = new  Array();
	for ( var i = 0; i < lista1.length; i++) {
		var e = false;
		for ( var j = 0; j < lista2.length; j++) {
			if(lista1[i].id == lista2[j].id){
				e = true;
			}
		}
		
		if(e == false){
			d.push(lista1[i]);
		}
	}
	return d;
};

 

Dao.prototype.deletee = function(model){
	if (this.oDb) {
		this.oDb.setTable(model);
		return this.oDb.deletee();
	}	
	return false;
};

Dao.prototype.deleteBy = function(model, where){
	if (this.oDb) {
		this.oDb.setTable(model);
		return this.oDb.deleteBy(where);
	}	
	return false;
};

Dao.prototype.modelListTo = function(model, lista, loadEntidades, loadColecciones){
	
	this.listaMem = new Array();
	
	var lis = new Array();
	for(var i = 0; i < lista.length; i++){
		var ox = this.modelTo(model, lista[i], loadEntidades, loadColecciones);
		if(ox != null){
			lis.push(ox);
		}
	}
	return lis;
};



Dao.prototype.modelTo = function(model, obj, loadEntidades, loadColecciones){
	var om = null;
	try{
		//logInfo('loadEntidades: ' + loadEntidades + '; loadColecciones: ' + loadColecciones);
		
		om = eval('new ' + model.classname + '();');
		this.modelToFields(om, obj);
		if(loadEntidades == null || loadEntidades == true){
			this.modelToOneToOne(om, obj);
		}
		if(loadColecciones == null || loadColecciones == true){
			this.modelToOneToMany(om);
		}
	}catch(e){
		alert("Dao.modelTo(): " + e);
	}
	return om;
};

Dao.prototype.modelToSelf = function(model, obj){
	try{		
		var om = model;		
		this.modelToFields(om, obj);
		this.modelToOneToOne(om, obj);
		this.modelToOneToMany(om);
	}catch(e){
		alert("Dao.modelToSelf(): " + e);
	}	
};

Dao.prototype.modelToFields = function(om, obj){
	try {
		var classModel = eval('new '+om.classname+'();'); 
		var keyset = classModel.mapFields('');		
		
		for (var k in keyset){
			var ev = eval('classModel.'+k);
			
			if(ev instanceof Date){
				var v = toDate(eval('obj.' + k));
				eval('om.'+k + '= v;'); 
			}else{
				if(typeof(ev) == 'boolean'){					
					var v = eval('obj.' + k) * 1;
					v = v == 1? true:false;
					eval('om.'+k + '=v;'); 
				}else{
					if(typeof(ev) == 'number'){
						var v = eval('obj.' + k) * 1;
						eval('om.'+k + '=v');						
					}else{
						eval('om.'+k + '=' + 'obj.' + k );
					}
				}
			}
			
		}
		
		var keysetPk = om.mapPrimaryKeys('');
		for (var k in keysetPk){    		    		
			eval('om.'+k + '=' + 'obj.' + k );
		}
	} catch (e) {
		alert("Dao.modelToFields(): " + e);
	}
};

Dao.prototype.modelToOneToOne = function(om, obj){
	var keysetOneToOne = new Array();
	try {
		var classModel = eval('new '+om.classname+'();');
		keysetOneToOne = classModel.mapOneToOne();		
	} catch (ex) {
		if (((""+ex).indexOf('.mapOneToOne is not a function') > 0) == false){
			throw ex;
		}		
	}
	
	for (var k in keysetOneToOne){
		try {
			var propiedad = k;
			
			var fk = keysetOneToOne[k][0];
			var pk = keysetOneToOne[k][1];
			var mod = keysetOneToOne[k][2]; //modelo					
			mod[pk] = obj[fk];
			
			if(obj[fk]){
				if(this.listaMem){
					var menent = null;
					
					if(this.listaMem[mod.classname]){
					}else{
						this.listaMem[mod.classname] = new Array();
					}
					
					for(var m = 0; m < this.listaMem[mod.classname].length; m++){
						for(var im = 0; im < this.listaMem[mod.classname].length; im++){
							if(this.listaMem[mod.classname][im][pk] == obj[fk]){
								menent = this.listaMem[mod.classname][im];
								break;
							}
						}								
					}
					
					if(menent){
						mod = menent;
					}else{
						this.read(mod);						
						this.listaMem[mod.classname].push(mod);
					}							
				}else{					
					this.read(mod);
					this.modelToFields(mod, this.oDb.lista[0]);
				}	
			}					
			om[propiedad] = mod;
		} catch (exx) {
			throw exx;
		}
	}
};

Dao.prototype.modelToOneToMany = function(om){
	try {
		var classModel = eval('new '+om.classname+'();');
		var keysetOneToMany = classModel.mapOneToMany();
		
		for (var k in keysetOneToMany){
			try {
				var propiedad = k;
				
				//Limpia el array
				om[propiedad] = new Array();
				
				var propitem = keysetOneToMany[k][0];
				var fk = keysetOneToMany[k][1]; // fk en el padre							
				var pk = keysetOneToMany[k][2]; // pk
				var mod = keysetOneToMany[k][3]; //modelo
				
				var list = this.readBy(mod, "where " + fk +" = "+ om[pk]);
				for(var i = 0 ; i < list.length; i++){
					
					var item = eval('new ' + mod.classname + '('+list[i][pk]+');');
					this.modelToFields(item, list[i]);
					
					try {
						//map one-one
						var ones = new Array();
						try {
							ones = mod.mapOneToOne('');
						} catch (e) {
							if (((""+e).indexOf('.mapOneToOne is not a function') > 0) == false){
								throw e;
							}
						}
						
						for (var k1 in ones){
							try {
								var propiedad1 = k1;
								var fk1 = ones[k1][0];
								var pk1 = ones[k1][1];
								var modi = ones[k1][2]; //modelo					
								modi[pk1] = list[i][fk1];
								// La propiedad a leer es el padre de la entidad 
								if(propitem == propiedad1){
									item[propiedad1] = om;
								}else{								
									if(list[i][fk1]){
										this.read(modi);
										item[propiedad1] = modi;
									}
								}
							} catch (e) {
								alert('Dao.modelToOneToMany(): ' + e);
							}
						}						
					} catch (e) {
						alert('Dao.modelToOneToMany(): ' +e);
					}
					item[propitem] = om;						
					om[propiedad].push(item);								
				}
			}catch(r){}
		}
	} catch (exx) {}
};
