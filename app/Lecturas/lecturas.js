class LecturasManager {
    constructor() {
        this.tableLecturas = document.getElementById('lecturasTableBody');
        this.lecturaForm = document.getElementById('lecturaForm');
        this.formTitle = document.getElementById('formTitleCli');
        this.isEditMode = false;
        this.idclienteSelect = document.getElementById('idcliente');

        this.fetchClienteSelect();
        this.fetchLecturas();
        
        this.lecturaForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    
    async fetchClienteSelect() {
        try {
            const response = await fetch('../Clientes/readClientes.php');
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
        try {
            const response = await fetch('./Lecturas/readLecturas.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const lecturas = await response.json();
            this.populateTableLectura(lecturas);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    populateTableLectura(lecturas) {
        this.tableLecturas.innerHTML = ''; // Clear existing rows
        
        lecturas.forEach(lectura => {
            const row = document.createElement('tr');
    
            const idlecturaCell = document.createElement('td');
            idlecturaCell.textContent = lectura.idlectura;
            row.appendChild(idlecturaCell);
    
            const idclienteCell = document.createElement('td');
            idclienteCell.textContent = lectura.nombre_cliente;
            row.appendChild(idclienteCell);
    
            const lecturaCell = document.createElement('td');
            lecturaCell.textContent = lectura.lectura;
            row.appendChild(lecturaCell);
    
            const periodoCell = document.createElement('td');
            periodoCell.textContent = lectura.periodo;
            row.appendChild(periodoCell);
    
            const fechahoraCell = document.createElement('td');
            fechahoraCell.textContent = lectura.fechahora;
            row.appendChild(fechahoraCell);
    
            const fotoMedidorCell = document.createElement('td');
            if (lectura.fotoMedidor) {
                const img = document.createElement('img');
                img.src = lectura.fotoMedidor;
                img.alt = 'Foto del Medidor';
                img.width = 100;
                fotoMedidorCell.appendChild(img);
            }
            row.appendChild(fotoMedidorCell);
    
            const actionsCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => this.deleteLectura(lectura.idlectura));
            actionsCell.appendChild(deleteButton);
    
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => this.showEditFormLectura(lectura));
            actionsCell.appendChild(editButton);
    
            row.appendChild(actionsCell);
    
            this.tableLecturas.appendChild(row);
        });
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
}

export default LecturasManager;
