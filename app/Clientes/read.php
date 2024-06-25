<?php
header('Content-Type: application/json');

require 'Cliente.php';
include_once("../conexionBD.php");

$cliente = new Cliente($conn);

$clientes = $cliente->read();

echo json_encode($clientes);
?>
