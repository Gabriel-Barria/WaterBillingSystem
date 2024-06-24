document.addEventListener('DOMContentLoaded', () => {
    const lecturasLink = document.getElementById('lecturas-link');
    const clientesLink = document.getElementById('clientes-link');
    const boletasLink = document.getElementById('boletas-link');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.getElementById('main-content');

    const loadContent = async (url) => {
        const response = await fetch(url);
        const content = await response.text();
        mainContent.innerHTML = content;

        if (url === 'Lecturas/index.html') {
            if(document.querySelector("#script_lecturas")){
                document.querySelector("#script_lecturas").remove();
            }
            const script = document.createElement('script');
            script.id = "script_lecturas"
            script.src = 'Lecturas/app.js';
            document.body.appendChild(script);
                        
        }else if(url === 'Clientes/index.html'){
            if(document.querySelector("#script_clientes")){
                document.querySelector("#script_clientes").remove();
            }
            const script = document.createElement('script');
            script.id = "script_clientes"
            script.src = 'Clientes/app.js';
            document.body.appendChild(script);
            
        }else if(url === 'Boletas/index.php'){
            if(document.querySelector("#script_boletas")){
                document.querySelector("#script_boletas").remove();
            }
            const script = document.createElement('script');
            script.id = "script_boletas"
            script.src = 'Boletas/app.js';
            document.body.appendChild(script);            
        }
    };

    const loadHeaderFooter = async () => {
        const headerResponse = await fetch('Plantillas/header.html');
        const headerContent = await headerResponse.text();
        document.getElementById('header').innerHTML = headerContent;

        const footerResponse = await fetch('Plantillas/footer.html');
        const footerContent = await footerResponse.text();
        document.getElementById('footer').innerHTML = footerContent;
    };

    lecturasLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('Lecturas/index.html');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });

    clientesLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('Clientes/index.html');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });
    boletasLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('Boletas/index.php');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Load header and footer once at the beginning
    loadHeaderFooter();

    // Load the default content (e.g., lecturas.html)
    loadContent('Lecturas/index.html');
});
