// Adiciona o evento de 'click' no botão hamburger
const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

if (toggleButton && sidebar) {
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

// Adiciona o evento de 'click' no botão de logout
const logoutButton = document.getElementById('logout');

if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault(); // Previne a navegação padrão do link '#'
        
        // Simula o logout
        console.log('Usuário deslogado.');
        
        window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/login.html';
    });
}