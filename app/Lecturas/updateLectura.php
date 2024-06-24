<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require 'Lectura.php';
// Configuración de la base de datos
include_once("../conexionBD.php");
$lectura = new Lectura($conn);

$idlectura = $_POST['idlectura'];
$idcliente = $_POST['idcliente'];
$lectura_val = $_POST['lectura'];
$periodo = $_POST['periodo'];
$fotoMedidor = $_POST['existingFotoMedidor'];

if (isset($_FILES['fotoMedidor']) && $_FILES['fotoMedidor']['error'] == 0) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["fotoMedidor"]["name"]);
    if (move_uploaded_file($_FILES["fotoMedidor"]["tmp_name"], $target_file)) {
        $fotoMedidor = $target_file;
    }
}

$lectura->update($idlectura, $idcliente, $lectura_val, $periodo, $fotoMedidor);

echo json_encode(["message" => "Lectura actualizada exitosamente"]);
?>
