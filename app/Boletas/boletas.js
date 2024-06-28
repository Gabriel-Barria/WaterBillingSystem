import { instances } from '../instances.js';
class BoletasManager {
    constructor() {
        this.periodoSelect = document.getElementById('periodo');
        this.tablaBoletas = document.getElementById('tabla-boletas');
        this.generarBoletaBtn = document.getElementById('generar-boleta-btn');
        this.estado = document.getElementById("estado");
        this.btnPagarBoletas = document.getElementById("btn_pagar_boletas");
        this.modalManager = instances['boletas']?.find(instance => instance.constructor.name === 'ModalManager');
        this.generarBoletaBtn.addEventListener('click', this.generarBoleta.bind(this));
        this.periodoSelect.addEventListener('change', this.mostrarBoletas.bind(this));
        this.estado.addEventListener("change", this.changeState.bind(this));
        this.btnPagarBoletas.addEventListener("click", this.pagar.bind(this));

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
        this.addDisabledBtnPagar();
       
    }
    addDisabledBtnPagar(){
        if(this.estado.value == "true"){
            this.btnPagarBoletas.disabled = true;
        }else{
            this.btnPagarBoletas.disabled = false;
        }
    }
    pagar(event){
        event.preventDefault();
        let boletas = this.getBoletasSelected();
        if(boletas.length > 0){
            this.modalManager.openModal(event);
        }else{
            alert("Debe seleccionar una opción para pagar");
        }

    }
    getBoletasSelected(){
        let elementsChecked = document.querySelectorAll(".boleta_registro:checked");

        let valuesArray = Array.from(elementsChecked)
        .map(element => element.value)   // Obtén el valor de cada elemento
        .filter(value => !isNaN(value) && Number.isInteger(parseFloat(value))); // Filtra solo los valores que son números enteros
    

        return valuesArray;
    }
}
export default BoletasManager;
