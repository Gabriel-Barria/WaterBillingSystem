<?php
// Conexión a la base de datos
include_once("../conexionBD.php");

// Definir el periodo deseado (mes y año)

$periodo = $_REQUEST["periodo"];
$periodoAnterior = obtenerPeriodoAnterior($periodo);
function obtenerPeriodoAnterior($periodo) {
    // Dividir el periodo en año y mes
    list($año, $mes) = explode('-', $periodo);

    // Convertir a enteros
    $año = (int)$año;
    $mes = (int)$mes;

    // Calcular el mes anterior
    if ($mes == 1) {
        $mes = 12;
        $año--;
    } else {
        $mes--;
    }

    // Formatear el mes y el año
    $mes = str_pad($mes, 2, '0', STR_PAD_LEFT);
    $año = str_pad($año, 4, '0', STR_PAD_LEFT);

    // Retornar el periodo anterior
    return "$año-$mes";
}

// Consulta para obtener las lecturas del periodo deseado
$sql = "SELECT idlectura, lectura, fechahora, idcliente FROM lecturas WHERE periodo = '$periodo'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Calcular el monto de la boleta para cada lectura y guardar en la tabla boletas
    while($row = $result->fetch_assoc()) {
        $lecturaactual = $row['lectura'];
        $fechahora = $row['fechahora'];
        $idcliente = $row['idcliente'];
        
        // Calcular lectura anterior
        
        $sql_anterior = "SELECT lectura FROM lecturas WHERE idcliente = $idcliente AND periodo = '$periodoAnterior' LIMIT 1";
        
        $result_anterior = $conn->query($sql_anterior);
        if ($result_anterior->num_rows > 0) {
            $row_anterior = $result_anterior->fetch_assoc();
            $lecturaanterior = $row_anterior['lectura'];
        } else {
            $lecturaanterior = 0;
        }

        
        // Calcular monto de la boleta
        $preciom3 = 1182.86;
        $cargofijo = 5000;
        $monto = ($lecturaactual - $lecturaanterior) * $preciom3 + $cargofijo;

        //validamos si ya existe una boleta previamente generada
        $sql_consulta = "SELECT idboleta FROM boletas WHERE idlectura = {$row['idlectura']} LIMIT 1;";
        $result_consulta = $conn->query($sql_consulta);
        $rowBoleta = $result_consulta->fetch_assoc();
        if($result_consulta->num_rows == 0){
        // Insertar en la tabla boletas
            $sql_insert = "INSERT INTO boletas (monto, idlectura) VALUES ($monto, {$row['idlectura']})";
        }else{
            $sql_insert = "UPDATE boletas SET monto = $monto WHERE idboleta = {$rowBoleta['idboleta']};";
        }
        $conn->query($sql_insert);
        
        
    }
} else {
    echo "No se encontraron lecturas para el periodo especificado.";
}

$conn->close();
?>
