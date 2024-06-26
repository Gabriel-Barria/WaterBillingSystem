<?php
// Establecer el encabezado de respuesta como JSON
header('Content-Type: application/json');

// Incluir la clase Lectura
require 'Lectura.php';

// Configuración de la base de datos
include_once("../conexionBD.php");
$periodo = $_REQUEST["periodo"];
try {
    // Crear instancia de la clase Lectura
    $lectura = new Lectura($conn);

    // Obtener todas las lecturas
    $lecturas = $lectura->readAllByPeriodo($periodo);

    // Devolver las lecturas en formato JSON
    echo json_encode($lecturas);
} catch (Exception $e) {
    // Manejar errores y devolver un mensaje de error en formato JSON
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
