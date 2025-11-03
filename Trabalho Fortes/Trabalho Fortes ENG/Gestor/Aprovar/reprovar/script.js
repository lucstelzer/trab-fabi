document.addEventListener('DOMContentLoaded', () => {
    // Referências dos elementos principais
    const tabButtons = document.querySelectorAll('.tab-button');
    const notificationsListContainer = document.querySelector('.notifications-list');
    const calendarDatesTable = document.querySelector('.calendar-dates tbody');

    // --- MOCK DATA (Dados Simulados) ---
    const mockNotifications = {
        'Aprovadas': [
            { id: 423, nome: "Solicitação de Acesso", data: "01/10/25", hora: "09:00 as 10:00", justificativa: "Acesso de emergência. (Aprovado)" },
            { id: 422, nome: "Troca de Turno", data: "02/10/25", hora: "14:00 as 18:00", justificativa: "Acordo mútuo. (Aprovado)" }
        ],
        'Reprovadas': [
            { id: 420, nome: "Pedido de Férias", data: "15/11/25", hora: "-", justificativa: "Conflito de agenda. (Reprovado)" }
        ],
        'Pendentes': [
            { id: 421, nome: "Nome Solicitação", data: "12/12/25", hora: "18:00 as 19:00", justificativa: "Justificativa Pendente" },
            { id: 419, nome: "Solicitação Extra", data: "20/12/25", hora: "08:00 as 12:00", justificativa: "Serviço urgente." }
        ]
    };

    // --- FUNÇÕES DE RENDERIZAÇÃO ---

    // Função para criar o HTML de um item de notificação
    const createNotificationHTML = (notification) => {
        // Define as ações padrão, a menos que seja o último item do wireframe
        const isLastItem = notification.id === 421 && notification.justificativa === "Justificativa Completa";
        
        // Simula o HTML base do wireframe
        return `
            <div class="notification-item" data-id="${notification.id}" data-status="${notification.status}">
                <div class="item-details">
                    <p class="item-number">Nº ${notification.id}</p>
                    <p class="item-name">${notification.nome}</p>
                    <p class="item-date-time">${notification.data}</p>
                    <p class="item-date-time">${notification.hora}</p>
                    <p class="item-justification">${notification.justificativa}</p>
                </div>
                ${!isLastItem ? `
                <div class="item-actions">
                    <button class="btn-action btn-approve" data-action="aprovar">Aprovar</button>
                    <button class="btn-action btn-reject" data-action="reprovar">Reprovar</button>
                    <button class="btn-link" data-action="detalhes">Ver detalhes</button>
                </div>
                ` : `
                <div class="item-actions bottom-actions">
                    <button class="btn-action btn-approve" data-action="aprovar">Aprovar</button>
                    <button class="btn-action btn-reject" data-action="reprovar">Reprovar</button>
                    <button class="btn-link btn-back" data-action="voltar">Voltar</button>
                </div>
                `}
            </div>
        `;
    };

    // Função para renderizar a lista de notificações
    const renderNotifications = (status) => {
        let htmlContent = `<div class="status-tabs">
            <span>Status:</span>
            <button class="tab-button ${status === 'Aprovadas' ? 'active' : ''}" data-status="Aprovadas">Aprovadas</button>
            <button class="tab-button ${status === 'Reprovadas' ? 'active' : ''}" data-status="Reprovadas">Reprovadas</button>
            <button class="tab-button ${status === 'Pendentes' ? 'active' : ''}" data-status="Pendentes">Pendentes</button>
        </div>`;
        
        const list = mockNotifications[status] || [];
        
        // Renderiza os itens baseados no mock data
        list.forEach(item => {
             // Adiciona a propriedade status no objeto para uso na função de criação de HTML
            item.status = status; 
            htmlContent += createNotificationHTML(item);
        });

        // Adiciona um item extra para simular o terceiro item do wireframe (Pendentes)
        if (status === 'Pendentes') {
            htmlContent += createNotificationHTML({ 
                id: 421, nome: "Nome Solicitação", data: "12/12/25", hora: "18:00 as 19:00", justificativa: "Justificativa Completa", status: "Pendentes"
            });
        }
        
        notificationsListContainer.innerHTML = htmlContent;

        // Re-atribui o listener para as abas após a re-renderização
        attachTabListeners();
        // Re-atribui o listener para os botões de ação após a re-renderização
        attachActionListeners(); 
    };

    // --- 1. FUNCIONALIDADE DAS ABAS DE STATUS ---

    const attachTabListeners = () => {
        // Seleciona os botões novamente após a re-renderização
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const newStatus = e.target.getAttribute('data-status');
                if (newStatus) {
                    // Renderiza o novo conjunto de dados
                    renderNotifications(newStatus); 
                }
            });
        });
    };

    // --- 2. AÇÕES DE BOTÃO (Aprovar, Reprovar, Detalhes) ---

    const attachActionListeners = () => {
        document.querySelectorAll('.notification-item').forEach(item => {
            item.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const action = e.target.getAttribute('data-action');
                    const id = item.getAttribute('data-id');
                    const status = item.getAttribute('data-status');

                    // Simula a ação
                    if (action === 'aprovar') {
                        alert(`Aprovar Notificação #${id}. Necessário Backend.`);
                        // Em um projeto real: Enviar requisição para aprovar.
                        // Aqui: Simplesmente removemos o item da lista (visualmente)
                        item.remove();
                        // Você pode adicionar a lógica para re-renderizar a aba 'Aprovadas'
                    } else if (action === 'reprovar') {
                        alert(`Reprovar Notificação #${id}. Necessário Backend.`);
                        item.remove();
                        // Você pode adicionar a lógica para re-renderizar a aba 'Reprovadas'
                    } else if (action === 'detalhes') {
                        alert(`Mostrando detalhes da Notificação #${id}. Status atual: ${status}`);
                    } else if (action === 'voltar') {
                        alert('Voltando da visualização completa.');
                        // Em um projeto real: Recarregar a lista PENDENTES
                    }
                });
            });
        });
    };

    // --- 3. FUNCIONALIDADE DO CALENDÁRIO ---

    // Define o dia selecionado (14) no carregamento
    let selectedDay = document.querySelector('.selected-day');
    if (selectedDay) {
         // Simula a URL de pesquisa ao clicar em um dia
        console.log(`Dia ${selectedDay.textContent} selecionado. URL: /notificacoes?data=14-10-2025`);
    }

    calendarDatesTable.addEventListener('click', (e) => {
        const target = e.target;
        
        // Verifica se o clique foi em um dia válido (não cabeçalho e não dias cinzas)
        if (target.tagName === 'TD' && !target.classList.contains('prev-month') && !target.classList.contains('next-month')) {
            
            // Remove a seleção anterior
            if (selectedDay) {
                selectedDay.classList.remove('selected-day');
            }

            // Adiciona a nova seleção
            target.classList.add('selected-day');
            selectedDay = target;

            // Simula o clique
            const day = target.textContent;
            alert(`Dia ${day} de Outubro de 2025 selecionado! Carregando notificações...`);
            
            // Aqui você chamaria uma função para renderizar as notificações daquele dia
            // Ex: loadNotificationsByDate(day, '10', '2025');
        }
    });

    // --- INICIALIZAÇÃO ---

    // Renderiza o estado inicial (Pendentes, conforme o wireframe)
    renderNotifications('Pendentes'); 
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
// script.js