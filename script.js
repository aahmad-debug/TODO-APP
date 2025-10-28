const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearCompleted = document.getElementById("clear-completed");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("theme-toggle");

let todos = [];
let filter = "all";


function renderTodos() {
list.innerHTML = "";

const filtered = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
});

filtered.forEach((todo, i) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
<div class="todo-left">
        <div class="circle ${todo.completed ? "checked" : ""}" data-index="${i}"></div>
        <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
</div>
<img src="todo-app-main/images/icon-cross.svg" class="delete" data-index="${i}">
    `;

    list.appendChild(li);
});

itemsLeft.textContent = `${todos.filter(t => !t.completed).length} items left`;
}
input.addEventListener("keypress", e => {
if (e.key === "Enter" && input.value.trim() !== "") {
    todos.push({ text: input.value.trim(), completed: false });
    input.value = "";
    renderTodos();
}
});
list.addEventListener("click", e => {
const index = e.target.dataset.index;
if (e.target.classList.contains("circle")) {
    todos[index].completed = !todos[index].completed;
}
if (e.target.classList.contains("delete")) {
    todos.splice(index, 1);
}
renderTodos();
});
filters.forEach(btn => {
btn.addEventListener("click", () => {
filters.forEach(b => b.classList.remove("active"));
btn.classList.add("active");
filter = btn.dataset.filter;
renderTodos();
});
});
clearCompleted.addEventListener("click", () => {
todos = todos.filter(t => !t.completed);
renderTodos();
});


themeToggle.addEventListener("click", () => {
document.body.classList.toggle("light");
document.body.classList.toggle("dark");
themeToggle.src = document.body.classList.contains("light")
? "todo-app-main/images/icon-moon.svg"
: "todo-app-main/images/icon-sun.svg";
});

renderTodos();
