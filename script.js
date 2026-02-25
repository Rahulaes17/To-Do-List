const addTodoBtn = document.getElementById("todoBtn")
const inputTag = document.getElementById("todoInput")
let todoText;
let todos = [];

let todosString = localStorage.getItem(todos);
if(todosString){
    todos = JSON.parse(todosString);
}

addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value;
    inputTag.value = "";
    let todo = {
        title:todoText,
        isCompleted: false
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
})