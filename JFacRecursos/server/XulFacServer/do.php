<?php session_name('XULSession'); // Set session name
	session_start();
    
	include 'include/Controlador.php';
	
    $controlador = null;
	
	if($controlador == null){
		$controlador = new Controlador();
	}
	
    $controlador->ejecutarComando();
    //session_name('XULSession'); // Set session nam
//    echo "Server Time is: ".date("m/d/Y H:i:s")."\n";
//    echo "\$_POST = \n";
//    print_r($_POST);
//    echo "\$_GET = \n";
//    print_r($_GET);
//
//    // Watch these...
//    echo "\$_COOKIE = \n";
//    print_r($_COOKIE);
//
//    echo "\$_SESSION = \n";
//    print_r($_SESSION);
?>