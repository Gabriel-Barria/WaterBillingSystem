class BoletasManager {
    constructor() {
        this.periodoSelect = document.getElementById('periodo');
        this.tablaBoletas = document.getElementById('tabla-boletas');
        this.generarBoletaBtn = document.getElementById('generar-boleta-btn');
        this.estado = document.getElementById("estado");

        this.generarBoletaBtn.addEventListener('click', this.generarBoleta.bind(this));
        this.periodoSelect.addEventListener('change', this.mostrarBoletas.bind(this));
        this.estado.addEventListener("change", this.changeState.bind(this));
        
        this.mostrarBoletas(); // Mostrar boletas al cargar la página
    }

    async generarBoleta() {
        const periodo = this.periodoSelect.value;
        
        try {
            const response = await fetch(`Boletas/generar_boletas.php?periodo=${periodo}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Actualización realizada con éxito');
            this.mostrarBoletas(); // Actualizar la tabla de boletas
        } catch (error) {
            console.error('Error al generar la boleta:', error);
            alert('Error al generar la boleta: ' + error.message);
        }
    }

    async mostrarBoletas() {
        const periodo = this.periodoSelect.value;  
        const estado = this.estado.value;      
        try {
            const response = await fetch(`Boletas/mostrar_boletas.php?periodo=${periodo}&estado=${estado}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.tablaBoletas.innerHTML = await response.text();
        } catch (error) {
            console.error('Error al obtener las boletas:', error);
            alert('Error al obtener las boletas: ' + error.message);
        }
    }
    changeState(){
        this.mostrarBoletas();
    }
}
export default BoletasManager;
