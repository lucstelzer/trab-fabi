document.addEventListener('DOMContentLoaded', () => {
    const noticiaForm = document.getElementById('noticia-form');
    
    if (noticiaForm) {
        noticiaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const titulo = document.getElementById('noticia-titulo').value;

            const conteudo = document.getElementById('noticia-conteudo').value;

            alert(`Notícia "${titulo}" publicada com sucesso! (Simulação)`);
            
            noticiaForm.reset();
            
            window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Gestor/Dashboard_gestor/dashboard_gestor.html';
        });
    }
});