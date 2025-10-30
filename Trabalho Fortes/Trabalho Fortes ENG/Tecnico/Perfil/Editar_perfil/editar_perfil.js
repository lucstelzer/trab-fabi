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
        nomeInput.value = localStorage.getItem('tecnico_nome') || "Nome do Técnico";
        emailInput.value = localStorage.getItem('tecnico_email') || "tecnico.nome@fortes.com.br";
        telefoneInput.value = localStorage.getItem('tecnico_telefone') || "(27) 99999-8888";
        
        // Campos não-editáveis (apenas pegamos o valor salvo)
        matriculaInput.value = localStorage.getItem('tecnico_matricula') || "12345";
        funcaoInput.value = localStorage.getItem('tecnico_funcao') || "Técnico de Manutenção Sênior";
    }

    // 2. FUNÇÃO: Salvar dados
    function salvarFormulario() {
        // Salva os valores dos inputs no localStorage
        localStorage.setItem('tecnico_nome', nomeInput.value);
        localStorage.setItem('tecnico_email', emailInput.value);
        localStorage.setItem('tecnico_telefone', telefoneInput.value);
        
        // Salva os valores não-editáveis também (caso eles não existam)
        localStorage.setItem('tecnico_matricula', matriculaInput.value);
        localStorage.setItem('tecnico_funcao', funcaoInput.value);

        // Salva os outros campos que não são editáveis para garantir
        localStorage.setItem('tecnico_setor', localStorage.getItem('tecnico_setor') || "Elétrica");
        localStorage.setItem('tecnico_unidade', localStorage.getItem('tecnico_unidade') || "Matriz - Vitória");


        // Avisa o usuário e redireciona de volta para o perfil
        alert('Perfil salvo com sucesso!');
        
        // ==================
        //     CORREÇÃO 
        // ==================
        // Procura 'perfil.html' no diretório PAI (../)
        window.location.href = '../perfil.html'; 
    }

    // 3. LIGAR EVENTOS
    
    // Roda a função de carregar assim que a página abre
    carregarFormulario();

    // Adiciona o 'click' no botão Salvar
    if (saveButton) {
        saveButton.addEventListener('click', salvarFormulario);
    }
    // --- FIM DO CÓDIGO NOVO ---
});