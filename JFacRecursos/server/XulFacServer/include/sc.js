window.onload = function(){
    try {
        var respuesta_json = '{id:0},{id:1}';
        //var respuesta_json = '{ind:{id:"0", login:"danny", clave:"danny"}, 1:{id:"1", login:"..", clave:"xx"}}';
        //var respuesta_json = '{mensaje: "este es mi mensaje",parametros: {telefono: "072541125", codigo_postal: "...", fecha_nacimiento: "..." }}';
        var objeto_json = eval("("+respuesta_json+")");       
        alert(objeto_json.id);               
    } catch (exception) {
        alert(exception);

    }

}