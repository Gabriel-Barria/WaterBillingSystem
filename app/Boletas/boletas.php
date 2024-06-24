<?php
// Incluir archivo de conexión
include_once("../conexionBD.php");

// Definir el periodo deseado (mes y año)
$periodo = $_REQUEST["periodo"];
$periodoAnterior = obtenerPeriodoAnterior($periodo);

// Función para obtener el periodo anterior
function obtenerPeriodoAnterior($periodo) {
    // Dividir el periodo en año y mes
    list($year, $month) = explode('-', $periodo);

    // Convertir a enteros
    $year = (int)$year;
    $month = (int)$month;

    // Calcular el mes anterior
    if ($month == 1) {
        $month = 12;
        $year--;
    } else {
        $month--;
    }

    // Formatear el mes y el año
    $month = str_pad($month, 2, '0', STR_PAD_LEFT);
    $year = str_pad($year, 4, '0', STR_PAD_LEFT);

    // Retornar el periodo anterior
    return "$year-$month";
}

try {
    // Preparar consulta para obtener las lecturas del periodo deseado
    $sql = "SELECT idlectura, lectura, fechahora, idcliente FROM lecturas WHERE periodo = :periodo";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':periodo', $periodo, PDO::PARAM_STR);
    $stmt->execute();

    // Verificar si se encontraron resultados
    if ($stmt->rowCount() > 0) {
        // Calcular el monto de la boleta para cada lectura y guardar en la tabla boletas
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lecturaactual = $row['lectura'];
            $fechahora = $row['fechahora'];
            $idcliente = $row['idcliente'];

            // Consulta para obtener la lectura anterior
            $sql_anterior = "SELECT lectura FROM lecturas WHERE idcliente = :idcliente AND periodo = :periodoAnterior LIMIT 1";
            $stmt_anterior = $conn->prepare($sql_anterior);
            $stmt_anterior->bindParam(':idcliente', $idcliente, PDO::PARAM_INT);
            $stmt_anterior->bindParam(':periodoAnterior', $periodoAnterior, PDO::PARAM_STR);
            $stmt_anterior->execute();

            // Obtener la lectura anterior
            if ($stmt_anterior->rowCount() > 0) {
                $lecturaanterior = $stmt_anterior->fetchColumn();
            } else {
                $lecturaanterior = 0;
            }

            // Calcular monto de la boleta
            $preciom3 = 1182.86;
            $cargofijo = 5000;
            $monto = ($lecturaactual - $lecturaanterior) * $preciom3 + $cargofijo;

            // Validar si ya existe una boleta previamente generada
            $sql_consulta = "SELECT idboleta FROM boletas WHERE idlectura = :idlectura LIMIT 1";
            $stmt_consulta = $conn->prepare($sql_consulta);
            $stmt_consulta->bindParam(':idlectura', $row['idlectura'], PDO::PARAM_INT);
            $stmt_consulta->execute();
            
            if ($stmt_consulta->rowCount() == 0) {
                // Insertar en la tabla boletas
                $sql_insert = "INSERT INTO boletas (monto, idlectura) VALUES (:monto, :idlectura)";
            } else {
                // Actualizar monto de la boleta existente
                $sql_insert = "UPDATE boletas SET monto = :monto WHERE idlectura = :idlectura";
            }

            $stmt_insert = $conn->prepare($sql_insert);
            $stmt_insert->bindParam(':monto', $monto, PDO::PARAM_INT);
            $stmt_insert->bindParam(':idlectura', $row['idlectura'], PDO::PARAM_INT);
            $stmt_insert->execute();
        }
    } else {
        echo "No se encontraron lecturas para el periodo especificado.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Cerrar conexión
$conn = null;
?>
