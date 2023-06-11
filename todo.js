const todoList = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const clearAllBtn = document.getElementById("clear-all-btn");

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskItem(task));
}

// Save tasks to local storage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create a new task item
function createTaskItem(taskText) {
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  // Create a clear button
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear";
  clearBtn.style.marginLeft = "20px";
  clearBtn.addEventListener("click", () => {
    removeTask(taskItem, taskText);
  });

  // Append the clear button to the task item
  taskItem.appendChild(clearBtn);

  todoList.appendChild(taskItem);
}

// Remove a task
function removeTask(taskItem, taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task !== taskText);
  saveTasks(updatedTasks);
  todoList.removeChild(taskItem);
}

// Add a new task
function addTask() {
  const taskText = newTaskInput.value;
  if (taskText.trim() !== "") {
    createTaskItem(taskText);

    // Save the task to local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    saveTasks(tasks);

    newTaskInput.value = "";
  }
}

addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);

// Clear all tasks
function clearAllTasks() {
  todoList.innerHTML = "";
  localStorage.removeItem("tasks");
}
