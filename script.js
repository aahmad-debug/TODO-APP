
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearCompleted = document.getElementById("clear-completed");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("theme-toggle");

const STORAGE_KEY = "todos";
const THEME_KEY = "theme";

let todos = [];
let filter = "all";


function loadTodos() {
const saved = localStorage.getItem(STORAGE_KEY);
todos = saved ? JSON.parse(saved) : [];
}


function saveTodos() {
localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}


function renderTodos() {
list.innerHTML = "";

const filtered = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
});

filtered.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
<div class="todo-left">
        <div class="circle ${todo.completed ? "checked" : ""}" data-id="${todo.id}"></div>
        <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
</div>
<img src="todo-app-main/images/icon-cross.svg" class="delete" data-id="${todo.id}">
    `;

    list.appendChild(li);
});

itemsLeft.textContent = `${todos.filter(t => !t.completed).length} items left`;
}

input.addEventListener("keypress", e => {
if (e.key === "Enter") {
    const text = input.value.trim();


    if (!text) return;
    if (text.length > 50) {
alert("يجب ألا يتجاوز نص المهمة 50 حرفًا!");
return;
    }


    const safeText = text.replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
    }[c]));

    todos.push({ id: Date.now(), text: safeText, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
}
});

list.addEventListener("click", e => {
const id = Number(e.target.dataset.id);

if (e.target.classList.contains("circle")) {
    todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
}

if (e.target.classList.contains("delete")) {
    todos = todos.filter(todo => todo.id !== id);
}

saveTodos();
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
saveTodos();
renderTodos();
});


function loadTheme() {
const savedTheme = localStorage.getItem(THEME_KEY) || "light";
document.body.classList.toggle("dark", savedTheme === "dark");
document.body.classList.toggle("light", savedTheme === "light");

themeToggle.src = savedTheme === "light"
    ? "todo-app-main/images/icon-moon.svg"
    : "todo-app-main/images/icon-sun.svg";
}

function toggleTheme() {
const isLight = document.body.classList.contains("light");
const newTheme = isLight ? "dark" : "light";
document.body.classList.toggle("light", !isLight);
document.body.classList.toggle("dark", isLight);
localStorage.setItem(THEME_KEY, newTheme);

themeToggle.src = newTheme === "light"
    ? "todo-app-main/images/icon-moon.svg"
    : "todo-app-main/images/icon-sun.svg";
}

themeToggle.addEventListener("click", toggleTheme);


document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  loadTheme();
  renderTodos();
});
