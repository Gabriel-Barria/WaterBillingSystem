<?php
if (isset($_GET['periodo'])) {
    $periodo = $_GET['periodo'];
    // Conexión a la base de datos
    include_once("../conexionBD.php");

    // Consulta para obtener las boletas del periodo deseado
    $sql = "SELECT CONCAT(c.nombres, ' ', c.apellidos) AS nombrecompleto, b.monto, l.periodo, l.fotomedidor FROM boletas b 
    INNER JOIN lecturas l ON b.idlectura = l.idlectura 
    INNER JOIN clientes c ON c.id = l.idcliente
    WHERE l.periodo = '$periodo'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<table border='1'>";
        echo "<tr><th>Nombre</th><th>Monto</th><th>Periodo</th><th>Foto Medidor</th></tr>";

        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row['nombrecompleto'] . "</td>";
            echo "<td> $ " . number_format($row['monto'],0,',','.') . "</td>";
            echo "<td>" . $row['periodo'] . "</td>";
            echo "<td>" . $row['fotomedidor'] . "</td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "No se encontraron boletas para el periodo especificado.";
    }

    $conn->close();
} else {
    echo "Periodo no especificado.";
}
?>
