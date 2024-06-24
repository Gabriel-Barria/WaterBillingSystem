<?php
if(isset($_GET['periodo'])) {
    $periodo = $_GET['periodo'];
    
    // Realizar alguna acción con el periodo seleccionado, como generar nuevas boletas
    // Por ejemplo, puedes redirigir a un script PHP que genere las boletas para el periodo especificado
    header("Location: boletas.php?periodo=$periodo");
    exit();
} else {
    echo "Periodo no especificado.";
}
?>
