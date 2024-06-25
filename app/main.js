import LecturasManager from './Lecturas/lecturas.js';
import ClientesManager from './Clientes/clientes.js';
import BoletasManager from './Boletas/boletas.js';

document.addEventListener('DOMContentLoaded', () => {
    const lecturasLink = document.getElementById('lecturas-link');
    const clientesLink = document.getElementById('clientes-link');
    const boletasLink = document.getElementById('boletas-link');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.getElementById('main-content');

    const loadContent = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const content = await response.text();
            const name = url.split("/")[1].toLowerCase();
            mainContent.innerHTML = content;
    
            // Remueve el script existente si existe
            const existingScript = document.querySelector(`#script_${name}`);
            if (existingScript) {
                existingScript.remove();
            }
    
            // Crea un nuevo script dinámicamente
            const script = document.createElement("script");
            script.id = `script_${name}`;
            script.src = `./${capitalizeText(name)}/${name}.js`;
            script.type = 'module';
            script.onload = () => {
                // Usa el objeto de mapeo para crear la instancia correspondiente
                handleInstanceCreation(name);
            };
    
            // Agrega el script al cuerpo del documento
            document.body.appendChild(script);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleInstanceCreation = (name) => {
        const className = {
            "lecturas": LecturasManager,
            "clientes": ClientesManager,
            "boletas" : BoletasManager
            // Agrega más mapeos según sea necesario
        };
    
        if (className[name]) {
            new className[name]();
        } else {
            console.warn(`No hay gestor definido para ${name}`);
        }
    };
    const loadHeaderFooter = async () => {
        const headerResponse = await fetch('./Plantillas/header.html');
        const headerContent = await headerResponse.text();
        document.getElementById('header').innerHTML = headerContent;

        const footerResponse = await fetch('./Plantillas/footer.html');
        const footerContent = await footerResponse.text();
        document.getElementById('footer').innerHTML = footerContent;
    };

    lecturasLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('./Lecturas/index.html');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });

    clientesLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('./Clientes/index.html');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });
    boletasLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('./Boletas/index.php');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    function capitalizeText(text) {
        return text.toLowerCase().replace(/^(.)|\s+(.)/g, function($1) { return $1.toUpperCase(); });
    }

    // Load header and footer once at the beginning
    loadHeaderFooter();

    // Load the default content (e.g., lecturas.html)
    loadContent('./Lecturas/index.html');
});
