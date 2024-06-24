class ClienteManager {
    constructor() {
        this.clientesTableBody = document.getElementById('clientesTableBody');
        this.clienteForm = document.getElementById('clienteForm');
        this.formTitleCli = document.getElementById('formTitleCli');
        this.isEditModeCli = false;
        
        this.fetchClientes();
        
        this.clienteForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    
    async fetchClientes() {
        try {
            const response = await fetch('Clientes/read.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const clientes = await response.json();
            this.populateTable(clientes);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    populateTable(clientes) {
        this.clientesTableBody.innerHTML = ''; // Clear existing rows

        clientes.forEach(cliente => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = cliente.id;
            row.appendChild(idCell);

            // Create and append other cells here...

            this.clientesTableBody.appendChild(row);
        });
    }

    async createCliente(cliente) {
        // Implement createCliente method...
    }

    async updateCliente(cliente) {
        // Implement updateCliente method...
    }

    async deleteCliente(id) {
        // Implement deleteCliente method...
    }

    showEditForm(cliente) {
        // Implement showEditForm method...
    }

    resetForm() {
        // Implement resetForm method...
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const cliente = {
            id: this.clienteForm.id.value,
            nombres: this.clienteForm.nombres.value,
            apellidos: this.clienteForm.apellidos.value,
            rut: this.clienteForm.rut.value,
            direccion: this.clienteForm.direccion.value,
            email: this.clienteForm.email.value,
            telefono: this.clienteForm.telefono.value
        };

        if (this.isEditModeCli) {
            this.updateCliente(cliente);
        } else {
            this.createCliente(cliente);
        }

        this.resetForm();
    }
}

// Instantiate the class
const clienteManager = new ClienteManager();
