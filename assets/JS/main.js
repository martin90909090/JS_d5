const list = document.getElementById("task_list");
const input = document.getElementById("new_task");
const btn = document.getElementById("add_task");
let total = document.getElementById("total_tasks");
let completed = document.getElementById("completed_tasks");
const math = Math.floor(Math.random() * 99);
const tareas = [
    {
        id: (math+1), description: 'Estudiar JS', completed: true
    }, 
    {
        id: (math+2), description: 'Estudiar CSS', completed: false
    },
    {
        id: (math+3), description: 'Estudiar HTML', completed: true
    }
];
let totalTasks = 3;
let completedTasks = 0;
total.innerHTML = totalTasks;

tareas.forEach((tarea) => {
    list.innerHTML += `<div class="elements">
    <li class="elements_li" id="${tarea.id}">${tarea.id} ${tarea.description}</li>
    <input type="checkbox" id="modificar_${tarea.id}">
    <button type="button" id="delete_task_${tarea.id}"></button>
    </div>
    `;
    const modif = document.getElementById(`modificar_${tarea.id}`);
    const del = document.getElementById(`delete_task_${tarea.id}`);
    modif.addEventListener('click', (event) => {
        if (event.target.id.startsWith('modificar_')) {
            const id = event.target.id.replace('modificar_', '');
            const tarea = document.getElementById(id);
            tarea.classList.toggle('completed');
            if (tarea.classList.contains('completed')) {
                completedTasks++;
            } else {
                completedTasks--;
            }
            completed.innerHTML = completedTasks;
        }
    });

    list.addEventListener('click', (event) => {
        if (event.target.id.startsWith('delete_task_')) {
            const id = event.target.id.replace('delete_task_', '');
            delete_task(id);
        }
    });
});

const delete_task = (id) => {
    const task = document.getElementById(id);
    const check = document.getElementById(`modificar_${id}`);
    const del = document.getElementById(`delete_task_${id}`);
    task.remove();
    check.remove();
    del.remove();
    totalTasks--;
    total.innerHTML = totalTasks;
}

const addElement = () => {
    const id = Math.floor(Math.random() * 99);
    const tarea_t = {tarea: input.value, id: id, completed: false};
    tareas.push(tarea_t);
    totalTasks++;
    total.innerHTML = totalTasks; 
    list.innerHTML += `<li id="${id}">${id} ${input.value}</li>
    <input type="checkbox" id="modificar_${id}">
    <button type="button" id="delete_task_${id}"></button>
    `;
    input.value = '';
    const modif = document.getElementById(`modificar_${id}`);
    const del = document.getElementById(`delete_task_${id}`);
   
    list.addEventListener('click', (event) => {
    if (event.target.id.startsWith('modificar_')) {
        const id = event.target.id.replace('modificar_', '');
        const tarea = tareas.find(t => t.id == id);
        tarea.completed = !tarea.completed;

        const tareaElement = document.getElementById(id);
        tareaElement.classList.toggle('completed');
        if (tarea.completed) {
            completedTasks++;
        } else {
            completedTasks--;
        }
        completed.innerHTML = completedTasks;
    }
});

    list.addEventListener('click', (event) => {
        if (event.target.id.startsWith('delete_task_')) {
            const id = event.target.id.replace('delete_task_', '');
            delete_task(id);
        }
    });
    total.innerHTML = totalTasks;
}

btn.addEventListener("click", addElement);

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addElement();
    }
});
