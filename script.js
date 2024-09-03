document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.querySelector(".todo-input");
    const todoButton = document.querySelector(".todo-btn");
    const todoList = document.querySelector(".todo-list");
    const filterOption = document.querySelector(".filter-todo");

    todoButton.addEventListener("click", addTodo);
    todoList.addEventListener("click", deleteCheck);
    filterOption.addEventListener("change", filterTodo);

    getLocalTodos();

    function addTodo(event) {
        event.preventDefault();
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Adding to Local Storage
        saveLocalTodos(todoInput.value);
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        todoInput.value = "";
    }

    function deleteCheck(e) {
        const item = e.target;
        if (item.classList[0] === "trash-btn") {
            const todo = item.parentElement;
            const confirmDelete = confirm("Are you sure you want to delete this task?");
            if (confirmDelete) {
                todo.classList.add("slide");
                removeLocalTodos(todo);
                todo.addEventListener("transitionend", function() {
                    todo.remove();
                });
            }
        }
        if (item.classList[0] === "complete-btn") {
            const todo = item.parentElement;
            todo.classList.toggle("completed");
            if (todo.classList.contains("completed")) {
                alert("Congrats! You have completed this task!");
            }
        }
    }

    function filterTodo() {
        const todos = todoList.childNodes;
        todos.forEach(function(todo) {
            switch (filterOption.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "complete":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "incomplete":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        });
    }

    function getLocalTodos() {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.forEach(function(todo) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            const newTodo = document.createElement("li");
            newTodo.innerText = todo;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);

            const completedButton = document.createElement("button");
            completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            todoList.appendChild(todoDiv);
        });
    }

    function saveLocalTodos(todo) {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function removeLocalTodos(todo) {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});



