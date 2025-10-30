document.addEventListener('DOMContentLoaded', () => {

    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    // Adiciona o evento de 'click' no botão
    if (toggleButton && sidebar) { // Verificação para evitar erro
        toggleButton.addEventListener('click', () => {
            // Adiciona ou remove a classe 'open' da sidebar
            sidebar.classList.toggle('open');
        });
    }
    
    const nomeInput = document.getElementById('edit-nome');
    const emailInput = document.getElementById('edit-email');
    const telefoneInput = document.getElementById('edit-telefone');
    const matriculaInput = document.getElementById('edit-matricula');
    const funcaoInput = document.getElementById('edit-funcao');
    const saveButton = document.getElementById('btn-salvar');

    // 1. FUNÇÃO: Carregar dados no formulário
    function carregarFormulario() {
        // Pega os dados do localStorage OU (||) usa o valor padrão
        nomeInput.value = localStorage.getItem('gestor_nome') || "Nome do Gestor";
        emailInput.value = localStorage.getItem('gestor_email') || "gestor.nome@fortes.com.br";
        telefoneInput.value = localStorage.getItem('gestor_telefone') || "(27) 99999-8888";
        
        // Campos não-editáveis (apenas pegamos o valor salvo)
        matriculaInput.value = localStorage.getItem('gestor_matricula') || "12345";
        funcaoInput.value = localStorage.getItem('gestor_funcao') || "Técnico de Manutenção Sênior";
    }

    // 2. FUNÇÃO: Salvar dados
    function salvarFormulario() {
        // Salva os valores dos inputs no localStorage
        localStorage.setItem('gestor_nome', nomeInput.value);
        localStorage.setItem('gestor_email', emailInput.value);
        localStorage.setItem('gestor_telefone', telefoneInput.value);
        
        // Salva os valores não-editáveis também (caso eles não existam)
        localStorage.setItem('gestor_matricula', matriculaInput.value);
        localStorage.setItem('gestor_funcao', funcaoInput.value);

        // Salva os outros campos que não são editáveis para garantir
        localStorage.setItem('gestor_setor', localStorage.getItem('gestor_setor') || "Elétrica");
        localStorage.setItem('gestor_unidade', localStorage.getItem('gestor_unidade') || "Matriz - Vitória");


        // Avisa o usuário e redireciona de volta para o perfil
        alert('Perfil salvo com sucesso!');
    
        window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Gestor/Perfil/perfil.html'; 
    }
    // Roda a função de carregar assim que a página abre
    carregarFormulario();

    // Adiciona o 'click' no botão Salvar
    if (saveButton) {
        saveButton.addEventListener('click', salvarFormulario);
    }
});