<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require 'Lectura.php';
include_once("../conexionBD.php");

$lectura = new Lectura($conn);

$idlectura = $_GET['idlectura'];

$lectura->delete($idlectura);

echo json_encode(["message" => "Lectura eliminada exitosamente"]);
?>
