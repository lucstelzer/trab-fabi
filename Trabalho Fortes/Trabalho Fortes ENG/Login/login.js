document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username-input"); 
    const passwordInput = document.getElementById("password-input"); 
    const errorMessage = document.getElementById("error-message");

    const fakeDatabase = [
        { 
            username: "tecnico", 
            password: "123", 
            role: "tecnico",
            redirectTo: "/Trabalho Fortes/Trabalho Fortes ENG/Tecnico/Dashboard_tecnico/dashboard_tecnico.html" 
        },
        { 
            username: "encarregado", 
            password: "456", 
            role: "encarregado",
            redirectTo: "/Trabalho Fortes/Trabalho Fortes ENG/Encarregado/Dashboard_encarregado/dashboard_encarregado.html"
        }
    ];
   
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        const user = fakeDatabase.find( (u) => u.username === username );

        if (user) {
            if (user.password === password) {
                
                errorMessage.style.display = "none"; 
                alert(`Login como ${user.role} bem-sucedido. Redirecionando...`);
                window.location.href = user.redirectTo;

            } else {
                errorMessage.textContent = "Senha incorreta. Tente novamente.";
                errorMessage.style.display = "block"; 
            }
        } else {
            errorMessage.textContent = "Usuário não encontrado.";
            errorMessage.style.display = "block"; 
        }
    });
});