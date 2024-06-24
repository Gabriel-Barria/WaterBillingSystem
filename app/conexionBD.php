<?php
$servername = "db";
$username = "root";
$password = "n1a2x3o4";
$dbname = "clientes_db";
$port = 3306;

try {
    $dsn = "mysql:host=$servername;port=$port;dbname=$dbname";
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa";
} catch (PDOException $e) {
    die("Conexión fallida: " . $e->getMessage());
}
?>
