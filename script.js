const addTodoBtn = document.getElementById("todoBtn")
const inputTag = document.getElementById("todoInput")
const todoList = document.getElementById("todoList")
const remaining = document.getElementById("remainingCount")
const ClearCompletedBtn = document.getElementById("ClearCompletedBtn")
let currentFilter = "all"
let todoText;
let todos = [];

let todosString = localStorage.getItem("todos");
if (todosString) {
    todos = JSON.parse(todosString);
    remaining.innerHTML = todos.filter((element) => { return element.isCompleted != true }).length;
}

const filterButtons = document.querySelectorAll(".filter-btn")
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        populateTodos();
    })
})

const populateTodos = () => {
    let filteredTodos = [];

    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.isCompleted);
    }
    else if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.isCompleted);
    }
    else {
        filteredTodos = todos;
    }

    let string = ""

    for (const todo of filteredTodos) {
        string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${todo.isCompleted ? "checked" : ""}>
        <span class="text">${todo.title}</span>
        <button class="delete-btn">x</button>
    </li>`
    }
    todoList.innerHTML = string;


    const todoCheckboxes = document.querySelectorAll(".checkbox")
    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", (tick) => {
            if (tick.target.checked) {
                element.parentNode.classList.add("completed");
                todos = todos.map(todo => {
                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    }
                    else {
                        return todo;
                    }
                })
                remaining.innerHTML = todos.filter((element) => { return element.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
            else {
                element.parentNode.classList.remove("completed")

                todos = todos.map(todo => {
                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {
                        return todo;
                    }
                })
                remaining.innerHTML = todos.filter((element) => { return element.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
        })
    });

    ClearCompletedBtn.addEventListener("click", () => {
        const confirmation = confirm("This will remove completed task permanently")
        if (confirmation) {
            todos = todos.filter((todo) => todo.isCompleted == false)
            localStorage.setItem("todos", JSON.stringify(todos));
            populateTodos();
        }
    })


    let deleteBtns = document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (dlt) => {
            const confirmation = confirm("This will delete the todo");
            if (confirmation) {
                todos = todos.filter((todo) => {
                    return (todo.id) !== Number(dlt.target.parentNode.id)
                })
                remaining.innerHTML = todos.filter((element) => { return element.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
                populateTodos()
            }

        })
    })
    remaining.innerHTML = todos.filter((element) => { return element.isCompleted != true }).length;
}


addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value;
    if (todoText.trim().length < 3) {
        alert("You cannot add a todo that small")
        return
    }
    inputTag.value = "";
    let todo = {
        id: Date.now(),
        title: todoText,
        isCompleted: false
    }
    todos.push(todo);
    remaining.innerHTML = todos.filter((element) => { return element.isCompleted != true }).length;
    localStorage.setItem("todos", JSON.stringify(todos));
    populateTodos();
})
populateTodos();

