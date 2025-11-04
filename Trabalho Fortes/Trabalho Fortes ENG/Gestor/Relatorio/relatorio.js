const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

if (toggleButton && sidebar) {
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

const logoutButton = document.getElementById('logout');

if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        console.log('Usuário deslogado.');
        
        window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/login.html';
    });
}