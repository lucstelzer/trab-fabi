document.addEventListener('DOMContentLoaded', () => {

    // --- SEU CÓDIGO ORIGINAL DA SIDEBAR ---
    // Pega os elementos do DOM
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    
    // Adiciona o evento de 'click' no botão
    if (toggleButton && sidebar) { // Verificação para evitar erro
        toggleButton.addEventListener('click', () => {
            // Adiciona ou remove a classe 'open' da sidebar
            sidebar.classList.toggle('open');
        });
    }
    // --- FIM DO SEU CÓDIGO ORIGINAL ---


    // --- CÓDIGO NOVO ADICIONADO ---
    function carregarPerfil() {
        // Pega os dados salvos no localStorage
        const nomeSalvo = localStorage.getItem('tecnico_nome');
        const emailSalvo = localStorage.getItem('tecnico_email');
        const telefoneSalvo = localStorage.getItem('tecnico_telefone');
        const matriculaSalva = localStorage.getItem('tecnico_matricula');
        const funcaoSalva = localStorage.getItem('tecnico_funcao');
        const setorSalvo = localStorage.getItem('tecnico_setor');
        const unidadeSalva = localStorage.getItem('tecnico_unidade');

        // Atualiza o HTML com os dados salvos (só se existirem)
        if (nomeSalvo) {
            document.getElementById('profile-name').textContent = nomeSalvo;
        }
        if (emailSalvo) {
            document.getElementById('profile-email').textContent = emailSalvo;
        }
        if (telefoneSalvo) {
            document.getElementById('profile-telefone').textContent = telefoneSalvo;
        }
        if (matriculaSalva) {
            document.getElementById('profile-matricula').textContent = matriculaSalva;
        }
        if (funcaoSalva) {
            document.getElementById('profile-funcao').textContent = funcaoSalva;
        }
        if (setorSalvo) {
            document.getElementById('profile-setor').textContent = setorSalvo;
        }
        if (unidadeSalva) {
            document.getElementById('profile-unidade').textContent = unidadeSalva;
        }
    }

    // Chama a função assim que a página carregar
    carregarPerfil();
    // --- FIM DO CÓDIGO NOVO ---
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