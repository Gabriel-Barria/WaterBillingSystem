<?php
// Habilitar la visualización de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Establecer el encabezado de respuesta como JSON
header('Content-Type: application/json');

// Incluir la clase Lectura
require 'Lectura.php';

// Configuración de la base de datos
include_once("../conexionBD.php");

try {
    // Crear instancia de la clase Lectura
    $lectura = new Lectura($conn);

    // Obtener todas las lecturas
    $lecturas = $lectura->readAll();

    // Devolver las lecturas en formato JSON
    echo json_encode($lecturas);
} catch (Exception $e) {
    // Manejar errores y devolver un mensaje de error en formato JSON
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
