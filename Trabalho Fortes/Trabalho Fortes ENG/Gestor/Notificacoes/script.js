// Array de dados simulando as notificações
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

// Função para renderizar as notificações
function renderNotifications(notifications) {
    notificationListElement.innerHTML = ''; // Limpa a lista atual

    if (notifications.length === 0) {
        notificationListElement.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhuma notificação encontrada com o filtro atual.</p>';
        return;
    }

    notifications.forEach(notif => {
        const item = document.createElement('div');
        // Define a classe 'read' ou 'unread' para estilização
        const readClass = notif.isRead ? 'read' : 'unread'; 
        item.className = `notification-item ${readClass}`;

        // A estrutura HTML interna
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
        
        // Adiciona um evento de clique para simular a marcação como lida
        item.onclick = function() {
            // Se já está lida, não faz nada
            if (notif.isRead) return; 
            
            // Marca no objeto e na classe HTML
            notif.isRead = true;
            item.classList.remove('unread');
            item.classList.add('read');
            
            // Opcional: Recarrega a lista para refletir o filtro 'Não lidas'
            // O código abaixo re-executa a função de filtro ativa
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterNotifications(activeFilter);
        };
        
        notificationListElement.appendChild(item);
    });
}

// Função principal de filtragem (por aba e por pesquisa)
function filterNotifications(filterType = null) {
    let currentFilter = filterType;

    // Se o tipo de filtro não foi passado, pega o ativo (ou 'todas' por padrão)
    if (!currentFilter) {
        currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter') || 'todas';
    }

    // 1. Aplica o filtro da aba
    let filteredList = allNotifications;
    
    if (currentFilter === 'lidas') {
        filteredList = allNotifications.filter(notif => notif.isRead);
    } else if (currentFilter === 'nao-lidas') {
        filteredList = allNotifications.filter(notif => !notif.isRead);
    }
    // 'todas' já é o padrão

    // 2. Aplica o filtro de pesquisa (Search)
    const searchText = searchInput.value.toLowerCase();
    
    if (searchText) {
        filteredList = filteredList.filter(notif => 
            notif.title.toLowerCase().includes(searchText) || 
            notif.body.toLowerCase().includes(searchText)
        );
    }

    // 3. Atualiza os botões visuais
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 4. Renderiza o resultado final
    renderNotifications(filteredList);
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    filterNotifications('todas'); // Carrega a aba 'Todas' ao iniciar
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