<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require 'Cliente.php';

include_once("../conexionBD.php");
$cliente = new Cliente($conn);

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$id = $data['id'];
$nombres = $data['nombres'];
$apellidos = $data['apellidos'];
$rut = $data['rut'];
$direccion = $data['direccion'];
$email = $data['email'];
$telefono = $data['telefono'];

$cliente->update($id, $nombres, $apellidos, $rut, $direccion, $email, $telefono);

echo json_encode(["message" => "Cliente actualizado exitosamente"]);
?>
