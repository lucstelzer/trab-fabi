document.getElementById('toggle-sidebar').addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('open');
        });
        function logout() {
            localStorage.removeItem('token');
            window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/login.html';
        }

        document.getElementById('logout').addEventListener('click', logout);
        document.addEventListener('DOMContentLoaded', () => {
    const approveBtn = document.querySelector('.approve-btn');
    const rejectBtn = document.querySelector('.reject-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Funcionalidade dos botões Sim/Não
    approveBtn.addEventListener('click', () => {
        alert('Solicitação APROVADA! Enviando dados...');
        // Aqui você adicionaria o código para enviar os dados para o servidor
    });

    rejectBtn.addEventListener('click', () => {
        alert('Solicitação REJEITADA! Enviando dados...');
        // Aqui você adicionaria o código para enviar os dados para o servidor
    });

    // Funcionalidade de Navegação (Exemplo simples)
    prevBtn.addEventListener('click', () => {
        alert('Voltando para a solicitação anterior (implementação real requer dados)');
        // Implementação real mudaria o conteúdo da .notification-box
    });

    nextBtn.addEventListener('click', () => {
        alert('Avançando para a próxima solicitação (implementação real requer dados)');
        // Implementação real mudaria o conteúdo da .notification-box
    });
});