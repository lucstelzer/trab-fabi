document.getElementById('toggle-sidebar').addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('open');
        });
        function logout() {
            localStorage.removeItem('token');
            window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Login/index.html';
        }

        document.getElementById('logout').addEventListener('click', logout);