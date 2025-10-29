// Pega os elementos do DOM
const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

// Adiciona o evento de 'click' no botão
toggleButton.addEventListener('click', () => {
    // Adiciona ou remove a classe 'open' da sidebar
    sidebar.classList.toggle('open');
});
// Adiciona interatividade aos itens FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                
                // Fecha todos os itens
                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                });
                
                // Se o item clicado não estava ativo, abre ele
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        });