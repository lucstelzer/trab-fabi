document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Nova API de Modal (Substitui Alert e Confirm) ---
    const modalOverlay = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    // Referências aos botões originais no DOM
    let modalConfirmBtn = document.getElementById('modal-confirm-btn');
    let modalCancelBtn = document.getElementById('modal-cancel-btn');

    // Função central para mostrar o modal
    const showModal = ({ title, message, isConfirm = false, onConfirm = () => {}, onCancel = () => {} }) => {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        // 1. Clonagem e Substituição (A forma mais segura de remover listeners antigos)
        // Confirmação/OK
        const newConfirm = modalConfirmBtn.cloneNode(true);
        newConfirm.textContent = isConfirm ? 'Confirmar' : 'OK';
        modalConfirmBtn.parentNode.replaceChild(newConfirm, modalConfirmBtn);
        modalConfirmBtn = newConfirm; // Atualiza a referência
        
        // Cancelar
        const newCancel = modalCancelBtn.cloneNode(true);
        newCancel.classList.toggle('hidden', !isConfirm);
        modalCancelBtn.parentNode.replaceChild(newCancel, modalCancelBtn);
        modalCancelBtn = newCancel; // Atualiza a referência

        // 2. Define os novos handlers
        modalConfirmBtn.addEventListener('click', function handler() {
            modalOverlay.classList.add('hidden');
            onConfirm(); // Executa a função de confirmação
            modalConfirmBtn.removeEventListener('click', handler); // Remove o próprio listener
        });
        
        modalCancelBtn.addEventListener('click', function handler() {
            modalOverlay.classList.add('hidden');
            onCancel(); // Executa a função de cancelamento
            modalCancelBtn.removeEventListener('click', handler); // Remove o próprio listener
        });

        modalOverlay.classList.remove('hidden');
    };

    // Altera o uso de alert/confirm globalmente
    window.customAlert = (title, message) => showModal({ title, message });
    window.customConfirm = (title, message, onConfirm, onCancel = () => {}) => 
        showModal({ title, message, isConfirm: true, onConfirm, onCancel });

    // --- 1. Estado da Aplicação e Roteamento Simples (SPA) ---
    let isAuthenticated = false;
    const loginPage = document.getElementById('login-page');
    const appContainer = document.getElementById('app-container');
    const pageTitle = document.getElementById('page-title');
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    const navBackBtns = document.querySelectorAll('.nav-back-btn');
    
    const pageTitles = {
        'dashboard': 'Bem vindo, Tecnico!', 'profile': 'Perfil do Funcionário', 'checkin': 'Registro de Check-in',
        'requests': 'Lista de Solicitações', 'reports': 'Relatórios Gerais', 'notifications': 'Notificações',
        'faq': 'Dúvidas Frequentes', 'settings': 'Configurações', 'settings-edit': 'Editar Perfil'
    };
    
    const navigate = (pageId) => {
        if (!isAuthenticated && pageId !== 'login') return;

        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            targetPage.classList.add('active');
            pageTitle.textContent = pageTitles[pageId] || 'Página';
        }

        navItems.forEach(item => item.classList.remove('active'));
        const activeNavItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    };

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        isAuthenticated = true;
        loginPage.classList.add('hidden');
        appContainer.classList.remove('hidden');
        navigate('dashboard'); 
        customAlert('Sucesso!', 'Login realizado com sucesso. Bem-vindo de volta, Técnico!');
    });

    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        customConfirm(
            'Confirmar Saída', 
            'Tem certeza que deseja deslogar?',
            () => {
                isAuthenticated = false;
                appContainer.classList.add('hidden');
                loginPage.classList.remove('hidden');
                document.getElementById('login-form').reset();
                customAlert('Tchau!', 'Logout realizado com sucesso.');
            }
        );
    });

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = item.getAttribute('data-page');
            if (pageId) {
                navigate(pageId);
            }
        });
    });

    navBackBtns.forEach(btn => btn.addEventListener('click', () => navigate('dashboard')));
    if (!isAuthenticated) {
        appContainer.classList.add('hidden');
        loginPage.classList.remove('hidden');
    }
    // Não chame navigate('dashboard') aqui, deixe a função do login fazer isso.

    // --- 2. Lógica do Calendário (Reutilizável) ---
    // ... (Código do calendário permanece o mesmo) ...

    const renderCalendar = (date, containerId, monthDisplayId, selectedDay = 12) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const calendarDaysBody = document.getElementById(containerId);
        const monthDisplay = document.getElementById(monthDisplayId);

        monthDisplay.textContent = new Date(year, month).toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
        calendarDaysBody.innerHTML = '';

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        let dayCounter = 1;
        let prevMonthDayStart = daysInPrevMonth - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) + 1;

        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const dayCell = document.createElement('td');
                let day = 0;

                if (i === 0 && j < firstDayOfMonth) {
                    day = prevMonthDayStart++;
                    dayCell.classList.add('other-month');
                } else if (dayCounter <= daysInMonth) {
                    day = dayCounter++;
                    if (day === selectedDay && year === 2025 && month === 9) {
                        dayCell.classList.add('selected-day');
                    }
                } else {
                    day = dayCounter++ - daysInMonth;
                    dayCell.classList.add('other-month');
                }
                
                dayCell.textContent = day;
                weekRow.appendChild(dayCell);
            }
            if (dayCounter > daysInMonth + (7 - (new Date(year, month + 1, 0).getDay()))) break;
            calendarDaysBody.appendChild(weekRow);
        }
        
        calendarDaysBody.querySelectorAll('td').forEach(cell => {
            if (!cell.classList.contains('other-month')) {
                cell.addEventListener('click', () => {
                    calendarDaysBody.querySelectorAll('.selected-day').forEach(d => d.classList.remove('selected-day'));
                    cell.classList.add('selected-day');
                    customAlert('Filtro de Calendário', `Dia ${cell.textContent} selecionado para filtro/consulta.`);
                });
            }
        });
    };

    const setupCalendar = (prevBtnId, nextBtnId, containerId, monthDisplayId, initialDate) => {
        let currentDate = new Date(initialDate);
        
        document.getElementById(prevBtnId).addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate, containerId, monthDisplayId);
        });

        document.getElementById(nextBtnId).addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate, containerId, monthDisplayId);
        });
        renderCalendar(currentDate, containerId, monthDisplayId);
    };

    setupCalendar('prev-month', 'next-month', 'calendar-days', 'current-month', '2025-10-01');
    setupCalendar('prev-month-notif', 'next-month-notif', 'calendar-days-notif', 'current-month-notif', '2025-10-01');


    // --- 3. Funcionalidades Específicas ---

    // a) Check-in: Validação e Registro
    const updateDateTime = () => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
        document.getElementById('current-datetime').value = formatter.format(now).replace(',', '');
    };
    if (document.getElementById('current-datetime')) {
        updateDateTime();
        setInterval(updateDateTime, 60000);
        
        document.getElementById('register-checkin-btn').addEventListener('click', () => {
            const local = document.querySelector('#checkin-page input[placeholder="Ex: Escritório central"]').value.trim();
            const atividade = document.querySelector('#checkin-page input[placeholder="Ex: Manutenção predial"]').value.trim();
            
            if (!local || !atividade) {
                customAlert('Erro de Preenchimento', 'O Local de trabalho e o Tipo de Atividade são obrigatórios para registrar o check-in.');
                return;
            }

            customAlert('Sucesso!', 'Check-in registrado com sucesso! (Funcionalidade não salva dados).');
        });
    }

    // b) Lista de Solicitações: Conclusão de Tarefa
    document.querySelectorAll('.complete-task').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const row = e.target.closest('tr');
            const taskName = row.querySelector('td:nth-child(2)').textContent;

            customConfirm(
                'Confirmar Conclusão',
                `Deseja realmente concluir a tarefa "${taskName}"? Esta ação é irreversível.`,
                () => {
                    // Atualiza a linha visualmente
                    row.querySelector('td:nth-child(4)').innerHTML = '<span class="status-badge completed">Concluída</span>';
                    row.querySelector('td:nth-child(5)').textContent = '';
                    row.classList.add('completed');
                    row.classList.remove('approved', 'pending');
                    
                    // Simulação da atualização das horas
                    const hoursElement = row.querySelector('td:nth-child(3)').textContent.replace('hrs', '');
                    let pendingHoursElement = document.getElementById('total-pending-hours');
                    let currentTotal = parseInt(pendingHoursElement.textContent);
                    pendingHoursElement.textContent = `${currentTotal - parseInt(hoursElement)}hrs`;
                    
                    customAlert('Sucesso!', `Tarefa "${taskName}" concluída e ${hoursElement} horas deduzidas do total pendente.`);
                }
            );
        });
    });

    // c) Notificações: Pesquisa em Tempo Real
    const notificationList = document.querySelector('.notification-list');
    const searchInput = document.querySelector('.search-bar-small input');

    const filterNotifications = () => {
        const searchText = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        document.querySelectorAll('.notification-item').forEach(item => {
            const content = item.textContent.toLowerCase();
            const isRead = item.classList.contains('read');
            let isVisible = true;

            // 1. Filtro de Busca
            if (searchText && !content.includes(searchText)) {
                isVisible = false;
            }

            // 2. Filtro de Status
            if (activeFilter === 'read' && !isRead) {
                isVisible = false;
            } else if (activeFilter === 'unread' && isRead) {
                isVisible = false;
            }

            item.style.display = isVisible ? 'flex' : 'none';
        });
    };

    searchInput.addEventListener('input', filterNotifications);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterNotifications(); // Aplica o novo filtro de status imediatamente
        });
    });

    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('unread')) {
                item.classList.remove('unread');
                item.classList.add('read');
                // Re-aplica filtros caso o modo "Não Lidas" esteja ativo
                filterNotifications(); 
                customAlert('Lida', `Notificação marcada como lida.`);
            }
        });
    });

    // d) FAQ: Acordeão
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.icon-state');
            const isOpen = item.classList.contains('open');
            
            // Fecha todos os outros
            document.querySelectorAll('.accordion-item.open').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.icon-state').classList.replace('fa-minus', 'fa-plus');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Abre/Fecha o clicado
            if (!isOpen) {
                item.classList.add('open');
                icon.classList.replace('fa-plus', 'fa-minus');
                content.style.maxHeight = content.scrollHeight + "px"; 
            } else {
                item.classList.remove('open');
                icon.classList.replace('fa-minus', 'fa-plus');
                content.style.maxHeight = null;
            }
        });
    });
    
    // e) Configurações: Validação de Senha e Modo Escuro
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    document.getElementById('change-password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPass = document.getElementById('current-password').value;
        const newPass = document.getElementById('new-password').value;
        const confirmPass = document.getElementById('confirm-password').value;

        if (currentPass === '' || newPass === '' || confirmPass === '') {
            customAlert('Erro', 'Todos os campos de senha devem ser preenchidos.');
            return;
        }

        if (newPass !== confirmPass) {
            customAlert('Erro', 'A Nova Senha e a Confirmação de Senha não correspondem.');
            return;
        }
        
        if (newPass.length < 6) {
             customAlert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }

        customAlert('Sucesso!', 'Senha alterada com sucesso! (Simulação).');
        e.target.reset();
    });

    // f) Interatividade Genérica para Ações
    document.querySelectorAll('.action-link, .btn-secondary:not(.nav-item), .btn-primary:not([type="submit"])').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (element.hasAttribute('data-page')) {
                navigate(element.getAttribute('data-page'));
                return;
            }

            const action = element.textContent.trim();
            if (action.includes('Salvar Perfil')) {
                customAlert('Sucesso!', `Perfil salvo: Nome: ${document.getElementById('edit-name').value}.`);
                navigate('profile');
                return;
            }
            
            customAlert('Ação', `Ação acionada: "${action}"`);
        });
    });
    
    // Se o usuário não estiver autenticado, inicie o aplicativo na página de login.
    if (appContainer.classList.contains('hidden')) {
        navigate('login');
    } else {
        // Se estiver autenticado (simulado), inicie no dashboard.
        navigate('dashboard');
    }
});