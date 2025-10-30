document.addEventListener('DOMContentLoaded', () => {

    
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    

    if (toggleButton && sidebar) { 
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
    


   
    function carregarPerfil() {
        
        const nomeSalvo = localStorage.getItem('tecnico_nome');
        const emailSalvo = localStorage.getItem('tecnico_email');
        const telefoneSalvo = localStorage.getItem('tecnico_telefone');
        const matriculaSalva = localStorage.getItem('tecnico_matricula');
        const funcaoSalva = localStorage.getItem('tecnico_funcao');
        const setorSalvo = localStorage.getItem('tecnico_setor');
        const unidadeSalva = localStorage.getItem('tecnico_unidade');

        
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

    
    carregarPerfil();
    
});

        function logout() {
            localStorage.removeItem('token');
            window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/login.html';
        }

        
        document.getElementById('logout').addEventListener('click', logout);