
    var lecturasTableBody = document.getElementById('lecturasTableBody');
    var lecturaForm = document.getElementById('lecturaForm');
    var formTitle = document.getElementById('formTitle');
    var idclienteSelect = document.getElementById('idcliente');
    let isEditMode = false;

    var fetchClientesLec = async () => {
        try {
            var response = await fetch('Clientes/readClientes.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            var clientes = await response.json();
            populateClienteSelect(clientes);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    var populateClienteSelect = (clientes) => {
        idclienteSelect.innerHTML = ''; // Clear existing options
        clientes.forEach(cliente => {
            var option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nombre_completo;
            idclienteSelect.appendChild(option);
        });
    };

    var fetchLecturas = async () => {
        try {
            var response = await fetch('Lecturas/readLecturas.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            var lecturas = await response.json();
            populateTableLectura(lecturas);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    var populateTableLectura = (lecturas) => {
        lecturasTableBody.innerHTML = ''; // Clear existing rows

        lecturas.forEach(lectura => {
            var row = document.createElement('tr');

            var idlecturaCell = document.createElement('td');
            idlecturaCell.textContent = lectura.idlectura;
            row.appendChild(idlecturaCell);

            var idclienteCell = document.createElement('td');
            idclienteCell.textContent = lectura.nombre_cliente;
            row.appendChild(idclienteCell);

            var lecturaCell = document.createElement('td');
            lecturaCell.textContent = lectura.lectura;
            row.appendChild(lecturaCell);

            var periodoCell = document.createElement('td');
            periodoCell.textContent = lectura.periodo;
            row.appendChild(periodoCell);

            var fechahoraCell = document.createElement('td');
            fechahoraCell.textContent = lectura.fechahora;
            row.appendChild(fechahoraCell);

            var fotoMedidorCell = document.createElement('td');
            if (lectura.fotoMedidor) {
                var img = document.createElement('img');
                img.src = lectura.fotoMedidor;
                img.alt = 'Foto del Medidor';
                img.width = 100;
                fotoMedidorCell.appendChild(img);
            }
            row.appendChild(fotoMedidorCell);

            var actionsCell = document.createElement('td');
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteLectura(lectura.idlectura));
            actionsCell.appendChild(deleteButton);

            var editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => showEditFormLectura(lectura));
            actionsCell.appendChild(editButton);

            row.appendChild(actionsCell);

            lecturasTableBody.appendChild(row);
        });
    };

    var createLectura = async (formData) => {
        try {
            var response = await fetch('Lecturas/createLectura.php', {
                method: 'POST',
                body: formData
            });
            var result = await response.json();
            if (result.success) {
                alert('Lectura creada exitosamente');
                fetchLecturas(); // Refresh table after creation
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    var updateLectura = async (formData) => {
        try {
            var response = await fetch('Lecturas/updateLectura.php', {
                method: 'POST',
                body: formData
            });
            var result = await response.json();
            console.log(result);
            fetchLecturas(); // Refresh table after update
        } catch (error) {
            console.error('Error:', error);
        }
    };

    var deleteLectura = async (idlectura) => {
        try {
            var response = await fetch(`Lecturas/deleteLectura.php?idlectura=${idlectura}`, {
                method: 'GET'
            });
            var result = await response.json();
            console.log(result);
            fetchLecturas(); // Refresh table after deletion
        } catch (error) {
            console.error('Error:', error);
        }
    };

    var showEditFormLectura = (lectura) => {
        isEditMode = true;
        formTitle.textContent = 'Editar Lectura';
        lecturaForm.idlectura.value = lectura.idlectura;
        lecturaForm.idcliente.value = lectura.idcliente;
        lecturaForm.lectura.value = lectura.lectura;
        lecturaForm.periodo.value = lectura.periodo.substring(0, 7);
    };

    var resetFormLectura = () => {
        isEditMode = false;
        formTitle.textContent = 'Agregar Lectura';
        lecturaForm.reset();
        lecturaForm.idlectura.value = '';
    };

    lecturaForm.addEventListener('submit', (event) => {
        event.preventDefault();

        var formData = new FormData(lecturaForm);
        if (isEditMode) {
            updateLectura(formData);
        } else {
            createLectura(formData);
        }

        resetFormLectura();
    });

    // Fetch and display clients and lecturas on page load
    fetchClientesLec();
    fetchLecturas();

