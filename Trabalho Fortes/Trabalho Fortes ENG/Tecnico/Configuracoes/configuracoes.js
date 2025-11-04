document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const emailInput = document.getElementById('email');

    // Funcionalidade do botão "Editar perfil"
    if (editProfileBtn && emailInput) {
        editProfileBtn.addEventListener('click', function() {
            // Em uma aplicação real, aqui você ativaria a edição do email
            // Por simplicidade, vamos apenas alertar ou simular
            alert('A funcionalidade de editar e-mail seria ativada aqui ou um modal apareceria.');
            // emailInput.disabled = !emailInput.disabled; // Exemplo de como alternar disabled
            // this.textContent = emailInput.disabled ? 'Editar perfil' : 'Salvar e-mail';
        });
    }

    // Funcionalidade do botão "Alterar senha"
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const novaSenha = document.getElementById('nova-senha').value;
            const confirmarNovaSenha = document.getElementById('confirmar-nova-senha').value;

            if (novaSenha === '' || confirmarNovaSenha === '') {
                alert('Por favor, preencha ambos os campos de senha.');
                return;
            }

            if (novaSenha !== confirmarNovaSenha) {
                alert('A nova senha e a confirmação não coincidem.');
                return;
            }

            // Em uma aplicação real, aqui você enviaria as senhas para o servidor
            alert('Senha alterada com sucesso!');
            document.getElementById('nova-senha').value = '';
            document.getElementById('confirmar-nova-senha').value = '';
        });
    }

    // Funcionalidade de alternar modo escuro (apenas visual, não persistente)
    const modoEscuroToggle = document.getElementById('modo-escuro');
    if (modoEscuroToggle) {
        modoEscuroToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                // Aqui você pode alterar variáveis CSS ou aplicar um tema
                console.log('Modo escuro ativado!');
            } else {
                document.body.classList.remove('dark-mode');
                console.log('Modo escuro desativado!');
            }
        });
    }

    // Funcionalidade de notificações por e-mail (apenas log)
    const receberNotificacaoToggle = document.getElementById('receber-notificacao');
    if (receberNotificacaoToggle) {
        receberNotificacaoToggle.addEventListener('change', function() {
            console.log('Receber notificações por e-mail:', this.checked);
        });
    }

    // Funcionalidade de seleção de idioma (apenas log)
    const idiomaSelect = document.getElementById('idioma');
    if (idiomaSelect) {
        idiomaSelect.addEventListener('change', function() {
            console.log('Idioma selecionado:', this.value);
        });
    }
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