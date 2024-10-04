<?php
$host = "db";
$username = "root";
$password = "123456";
$dbname = "clientes_db";
$port = 3306;

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname";
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Conexión fallida: " . $e->getMessage());
}
?>

