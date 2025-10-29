// Espera o DOM (a página) carregar completamente
document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username-input"); // Usamos "username-input"
    const passwordInput = document.getElementById("password-input"); // Usamos "password-input"
    const errorMessage = document.getElementById("error-message");

    const fakeDatabase = [
        { 
            username: "tecnico", 
            password: "123", 
            role: "tecnico",
            redirectTo: "/Trabalho Fortes/Trabalho Fortes ENG/Dashboard_tecnico/dashboard_tecnico.html" 
        },
        { 
            username: "encarregado", 
            password: "456", 
            role: "encarregado",
            redirectTo: "/Trabalho Fortes/Trabalho Fortes ENG/Dashboard_encarregado/dashboard_encarregado.html"
        }
        // Adicione mais usuários aqui se precisar
    ];
   
    loginForm.addEventListener("submit", (event) => {
        // Previne que o formulário recarregue a página
        event.preventDefault();

        // Pega os valores digitados pelo usuário
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Procura o usuário no nosso "banco de dados"
        const user = fakeDatabase.find( (u) => u.username === username );

        // 4. Lógica de Verificação
        if (user) {
            // Se encontrou o usuário, agora checa a senha
            if (user.password === password) {
                // SUCESSO! Usuário e senha corretos.
                
                errorMessage.style.display = "none"; // Esconde o erro
                alert(`Login como ${user.role} bem-sucedido. Redirecionando...`);
                
                // !! A MÁGICA !!
                // Redireciona o usuário para a página correta
                window.location.href = user.redirectTo;

            } else {
                // Senha errada
                errorMessage.textContent = "Senha incorreta. Tente novamente.";
                errorMessage.style.display = "block"; // Mostra o erro
            }
        } else {
            // Usuário não encontrado
            errorMessage.textContent = "Usuário não encontrado.";
            errorMessage.style.display = "block"; // Mostra o erro
        }
    });
});