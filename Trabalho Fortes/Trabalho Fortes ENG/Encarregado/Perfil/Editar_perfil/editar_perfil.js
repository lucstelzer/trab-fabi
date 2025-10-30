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
    
    // Pegar os elementos do formulário
    const nomeInput = document.getElementById('edit-nome');
    const emailInput = document.getElementById('edit-email');
    const telefoneInput = document.getElementById('edit-telefone');
    const matriculaInput = document.getElementById('edit-matricula');
    const funcaoInput = document.getElementById('edit-funcao');
    const saveButton = document.getElementById('btn-salvar');

    // 1. FUNÇÃO: Carregar dados no formulário
    function carregarFormulario() {
        // Pega os dados do localStorage OU (||) usa o valor padrão
        nomeInput.value = localStorage.getItem('encarregado_nome') || "Nome do Encarregado";
        emailInput.value = localStorage.getItem('encarregado_email') || "encarregado.nome@fortes.com.br";
        telefoneInput.value = localStorage.getItem('encarregado_telefone') || "(27) 99999-8888";
        
        // Campos não-editáveis (apenas pegamos o valor salvo)
        matriculaInput.value = localStorage.getItem('encarregado_matricula') || "12345";
        funcaoInput.value = localStorage.getItem('encarregado_funcao') || "Técnico de Manutenção Sênior";
    }

    function salvarFormulario() {
        // Salva os valores dos inputs no localStorage
        localStorage.setItem('encarregado_nome', nomeInput.value);
        localStorage.setItem('encarregado_email', emailInput.value);
        localStorage.setItem('encarregado_telefone', telefoneInput.value);
        
        // Salva os valores não-editáveis também (caso eles não existam)
        localStorage.setItem('encarregado_matricula', matriculaInput.value);
        localStorage.setItem('encarregado_funcao', funcaoInput.value);

        // Salva os outros campos que não são editáveis para garantir
        localStorage.setItem('encarregado_setor', localStorage.getItem('encarregado_setor') || "Elétrica");
        localStorage.setItem('encarregado_unidade', localStorage.getItem('encarregado_unidade') || "Matriz - Vitória");

        alert('Perfil salvo com sucesso!');
    
        window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Encarregado/Perfil/perfil.html'; 
    }

    carregarFormulario();

    if (saveButton) {
        saveButton.addEventListener('click', salvarFormulario);
    }
    // --- FIM DO CÓDIGO NOVO ---
});