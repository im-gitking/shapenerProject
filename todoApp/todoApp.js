const apiUrl = 'https://crudcrud.com/api/ecdf21957bc5470888c31ee8b6aeb49b/todoTasks';
const task = document.getElementById('task');
const description = document.getElementById('description');
const taskForm = document.querySelector('.taskForm');

// submit event on todo form
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (task.value != '' && description != '') {
        const todoObj = {
            task: task.value,
            description: description.value,
            isCompleted: false
        }
        try {
            const response = await axios.post(apiUrl, todoObj)
            console.log(response);
            const todo = response.data;
            document.querySelector('.pendingTasks').innerHTML += `<li class="todoTask">${todo.task} - ${todo.description} <button class="tick" id="${todo._id}">✓</button> <button class="cross" id="${todo._id}">✗</button></li>`;
        }
        catch (error) {
            console.log(error);
        }
    }
});

// display pending tasks
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const tasks = await axios.get(apiUrl)
            for (let task in tasks.data) {
                const todo = tasks.data[task];
                if (todo.isCompleted == false) {
                    document.querySelector('.pendingTasks').innerHTML += `<li class="todoTask">${todo.task} - ${todo.description} <button class="tick" id="${todo._id}">✓</button> <button class="cross" id="${todo._id}">✗</button></li>`;
                }
                else {
                    document.querySelector('.doneTasks').innerHTML += `<li class="todoTask">${todo.task} - ${todo.description}</li>`;
                }
            }
    }
    catch(err) {
        console.log(err);
    }
});

// comeplete/remove todo tasks
document.querySelector('.pendingTasks').addEventListener('click', async (e) => {
    // for marking completed tasks
    if (e.target.classList.contains('tick')) {
        const todoId = e.target.id;
        try {
            const res = await axios.get(`${apiUrl}/${todoId}`)
            const todo = res.data;
            const todoObj = {
                task: todo.task,
                description: todo.description,
                isCompleted: true
            }
            console.log(todoObj);

            const newRes = await axios.put(`${apiUrl}/${todoId}`, todoObj)
            console.log(newRes);
            document.querySelector('.doneTasks').innerHTML += `<li class="todoTask">${todo.task} - ${todo.description}</li>`;
            e.target.parentElement.remove();
        }
        catch (err) {
            console.log(err);
        }

    }

    // for removing tasks
    if (e.target.classList.contains('cross')) {
        const todoId = e.target.id;
        try {
            const res = axios.delete(`${apiUrl}/${todoId}`)
            console.log(res);
            e.target.parentElement.remove();
        }
        catch (err) {
            console.log(err);
        }
    }
});
