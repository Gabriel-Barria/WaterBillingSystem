<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require 'Cliente.php';
include_once("../conexionBD.php");

$cliente = new Cliente($conn);

$clientes = $cliente->read();

echo json_encode($clientes);
?>
