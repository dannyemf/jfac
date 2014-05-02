window.onload = function () {
	try {
		self = new Login();
	} catch (e) {
		alert("Login.onload():"+e);
	}
};

function Login(){
	this.us = null;
	this.dao = null;
	this.txtLogin = null;
	this.txtClave = null;	
	this.inicializar();
};

Login.prototype.inicializar = function(){
	try{
		var contexto = getContexto();
		
		this.us = new Usuario();
		//TODO Estas l�nea debe quitarse
		this.us.login = "";
		this.us.clave = "";
		// End
		
		this.dao = new UsuarioDao();
		
		this.txtLogin =  $Xul('txtLogin');
		this.txtClave = $Xul('txtClave');	
		
		$Xul('txtLogin').bind(this.us, 'login');
		$Xul('txtClave').bind(this.us, 'clave');
		
		$Xul("btnLogin").addEventListener('command', this.cmdLogin, true);
		$Xul("txtLogin").addEventListener('keyup', this.keyLogin, true);
		$Xul("txtClave").addEventListener('keyup', this.keyLogin, true);
				
		$Xul("logoSistema").setAttribute('value', contexto.nombreSistema);
		$Xul("logoEmpresa").setAttribute('value', contexto.nombreEmpresa);
	}catch(e){
		alert("Login.inicializar()" + e);
	}
};

Login.prototype.cmdLogin = function() {
	self.login();
};

Login.prototype.keyLogin = function(event) {
	if(event.keyCode == 13){
		self.login();
	}
};

Login.prototype.login = function() {
  try {
	  var contexto = getContexto();
	  
	  var username = this.us.login; 
	  var password = this.us.clave;
	  
	  
	  var lblMsj = $Xul('lblMsj');
	  var x = this.dao.buscarPorLogin(username);
	  
	  if(x != null){
		  if(x.isActivo == 1){
			if(x.clave == password){
				lblMsj.value = "Usuario logueado. OK!";				
				contexto.main.login(x);
			}else{
				lblMsj.value = "Clave incorrecta";
				this.txtClave.select();
			}
		  }else{
			  lblMsj.value = "Usuario inactivo";
		  }
	  }else{
	  	lblMsj.value = "Usuario no encontrado";
	  	this.txtLogin.select();
	  }
	} catch (e) {
		alert(e);
	}
};