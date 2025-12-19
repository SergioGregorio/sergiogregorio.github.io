document.addEventListener('DOMContentLoaded', () => {
    // Referências do DOM
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const pendingCount = document.getElementById('pendingCount');
    const clearBtn = document.getElementById('clearBtn');
    
    // Data Atual
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('dateDisplay').innerText = new Date().toLocaleDateString('pt-BR', options);

    // Estado da Aplicação
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

    // --- Funções ---

    const saveAndRender = () => {
        localStorage.setItem('myTasks', JSON.stringify(tasks));
        renderTasks();
    };

    const updateCount = () => {
        const pending = tasks.filter(t => !t.completed).length;
        pendingCount.innerText = `${pending} tarefa(s) pendente(s)`;
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        const fragment = document.createDocumentFragment();

        tasks.forEach(task => {
            const li = document.createElement('li');
            if(task.completed) li.classList.add('completed');
            li.dataset.id = task.id; // Armazena ID no elemento

            li.innerHTML = `
                <div class="task-content" role="button" tabindex="0">
                    <div class="check-circle">${task.completed ? '✔' : ''}</div>
                    <span>${sanitize(task.text)}</span>
                </div>
                <button class="btn-delete" aria-label="Excluir tarefa">🗑️</button>
            `;
            fragment.appendChild(li);
        });
        taskList.appendChild(fragment);
        updateCount();
    };

    const sanitize = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if(text === '') return;

        tasks.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        saveAndRender();
        taskInput.value = '';
        taskInput.focus();
    };

    // --- Event Listeners ---

    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') addTask();
    });

    clearBtn.addEventListener('click', () => {
        if(tasks.length > 0 && confirm("Apagar todas as tarefas?")) {
            tasks = [];
            saveAndRender();
        }
    });

    // Event Delegation (Melhor performance que onclicks individuais)
    taskList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if(!li) return;

        const id = parseInt(li.dataset.id);

        // Se clicou no botão de deletar
        if(e.target.closest('.btn-delete')) {
            if(confirm("Tem certeza que deseja apagar?")) {
                tasks = tasks.filter(t => t.id !== id);
                saveAndRender();
            }
            return;
        }

        // Caso contrário, toggle (completar/descompletar)
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveAndRender();
    });

    // Inicialização
    renderTasks();
});