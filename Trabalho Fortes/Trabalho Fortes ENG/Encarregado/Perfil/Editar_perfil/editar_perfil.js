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
        nomeInput.value = localStorage.getItem('encarregado_nome') || "Nome do Encarregado";
        emailInput.value = localStorage.getItem('encarregado_email') || "encarregado.nome@fortes.com.br";
        telefoneInput.value = localStorage.getItem('encarregado_telefone') || "(27) 11111-1111";
        
        matriculaInput.value = localStorage.getItem('encarregado_matricula') || "34567";
        funcaoInput.value = localStorage.getItem('encarregado_funcao') || "Encarregado de Manutenção";
    }

    function salvarFormulario() {
        localStorage.setItem('encarregado_nome', nomeInput.value);
        localStorage.setItem('encarregado_email', emailInput.value);
        localStorage.setItem('encarregado_telefone', telefoneInput.value);
        
        localStorage.setItem('encarregado_matricula', matriculaInput.value);
        localStorage.setItem('encarregado_funcao', funcaoInput.value);

        localStorage.setItem('encarregado_setor', localStorage.getItem('encarregado_setor') || "Elétrica");
        localStorage.setItem('encarregado_unidade', localStorage.getItem('encarregado_unidade') || "Matriz - Vitória");

        alert('Perfil salvo com sucesso!');
    
        window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Encarregado/Perfil/perfil.html'; 
    }

    carregarFormulario();

    if (saveButton) {
        saveButton.addEventListener('click', salvarFormulario);
    }
});