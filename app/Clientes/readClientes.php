<?php
header('Content-Type: application/json;');

require 'Cliente.php'; // Asegúrate de que esta clase está configurada correctamente

include_once("../conexionBD.php");
$cliente = new Cliente($conn);

$clientes = $cliente->readAll();

$json = json_encode($clientes, JSON_UNESCAPED_UNICODE) == false ? "{}" : json_encode($clientes, JSON_UNESCAPED_UNICODE);
echo json_encode($json);


?>
