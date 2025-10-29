// Pega os elementos do DOM
const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

// Adiciona o evento de 'click' no botão
toggleButton.addEventListener('click', () => {
    // Adiciona ou remove a classe 'open' da sidebar
    sidebar.classList.toggle('open');
});