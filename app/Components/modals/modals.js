
// scripts.js
class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll(".modal");
        this.initialize();
    }

    initialize() {
        // Cerrar el modal al hacer clic en la 'x'
        document.querySelectorAll(".close").forEach(span => {
            span.addEventListener("click", (event) => this.closeModal(event));
        });

        // Cerrar el modal al hacer clic fuera del contenido del modal
        window.addEventListener("click", (event) => this.windowOnClick(event));
    }

    openModal(event) {
        const modalId = event.target.getAttribute("data-modal-target");
        document.querySelector(modalId).style.display = "block";
    }

    closeModal(event) {
        const modalId = event.target.getAttribute("data-modal-target");
        document.querySelector(modalId).style.display = "none";
    }

    windowOnClick(event) {
        this.modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}
export default ModalManager;


