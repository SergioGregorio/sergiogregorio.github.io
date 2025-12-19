/**
 * Lógica principal do Portfólio
 * Autor: Sérgio Gregório Jr.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Alternância de Tema (Dark Mode) --- */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Atualiza o texto do botão
            const isDarkMode = body.classList.contains('dark-mode');
            themeToggle.innerText = isDarkMode ? '☀️ Claro' : '🌙 Escuro';
            
            // Opcional: Salvar preferência no localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Verificar preferência salva
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerText = '☀️ Claro';
        }
    }

    /* --- Formulário de Contato (Simulação) --- */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Feedback visual simples
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            // Simula delay de rede
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});