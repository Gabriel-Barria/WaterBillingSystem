<?php 
    $servername = "db";
    $username = "root";
    $password = "n1a2x3o4";
    $dbname = "clientes_db";
    $port = 3306;

    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
?>