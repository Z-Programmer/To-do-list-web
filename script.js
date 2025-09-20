const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");
const filterBtn = document.getElementById("filter-btn");

let todos = [];

// Render tasks
function renderTodos(list = todos) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  list.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "✅ Done" : "⏳ Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Please enter task and date!");
    return;
  }

  todos.push({ task, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
});

// Toggle status
function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

// Delete task
function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Clear all
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
});

// Filter pending tasks
filterBtn.addEventListener("click", () => {
  const filtered = todos.filter((todo) => !todo.done);
  renderTodos(filtered);
});

// Initial render
renderTodos();