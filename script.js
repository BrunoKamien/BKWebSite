document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('nav a');
    const modalOverlay = document.getElementById('modal-overlay');
    const modals = {};
    const closeButtons = document.querySelectorAll('.close-button');
    const mainContent = document.getElementById('main-content');

    // Mapeia os IDs das abas para os IDs das modais
    tabs.forEach(tab => {
        const tabId = tab.getAttribute('data-tab');
        modals[tabId] = document.getElementById(`${tabId}-modal`);
    });

    function openModal(modalId) {
        if (modals[modalId]) {
            const modal = modals[modalId];

            modal.classList.remove('fade-out');
            modal.style.display = 'block';
            modal.classList.add('fade-in');

            modalOverlay.style.display = 'block';
            mainContent.style.filter = 'blur(5px)';

            // Foca automaticamente no campo "nome" ao abrir o modal de contato
            if (modalId === 'contato') {
                const nomeInput = document.getElementById('nome');
                if (nomeInput) {
                    setTimeout(() => nomeInput.focus(), 300);
                }
            }
        }
    }

    function closeModal(modal) {
        modal.classList.remove('fade-in');
        modal.classList.add('fade-out');

        // Aguarda fim da animação antes de ocultar
        setTimeout(() => {
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
            mainContent.style.filter = 'none';
        }, 300);
    }

    // Adiciona um ouvinte de evento de clique a cada link de navegação
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const tabId = this.getAttribute('data-tab');
            openModal(tabId);
        });
    });

    // Adiciona um ouvinte de evento de clique a cada botão de fechar
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Adiciona um ouvinte de evento de clique ao overlay para fechar a modal ao clicar fora
    modalOverlay.addEventListener('click', function() {
        const openModalElement = document.querySelector('.modal[style*="display: block"]');
        if (openModalElement) {
            closeModal(openModalElement);
        }
    });

    // Fecha o modal ao pressionar a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModalElement = document.querySelector('.modal[style*="display: block"]');
            if (openModalElement) {
                closeModal(openModalElement);
            }
        }
    });
});