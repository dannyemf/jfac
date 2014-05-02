function ReporteConst(){
};
ReporteConst.prototype=new Object();

function Reporte(){
	this.classname = 'Reporte';
	this.tablename = 'rep_reporte';
	
	this.id= -1;	
	this.nombre = '';
	this.descripcion = '';
	this.titulo = '';
	this.fechaCreacion = new Date();
	
	this.usuarioCreacion = new Usuario(); 
	
	
	this.tablas = new Array();
	this.columnas = new Array();
	this.filtros = new Array();
	this.relaciones = new Array();
};

Reporte.prototype=new ReporteConst();

Reporte.prototype.mapFields = function( q ) {
	var f = new Array();			
	f['nombre']	= q+this.nombre+q;
	f['descripcion']	= q+this.descripcion+q;
	f['titulo']	= q+this.titulo+q;
	f['fechaCreacion']	= q + this.fechaCreacion.toString("yyyy-MM-dd HH:mm:ss") + q;
	return f;
};

Reporte.prototype.mapPrimaryKeys = function( q ) {
	var f = new Array();
	f['id']= this.id == -1 ? 'NULL' : this.id;
	return f;
};

Reporte.prototype.mapOneToOne = function( q ) {
	var f = new Array();
	//propiedad     FK           PK    model			
	f['usuarioCreacion'] = ['id_usuario','id', new Usuario()];	
	return f;
};

Reporte.prototype.mapOneToMany = function( q ) {
	var f = new Array();
	//propiedad    prop_item  fk_item    pk_item    model
	f['tablas'] 	 = ['reporte', 'id_reporte', 'id', new Tabla()];
	f['columnas'] 	 = ['reporte', 'id_reporte', 'id', new Columna()];
	f['filtros'] 	 = ['reporte', 'id_reporte', 'id', new Filtro()];
	return f;
};


Reporte.prototype.generarSql = function() {
	var sql = "SELECT ";
	var orderBy = "";
	
	try {
		//Fields		
		var fields = this.columnas;
		for(var f in fields){
			var field = fields[f];			
			sql += (f == 0 ? "" : ", ") + field.tabla + "." + field.nombre + " '" + field.titulo+"'";
			if(field.ordenacion != ""){
				orderBy += (f == 0 ? "" : ", ") + field.tabla + "." + field.nombre + " " + field.ordenacion; 
			}
		}

		//from
		sql += " FROM ";		
		for(var t in this.tablas){
			var tabla = this.tablas[t];
			sql += (t == 0 ? "" : ", ") + tabla.nombre;
		}
		
		//where
		var relaciones = this.relaciones;		
		if(relaciones.length > 0){
			sql += " WHERE (";
			for(var k in relaciones){
				var r = relaciones[k];
				sql += (k == 0 ? "(" : "AND (") + r.tablaOrigen + "." + r.columnaOrigen + " = " + r.tablaReferenciada + "." + r.columnaReferenciada + ") ";
			}
			sql += ')';
		}
		
		var filtros = this.filtros;
		if(filtros.length > 0){
			if(relaciones.length == 0){
				sql += " WHERE (";
			}else{
				sql += " AND (";
			}
			
			for(var k in filtros){
				var r = filtros[k];
				var op = ' = ';				
				
				switch(r.operadorValor){
					case 'eq': 		op = " = '_valor_' "; break;
					case 'may': 	op = " > '_valor_' "; break;
					case 'mayeq': 	op = " >= '_valor_' "; break;
					case 'men': 	op = " < '_valor_'"; break;
					case 'meneq': 	op = " <= '_valor_' "; break;
					case 'like': 	op = " LIKE '%_valor_%' "; break;
					case 'ilike': 	op = " LIKE '%_valor_' "; break;
					case 'rlike': 	op = " LIKE '_valor_%' "; break;
					case 'between': op = " BETWEEN '_valor_' AND '_valor2_' "; break;
					case 'in': 	op = " IN (_valor_) "; break;
				}
				
				//if(r.isValorPredefinido == true || r.isValorPredefinido == 1){
					op = op.replace("_valor_", r.valor1);
					op = op.replace("_valor2_", r.valor2);
				//}
				
				var cam = r.tabla + "." + r.columna;
				sql += (k == 0 ? "(" : " " + r.operadorFiltro + " (") + cam + op + ")";
			}
			
			sql += ')';
			
		}
		
		if(orderBy != ""){
			sql += " ORDER BY " + orderBy; 
		}
		
		return sql;
		
	} catch (e) {
		alert("Reporte.generarSql: " + e);
		return null;
	}	
};