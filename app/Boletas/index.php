<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Boletas</title>
</head>
<body>
    <link rel="stylesheet" href="../Components/modals/styles.css">
    
    <h1>Lista de Boletas</h1>
    
    <div id="boletas-lista">
        <!-- Aquí se mostrarán las boletas generadas -->
    </div>
    
    <button id="generar-boleta-btn">Generar Nueva Boleta</button>
    <select id="periodo">
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
    <select name="estado" id="estado">
        <option value="true">Pagado</option>
        <option value="false">Sin Pagar</option>
    </select>
    <button id="btn_pagar_boletas" disabled = "true" class="open-modal" data-modal-target="#modal1">Pagar</button>
    <div id="tabla-boletas">
        <!-- Tabla para mostrar las boletas generadas -->
    </div>
    <!--MODALS-->
    <div id="modal1" class="modal">
        <div class="modal-content">
            <span class="close" data-modal-target="#modal1">&times;</span>
            <h2>Elegir Forma de pago</h2>
            <div class="forma-pago-container">
                <label for="formaPagoSelect">Forma de pago</label>
                <select name="formaPagoSelect" id="formaPagoSelect">
                    <option value="1">EFECTIVO</option>
                    <option value="2">TRANSFERENCIA</option>
                </select>
                <button>PAGAR</button>
            </div>
        </div>
    </div>
</body>
<script src="../Components/modals/modals.js"></script>
</html>
