// Pega os elementos do DOM
const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

// Adiciona o evento de 'click' no botão
toggleButton.addEventListener('click', () => {
    // Adiciona ou remove a classe 'open' da sidebar
    sidebar.classList.toggle('open');
});
// Função para realizar o logout
        function logout() {
            // Remove o token ou a informação de sessão do armazenamento local
            localStorage.removeItem('token');
            // Redireciona o usuário para a página de login
            window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/login.html';
        }

        // Adiciona um "ouvinte" de evento ao botão de logout
        document.getElementById('logout').addEventListener('click', logout);