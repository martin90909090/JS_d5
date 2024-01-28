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
let completedTasks = tareas.filter(task => task.completed).length;
total.innerHTML = totalTasks;
completed.innerHTML = completedTasks;

const rendering = () => {
    tareas.forEach((tarea) => {
        list.innerHTML += `<div class="elements" style="display: flex; flex-direction: row">
        <li class="elements_li" id="${tarea.id}" style="list-style: none">${tarea.id} ${tarea.description}</li>
        <input class="mod" type="checkbox" id="modificar_${tarea.id} onclick="modif('${tarea.id}')" style="height: 10px; width: auto">
        <button class="delete" type="button" id="delete_task_${tarea.id}" onclick="delete_el('${tarea.id}')" style="height: 10px; width: 10px"></button>
        </div>
        `;
    });
};

const modif = (id) => {
    const check = document.getElementById(`modificar_${id}`);
    if (check.checked) {
        completedTasks++;
    } else {
        completedTasks--;
    }
    completed.innerHTML = completedTasks;
};

const delete_el = (id) => {
    const element = document.getElementById(id);
    const parentDiv = element.parentNode;
    parentDiv.parentNode.removeChild(parentDiv);
    totalTasks--;
    total.innerHTML = totalTasks;
    completedTasks = tareas.filter(task => task.completed).length;
    completed.innerHTML = completedTasks;
    tareas.pop();
};

rendering();

 

const add_el = () => {
    if (input.value === "") {
        alert("Ingrese una tarea");
    } else {
        const new_task = {
            id: math,
            description: input.value,
            completed: false,
        }
        tareas.push(new_task);
        totalTasks++;
        total.innerHTML = totalTasks;
        let id = math;

        const div = document.createElement('div');
        div.className = "elements";
        div.style.display = "flex";
        div.style.flexDirection = "row";

        const li = document.createElement('li');
        li.className = "elements_li";
        li.id = id;
        li.style.listStyle = "none";
        li.textContent = `${id} ${input.value}`;

        const modif_check = document.createElement('input');
        modif_check.className = "mod";
        modif_check.type = "checkbox";
        modif_check.id = `modificar_${id}`;
        modif_check.style.height = "10px";
        modif_check.style.width = "10px";
        modif_check.onclick = () => modif(id);

        const del_button = document.createElement('button');
        del_button.className = "delete";
        del_button.type = "button";
        del_button.id = `delete_task_${id}`;
        del_button.style.height = "10px";
        del_button.style.width = "10px";
        del_button.onclick = () => delete_el(id);

        div.appendChild(li);
        div.appendChild(modif_check);
        div.appendChild(del_button);
        list.appendChild(div);

        input.value = "";
    }
};
