window.onload = function () {
	try{
		self = new Generador();
	}catch (e) {
		alert('Generador.onload: ' + e);
	}
};

function Generador(){
	
	this.dao = new Dao();
	this.repDao = new ReporteDao();
	this.contexto = new Context(); this.contexto = getContexto();
	
	this.wizard = $Xul('wizard');
	
	this.treeTablas = new XulTree('treeTablas', ['alias']);
	this.treeCampos = new XulTree('treeCampos', ['Field']);
	this.treeCamposSel = new XulTree('treeCamposSel', ['tablaAlias','nombre', 'titulo'],'index');
	this.treeFiltros = new XulTree('treeFiltros', ['tablaAlias','columna', 'operadorValor'],'index');	
	//this.treeRelaciones = new XulTree('treeRelaciones', ['tablaIzq','campoIzq','tablaDer', 'campoDer']);
	
	this.reporte = new Reporte();
	this.reporte = window.arguments[0];
	this.reporte.usuarioCreacion = this.contexto.usuario;
	
	this.inicializar();
	
	this.tablas = new Array();
	this.selTablas = new Array();
	this.relaciones = new Array();
	
	
	this.names = new Array();	
	this.inicializarAlias();
	
	
	var datos = this.dao.query('SHOW TABLES');
	for(var d in datos){		
		var nm = this.names[datos[d][0]];		
		datos[d].name = datos[d][0];
		datos[d].alias = nm ? nm : datos[d][0];
	}
	this.tablas = datos;
	
	this.treeTablas.setDatos(datos);
	
	this.checkTablas();
};

Generador.prototype.inicializarAlias = function () {	
	this.names['com_fac_compra'] = 'Compra';
	this.names['com_fac_compra_detalle'] = 'Compra Detalle';
	this.names['com_producto_proveedor'] = 'Producto Proveedor';
	this.names['com_proveedor'] = 'Proveedor';
	this.names['cont_asiento'] = 'Asiento Contable';
	this.names['cont_banco'] = 'Banco';
	this.names['cont_banco_cuenta'] = 'Cuenta Banco';
	this.names['cont_cheque'] = 'Cheque';
	this.names['cont_estado_plan'] = 'Estado de Planes';
	this.names['cont_estado_plan_detalle'] = 'Estado de Planes Detalle';
	this.names['cont_ingreso_gasto'] = 'Ingreso de Gasto';
	this.names['cont_lote_asientos'] = 'Lote de Asientos';
	this.names['cont_periodo_contable'] = 'Periodo Contable';
	this.names['cont_periodo_contable_local'] = 'Periodo Contable Local';
	this.names['cont_plan'] = 'Plan de Cuentas';
	this.names['cont_retencion'] = 'Retención';
	this.names['cont_retencion_detalle'] = 'Detalle de Retención';
	this.names['cont_retencion_ir'] = 'Retención de IR';
	this.names['cont_retencion_iva'] = 'Retención de IVA';
	this.names['cont_transaccion'] = 'Transacción';
	this.names['cont_transaccion_detalle'] = 'Detalle de Transacción';
	this.names['inv_kardex'] = 'Kardex';
	this.names['inv_levantamiento'] = 'Levantamiento de Inventario';
	this.names['inv_levantamiento_detalle'] = 'Levantamiento de Inventario Detalle';
	this.names['inv_linea'] = 'Linea de Producto';
	this.names['inv_marca'] = 'Marca de Producto';
	this.names['inv_producto'] = 'Producto';
	this.names['inv_stock_producto'] = 'Stock de Producto';
	this.names['inv_transferencia'] = 'Transferencia de Producto';
	this.names['inv_transferencia_detalle'] = 'Transferencia de Producto Detalle';
	this.names['rep_columna'] = 'Columna';
	this.names['rep_filtro'] = 'Filtro';
	this.names['rep_reporte'] = 'Reporte';
	this.names['rep_tabla'] = 'Tabla';
	this.names['seg_local'] = 'Local';
	this.names['seg_opcion'] = 'Opción';
	this.names['seg_parametro'] = 'Parametro';
	this.names['seg_rol'] = 'Rol de Usuario';
	this.names['seg_rol_opcion'] = 'Opción de Rol';
	this.names['seg_rol_usuario'] = 'Rol del Usuario';
	this.names['seg_usuario'] = 'Usuario';
	this.names['ven_anticipo'] = 'Anticipo';
	this.names['ven_autorizacion_sri'] = 'Autorización SRI';
	this.names['ven_cliente'] = 'Cliente';
	this.names['ven_cobro'] = 'Cobro';
	this.names['ven_cobro_cuota'] = 'Cobro de Cuota';
	this.names['ven_cobro_detalle'] = 'Cobro de Cuota Detalle';
	this.names['ven_cuota'] = 'Cuota';
	this.names['ven_fac_venta'] = 'Factura de Venta';
	this.names['ven_fac_venta_detalle'] = 'Factura de Venta Detalle';
	this.names['ven_lote_caja'] = 'Lote de Caja';
	this.names['ven_lote_caja_item'] = 'Lote de Caja Item';
	this.names['ven_proforma'] = 'Proforma';
	this.names['ven_proforma_detalle'] = 'Detalle de Proforma';
	this.names['ven_punto_facturacion'] = 'Punto de Facturación';
	this.names['ven_secuencial'] = 'Secuencial';
	this.names['ven_tipo_credito'] = 'Tipo de Crédito';
	this.names['vista_cierres_caja'] = 'Cierre de Caja';
	this.names['vista_compras'] = 'Compras';
	this.names['vista_kardex'] = 'Kardex';
	this.names['vista_levantamientos'] = 'Levantamientos';
	this.names['vista_menu'] = 'Menú';
	this.names['vista_proformas'] = 'Proformas';
	this.names['vista_secuencial'] = 'Secuencial';
	this.names['vista_stock_producto'] = 'Stock de Producto';
	this.names['vista_ventas'] = 'Ventas';

};

Generador.prototype.inicializar = function () {
	try{
		$Xul("treeTablas").addEventListener('select', function(){self.checkTablas();}, false);
		$Xul("treeCamposSel").addEventListener('select', function(){self.selectCampo();}, false);
		$Xul("treeFiltros").addEventListener('select', function(){self.selectFiltro();}, false);
		
		$Xul("btnAddCampo").addEventListener('command', function(){self.agregarCampo();}, false);
		$Xul("btnRemCampo").addEventListener('command', function(){self.removerCampo();}, false);		
		$Xul("btnAceptarCampo").addEventListener('command', function(){self.aceptCampo();}, false);
		
		$Xul("btnAgregarFiltro").addEventListener('command', function(){self.agregarFiltro();}, false);
		$Xul("btnNuevoFiltro").addEventListener('command', function(){self.nuevoFiltro();}, false);		
		$Xul("btnRemoverFiltro").addEventListener('command', function(){self.removerFiltro();}, false);
		
		$Xul('chkFiltroPredefinido').addEventListener('command', function(){self.selectChkFiltro();}, false);
		$Xul('cmbFiltro').addEventListener('command', function(){self.selectChkFiltro();}, false);
		
		$Xul('txtRepNombre').bind(this.reporte, 'nombre');
		$Xul('txtRepTitulo').bind(this.reporte, 'titulo');
		$Xul('txtRepDescripcion').bind(this.reporte, 'descripcion');
	}catch(e){
		alert(e);
	}
};

Generador.prototype.checkCampos = function () {	
	this.wizard.canAdvance = this.treeCamposSel.datos.length > 0;	
};

Generador.prototype.checkTablas = function () {	
	this.wizard.canAdvance = this.treeTablas.getSelectRows().length > 0;	
};

Generador.prototype.selectCampo = function () {
	var col = this.treeCamposSel.getSelected();
	if(col != null){
		$Xul('txtTitulo').val(col.titulo);
		$Xul('cmbOrdernar').val(col.ordenacion);
	}	
};

Generador.prototype.selectFiltro = function () {
	var f = this.treeFiltros.getSelected();
	if(f != null){
		$Xul('cmbTablaFiltros').val(f.tabla);
		$Xul('cmbFiltroCampo').val(f.columna);
		$Xul('cmbFiltro').val(f.operadorValor);
		$Xul('cmbFiltroTipo').val(f.operadorFiltro);
		$Xul('chkFiltroPredefinido').checked = f.isValorPredefinido;
		$Xul('txtFiltroValor1').val(f.valor1);
		$Xul('txtFiltroValor2').val(f.valor2);

		this.selectChkFiltro();
	}
};

Generador.prototype.selectChkFiltro = function () {
	var chk = $Xul('chkFiltroPredefinido').checked;
	var filtro = $Xul('cmbFiltro').val();
	if(chk){
		$Xul('lblFiltroValor1').show();
		$Xul('txtFiltroValor1').show();		
	
		if(filtro == 'between'){
			$Xul('lblFiltroValor2').show();
			$Xul('txtFiltroValor2').show();
		}else{
			$Xul('lblFiltroValor2').hide();
			$Xul('txtFiltroValor2').hide();
		}
				
	}else{
		$Xul('txtFiltroValor1').hide();
		$Xul('lblFiltroValor1').hide();
		$Xul('lblFiltroValor2').hide();
		$Xul('txtFiltroValor2').hide();			
	}
};

Generador.prototype.aceptCampo = function () {
	var col = this.treeCamposSel.getSelected();
	var index = this.treeCamposSel.getSelectedIndex();	
	if(col != null){
		var titulo = $Xul('txtTitulo').val().trim();
		var order = $Xul('cmbOrdernar').val();
		if(titulo == ''){
			titulo = col.nombre;
		}
		col.titulo = titulo;
		col.ordenacion = order;
		this.treeCamposSel.updateIndex(index);
	}
};

Generador.prototype.fijarTablas = function () {
	var rows = this.treeTablas.getSelectRows();	
	this.selTablas = new Array();
	for(var r in rows){
		var t = new Tabla();
		t.reporte = this.reporte;
		t.nombre = this.tablas[rows[r]].name;
		t.alias = this.tablas[rows[r]].alias;
		
		this.selTablas.push(t);
	}
	
	//Carga columnas
	for(var r in this.selTablas){
		var columns = this.dao.query('SHOW COLUMNS FROM ' + this.selTablas[r].nombre);
		this.selTablas[r].columns = columns;
		for(var c in columns){
			columns[c].table = this.selTablas[r];
		}
	}
	
	//Carga relaciones
	this.relaciones = new Array();
	this.relaciones = this.repDao.obtenerRelacionesTablas(this.selTablas);
};

Generador.prototype.showCampos = function () {
	
	this.fijarTablas();	
	this.checkCampos();
	
	$Xul('cmbTablasCampos').fillComboBox(this.selTablas, 'nombre', ['alias'], '--Seleccione--', '');	
	$Xul('cmbTablasCampos').selectedIndex = 0;
	
	$Xul('cmbTablasCampos').addEventListener('select', function(){
		self.cargarCamposTree(this.value);
	}, false);		
};

Generador.prototype.showFiltros = function () {
	
	$Xul('cmbTablaFiltros').fillComboBox(this.selTablas, 'nombre', ['alias'], '--Seleccione--', '');	
	$Xul('cmbTablaFiltros').selectedIndex = 0;
	
	$Xul('cmbFiltroCampo').fillComboBox(new Array(), 'nombre', ['nombre'], '--Seleccione--', '');
	$Xul('cmbTablaFiltros').selectedIndex = 0;
	
	$Xul('cmbTablaFiltros').addEventListener('select', function(){
		self.cargarColumnas(this.value,'cmbFiltroCampo');
	}, false);		
};

Generador.prototype.showReporte = function () {
	this.reporte.tablas = this.selTablas;
	this.reporte.columnas = this.treeCamposSel.getDatos();
	this.reporte.filtros = this.treeFiltros.getDatos();
	this.reporte.relaciones = this.relaciones;	
	var sql = this.reporte.generarSql();
	
	$Xul('txtRepSql').val(sql);
};

Generador.prototype.cargarCamposTree = function (nombreTabla) {		
	var tabla = this.getTabla(nombreTabla);	
	if(tabla != null){
		this.treeCampos.setDatos(tabla.columns);
	}else{
		this.treeCampos.setDatos(new Array());
	}
};

Generador.prototype.cargarColumnas = function (v, cmb) {		
	var tabla = this.getTabla(v);
	if(tabla != null){
		$Xul(cmb).fillComboBox(tabla.columns, 'Field', ['Field'], '--Seleccione--', '');
		$Xul(cmb).selectedIndex = 0;
	}else{
		$Xul(cmb).fillComboBox(new Array(), 'Field', ['Field'], '--Seleccione--', '');
		$Xul(cmb).selectedIndex = 0;
	}
};

Generador.prototype.removerCampo = function () {
	var i = this.treeCamposSel.getSelectedIndex();
	if(i >= 0){
		if(confirm('¿Desea eliminar este campo?','Eliminar')){
			this.treeCamposSel.removeByIndex(i);
		}
	}
};

Generador.prototype.removerFiltro = function () {
	var i = this.treeFiltros.getSelectedIndex();
	if(i >= 0){
		if(confirm('¿Desea eliminar este filtro?','Eliminar')){
			this.treeFiltros.removeByIndex(i);
		}
	}
};

Generador.prototype.agregarCampo = function () {
	var tn = $Xul('cmbTablasCampos').val();
	var campo = this.treeCampos.getSelected();
	if(campo != null){
		var noExists = true;
		var campos = this.treeCamposSel.getDatos();
		for(var i=0; i < campos.length ; i++){
			var c = campos[i];
			if(c.tabla == campo.table.nombre && c.nombre == campo.Field){
				noExists = false;
			}
		}
		if(noExists){
			var col = new Columna();
			col.reporte = this.reporte;			
			col.titulo = campo.Field;
			col.nombre = campo.Field;
			col.ordenacion = col.ORDENACION_NINGUNO;
			col.tabla = tn;
			col.tablaAlias = this.getTabla(tn).alias;
			
			this.treeCamposSel.add(col);
		}else{
			alert('Ya existe este campo');
		}
	}
	this.checkCampos();
};

Generador.prototype.nuevoFiltro = function () {	
	this.treeFiltros.select(-1);
};

Generador.prototype.agregarFiltro = function () {
	var vt = $Xul('cmbTablaFiltros').val();
	var vc = $Xul('cmbFiltroCampo').val();
	var vf = $Xul('cmbFiltro').val();
	var vv1 = $Xul('txtFiltroValor1').val();
	var vv2 = $Xul('txtFiltroValor2').val();
	var pred = $Xul('chkFiltroPredefinido').checked;
	var tipo = $Xul('cmbFiltroTipo').val();
	
	var fil = this.treeFiltros.getSelected();
	var index = this.treeFiltros.getSelectedIndex();
	
	if(vt != '' && vc != ''){
		var column = this.getColumna(vt, vc);
		var col = new Filtro();
		col = fil != null ? fil : col;
		col.reporte = this.reporte;
		col.columna = vc;
		col.tabla = vt;
		col.operadorValor = vf;
		col.operadorFiltro = tipo;
		col.isValorPredefinido = pred;
		col.valor1 = vv1;
		col.valor2 = vv2;
		col.tipoDato = column.Type;
		col.tablaAlias = col.tablaAlias = this.getTabla(vt).alias;
		
		if(fil != null){
			this.treeFiltros.updateIndex(index);
		}else{
			this.treeFiltros.add(col);
		}
	}
};

Generador.prototype.getTabla = function (nombreTabla) {
	for(var t in this.selTablas){
		var tabla = this.selTablas[t];
		if(tabla.nombre == nombreTabla){
			return tabla;
		}
	}
	return null;
};

Generador.prototype.getColumna = function (nombreTabla, nombreColumna) {
	var table =this.getTabla(nombreTabla);
	
	if(table != null){
		for(var i = 0; i < table.columns.length; i++){
			var c = table.columns[i];
			if(c.Field == nombreColumna){
				return c;
			}
		}
	}
	
	return null;
};

Generador.prototype.finalizar = function () {	
	try {	
		var v = window.validar();
		if(v){
			var b = this.repDao.guardar(this.reporte);
			return b;
		}else{
			return false;
		}		
	} catch (e) {
		alert('Ha ocurrido un error al guardar el reporte: ' + e);
		return false;
	}
};

