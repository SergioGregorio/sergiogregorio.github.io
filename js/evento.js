/**
 * Script de Contagem Regressiva e Captura de Leads
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Configuração da Data (Sempre 3 dias no futuro para Demo)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3); 
    futureDate.setHours(23, 59, 59);

    // Seletores DOM
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailInput = document.getElementById('emailInput');

    // 2. Função de Atualização do Tempo
    function updateCountdown() {
        const currentTime = new Date();
        const diff = futureDate - currentTime; // Diferença em ms

        // Se o evento já começou/passou
        if (diff < 0) {
            clearInterval(interval);
            document.querySelector('.countdown-container').innerHTML = "<h2>O EVENTO COMEÇOU!</h2>";
            return;
        }

        // Cálculos matemáticos
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        // Atualização Visual (PadStart adiciona o zero à esquerda)
        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    // 3. Inicialização do Intervalo
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Executa imediatamente para evitar delay visual

    // 4. Lógica de Inscrição (Botão)
    subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value;
        
        if(email.trim() === "" || !email.includes('@')) {
            alert("Por favor, digite um e-mail válido.");
            return;
        }

        // Feedback Visual
        const originalText = subscribeBtn.innerText;
        subscribeBtn.innerText = "Cadastrado!";
        subscribeBtn.style.backgroundColor = "#22c55e"; // Verde sucesso
        
        alert(`Sucesso! O e-mail ${email} foi cadastrado na lista VIP.`);
        
        // Reset após 2 segundos
        setTimeout(() => {
            subscribeBtn.innerText = originalText;
            subscribeBtn.style.backgroundColor = "";
            emailInput.value = "";
        }, 3000);
    });
});