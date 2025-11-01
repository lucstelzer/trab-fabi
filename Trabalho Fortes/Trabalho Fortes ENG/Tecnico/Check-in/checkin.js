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
function enableAutoGrow(selector) {
  const areas = document.querySelectorAll(selector);
  areas.forEach(area => {
    area.style.height = 'auto';
    area.style.height = area.scrollHeight + 'px';

    const onInput = e => {
      const ta = e.target;
      ta.style.height = 'auto';              
      ta.style.height = ta.scrollHeight + 'px';
    };
    area.addEventListener('input', onInput);
  });
}
enableAutoGrow('.auto-grow');