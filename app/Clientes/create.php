<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require 'Cliente.php';

include_once("../conexionBD.php");
$cliente = new Cliente($conn);

$input = file_get_contents("php://input");
$data = json_decode($input);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

$nombres = $data->nombres ?? '';
$apellidos = $data->apellidos ?? '';
$rut = $data->rut ?? '';
$direccion = $data->direccion ?? '';
$email = $data->email ?? '';
$telefono = $data->telefono ?? '';

// Validación de campos obligatorios
if (empty($nombres) || empty($apellidos) || empty($rut)) {
    echo json_encode(["error" => "Faltan datos obligatorios"]);
    exit;
}

// Validación de RUT chileno (básica, se puede mejorar)
if (!preg_match('/^[0-9]+-[0-9Kk]$/', $rut)) {
    echo json_encode(["error" => "RUT no válido"]);
    exit;
}

// Validación de email
if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Email no válido"]);
    exit;
}

// Validación de teléfono
if (!empty($telefono) && !preg_match('/^[0-9]{0,10}$/', $telefono)) {
    echo json_encode(["error" => "Teléfono no válido"]);
    exit;
}

// Crear el cliente
$cliente->create($nombres, $apellidos, $rut, $direccion, $email, $telefono);

echo json_encode(["message" => "Cliente creado exitosamente"]);
?>
