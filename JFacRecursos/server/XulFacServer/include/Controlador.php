<?php session_name('XULSession'); // Set session name
	session_start();	
	include 'BaseConf.php';
	
class Controlador {
    //$_SESSION['username'] = $_GET['username'];
    //$_SESSION['password'] = $_GET['password'];	
	private $b = null; 
	
	
    function ejecutarComando(){      
	
		$b = new BaseConf(); 
		$b->conectar();		
	
        if($_GET['CMD'] == "QUERY"){
            //$b->conectar();
            //Obtiene la consulta y elimina los "\" que se utilizan como escape para las cadenas
            $query = str_replace("\\", "", $_GET['QUERY'] );
            
            //Elimina los espacios al inicio y fin y, agrega un espacio al inicio
            $query = " " . chop($query);

            //Obtiene 0 o 1 segun sea el caso de acción sobre la base de datos
            $posSelect = strpos($query, 'SELECT');
            $posInsert = strpos($query, 'INSERT');
            $posUpdate = strpos($query, 'UPDATE');
            $posDelete = strpos($query, 'DELETE');
            $posTxBegin = strpos($query, 'BEGIN');
            $posTxCommit = strpos($query, 'COMMIT');
            $posTxRollback = strpos($query, 'ROLLBACK');

            // Es un select
            if($posSelect){
                $rowArray=array();
                $result = mysql_query($query, $b->get_conecxion());
                if($result){
                    while($row = mysql_fetch_array($result)){
                        $rowArray[] = $row;
                    }
                    print (json_encode($rowArray));
                }else{
                    // Hay un error en la consulta, no se puede hacer un fetch
                    print('Error mysql select: '.mysql_error());
                }                
            }else{
                // Es un insert
                if($posInsert){
                    $result = mysql_query($query, $b->get_conecxion());
                    if(mysql_affected_rows() > 0){
                        $id = mysql_insert_id();
                        print ($id);
                    }else{
                        print('Error mysql insert: '.mysql_error());
                    }
                }else{
                    if($posUpdate){
                        $result = mysql_query($query, $b->get_conecxion());
                        if($result){
                            print($result);
                        }else{
                            print('Error mysql update: '.mysql_error());
                        }                        
                    }else{
                        if($posDelete){
                            $result = mysql_query($query, $b->get_conecxion());
                            if(mysql_affected_rows() > 0){
                                print (true);
                            }else{
                                print (false);
                            }
                        }else{
                            if($posTxBegin){
                                mysql_query('SET AUTOCOMMIT = 0', $b->get_conecxion());
                                $result = mysql_query('START TRANSACTION', $b->get_conecxion());
                                if($result){
                                    print($result);
                                }else{
                                    print('Error mysql begin: '.mysql_error());
                                }
                            }else{
                                if($posTxCommit){
                                    $result = mysql_query('COMMIT', $b->get_conecxion());
                                    mysql_query('SET AUTOCOMMIT = 1', $b->get_conecxion());
                                    if($result){
                                        print($result);
                                    }else{
                                        print('Error mysql commit: '.mysql_error());
                                    }
                                }  else {
                                    if($posTxRollback){
                                        $result = mysql_query('ROLLBACK', $b->get_conecxion());
					mysql_query('SET AUTOCOMMIT=1', $b->get_conecxion());
                                        if($result){
                                            print($result);
                                        }else{
                                            print('Error mysql rollback: '.mysql_error());
                                        }
                                    }else{
$rowArray=array();
                $result = mysql_query($query, $b->get_conecxion());
                if($result){
                    while($row = mysql_fetch_array($result)){
                        $rowArray[] = $row;
                    }
                    print (json_encode($rowArray));
                }else{
                    // Hay un error en la consulta, no se puede hacer un fetch
                    print('Error mysql select: '.mysql_error());
                }
}
                                }
                            }
                        }
                    }
                }
            }
			$b->desconectar();			
        }else{

            if (!$db) {
                //$db = mysql_connect("localhost:3399","root", "root");
            }


			if($_GET['CMD'] == "CONEXION"){
				print_r($_SESSION['usuario']);
			}
			
			if($_GET['CMD'] == 'TRANSACCION'){
				//Obtiene la consulta y elimina los "\" que se utilizan como escape para las cadenas
				$query = str_replace("\\", "", $_GET['TRANSACCION'] );
				//if($query == 'BEGIN'){					
					$result = mysql_query($query);	
				//}
				
				print($result);				
			};

            if($_GET['CMD'] == 'LNK'){
                print($b->get_conecxion());
                
            }
			
			if($_GET['CMD'] == 'TX'){
				//http://localhost/XulFacServer/do.php?CMD=TX&TX=BEGIN,ROLLBACK,COMMIT
				$query = str_replace("\\", "", $_GET['TX'] );

				
				if($query == 'BEGIN'){
					mysql_query('SET AUTOCOMMIT = 0', $b->get_conecxion());
					$result = mysql_query('START TRANSACTION', $b->get_conecxion());
					print("ON ".$query.", result: ".$result);
				}
				
				if($query == 'COMMIT'){
					$result = mysql_query('COMMIT', $b->get_conecxion());
					mysql_query('SET AUTOCOMMIT = 1', $b->get_conecxion());
					print("ON ".$query.", result: ".$result);
				}
				
				if($query == 'ROLLBACK'){
					$result = mysql_query('ROLLBACK', $b->get_conecxion());
					mysql_query('SET AUTOCOMMIT=1', $b->get_conecxion());
					print("ON ".$query.", result: ".$result);
				}
			}
			
			if($_GET['CMD'] == 'TXQ'){
				//http://localhost/XulFacServer/do.php?CMD=TXQ&TXQ=INSERT,UPDATE,DELETE
				$query = str_replace("\\", "", $_GET['TXQ'] );				
				$result = mysql_query($query,$b->get_conecxion());								
				print($query.", result: ".$result);
			}
			
			if($_GET['CMD'] == 'GETRELACION'){
				$query = "SELECT b.table_name, b.column_name, b.constraint_name, b.referenced_table_name, b.referenced_column_name ".
				"FROM information_schema.table_constraints a JOIN information_schema.key_column_usage b ON a.table_schema = b.table_schema AND a.constraint_name = b.constraint_name ".
				"WHERE a.constraint_schema = '".$b->get_databaseName()."' ".
				"AND b.table_name='".$_GET['table_name']."' ".
				"AND b.referenced_table_name='".$_GET['referenced_table_name']."' ".
				"AND a.table_schema=DATABASE() AND a.constraint_type='FOREIGN KEY' ORDER BY b.table_name, b.constraint_name";
				$rowArray=array();
                $result = mysql_query($query, $b->get_conecxion());
                if($result){
					while($row = mysql_fetch_array($result)){
						$rowArray[] = $row;
					}
				}
				print (json_encode($rowArray));
			}
			
			
		}
        
    }
}
?>