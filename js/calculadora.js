/**
 * Script de Calculadora de Juros Compostos
 * Padrão: ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar cálculo ao carregar
    calculateResults();

    // Event Listener para o envio do formulário
    const form = document.getElementById('calcForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        calculateResults();
    });
});

// Função utilitária para formatar moeda (BRL)
const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para pegar valores numéricos de forma segura
const getInputValue = (id) => {
    const el = document.getElementById(id);
    if (!el) return 0;
    
    // Converte vírgula para ponto caso o browser não trate nativamente
    let val = el.value.replace(',', '.');
    return parseFloat(val) || 0;
};

function calculateResults() {
    // 1. Obter inputs
    const initial = getInputValue('initial');
    const monthly = getInputValue('monthly');
    const rateYear = getInputValue('rate');
    const years = getInputValue('years');

    // 2. Validação
    if (years <= 0) {
        alert("O tempo deve ser maior que 0.");
        return;
    }

    // 3. Lógica de Juros Compostos
    // Taxa mensal = (1 + taxa_anual)^(1/12) - 1
    const rateMonth = Math.pow(1 + (rateYear / 100), 1 / 12) - 1;
    const totalMonths = years * 12;

    let currentTotal = initial;
    let totalInvested = initial;
    
    // Dados para o gráfico
    let yearlyBalances = []; 

    for (let i = 1; i <= totalMonths; i++) {
        // Aplica rendimento sobre o montante atual
        currentTotal = currentTotal * (1 + rateMonth);
        
        // Adiciona o aporte mensal (assumindo aporte no final do mês para simplificação)
        currentTotal += monthly;
        totalInvested += monthly;

        // Armazena o saldo a cada 12 meses (1 ano)
        if (i % 12 === 0) {
            yearlyBalances.push(currentTotal);
        }
    }

    const totalInterest = currentTotal - totalInvested;

    // 4. Atualizar DOM
    updateUI(currentTotal, totalInvested, totalInterest);
    
    // 5. Renderizar Gráfico
    renderChart(yearlyBalances);
}

function updateUI(total, invested, interest) {
    document.getElementById('totalValue').textContent = formatCurrency(total);
    document.getElementById('investedValue').textContent = formatCurrency(invested);
    document.getElementById('interestValue').textContent = formatCurrency(interest);
}

function renderChart(data) {
    const chartContainer = document.getElementById('chart');
    chartContainer.innerHTML = ''; // Limpar gráfico anterior

    if (data.length === 0) return;

    const maxValue = Math.max(...data);

    // Fragmento de documento para performance (evita reflow a cada iteração)
    const fragment = document.createDocumentFragment();

    data.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        
        // Regra de três para altura da barra
        const heightPercentage = (value / maxValue) * 100;
        
        bar.style.height = '0%'; // Estado inicial para animação
        bar.title = `Ano ${index + 1}: ${formatCurrency(value)}`;
        bar.setAttribute('aria-label', `Saldo ano ${index + 1}: ${formatCurrency(value)}`);

        fragment.appendChild(bar);

        // Animação via setTimeout
        setTimeout(() => {
            bar.style.height = `${heightPercentage}%`;
        }, 50 + (index * 30)); // Efeito cascata sutil
    });

    chartContainer.appendChild(fragment);
}