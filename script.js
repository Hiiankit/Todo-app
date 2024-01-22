const taskList = document.querySelector('.task-list')
const addTaskBtn = document.getElementById('add-task')
const inputElement = document.querySelector('input')

const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
};

const createTask = (taskName) => {
    const taskItem = document.createElement('div')
    taskItem.className = 'task-item'

    const checkIcon = document.createElement('i')
    checkIcon.classList.add('fa-regular', 'fa-circle', 'green')
    taskItem.appendChild(checkIcon)
    checkIcon.addEventListener("click", ()=>{
        checkIcon.classList.toggle('fa-circle')
        checkIcon.classList.toggle('fa-circle-check')
    })

    const taskSpan = document.createElement('span')
    taskSpan.textContent = taskName
    taskSpan.className = 'task'
    taskItem.appendChild(taskSpan)

    const trashIcon = document.createElement('i')
    trashIcon.classList.add('fa-regular', 'fa-trash-can', 'red')
    taskItem.appendChild(trashIcon)

    trashIcon.addEventListener("click", () => removeTask(taskItem))

    return taskItem
}

const removeTask = (task) => {
    const confirm  =window.confirm("Are You Sure?")
    if(confirm === true)
    task.remove()

    const taskIndex = storedTasks.indexOf(task.querySelector('.task').textContent);
    if (taskIndex !== -1) {
        storedTasks.splice(taskIndex, 1);
        saveTasksToLocalStorage();
    }
    
}
const addTask = () => {
    const inputText = inputElement.value
    const newTask = createTask(inputText)
    taskList.prepend(newTask)
    inputElement.value = ""

    storedTasks.push(inputText);
        saveTasksToLocalStorage();
}

inputElement.addEventListener("keypress", (e)=>{
    if (e.key === "Enter") {
        addTask()

    }
})
addTaskBtn.addEventListener('click', addTask)

window.addEventListener('load', () => {
    storedTasks.forEach((taskName) => {
        const newTask = createTask(taskName);
        taskList.appendChild(newTask);
    });
});