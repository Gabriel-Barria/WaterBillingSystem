function generarBoleta() {
    // Obtener el periodo seleccionado
    var periodo = document.getElementById("periodo").value;
    
    // Enviar solicitud para generar boleta
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "generar_boletas.php?periodo=" + periodo, true);
    xhr.onload = function() {
        if (xhr.status == 200) {
            alert("Actualización realizada con exito");
            mostrarBoletas(); // Actualizar la tabla de boletas
        } else {
            alert("Error al generar la boleta: " + xhr.statusText);
        }
    };
    xhr.send();
}
function mostrarBoletas() {
    // Obtener el periodo seleccionado
    var periodo = document.getElementById("periodo").value;
    
    // Enviar solicitud para mostrar boletas
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Boletas/mostrar_boletas.php?periodo=" + periodo, true);
    xhr.onload = function() {
        if (xhr.status == 200) {
            document.getElementById("tabla-boletas").innerHTML = xhr.responseText;
        } else {
            alert("Error al obtener las boletas: " + xhr.statusText);
        }
    };
    xhr.send();
}
window.onload = mostrarBoletas;