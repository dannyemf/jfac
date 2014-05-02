<?php
	session_name('XULSession'); // Set session name
	session_start();

        echo "\$_SESSION = \n";
        print_r($_SESSION);

        $db = mysql_pconnect("localhost:3399","xulfac", "xulfac");
        $lnk = mysql_select_db("xulfac", $db);
        
    
        $result = 'no iniciado';
    
	//$_SESSION['db'] = $b;
	
// Watch these...
echo "\$_COOKIE = \n";
print_r($_COOKIE);


if($_GET['CMD'] == "LOGIN"){					
	$_SESSION['usuario'] = $_GET['usuario'];	
}

if($_GET['CMD'] == "INSERT"){
    $id=$_GET['ID'];
	$query = "insert into tx values($id,3)";
    //$result = mysql_query("SET AUTOCOMMIT = 0");
    $result = mysql_query("BEGIN", $db);
    $result = mysql_query($query, $db );    
    echo 'insertado...'.$result;

}

if($_GET['CMD'] == "CONFIRM"){
    $result = mysql_query("COMMIT",  $db);
    //$result = mysql_query("SET AUTOCOMMIT = 1");
    echo 'codifmado...'.$result;
}

//echo "\$_SESSION = \n";
//print_r($_SESSION);

?>