class LecturasManager {
    constructor() {
        this.tableLecturas = document.getElementById('lecturasTableBody');
        this.lecturaForm = document.getElementById('lecturaForm');
        this.formTitle = document.getElementById('formTitleCli');
        this.isEditMode = false;
        this.idclienteSelect = document.getElementById('idcliente');
        this.btnAddLectura = document.getElementById("btn_agregar_lectura");
        this.contenedorForm = document.getElementById("formulario_datos_cliente");
        this.updatePeriodo();
        this.fetchClienteSelect();
        this.fetchLecturas();
        
        this.btnAddLectura.addEventListener("click", this.showForm.bind(this))
        this.lecturaForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.lecturaForm.periodo.addEventListener("change", this.changePeriodo.bind(this));
    }
    changePeriodo(){
        this.fetchClienteSelect();
        this.fetchLecturas();
    }    
    async fetchClienteSelect() {
        let periodo = this.lecturaForm.periodo.value;
        try {
            const response = await fetch(`../Clientes/readClientesByPeriodo.php?periodo=${periodo}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const clientes = await response.json();
            this.populateClienteSelect(clientes);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async fetchLecturas() {
        let periodo = this.lecturaForm.periodo.value;
        try {
            const response = await fetch(`./Lecturas/readLecturas.php?periodo=${periodo}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const lecturas = await response.json();
            this.populateTableLectura(lecturas);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    showForm(){
        this.contenedorForm.style.display = "block";
        this.btnAddLectura.style.display = "none";
    }
    hideForm(){
        this.contenedorForm.style.display = "none";
        this.btnAddLectura.style.display = "block";
    }

    populateTableLectura(lecturas) {
        this.tableLecturas.innerHTML = ''; // Clear existing rows
        
        lecturas.forEach(lectura => {
            const row = document.createElement('tr');
    
            const idclienteCell = document.createElement('td');
            idclienteCell.textContent = lectura.nombre_cliente;
            row.appendChild(idclienteCell);
    
            const lecturaCell = document.createElement('td');
            lecturaCell.textContent = lectura.lectura;
            row.appendChild(lecturaCell);
    
            const periodoCell = document.createElement('td');
            periodoCell.textContent = lectura.periodo;
            row.appendChild(periodoCell);
    
            // const fechahoraCell = document.createElement('td');
            // fechahoraCell.textContent = lectura.fechahora;
            // row.appendChild(fechahoraCell);
    
            const actionsCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => this.delete(lectura.idlectura));
            actionsCell.appendChild(deleteButton);
    
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => this.showEditFormLectura(lectura));
            actionsCell.appendChild(editButton);

            const showPhoto = document.createElement('button');
            showPhoto.textContent = 'Editar';
            showPhoto.addEventListener('click', () => this.showPhoto(lectura.fotoMedidor));
            actionsCell.appendChild(showPhoto);

    
            row.appendChild(actionsCell);
    
            this.tableLecturas.appendChild(row);
        });
    }
    showPhoto(linkPhoto){
        console.log(linkPhoto);
        // const fotoMedidorCell = document.createElement('td');
        // if (lectura.fotoMedidor) {
        //     const img = document.createElement('img');
        //     img.src = `Lecturas/${lectura.fotoMedidor}`;
        //     img.alt = 'Foto del Medidor';
        //     img.width = 100;
        //     fotoMedidorCell.appendChild(img);
        // }
        // row.appendChild(fotoMedidorCell);
    }

    populateClienteSelect(clientes) {
        this.idclienteSelect.innerHTML = ''; // Clear existing options
        clientes = JSON.parse(clientes);
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nombre_completo;
            this.idclienteSelect.appendChild(option);
        });
    }

    showEditFormLectura(lectura) {
        this.isEditMode = true;
        this.formTitle.textContent = 'Editar Lectura';
        this.lecturaForm.idlectura.value = lectura.idlectura;
        this.lecturaForm.idcliente.value = lectura.idcliente;
        this.lecturaForm.lectura.value = lectura.lectura;
        this.lecturaForm.periodo.value = lectura.periodo.substring(0, 7);
        this.showForm();
    }

    resetForm() {
        this.isEditMode = false;
        this.formTitle.textContent = 'Agregar Lectura';
        this.lecturaForm.reset();
        this.lecturaForm.idlectura.value = '';
    }

    async create(formData) {
        try {
            const response = await fetch('./Lecturas/createLectura.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                alert('Lectura creada exitosamente');
                this.fetchLecturas(); // Refresh table after creation
                this.fetchClienteSelect();
                this.hideForm();
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    }

    async update(formData) {
        try {
            const response = await fetch('./Lecturas/updateLectura.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                alert('Lectura actualizada exitosamente');
                this.fetchLecturas(); // Refresh table after update
                this.fetchClienteSelect();
                this.hideForm();
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async delete(idlectura) {
        try {
            const response = await fetch(`./Lecturas/deleteLectura.php?idlectura=${idlectura}`, {
                method: 'GET'
            });
            const result = await response.json();
            if (result.success) {
                alert('Lectura eliminada exitosamente');
                this.fetchLecturas(); // Refresh table after deletion
                this.fetchClienteSelect();
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.lecturaForm);
        if (this.isEditMode) {
            this.update(formData);
        } else {
            this.create(formData);
        }
    
        this.resetForm();
    }
    updatePeriodo(){
        // Obtener la fecha actual
        let fechaActual = new Date();

        // Obtener el año y el mes
        let year = fechaActual.getFullYear();
        let month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Añadir 1 porque los meses empiezan desde 0

        // Formatear la fecha en 'YYYY-MM'
        let periodoActual = `${year}-${month}`;

        // Asignar el valor formateado
        this.lecturaForm.periodo.value = periodoActual;
    }
}

export default LecturasManager;
