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

let count = 0;
let i = 0;
let totalTasks = 0;
let completedTasks = tareas.filter(task => task.completed).length;
total.innerHTML = totalTasks;
completed.innerHTML = completedTasks;

const rendering = () => {
    tareas.forEach((tarea) => {
        i++;
        count++;
        const new_task = {
            id: tareas[i].id,
            description: 'hablar inglés la siguiente cantidad de veces en la semana: ' + count,
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
        li.textContent = `${id} ${new_task.description}`;

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
    });
};

const modif = (id) => {
    const check = document.getElementById(`modificar_${id}`);
    const task = tareas.find(task => task.id == id);
    if (check.checked) {
        task.completed = true;
    } else if (!check.checked){
        task.completed = false;
    }
    completedTasks = tareas.filter(task => task.completed).length;
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
