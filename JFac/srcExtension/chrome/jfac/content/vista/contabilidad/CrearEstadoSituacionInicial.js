window.onload = function () {
	try {
		self = new CrearEstadoSituacionInicial();
	} catch (e) {
		closeWait();
		alert(e);
	}
};

function CrearEstadoSituacionInicial(){
	
	this.model = window.arguments[0];
	this.local = new Local();
	this.local = this.model.local;
	
	this.estadoPlan = new EstadoPlan();
	this.estadoPlan.local = this.local;
	
	this.dao = new EstadoPlanDao();
	this.daoPlan = new PlanDao();
	this.items = new Array();	
	this.inicializar();
};

CrearEstadoSituacionInicial.prototype.inicializar = function () {			
	
	$Xul("btnGuardar").addEventListener( 'command', function(){self.guardar();}, true);
	$Xul("btnCancelar").addEventListener( 'command', function(){self.cancelar();}, true);

	$Xul("txtDescripcion").bind(this.estadoPlan, 'descripcion');
	
	$Xul("txtTipo").val(this.estadoPlan.tipo);
	$Xul("txtLocal").val(this.local.codigo + ' - ' + this.local.nombre);
	
	$Xul("dtpFecha").val(this.estadoPlan.fecha.toString('dd/MM/yyyy'));
	
	var planes = this.daoPlan.obtnerTodos();
	var items = new Array();
	
	var rows = $Xul('rowsItems');
	
	for(var i = 0; i < planes.length; i++){
		var plan = planes[i];		
		var it = new EstadoPlanItem();
		it.plan = plan;
		it.estadoPlan = this.estadoPlan;
		items.push(it);
		
		var row = document.createElement('row');
		
		var rCod = document.createElement('label');
		rCod.setAttribute('value', it.plan.codigo);
		rCod.setAttribute('width', '150');
		
		var rNom = document.createElement('label');
		rNom.setAttribute('value', it.plan.nombre);
		rNom.setAttribute('width', '300');
		
		var rDebe = document.createElement('textbox');
		rDebe.setAttribute('id','txtDebe'+i);
		rDebe.setAttribute('value', '0.00');
		rDebe.setAttribute('style', 'text-align: right;');
		rDebe.setAttribute('width', '100');
		rDebe.objeto = it;		
		rDebe.addEventListener('change',function(e){						
			var v = this.value;			
			if(isNaN(v)){
				v = 0;
			}else{
				v = v * 1;
			}
			v = v.round(3);
			this.value = v.format(3);
			this.objeto.debe = v;
			self.calcular();
		}, true);

		var rHaber = document.createElement('textbox');
		rHaber.setAttribute('id','txtHaber'+i);
		rHaber.setAttribute('value', '0.00');
		rHaber.setAttribute('width', '100');
		rHaber.setAttribute('style', 'text-align: right;');
		rHaber.objeto = it;		
		rHaber.addEventListener('change',function(e){						
			var v = this.value;			
			if(isNaN(v)){
				v = 0;
			}else{
				v = v * 1;
			}
			v = v.round(3);
			this.value = v.format(3);
			this.objeto.haber = v;
			self.calcular();
		}, true);
		
		row.appendChild(rCod);
		row.appendChild(rNom);
		row.appendChild(rDebe);
		row.appendChild(rHaber);
		
		rows.appendChild(row);
	}

	this.items = items;
	
	closeWait();
};

CrearEstadoSituacionInicial.prototype.calcular = function () {
	var d = 0, h = 0;
	for(var i = 0; i < this.items.length; i++){
		var it = this.items[i];
		d += it.debe;
		h += it.haber;
	}
	
	this.estadoPlan.totalDebe = d.round(3);
	this.estadoPlan.totalHaber = h.round(3);
	
	$Xul('txtTotalDebe').val(d.format(3));
	$Xul('txtTotalHaber').val(h.format(3));
};

CrearEstadoSituacionInicial.prototype.guardar = function () {
	try {
		var v = window.validar();
		if(v){
			this.calcular();
			if(this.estadoPlan.totalDebe == this.estadoPlan.totalHaber){
				this.estadoPlan.items = this.items;
				showWait();
				var g = this.dao.guardar(this.estadoPlan);
				if (g){ 
					this.model.estadoPlan = this.estadoPlan;
					closeWait();
					window.close();
				}
			}else{
				alert('La suma del debe deben ser igual a la suma del haber','Guardar');
			}
		}
	} catch (e) {
		alert('CrearEstadoSituacionInicial.guardar(): '+e);
	}
};

CrearEstadoSituacionInicial.prototype.cancelar = function () {	
	window.close();
};