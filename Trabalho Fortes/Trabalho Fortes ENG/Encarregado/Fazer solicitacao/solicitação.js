const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

toggleButton.addEventListener('click', () => {
 
    sidebar.classList.toggle('open');
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('solicitacao-form');
    form.addEventListener('submit', (event) => {
        
        
        event.preventDefault();

        alert('Solicitação enviada com sucesso!');

        form.reset();
    });

});