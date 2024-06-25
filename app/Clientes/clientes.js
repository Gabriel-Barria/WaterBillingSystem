class ClientesManager {
    constructor() {
        this.clientesTableBody = document.getElementById('clientesTableBody');
        this.clienteForm = document.getElementById('clienteForm');
        this.formTitleCli = document.getElementById('formTitleCli');
        this.isEditModeCli = false;

        this.clienteForm.addEventListener('submit', this.handleFormSubmit.bind(this));

        this.fetchClientes();
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

            const nombresCell = document.createElement('td');
            nombresCell.textContent = cliente.nombres;
            row.appendChild(nombresCell);

            const apellidosCell = document.createElement('td');
            apellidosCell.textContent = cliente.apellidos;
            row.appendChild(apellidosCell);

            const rutCell = document.createElement('td');
            rutCell.textContent = cliente.rut;
            row.appendChild(rutCell);

            const direccionCell = document.createElement('td');
            direccionCell.textContent = cliente.direccion;
            row.appendChild(direccionCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = cliente.email;
            row.appendChild(emailCell);

            const telefonoCell = document.createElement('td');
            telefonoCell.textContent = cliente.telefono;
            row.appendChild(telefonoCell);

            const actionsCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => this.deleteCliente(cliente.id));
            actionsCell.appendChild(deleteButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => this.showEditForm(cliente));
            actionsCell.appendChild(editButton);

            row.appendChild(actionsCell);

            this.clientesTableBody.appendChild(row);
        });
    }

    async createCliente(cliente) {
        try {
            const response = await fetch('Clientes/create.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            const result = await response.json();
            console.log(result);
            this.fetchClientes(); // Refresh table after creation
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async updateCliente(cliente) {
        try {
            const response = await fetch('Clientes/update.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            const result = await response.json();
            console.log(result);
            this.fetchClientes(); // Refresh table after update
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async deleteCliente(id) {
        try {
            const response = await fetch(`Clientes/delete.php?id=${id}`, {
                method: 'GET'
            });
            const result = await response.json();
            console.log(result);
            this.fetchClientes(); // Refresh table after deletion
        } catch (error) {
            console.error('Error:', error);
        }
    }

    showEditForm(cliente) {
        this.isEditModeCli = true;
        this.formTitleCli.textContent = 'Editar Cliente';
        this.clienteForm.id.value = cliente.id;
        this.clienteForm.nombres.value = cliente.nombres;
        this.clienteForm.apellidos.value = cliente.apellidos;
        this.clienteForm.rut.value = cliente.rut;
        this.clienteForm.direccion.value = cliente.direccion;
        this.clienteForm.email.value = cliente.email;
        this.clienteForm.telefono.value = cliente.telefono;
    }

    resetForm() {
        this.isEditModeCli = false;
        this.formTitleCli.textContent = 'Agregar Cliente';
        this.clienteForm.reset();
        this.clienteForm.id.value = '';
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
export default ClientesManager;
