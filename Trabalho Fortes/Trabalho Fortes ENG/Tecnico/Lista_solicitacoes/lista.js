const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

function logout() {
    localStorage.removeItem('token'); 
    window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/login.html'; 
}

document.getElementById('logout').addEventListener('click', logout);

document.querySelectorAll('.complete-task').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const row = e.target.closest('tr');
        const taskName = row.querySelector('td:nth-child(2)').textContent.trim(); 
        
        const confirmationMessage = `Deseja realmente concluir a tarefa "${taskName}"? Esta ação é irreversível.`;
        
        if (confirm(confirmationMessage)) {
            
            row.querySelector('td:nth-child(4)').innerHTML = '<span class="status-badge completed">Concluída</span>';
            row.querySelector('td:nth-child(5)').textContent = ''; 
            row.classList.remove('approved', 'pending');
            
            const hoursText = row.querySelector('td:nth-child(3)').textContent;
            const taskHours = parseFloat(hoursText.replace('hrs', '').trim());
            
            let currentTotalText = pendingHoursElement.textContent.replace('hrs', '').trim();
            let currentTotal = parseFloat(currentTotalText) || 0; 
            
            let newTotal = currentTotal - taskHours;
            pendingHoursElement.textContent = `${newTotal}hrs`;
            
            alert(`Tarefa "${taskName}" concluída e ${taskHours} horas deduzidas do total pendente.`);
        }
    });});