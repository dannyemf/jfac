/**
 * Clase para manejar la generación de consultas para mysql
 * y control de conexión con la aplicación XulFacServer
 * Aplicación php que hace las operaciones sobre la base de datos)
 * @param {Entidad} table
 * @return
 */
function DataBase(table){
	
	this._table = (table ? table : null);
	this.status = false;
	this.lista = new Array();
	this.evento = '';
	
	this.url = '';
	this.urlBase = "";
	this.isMostrarSql = true;	
};

DataBase.prototype = new Object();

/**
 * Obtiene las preferencias como la ruta de XulFacServer y si debe mostrar las senetencias sql ejecutadas
 * @return
 */
DataBase.prototype.refreshPrefs = function(){
	Preferencias.startup();
	this.url = Preferencias.server + "server?CMD=";
	this.urlBase = Preferencias.server + "";
	this.isMostrarSql = Preferencias.mostrar_sql;
};

/**
 * Lleana un modelo con el resultado de una consulta
 * @param {Array} dataset
 * @return
 */
DataBase.prototype.fill = function( dataset ) {
    try {    	
    	this.status = false;    	
    	for (var i=0; i<dataset.length; i++){
    		this.status = true;
    		var f = dataset[i];
    		for (var key in f) {
    			this._table[key] = f[key];    			
    		}
    	}
    	this.lista=dataset;
	} catch (e) {
		alert("Error: coping data. "+e);
	}   		
};

/**
 * Ejecuta la sentencia sql enviándola a XulFacServer
 * @param {String} sql
 * @param {String} evento
 * @return
 */
DataBase.prototype.execute = function( sql, evento, cmd ){
	this.refreshPrefs();
	this.evento = evento || null;
	this.status = false;
	cmd = cmd ? cmd : 'QUERY&QUERY=';
		
	var peticion = this.url+cmd+''+ (encodeURI(sql));	
	//var peticion = this.url+'QUERY&QUERY='+window.escape(sql);
	
	this.lista = new Array();
	
	// Comentar la linea en producción
	if(this.isMostrarSql) {
		logInfo(peticion);
		logInfo(sql);
	}	
	
	try {
		// Damos Privilegios
		//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
		
		// Ejecuta la peticion
		var phpRequest = new XMLHttpRequest();
		phpRequest.my = this;
		//open(metodo, url, async (false el metodo no pasa hasta que de rta, user, pw))		
		phpRequest.open('GET', peticion, false);
		phpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		
		try {phpRequest.send(null);} catch (e) {}		
		
		if (phpRequest.status == 200){
			this.status = true;
			try {				
				
				if (this.evento == 'READ'){					
					this.fill( eval(phpRequest.responseText));
					//this.lista = (eval(phpRequest.responseText));
				}
				
				if (this.evento == 'READBY') {						
					this.lista = eval(phpRequest.responseText);					
				}
				
				if (this.evento == 'CREATE'){
					if (isNaN(phpRequest.responseText) == false){
						this.status = true;											
						this._table.id = phpRequest.responseText * 1;
					}else{
						throw new Error('NO_CREATE');
					}
				}
				
				if (this.evento == 'READQRY'){					
					this.lista = eval(phpRequest.responseText);
				}
				
				if (this.evento == 'DELETE'){    
					this.status =  eval(phpRequest.responseText);
				}
				
				if (this.evento == 'UPDATE'){
					if(isNaN(phpRequest.responseText) == false){
						this.status = true;
					}else{
						throw new Error('NO_UPDATE');
					}
				}
				
				if (this.evento == 'BEGIN'){    
					if(isNaN(phpRequest.responseText) == false){
						this.status = true;
					}else{
						throw new Error('NO_BEGIN');
					}
				}
				
				if (this.evento == 'COMMIT'){    
					if(isNaN(phpRequest.responseText) == false){
						this.status = true;
					}else{
						throw new Error('NO_COMIT');
					}
				}
				
				if (this.evento == 'ROLLBACK'){    
					if(isNaN(phpRequest.responseText) == false){
						this.status = true;
					}else{
						throw new Error('NO_ROLLBACK');
					}
				}
				
			} catch(e) {
				this.status = false;
				logInfo(phpRequest.responseText);
				alert(phpRequest.responseText+"\n\nSql: " + sql);
				throw e;
			}
		}else{
			if(this.isMostrarSql) logInfo(sql + "	--->	FALLÓ....");
			if(this.isMostrarSql) logInfo(phpRequest.responseText);
		}
	} catch(e) {
		if(this.isMostrarSql) logInfo(sql + "	--->	FALLÓ GRAVE : " + e);
		throw("Error: Remote sql. " + e );
	}
};

DataBase.prototype.getInsertPart = function(){
	//INSERT INTO Usuario (login , cedula , clave , nombres , apellidos , id) VALUES ('' , '0000000000' , '' , '' , '' , 0)
	var insert = '(';
	try {				
		var coma = false;
		
		var fields = this._table.mapFields( "'" );		
		for(var k in fields) {
			insert += ((coma)?  ' , ' : '') + k; coma = true;
		}
		
		var oneToOnes = new Array();
		try{
			oneToOnes= this._table.mapOneToOne( "'" );
		}catch(ex){
			if (((""+ex).indexOf('.mapOneToOne is not a function') > 0) == false){
				throw ex;
			}
		}		
		for(var k in oneToOnes) {
			insert += ((coma)?  ' , ' : '') + oneToOnes[k][0]; coma = true;
		}
		
		var primarys = this._table.mapPrimaryKeys( "'" );
		for(var k in primarys) {
			insert += ((coma)?  ' , ' : '') + k; coma = true;
		}
		
		insert += ') VALUES (';
		
	    coma = false;
		for(var i in fields) {			
			insert += ((coma)? ' , ' : '') + (fields[i]);
			coma = true;
		}
		
		for(var i in oneToOnes) {
			insert += ((coma)? ' , ' : '') + ( this._table[i] != null && this._table[i]['id'] > 0 ? this._table[i].id : 'NULL' );
			coma = true;
		}
		
		for(var i in primarys) {
			insert += ((coma)? ' , ' : '') + (primarys[i]);
			coma = true;
		}
		
	}catch (e) {
    	alert(e+"; insert=" + insert);
    	throw e;
	}
	
	insert += ')';
	return insert;
};

DataBase.prototype.getWherePart = function(){
	var f = this._table.mapPrimaryKeys( "'" );
	var and = false;
	var where = '';
	for(var key in f) {
		where += ((and)? ' AND ' : '') + key + '=' +f[key];
		and = true;
	}
	return 'WHERE ' + where;
};


DataBase.prototype.getUpdatePart = function(){
    var f = this._table.mapFields( "'" );
    var o = new Array();
    try {
    	o = this._table.mapOneToOne( "'" );
	} catch (e) {
		if (((""+e).indexOf('.mapOneToOne is not a function') > 0) == false){
			throw e;
		}
	}
    
    var coma = false;
    var update = '';
    
	for(var key in f) {
		update += ((coma)? ' , ' : '') + key + '=' +f[key];
		coma = true;
	}
	
	for(var i in o) {
		update += ((coma)? ' , ' : '') + ( (this._table[i] != null && this._table[i]['id'] > 0) ? (o[i][0] + ' = ' + this._table[i].id) : (o[i][0] + ' = NULL') );
		coma = true;
	}
	
	
    return update;
};

/**
 * @nota	Ejecuta cualquier consulta y retorna un arreglo de objetos de la consulta
 */
DataBase.prototype.query = function( s ){
	s = s.trim();
	if(s.charAt(s.length - 1) != ';'){
		s = s+";";
	}
	this.execute(s, 'READQRY');
	return this.lista;
};

DataBase.prototype.relation = function(ltable, rtable  ){	
	this.execute('&table_name='+ltable+'&referenced_table_name='+ rtable, 'READQRY','GETRELACION');
	return this.lista;
};

DataBase.prototype.create = function() {
    var sql = 'INSERT INTO ' + this._table.tablename + ' ' + this.getInsertPart()+';';
    this.execute(sql, 'CREATE');
    return this.status;
};

DataBase.prototype.read = function(){
    var s = 'SELECT * FROM '+this._table.tablename+' '+this.getWherePart()+';';
    this.execute(s, 'READ');
    return this.status;
};

DataBase.prototype.readAll = function(limit) {
	var s = 'SELECT * FROM '+this._table.tablename + (limit ? ' LIMIT ' + limit : '')+';';
	this.execute(s, 'READQRY');
	return this.status;
};

DataBase.prototype.readBy = function( where, order ) {
	var s = 'SELECT * FROM '+this._table.tablename+' '+(where ? where : '') + ' ' + (order ? order : '')+';';
	this.execute(s, 'READBY');
	return this.status;
};

DataBase.prototype.readAllOrder = function( orderBy ) {
	var s = 'SELECT * FROM '+this._table.tablename+' '+ (orderBy ? orderBy : '')+';';
	this.execute(s, 'READBY');
	return this.status;
};



DataBase.prototype.update = function() 
{
    var s = 'UPDATE '+this._table.tablename+' SET '+this.getUpdatePart()+' ';
    s += this.getWherePart()+';';    
    this.execute(s, 'UPDATE');
    return this.status;
};

DataBase.prototype.updateWhere = function(where) 
{
    var s = 'UPDATE '+this._table.tablename+' SET '+this.getUpdatePart()+' ';
    s += ' ' + where + ';';    
    this.execute(s, 'UPDATE');
    return this.status;
};

DataBase.prototype.updateStrField = function(field) 
{
    var s = 'UPDATE '+this._table.tablename+' SET '+ field + " = '" + eval("this._table."+field) + "' ";
    s += this.getWherePart() + ';';    
    this.execute(s, 'UPDATE');
    return this.status;
};

DataBase.prototype.updateField = function(field) {
	var valor = 'NULL';
	var val =  this._table[field];
	
	if(typeof(val) == 'boolean'){
		valor = val ? '1' : '0';
	}else{
		if(val instanceof Date){
			valor = val.toString("yyyy-mm-dd HH:mm:ss");
		}else{
			valor = val;
		}		
	}	
	
    var s = 'UPDATE '+this._table.tablename+' SET '+ field + " = '" + valor + "' ";
    s += this.getWherePart()+';';
    
    this.execute(s, 'UPDATE');
    return this.status;
};

DataBase.prototype.deletee = function(){
    var s = 'DELETE FROM ' + this._table.tablename + ' ' + this.getWherePart()+';';
    this.execute(s, 'DELETE');
    return this.status;
};

DataBase.prototype.deleteBy = function(where){
    var s = 'DELETE FROM ' + this._table.tablename + ' WHERE ' + where+';';
    this.execute(s, 'DELETE');
    return this.status;
};


DataBase.prototype.setTable = function( val ) 
{
    this._table = val;
};
    
DataBase.prototype.getTable = function() 
{
    return this._table;
};

DataBase.prototype.beginTransaction = function(){
	this.execute('BEGIN', 'BEGIN');
    return this.status;
};

DataBase.prototype.commitTransaction = function(){
	this.execute('COMMIT', 'COMMIT');
    return this.status;
};

DataBase.prototype.rollbackTransaction = function(){
	this.execute('ROLLBACK', 'ROLLBACK');
	return this.status;	
};

var op = new XMLHttpRequest();
DataBase.prototype.verificarConexion = function(){
	this.status = false;
	this.refreshPrefs();
	try {
		var pet = this.url+'CONEXION';
		//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");			
		op.my = this;
		op.open('GET',  pet, false);		
		try {op.send(null);} catch (e) {}		
		if (op.status == 200){ 
			this.status = true;
			logInfo(this.url + "	--->	" + op.responseText);
		}else{
			logInfo(this.url + "	--->	No existe conexión");
		}
	} catch(e) {
		alert('Server: ' + e);
	}
	return this.status;
};