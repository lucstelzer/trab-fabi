const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

if (toggleButton && sidebar) {
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
} else {
    console.error("Elemento da sidebar ou botão toggle não encontrado.");
}

document.addEventListener('DOMContentLoaded', () => {
    const reportsContainer = document.getElementById('daily-reports-container');
    if (!reportsContainer) {
        return;
    }

    let allReportsHtml = '';
    const today = new Date();
    const maxHorasVisuais = 12;

    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const horasTrabalhadas = 8;
        const horasExtras = Math.floor(Math.random() * 5);

        const workedPercent = (horasTrabalhadas / maxHorasVisuais) * 100;
        const extraPercent = (horasExtras / maxHorasVisuais) * 100;

        allReportsHtml += `
            <div class="daily-report">
                <h4 class="report-date">Dia: ${formattedDate}</h4>
                
                <div class="report-bar-group">
                    <div class="bar-label">
                        <span>Horas Trabalhadas</span>
                        <span>${horasTrabalhadas}h</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar worked" style="width: ${workedPercent}%;"></div>
                    </div>
                </div>

                <div class="report-bar-group">
                    <div class="bar-label">
                        <span>Horas Extras</span>
                        <span>${horasExtras}h</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar extra" style="width: ${extraPercent}%;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    reportsContainer.innerHTML = allReportsHtml;
});