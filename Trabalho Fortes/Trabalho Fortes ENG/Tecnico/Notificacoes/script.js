const allNotifications = [
    { title: "Notificação sobre hora extra", body: "Sua solicitação #234 foi aprovado", date: "10:30", isRead: false },
    { title: "Notificação sobre folga no próximo feriado", body: "Sua solicitação #234 foi aprovado", date: "29/03", isRead: false },
    { title: "Notificação sobre hora extra", body: "Você foi chamado para participar de uma hora extra", date: "16/01", isRead: true },
    { title: "Alerta de sistema", body: "O servidor 01 será reiniciado em 5 minutos", date: "Ontem", isRead: false },
    { title: "Nova mensagem", body: "Você tem 3 novas mensagens na caixa de entrada", date: "15/12", isRead: true }
];

const notificationListElement = document.getElementById('notificationList');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

function renderNotifications(notifications) {
    notificationListElement.innerHTML = ''; 
    if (notifications.length === 0) {
        notificationListElement.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhuma notificação encontrada com o filtro atual.</p>';
        return;
    }

    notifications.forEach(notif => {
        const item = document.createElement('div');
        const readClass = notif.isRead ? 'read' : 'unread'; 
        item.className = `notification-item ${readClass}`;

        item.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-circle icon-alert"></i> 
                <div class="text-group">
                    <p class="title">${notif.title}</p>
                    <p class="body-text">${notif.body}</p>
                </div>
            </div>
            <span class="timestamp">${notif.date}</span>
        `;
        
        item.onclick = function() {
            if (notif.isRead) return; 
            
            notif.isRead = true;
            item.classList.remove('unread');
            item.classList.add('read');
            
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterNotifications(activeFilter);
        };
        
        notificationListElement.appendChild(item);
    });
}

function filterNotifications(filterType = null) {
    let currentFilter = filterType;

    if (!currentFilter) {
        currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter') || 'todas';
    }

    let filteredList = allNotifications;
    
    if (currentFilter === 'lidas') {
        filteredList = allNotifications.filter(notif => notif.isRead);
    } else if (currentFilter === 'nao-lidas') {
        filteredList = allNotifications.filter(notif => !notif.isRead);
    }

    const searchText = searchInput.value.toLowerCase();
    
    if (searchText) {
        filteredList = filteredList.filter(notif => 
            notif.title.toLowerCase().includes(searchText) || 
            notif.body.toLowerCase().includes(searchText)
        );
    }

    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderNotifications(filteredList);
}

document.addEventListener('DOMContentLoaded', () => {
    filterNotifications('todas'); 
});
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