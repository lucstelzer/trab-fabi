// restauracao.js

document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    const messageElement = document.getElementById('message');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitButton = resetForm.querySelector('button[type="submit"]');

    // --- 1. FUNÇÕES DO SERVIDOR FALSO ---

    // Simula a validação do token no servidor.
    function mockValidateToken(token) {
        // Tokens válidos para teste:
        // Ex: um token válido de 32 caracteres
        if (token === "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6") {
            return { isValid: true, userId: 123 };
        }
        // Ex: um token expirado
        if (token === "expiredtoken12345678901234567890") {
            return { isValid: false, message: "O link de redefinição de senha expirou." };
        }
        // Qualquer outro é inválido
        return { isValid: false, message: "Token de redefinição inválido." };
    }

    // Simula o processo de salvar a nova senha no servidor.
    function mockResetPassword(userId, newPassword) {
        return new Promise((resolve) => {
            // Simula um atraso de rede de 1.5 segundos
            setTimeout(() => {
                console.log(`[MOCK SERVER] Senha redefinida para o usuário ID: ${userId}`);
                // 90% de chance de sucesso, 10% de chance de falha no servidor
                if (Math.random() < 0.9) {
                    resolve({ success: true, message: "Sua senha foi redefinida com sucesso!" });
                } else {
                    resolve({ success: false, message: "Erro interno do servidor ao salvar a senha. Tente novamente." });
                }
            }, 1500);
        });
    }

    // --- 2. LÓGICA DE INICIALIZAÇÃO E VALIDAÇÃO DO TOKEN ---
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    // VARIÁVEL GLOBAL PARA MANTER O ESTADO (MOCK) DO USUÁRIO
    let mockUserData = null; 

    if (!token) {
        messageElement.textContent = "Erro: Token de redefinição de senha não encontrado na URL.";
        messageElement.className = 'error'; 
        resetForm.style.display = 'none';
        return;
    }

    // Validação do token (Simulado)
    const tokenValidation = mockValidateToken(token);

    if (tokenValidation.isValid) {
        messageElement.textContent = "Insira e confirme sua nova senha.";
        messageElement.className = ''; 
        resetForm.style.display = 'block'; 
        mockUserData = { userId: tokenValidation.userId, token: token };

        // Dica: Para testar, use uma URL como: 
        // seu_arquivo.html?token=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
    } else {
        messageElement.textContent = `Erro: ${tokenValidation.message}`;
        messageElement.className = 'error'; 
        resetForm.style.display = 'none';
        return;
    }

    // --- 3. VALIDAÇÃO DO FORMULÁRIO (CLIENTE) E ENVIO (MOCK) ---
    
    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // ** VALIDAÇÃO DE SENHA NO CLIENTE **
        if (newPassword !== confirmPassword) {
            messageElement.textContent = "Erro: As senhas não conferem!";
            messageElement.className = 'error';
            confirmPasswordInput.setCustomValidity("As senhas não conferem.");
            confirmPasswordInput.reportValidity();
            return;
        } else {
            confirmPasswordInput.setCustomValidity(""); // Reseta a mensagem de erro
        }

        // Você pode adicionar validações de força de senha mais complexas aqui.
        // Exemplo: No mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            messageElement.textContent = "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e número.";
            messageElement.className = 'error';
            newPasswordInput.reportValidity();
            return;
        }

        // --- SIMULAÇÃO DE ENVIO PARA O SERVIDOR ---

        // Desabilita o botão para evitar múltiplos cliques
        submitButton.disabled = true;
        submitButton.textContent = 'Redefinindo...';
        messageElement.textContent = 'Processando sua nova senha...';
        messageElement.className = '';

        try {
            // Chama a função que simula a comunicação com o servidor
            const result = await mockResetPassword(mockUserData.userId, newPassword);

            if (result.success) {
                messageElement.textContent = result.message + " Redirecionando para o login...";
                messageElement.className = 'success';
                resetForm.style.display = 'none';
                
                // Redireciona após 3 segundos
                setTimeout(() => {
                    window.location.href = '/login'; 
                }, 3000);

            } else {
                // Erro simulado do servidor (10% de chance)
                messageElement.textContent = `Falha na Redefinição: ${result.message}`;
                messageElement.className = 'error';
                submitButton.disabled = false;
                submitButton.textContent = 'Redefinir Senha';
            }
        } catch (error) {
            // Erro simulado de rede/conexão
            messageElement.textContent = "Ocorreu um erro de conexão. Tente novamente.";
            messageElement.className = 'error';
            submitButton.disabled = false;
            submitButton.textContent = 'Redefinir Senha';
        }
    });

    // 4. LIMPEZA DE ERROS DE VALIDAÇÃO enquanto o usuário digita
    newPasswordInput.addEventListener('input', () => confirmPasswordInput.setCustomValidity(""));
    confirmPasswordInput.addEventListener('input', () => confirmPasswordInput.setCustomValidity(""));
});