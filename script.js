async function addTodo() {
    try {
        const todoName = document.getElementById("todoName").value.trim();
        const todoDescription = document.getElementById("todoDescription").value.trim();
        if (todoName && todoDescription) {
            const todo = { name: todoName, description: todoDescription, completed: false };
            const todoItemDiv = document.createElement("div");
            todoItemDiv.innerHTML = `<input type="checkbox" id="${todoName}" onchange="updateTodo('${todoName}')">
                                     <label for="${todoName}"><strong>${todo.name}</strong>: ${todo.description}</label>`;
            document.getElementById("remainingTodos").appendChild(todoItemDiv);
            document.getElementById("todoName").value = "";
            document.getElementById("todoDescription").value = "";

            await updateTodoAPI(todo);
        }
    } catch (error) {
        console.error(error);
    }
}

function updateTodo(todoName) {
    const todoCheckbox = document.getElementById(todoName);
    const todoLabel = todoCheckbox.nextElementSibling;
    const completedTodosDiv = document.getElementById("completedTodos");
    const remainingTodosDiv = document.getElementById("remainingTodos");
    todoLabel.style.textDecoration = todoCheckbox.checked ? "line-through" : "none";
    (todoCheckbox.checked ? completedTodosDiv : remainingTodosDiv).appendChild(todoCheckbox.parentNode);
    
    const todo = { name: todoName, description: todoLabel.textContent.split(': ')[1], completed: todoCheckbox.checked };
    updateTodoAPI(todo)
        .then(data => console.log(data))
        .catch(error => console.error('Error updating todo in API:', error));
}

function updateTodoAPI(todo) {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://crudcrud.com/api/a6af670580b6404bbf40b3bf74e23e21/todos';
        axios.post(apiUrl, todo)
            .then(response => {
                console.log('Update Request Successful. Response:', response.data); // Log successful response from API
                resolve(response.data);
            })
            .catch(error => {
                console.error('Update Request Failed. Error:', error); // Log error from API
                reject(error);
            });
    });
}

// Usage:
addTodo();