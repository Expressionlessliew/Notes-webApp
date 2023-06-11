// Firebase authentication state change event listener
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let displayName;

    if (user.email === "xinyi.liew09@gmail.com") {
      displayName = "xinyi";
      localStorage.setItem("user", displayName);
    } else if (user.email === "test123@gmail.com") {
      displayName = "test ";
      localStorage.setItem("user", displayName);
    } else if (user.email === "kengyap.liew@gmail.com") {
      displayName = "Liew Keng Yap";
      localStorage.setItem("user", displayName);
    } else if (user.email === "enquan.liew@gmail.com") {
      displayName = "enquan";
      localStorage.setItem("user", displayName);
    } else if (user.email === "test1234@gmail.com") {
      displayName = "test1234";
      localStorage.setItem("user", displayName);
    }

    // User is signed in
    if (displayName) {
      document.getElementById("userInfo").textContent =
        "Welcome, " + displayName;
    } else {
      document.getElementById("userInfo").textContent = "";
    }
  } else {
    // No user is signed in
    document.getElementById("userInfo").textContent = "";
    localStorage.removeItem("user");
  }

  // Call loadTasks() here, after the authentication state is resolved
  loadTasks();
});

// Logout button event listener
document.getElementById("logoutBtn").addEventListener("click", function () {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful, redirect to login page
      window.location.href = "index.html";
    })
    .catch(function (error) {
      // An error happened
      console.log(error.message);
    });
});

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

// Clear all tasks
function clearAllTasks() {
  todoList.innerHTML = "";
  localStorage.removeItem("tasks");
}

addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
