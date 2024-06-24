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

    // Obtener datos del formulario
    $idcliente = $_POST['idcliente'];
    $lectura_val = $_POST['lectura'];
    $periodo = $_POST['periodo'];
    $fotoMedidor = '';

    // Manejar la subida de la imagen del medidor
    if (isset($_FILES['fotoMedidor']) && $_FILES['fotoMedidor']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $uploadFile = $uploadDir . basename($_FILES['fotoMedidor']['name']);
        
        // Verificar y crear el directorio si no existe
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0775, true);
        }

        if (move_uploaded_file($_FILES['fotoMedidor']['tmp_name'], $uploadFile)) {
            $fotoMedidor = $uploadFile;
        } else {
            throw new Exception('Error al subir la imagen');
        }
    }

    // Crear la lectura
    $lectura->create($idcliente, $lectura_val, $periodo, $fotoMedidor);

    // Respuesta de éxito
    echo json_encode(['success' => true, 'message' => 'Lectura creada exitosamente']);
} catch (Exception $e) {
    // Manejar errores y devolver un mensaje de error en formato JSON
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
