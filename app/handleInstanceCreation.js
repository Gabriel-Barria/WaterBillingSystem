import LecturasManager from './Lecturas/lecturas.js';
import ClientesManager from './Clientes/clientes.js';
import BoletasManager from './Boletas/boletas.js';
import ModalManager from './Components/modals/modals.js';
import { instances } from './instances.js';

export const handleInstanceCreation = (name) => {
    const className = {
        "lecturas": [LecturasManager],
        "clientes": [ClientesManager],
        "boletas" : [ModalManager, BoletasManager]
        // Agrega más mapeos según sea necesario
    };

    if (className[name]) {
        if (!instances[name]) {
            instances[name] = [];
        }
        className[name].forEach(Class => {
            const instance = new Class();
            instances[name].push(instance);
        });
    }
};
