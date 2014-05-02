/**
 * Contexto de sesion. 
 * Se almacena sobre el objeto window de typo jfac:main
 * 
 */
function Context(){
	
	this.main = new IMain(false);
	//Declaración de atributos
	this.usuario = new Usuario();	
	this.local = new Local();	
	this.loteCaja = new LoteCaja();
	this.puntoFacturacion = new PuntoFacturacion();	
	this.periodo = new PeriodoContable();
	
	this.iva = 0;
	this.rucEmpresa = '';
	this.nombreSistema = '';
	this.nombreEmpresa = '';
	this.nombrePropietario = '';
	this.contribuyente = '';
	this.direccionMatriz='';
	
	//Restaura entidades que no deben instanciarce directamente,
	//sino que se fijan conforme se vaya iniciando el contexto
	this.loteCaja = null;	
	
	//Cache de la busquedas de entidades
	this.cacheListaPlanes = new Array();
	this.cacheListaProductos = new Array();
	this.cacheListaStockProductos = new Array();
	//Cache de carga en combos, etc
	this.cacheListaLocales = new Array();
	this.cacheListaPeriodos = new Array();
	this.cacheListaProveedores = new Array();
	this.cacheListaUsuarios = new Array();
	this.cacheQuery = '';	
};

Context.prototype = new Object();

Context.prototype.init = function(){
	var pDao = new ParametroDao();
	try {
		var cnt = new ParametroConst();
		this.nombreSistema = pDao.obtener(cnt.NOMBRE_SISTEMA).valor;
		this.nombreEmpresa = pDao.obtener(cnt.NOMBRE_EMPRESA).valor;
		this.nombrePropietario = pDao.obtener(cnt.NOMBRE_PROPIETARIO).valor;
		this.rucEmpresa = pDao.obtener(cnt.RUC_PROPIETARIO).valor;
		this.contribuyente = pDao.obtener(cnt.FAC_CONTRIBUYENTE).valor;
		this.direccionMatriz = pDao.obtener(cnt.DIRECCION_EMPRESA).valor;
		this.iva = pDao.obtener(cnt.IVA).valor * 1;
	} catch (e) {
		alert(e);
		throw e;
	}	
};

Context.prototype.getLocales = function(){
	var dao = new LocalDao();
	if(this.cacheListaLocales.length != dao.count(new Local())){
		try {
			this.cacheListaLocales = dao.obtenerTodos();
		} catch (e) {
			this.cacheListaLocales = new Array();
		}
	}	
	return this.cacheListaLocales;
};

Context.prototype.getPeriodosContables = function(){
	var dao = new PeriodoContableDao();
	if(this.cacheListaPeriodos.length != dao.count(new PeriodoContable())){
		try {
			this.cacheListaPeriodos = dao.obtenerTodos();
		} catch (e) {
			this.cacheListaPeriodos = new Array();
		}
	}	
	return this.cacheListaPeriodos;
};

Context.prototype.getProveedores = function(){
	var dao = new ProveedorDao();
	if(this.cacheListaProveedores.length != dao.count(new Proveedor())){
		try {
			this.cacheListaProveedores = dao.buscarTodos();
		} catch (e) {
			this.cacheListaProveedores = new Array();
		}
	}	
	return this.cacheListaProveedores;
};

Context.prototype.getUsuarios = function(){
	var dao = new UsuarioDao();
	if(this.cacheListaUsuarios.length != dao.count(new Usuario())){
		try {
			this.cacheListaUsuarios = dao.buscarTodos();
		} catch (e) {
			this.cacheListaUsuarios = new Array();
		}
	}	
	return this.cacheListaUsuarios;
};



Context.prototype.testConection = function(){
	try {
		var lst = new DataBase().query('SELECT COUNT(*) FROM ' + new Usuario().tablename);
		if(lst.length > 0){
			return true;
		}
	} catch (e) {
		alert(e);
	}
	return false;
};

/**
 * Obtiene el contexto actual. 
 * Aqui se almacena el usuario logeado, su local, etc.
 * @return {Context}
 */
function getContexto(){
	var c = new Context();
	
	try {
		c = getMainWindow().contexto;
	} catch (e) {}
	
	return c;
}