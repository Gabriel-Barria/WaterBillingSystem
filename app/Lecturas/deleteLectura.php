<?php
header('Content-Type: application/json');

require 'Lectura.php';
include_once("../conexionBD.php");

$lectura = new Lectura($conn);

$idlectura = $_GET['idlectura'];

$lectura->delete($idlectura);

echo json_encode(['success' => true, 'message' => 'Lectura eliminada exitosamente']);
?>
