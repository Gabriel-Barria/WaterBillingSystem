<?php
if (isset($_GET['periodo'])) {
    $periodo = $_GET['periodo'];
    $pagado = $_GET["estado"] == "true" ? true : false;

    // Conexión a la base de datos
    include_once("../conexionBD.php");

    // Consulta para obtener las boletas del periodo deseado
    $sql = "SELECT CONCAT(c.nombres, ' ', c.apellidos) AS nombrecompleto, b.monto, l.periodo, l.fotomedidor, b.idboleta
            FROM boletas b 
            INNER JOIN lecturas l ON b.idlectura = l.idlectura 
            INNER JOIN clientes c ON c.id = l.idcliente
            WHERE l.periodo = :periodo AND b.pagado = :pagado";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':periodo', $periodo, PDO::PARAM_STR);
    $stmt->bindParam(':pagado', $pagado, PDO::PARAM_STR);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($result) > 0) {
        echo "<table border='1'>";
        echo "<tr><th>Check</th><th>Nombre</th><th>Monto</th><th>Periodo</th><th>Foto Medidor</th></tr>";

        foreach ($result as $row) {
            echo "<tr>";
            echo "<td><input type='checkbox' class='boleta_registro' id='".$row['idboleta']."' value='".$row['idboleta']."'/></td>";
            echo "<td>" . htmlspecialchars($row['nombrecompleto'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "<td> $ " . number_format($row['monto'], 0, ',', '.') . "</td>";
            echo "<td>" . htmlspecialchars($row['periodo'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "<td>" . htmlspecialchars($row['fotomedidor'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "No se encontraron boletas para el periodo especificado.";
    }
} else {
    echo "Periodo no especificado.";
}
?>
