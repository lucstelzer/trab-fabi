document.addEventListener('DOMContentLoaded', () => {

    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
    
    const nomeInput = document.getElementById('edit-nome');
    const emailInput = document.getElementById('edit-email');
    const telefoneInput = document.getElementById('edit-telefone');
    const matriculaInput = document.getElementById('edit-matricula');
    const funcaoInput = document.getElementById('edit-funcao');
    const saveButton = document.getElementById('btn-salvar');

    function carregarFormulario() {
        nomeInput.value = localStorage.getItem('gestor_nome') || "Nome do Gestor";
        emailInput.value = localStorage.getItem('gestor_email') || "gestor.nome@fortes.com.br";
        telefoneInput.value = localStorage.getItem('gestor_telefone') || "(27) 99999-8888";
        
        matriculaInput.value = localStorage.getItem('gestor_matricula') || "12345";
        funcaoInput.value = localStorage.getItem('gestor_funcao') || "Técnico de Manutenção Sênior";
    }

    function salvarFormulario() {
        localStorage.setItem('gestor_nome', nomeInput.value);
        localStorage.setItem('gestor_email', emailInput.value);
        localStorage.setItem('gestor_telefone', telefoneInput.value);
        
        localStorage.setItem('gestor_matricula', matriculaInput.value);
        localStorage.setItem('gestor_funcao', funcaoInput.value);

        localStorage.setItem('gestor_setor', localStorage.getItem('gestor_setor') || "Elétrica");
        localStorage.setItem('gestor_unidade', localStorage.getItem('gestor_unidade') || "Matriz - Vitória");


        alert('Perfil salvo com sucesso!');
    
        window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Gestor/Perfil/perfil.html'; 
    }
    carregarFormulario();

    if (saveButton) {
        saveButton.addEventListener('click', salvarFormulario);
    }
});