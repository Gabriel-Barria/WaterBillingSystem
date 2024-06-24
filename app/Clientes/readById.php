<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require 'Cliente.php';

include_once("../conexionBD.php");
$cliente = new Cliente($conn);

$id = $_GET['id'];

$clienteIndividual = $cliente->readById($id);

$json = json_encode($clienteIndividual, JSON_UNESCAPED_UNICODE) == false ? "{}" : json_encode($clienteIndividual, JSON_UNESCAPED_UNICODE);
echo json_encode($json);
?>
