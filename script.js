const addTodoBtn = document.getElementById("todoBtn")
const inputTag = document.getElementById("todoInput")
const todoList = document.getElementById("todoList")
let todoText;
let todos = [];

let todosString = localStorage.getItem("todos");
if (todosString) {
    todos = JSON.parse(todosString);
}

const populateTodos = () => {
    let string = ""
    for (const todo of todos) {
        string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${todo.isCompleted ? "checked" : ""}>
        <span class="text">${todo.title}</span>
        <button class="delete-btn">x</button>
    </li>`
    }
    todoList.innerHTML = string;


    let deleteBtns = document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (dlt) => {
            todos = todos.filter((todo) => {
                return (todo.id) !== Number(dlt.target.parentNode.id)
            })
            localStorage.setItem("todos",JSON.stringify(todos))
            populateTodos()
        })
    })
}


addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value;
    if(todoText.trim().length<3){
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
    localStorage.setItem("todos", JSON.stringify(todos));
    populateTodos();
})
populateTodos();

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
            localStorage.setItem("todos", JSON.stringify(todos))
        }
    })
});


