// script.js

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const notificationsContent = document.getElementById('notifications-content');

    // --- MOCK DATA (Dados Simulados) ---
    const mockNotifications = {
        'pendentes': [
            { id: 421, nome: "Nome Solicitação", data: "12/12/25", hora: "18:00 as 19:00", justificativa: "Justificativa de Pedro S." },
            { id: 422, nome: "Outra Solicitação", data: "13/12/25", hora: "19:00 as 20:00", justificativa: "Justificativa de Maria P." }
        ],
        'aprovadas': [
            { id: 419, nome: "Solicitação Antiga A", data: "01/12/25", hora: "14:00 as 15:00", justificativa: "Revisão OK" },
            { id: 418, nome: "Solicitação Antiga B", data: "02/12/25", hora: "15:00 as 16:00", justificativa: "Confirmada" }
        ],
        'reprovadas': [
            { id: 417, nome: "Solicitação Negada", data: "03/12/25", hora: "08:00 as 09:00", justificativa: "Fora do prazo" }
        ]
    };

    // --- FUNÇÕES DE RENDERIZAÇÃO ---

    /**
     * Gera o HTML da área de ações/status baseada no status e na visualização.
     */
    const renderActionArea = (status, isDetailView = false) => {
        if (status === 'pendentes') {
            if (isDetailView) {
                // Último item do wireframe: botões de ação + Voltar
                return `
                    <div class="item-actions detail-actions">
                        <button class="btn-action btn-approve" data-action="aprovar">Aprovar</button>
                        <button class="btn-action btn-reject" data-action="reprovar">Reprovar</button>
                        <button class="btn-action btn-back" data-action="voltar">Voltar</button>
                    </div>
                `;
            } else {
                // Botões de ação padrão para Pendentes
                return `
                    <div class="item-actions">
                        <button class="btn-action btn-approve" data-action="aprovar">Aprovar</button>
                        <button class="btn-action btn-reject" data-action="reprovar">Reprovar</button>
                        <button class="btn-link" data-action="detalhes">Ver detalhes</button>
                    </div>
                `;
            }
        } else {
            // Aprovadas/Reprovadas: SEM botões de ação, apenas indicador de status
            const label = status === 'aprovadas' ? 'Aprovada' : 'Reprovada';
            const statusClass = status === 'aprovadas' ? 'status-approved' : 'status-rejected';
            
            return `
                <div class="item-status-display ${statusClass}">
                    <p>${label}</p>
                    <button class="btn-link" data-action="detalhes">Ver detalhes</button>
                </div>
            `;
        }
    };

    /**
     * Cria o HTML para um único item de notificação.
     */
    const createNotificationHTML = (notification, status, isDetailView = false) => {
        const justification = isDetailView 
            ? notification.justificativa + ' Completa' // Adiciona 'Completa' para a visualização detalhada
            : notification.justificativa;

        // Adicionando a classe 'hidden-detail' apenas para o item detalhado (inicialmente escondido)
        const displayStyle = isDetailView ? 'style="display: none;"' : '';
        const detailClass = isDetailView ? 'hidden-detail' : '';
            
        return `
            <div class="notification-item ${detailClass}" data-id="${notification.id}" data-status="${status}" ${displayStyle}>
                <div class="item-details">
                    <p class="item-number">Nº ${notification.id}</p>
                    <p class="item-name">${notification.nome}</p>
                    <p class="item-date-time">${notification.data}</p>
                    <p class="item-date-time">${notification.hora}</p>
                    <p class="item-justification">${justification}</p>
                </div>
                ${renderActionArea(status, isDetailView)} </div>
        `;
    };


    /**
     * Renderiza o conteúdo da lista para o status selecionado.
     */
    const renderNotifications = (status) => {
        const list = mockNotifications[status] || [];
        let htmlContent = '';
        
        list.forEach(item => {
            htmlContent += createNotificationHTML(item, status);
        });

        // Adiciona um item de visualização detalhada para a aba Pendentes (inicialmente escondido)
        if (status === 'pendentes' && list.length > 0) {
             htmlContent += createNotificationHTML(list[0], status, true);
        }

        notificationsContent.innerHTML = htmlContent;
    };


    // --- 3. LÓGICA DE INTERAÇÃO (ABAS E AÇÕES) ---

    // 3.1 Funcionalidade das Abas
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const status = e.target.getAttribute('data-status');
            
            // Ativa visualmente a aba
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            renderNotifications(status); 
        });
    });

    // 3.2 Funcionalidade dos Botões (Aprovar, Reprovar, Detalhes, Voltar)
    notificationsContent.addEventListener('click', (e) => {
        const target = e.target;
        const action = target.getAttribute('data-action');
        const item = target.closest('.notification-item');
        
        if (!action) return; // Não é um botão de ação

        const isPendingList = item && item.getAttribute('data-status') === 'pendentes';
        // Seleciona todos os itens da lista normal e o item detalhado (escondido)
        const normalItems = notificationsContent.querySelectorAll('.notification-item:not(.hidden-detail)');
        const detailItem = notificationsContent.querySelector('.notification-item.hidden-detail');

        if (action === 'aprovar' || action === 'reprovar') {
            if (isPendingList) {
                alert(`${action === 'aprovar' ? 'Aprovação' : 'Reprovação'} simulada para ${item.querySelector('.item-name').textContent}.`);
                item.remove(); // Remove o item da lista (e se for o item detalhe, remove ele também)

                // Após remover, verifica se o item removido era o detalhe e se o item original ainda existe.
                if (item.classList.contains('hidden-detail')) {
                    // Se removeu o detalhe, volta para a lista
                    normalItems.forEach(n => n.style.display = 'flex');
                }
            }
        } else if (action === 'detalhes') {
            alert('Simulando visualização de Detalhes. Pressione "Voltar" para retornar.');
            
            // Esconde todos os itens normais
            normalItems.forEach(n => n.style.display = 'none');
            // Mostra o item detalhado (se existir)
            if (detailItem) detailItem.style.display = 'flex'; 
            
        } else if (action === 'voltar') {
            alert('Voltando para a lista normal.');
            // Mostra todos os itens normais
            normalItems.forEach(n => n.style.display = 'flex');
            // Esconde o item detalhado
            if (detailItem) detailItem.style.display = 'none';
        }
    });

    // --- INICIALIZAÇÃO ---
    // Ativa a aba pendentes e renderiza o conteúdo inicial
    document.querySelector('.tab-button[data-status="pendentes"]').classList.add('active');
    renderNotifications('pendentes'); 
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