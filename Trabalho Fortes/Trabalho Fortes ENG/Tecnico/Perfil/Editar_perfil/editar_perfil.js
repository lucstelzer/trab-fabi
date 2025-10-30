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
        nomeInput.value = localStorage.getItem('tecnico_nome') || "Nome do Técnico";
        emailInput.value = localStorage.getItem('tecnico_email') || "tecnico.nome@fortes.com.br";
        telefoneInput.value = localStorage.getItem('tecnico_telefone') || "(27) 99999-8888";
        
        matriculaInput.value = localStorage.getItem('tecnico_matricula') || "12345";
        funcaoInput.value = localStorage.getItem('tecnico_funcao') || "Técnico de Manutenção Sênior";
    }

    function salvarFormulario() {
        localStorage.setItem('tecnico_nome', nomeInput.value);
        localStorage.setItem('tecnico_email', emailInput.value);
        localStorage.setItem('tecnico_telefone', telefoneInput.value);
        
        localStorage.setItem('tecnico_matricula', matriculaInput.value);
        localStorage.setItem('tecnico_funcao', funcaoInput.value);

        localStorage.setItem('tecnico_setor', localStorage.getItem('tecnico_setor') || "Elétrica");
        localStorage.setItem('tecnico_unidade', localStorage.getItem('tecnico_unidade') || "Matriz - Vitória");


        alert('Perfil salvo com sucesso!');
        window.location.href = '../perfil.html'; 
    }

    
    carregarFormulario();
    if (saveButton) {
        saveButton.addEventListener('click', salvarFormulario);
    }
});