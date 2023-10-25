const apiUrl = 'https://crudcrud.com/api/262672bc5d874125b592a83e9ce4e445/todoTasks';
const task = document.getElementById('task');
const description = document.getElementById('description');
const taskForm = document.querySelector('.taskForm');

// submit event on todo form
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (task.value != '' && description != '') {
        const todoObj = {
            task: task.value,
            description: description.value,
            isCompleted: false
        }
        axios.post(apiUrl, todoObj)
            .then((response) => {
                console.log(response);
                const todo = response.data;
                document.querySelector('.pendingTasks').innerHTML += `<li class="todoTask">${todo.task} - ${todo.description} <button class="tick" id="${todo._id}">✓</button> <button class="cross" id="${todo._id}">✗</button></li>`;
            })
            .catch((error) => {
                console.log(error);
            })
    }
});

// display pending tasks
window.addEventListener('DOMContentLoaded', (e) => {
    axios.get(apiUrl)
        .then((tasks) => {
            for (let task in tasks.data) {
                const todo = tasks.data[task];
                if (todo.isCompleted == false) {
                    document.querySelector('.pendingTasks').innerHTML += `<li class="todoTask">${todo.task} - ${todo.description} <button class="tick" id="${todo._id}">✓</button> <button class="cross" id="${todo._id}">✗</button></li>`;
                }
                else {
                    document.querySelector('.doneTasks').innerHTML += `<li class="todoTask">${todo.task} - ${todo.description}</li>`;
                }
            }
        })

});

// comeplete/remove todo tasks
document.querySelector('.pendingTasks').addEventListener('click', (e) => {
    // for marking completed tasks
    if (e.target.classList.contains('tick')) {
        const todoId = e.target.id;
        axios.get(`${apiUrl}/${todoId}`)
            .then((res) => {
                const todo = res.data;
                const todoObj = {
                    task: todo.task,
                    description: todo.description,
                    isCompleted: true
                }
                console.log(todoObj);
                axios.put(`${apiUrl}/${todoId}`, todoObj)
                    .then((res) => {
                        console.log(res);
                        document.querySelector('.doneTasks').innerHTML += `<li class="todoTask">${todo.task} - ${todo.description}</li>`;
                        e.target.parentElement.remove();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

    }

    // for removing tasks
    if (e.target.classList.contains('cross')) {
        const todoId = e.target.id;
        axios.delete(`${apiUrl}/${todoId}`)
        .then((res) => {
            console.log(res);
            e.target.parentElement.remove();
        })
        .catch(err => console.log(err));
    }
});