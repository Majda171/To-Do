// Načtení uložených úkolů z Local Storage
document.addEventListener('DOMContentLoaded', loadTasks);

let addTaskButton = document.getElementById('btn');
addTaskButton.addEventListener('click', addTask);

function addTask() {
    let taskInput = document.getElementById('input');
    let taskValue = taskInput.value.trim();

    if (taskValue === '') return;  // Pokud je vstup prázdný, nic se nepřidá

    // Vytvoření nového úkolu
    let taskItem = document.createElement('li');

    // Vytvoření checkboxu pro splnění úkolu
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
        taskItem.classList.toggle('completed');
        updateTaskStatus(taskValue, checkbox.checked);
    });

    // Přidání checkboxu a textu úkolu do <li>
    taskItem.appendChild(checkbox);
    taskItem.appendChild(document.createTextNode(taskValue));

    // Přidání tlačítka pro smazání úkolu
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        taskItem.remove();
        removeTaskFromLocalStorage(taskValue);
    });

    taskItem.appendChild(deleteButton);
    document.getElementById('to-do-list').appendChild(taskItem);

    // Uložení úkolu do Local Storage
    saveTaskToLocalStorage(taskValue);

    // Vymazání vstupního pole
    taskInput.value = '';
}

function saveTaskToLocalStorage(taskValue) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let task = { value: taskValue, completed: false }; // Uložíme úkol jako objekt
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskValue) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.value !== taskValue); // Filtrujeme podle hodnoty úkolu
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(taskValue, completed) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(t => t.value === taskValue ? { ...t, completed: completed } : t); // Aktualizace stavu úkolu
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        let taskItem = document.createElement('li');

        // Vytvoření checkboxu a nastavení jeho stavu
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed; // Načteme stav splnění úkolu
        checkbox.addEventListener('change', function () {
            taskItem.classList.toggle('completed');
            updateTaskStatus(task.value, checkbox.checked);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(document.createTextNode(task.value));

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            taskItem.remove();
            removeTaskFromLocalStorage(task.value);
        });

        taskItem.appendChild(deleteButton);
        document.getElementById('to-do-list').appendChild(taskItem);

        // Přidání třídy "completed", pokud je úkol splněn
        if (task.completed) {
            taskItem.classList.add('completed');
        }
    });
}
