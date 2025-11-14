const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

if (toggleButton && sidebar) {
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
} else {
    console.error("Elemento da sidebar ou botão toggle não encontrado.");
}
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/index.html';
}

document.getElementById('logout').addEventListener('click', logout);