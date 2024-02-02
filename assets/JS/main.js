const new_task = document.getElementById('new_task');
const add_task = document.getElementById('add_task');
const total = document.getElementById('total_tasks');
const completed = document.getElementById('completed_tasks');
const list = document.getElementById('tasks_list');
let total_count = 0;
let completed_count = 0;
let generatedIds = [];

const generateUniqueId = () => {
    let id;
    do {
        id = Math.floor(Math.random() * 99) + 1; // Genera un número aleatorio entre 1 y 99
    } while (generatedIds.includes(id)); // Continúa generando números hasta que encuentre uno que no se haya generado antes

    generatedIds.push(id); // Agrega el nuevo ID a la lista de IDs generados
    return id;
}

const tasks = [
    {id: generateUniqueId(), name: 'Tarea 1', completed: false},
    {id: generateUniqueId(), name: 'Tarea 2', completed: false},
    {id: generateUniqueId(), name: 'Tarea 3', completed: true},
];

const countTotalTasks = () => {
    total_count = tasks.length;
}

const countCompletedTasks = () => {
    completed_count = tasks.filter(task => task.completed).length;
}

const renderTotalTasksCount = () => {
    countTotalTasks();
    total.innerHTML = `${total_count}`;
}

const renderCompletedTasksCount = () => {
    countCompletedTasks();
    completed.innerHTML = `${completed_count}`;
}

const renderTasks = () => {
    list.innerHTML = ''; // Limpiar el contenedor de tareas

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        const deleteButton = document.createElement('button');
        
        deleteButton.style.height = '10px';
        deleteButton.style.width = '10px';
        deleteButton.onclick = () => deleteTask(task.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleCompleted(task.id);

        taskElement.style.display = 'flex';
        taskElement.style.alignItems = 'center';
        taskElement.style.justifyContent = 'space-between';
        taskElement.innerHTML = `<span>${task.id}: ${task.name}</span>`;
        taskElement.appendChild(deleteButton);
        taskElement.appendChild(checkbox);

        list.appendChild(taskElement);
    });
}

renderTasks();
renderTotalTasksCount();
renderCompletedTasksCount();

const addTask = (name) => {
    const newTask = {
        id: generateUniqueId(),
        name,
        completed: false,
    };
    tasks.push(newTask);
    renderTotalTasksCount(); // Actualizar el conteo total de tareas en el HTML
    renderTasks();

    // Limpiar el input
    new_task.value = '';
}

const deleteTask = (id) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        if (tasks[taskIndex].completed) {
            completed_count--;
        }
        tasks.splice(taskIndex, 1);
        renderTotalTasksCount(); // Actualizar el conteo total de tareas en el HTML
        renderCompletedTasksCount(); // Actualizar el conteo de tareas completadas en el HTML
        renderTasks();
    }
}

const toggleCompleted = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        countTotalTasks(); // Actualizar el conteo total de tareas
        countCompletedTasks(); // Actualizar el conteo de tareas completadas
        renderCompletedTasksCount(); // Actualizar el conteo de tareas completadas en el HTML
        renderTasks();
    }
}

add_task.addEventListener('click', () => {
    const name = new_task.value;
    addTask(name);
});

console.log(tasks);
