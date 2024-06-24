<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Boletas</title>
</head>
<body>
    <h1>Lista de Boletas</h1>
    
    <div id="boletas-lista">
        <!-- Aquí se mostrarán las boletas generadas -->
    </div>
    
    <button onclick="generarBoleta()">Generar Nueva Boleta</button>
    <select id="periodo" onchange="mostrarBoletas()">
        <?php
        // Generar opciones del combobox para el periodo desde octubre de 2023 a enero de 2030
        for ($year = 2023; $year <= date("Y"); $year++) {            
            if($year == 2023){
                for ($mes = 10; $mes <= 12; $mes++) {
                    $mes = str_pad($mes, 2, '0', STR_PAD_LEFT);
                    echo "<option value='$year-$mes'>$mes/$year</option>";
                }
            }else{
                for ($mes = 1; $mes <= 12; $mes++) {
                    $mes = str_pad($mes, 2, '0', STR_PAD_LEFT);
                    echo "<option value='$year-$mes'>$mes/$year</option>";
                }
            }
            
        }
        ?>
    </select>
    <div id="tabla-boletas">
        <!-- Tabla para mostrar las boletas generadas -->
    </div>
</body>
</html>
