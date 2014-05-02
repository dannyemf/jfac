<?php
/*
DB Configuration information is stored here.
Ideally you should read these vaules from an 
external properties file.
*/

class BaseConf{
    
    private $databaseURL = "localhost:3399";
    private $databaseUName = "root";
    private $databasePWord = "root";
    private $databaseName = "xulfac";
    private $conexion = null;
    private $db = null;

    function get_databaseURL(){
        return $this->databaseURL;
    }
    function get_databaseUName(){
        return $this->databaseUName;
    }
    function get_databasePWord(){
        return $this->databasePWord;
    }
    function get_databaseName(){
        return $this->databaseName;
    }

    function get_conecxion(){
        return $this->conexion;
    }

    function get_db(){
        return $this->db;
    }

    function conectar(){

        $this->conexion = mysql_pconnect($this->databaseURL,$this->databaseUName,$this->databasePWord);
        //$this->conexion = mysql_connect($this->databaseURL,$this->databaseUName,$this->databasePWord,true,null);
		//print($this->conexion);
        $this->db = mysql_select_db($this->databaseName,$this->conexion);
    }

    function desconectar(){
        mysql_close($this->conexion);
    }
}
?>