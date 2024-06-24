
    var clientesTableBody = document.getElementById('clientesTableBody');
    var clienteForm = document.getElementById('clienteForm');
    var formTitleCli = document.getElementById('formTitleCli');
    var isEditModeCli = false;

    var fetchClientes = async () => {
        try {
            var response = await fetch('Clientes/read.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            var clientes = await response.json();
            
            populateTable(clientes);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    var populateTable = (clientes) => {
        clientesTableBody.innerHTML = ''; // Clear existing rows
        clientes.forEach(cliente => {
            var row = document.createElement('tr');

            var idCell = document.createElement('td');
            idCell.textContent = cliente.id;
            row.appendChild(idCell);

            var nombresCell = document.createElement('td');
            nombresCell.textContent = cliente.nombres;
            row.appendChild(nombresCell);

            var apellidosCell = document.createElement('td');
            apellidosCell.textContent = cliente.apellidos;
            row.appendChild(apellidosCell);

            var rutCell = document.createElement('td');
            rutCell.textContent = cliente.rut;
            row.appendChild(rutCell);

            var direccionCell = document.createElement('td');
            direccionCell.textContent = cliente.direccion;
            row.appendChild(direccionCell);

            var emailCell = document.createElement('td');
            emailCell.textContent = cliente.email;
            row.appendChild(emailCell);

            var telefonoCell = document.createElement('td');
            telefonoCell.textContent = cliente.telefono;
            row.appendChild(telefonoCell);

            var actionsCell = document.createElement('td');
            var devareButton = document.createElement('button');
            devareButton.textContent = 'Eliminar';
            devareButton.addEventListener('click', () => devareCliente(cliente.id));
            actionsCell.appendChild(devareButton);

            var editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => showEditForm(cliente));
            actionsCell.appendChild(editButton);

            row.appendChild(actionsCell);

            clientesTableBody.appendChild(row);
        });
    };

    var createCliente = async (cliente) => {
        try {
            var response = await fetch('Clientes/create.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            var result = await response.json();
            console.log(result);
            fetchClientes(); // Refresh table after creation
        } catch (error) {
            console.error('Error:', error);
        }
    };

    var updateCliente = async (cliente) => {
        try {
            var response = await fetch('Clientes/update.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            var result = await response.json();
            console.log(result);
            fetchClientes(); // Refresh table after update
        } catch (error) {
            console.error('Error:', error);
        }
    };

    var devareCliente = async (id) => {
        try {
            var response = await fetch(`Clientes/devare.php?id=${id}`, {
                method: 'GET'
            });
            var result = await response.json();
            console.log(result);
            fetchClientes(); // Refresh table after devarion
        } catch (error) {
            console.error('Error:', error);
        }
    };

    var showEditForm = (cliente) => {
        isEditModeCli = true;
        formTitleCli.textContent = 'Editar Cliente';
        clienteForm.id.value = cliente.id;
        clienteForm.nombres.value = cliente.nombres;
        clienteForm.apellidos.value = cliente.apellidos;
        clienteForm.rut.value = cliente.rut;
        clienteForm.direccion.value = cliente.direccion;
        clienteForm.email.value = cliente.email;
        clienteForm.telefono.value = cliente.telefono;
    };

    var resetForm = () => {
        isEditModeCli = false;
        formTitleCli.textContent = 'Agregar Cliente';
        clienteForm.reset();
        clienteForm.id.value = '';
    };

    clienteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        var cliente = {
            id: clienteForm.id.value,
            nombres: clienteForm.nombres.value,
            apellidos: clienteForm.apellidos.value,
            rut: clienteForm.rut.value,
            direccion: clienteForm.direccion.value,
            email: clienteForm.email.value,
            telefono: clienteForm.telefono.value
        };

        if (isEditModeCli) {
            updateCliente(cliente);
        } else {
            createCliente(cliente);
        }

        resetForm();
    });

    // Fetch and display clientes on page load
    fetchClientes();

