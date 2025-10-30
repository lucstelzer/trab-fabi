// Pega os elementos do DOM
const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

// Adiciona o evento de 'click' no botão
toggleButton.addEventListener('click', () => {
    // Adiciona ou remove a classe 'open' da sidebar
    sidebar.classList.toggle('open');
});
// Adiciona interatividade aos itens FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                
                // Fecha todos os itens
                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                });
                
                // Se o item clicado não estava ativo, abre ele
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
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