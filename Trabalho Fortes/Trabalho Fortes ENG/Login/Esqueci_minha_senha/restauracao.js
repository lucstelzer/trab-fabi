// esqueci.js

document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.getElementById('requestForm');
    const usernameInput = document.getElementById('username');
    const messageElement = document.getElementById('message');
    const submitButton = requestForm.querySelector('button[type="submit"]');

    // --- 1. SIMULAÇÃO DE BANCO DE DADOS ---
    // (Baseado no seu login.js)
    const mockUserDatabase = ["tecnico", "encarregado", "gestor"];

    // --- 2. SIMULAÇÃO DE VERIFICAÇÃO DE USUÁRIO ---
    function mockCheckUser(username) {
        return new Promise((resolve) => {
            // Simula atraso de rede
            setTimeout(() => {
                if (mockUserDatabase.includes(username)) {
                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: "Cadastro não encontrado." });
                }
            }, 1000); // 1 segundo de delay
        });
    }

    // --- 3. LÓGICA DE SUBMISSÃO DO FORMULÁRIO ---
    requestForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o envio real do formulário
        
        const username = usernameInput.value;

        // Desabilita o botão e mostra feedback
        submitButton.disabled = true;
        submitButton.textContent = 'Verificando...';
        messageElement.textContent = 'Procurando cadastro no sistema...';
        messageElement.className = ''; // Limpa classes de erro/sucesso

        // Chama a função de verificação simulada
        const result = await mockCheckUser(username);

        if (result.success) {
            // SUCESSO!
            messageElement.textContent = `Usuário '${username}' encontrado! (Simulação) Redirecionando para a redefinição de senha...`;
            messageElement.className = 'success'; // Usa a classe de sucesso do 'restauracao.css'

            setTimeout(() => {
                window.location.href = 'restauracao.html?token=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
            }, 3000);

        } else {
            // FALHA!
            messageElement.textContent = `Erro: ${result.message}`;
            messageElement.className = 'error'; // Usa a classe de erro do 'restauracao.css'
            submitButton.disabled = false;
            submitButton.textContent = 'Solicitar Link';
        }
    });
});