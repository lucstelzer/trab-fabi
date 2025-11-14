const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    
    const element = document.getElementById('tecnicos');
    
    const choices = new Choices(element, {
        removeItemButton: true,
        placeholder: true,
        placeholderValue: 'Digite ou selecione um técnico...',
        searchPlaceholderValue: 'Digite para pesquisar',
        allowHTML: false,
    });

    const form = document.getElementById('solicitacao-form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const querEnviar = confirm('Deseja mesmo fazer essas alterações?');

        if (querEnviar) {
            alert('Solicitação enviada com sucesso!');
            
            form.reset(); 
            choices.clearStore();
        } else {
            
        }
    });
});
function logout() {
            localStorage.removeItem('token');
            window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/index.html';
        }

        document.getElementById('logout').addEventListener('click', logout);