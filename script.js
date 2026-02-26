const addTodoBtn = document.getElementById("todoBtn")
const inputTag = document.getElementById("todoInput")
const todoList = document.getElementById("todoList")
let todoText;
let todos = [];

let todosString = localStorage.getItem("todos");
if(todosString){
    todos = JSON.parse(todosString);
}

const populateTodos = ()=>{
    let string =""
    for (const todo of todos) {
        string += `<li class="todo-item ${todo.isCompleted? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${todo.isCompleted? "checked" : ""}>
        <span class="text">${todo.title}</span>
        <button class="delete-btn">x</button>
    </li>`
    }
    todoList.innerHTML = todoList.innerHTML + string;
}


addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value;
    let todo = {
        title:todoText,
        isCompleted: false
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    inputTag.value = "";
    populateTodos();
})
populateTodos();

const todoCheckboxes = document.querySelectorAll(".checkbox")
todoCheckboxes.forEach(element => {
    element.addEventListener("click",(tick) =>{
        if(tick.target.checked){
            element.parentNode.classList.add("completed");
        }
        else{
            element.parentNode.classList.remove("completed")
        }
    })
});