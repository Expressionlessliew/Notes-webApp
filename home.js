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
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const monthYear = document.getElementById("monthYear");
const daysContainer = document.querySelector(".days");
const calendarContainer = document.querySelector(".calendar");

let currentDate = new Date();

function renderCalendar() {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Set the month and year in the header
  monthYear.textContent = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  // Clear the existing days
  daysContainer.innerHTML = "";

  // Get the first day of the month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const startingDay = firstDay.getDay();

  // Get the number of days in the month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();

  // Render the days
  for (let i = 0; i < startingDay; i++) {
    const emptyDay = document.createElement("div");
    daysContainer.appendChild(emptyDay);
  }

  for (let i = 1; i <= totalDays; i++) {
    const day = document.createElement("div");
    day.textContent = i;
    daysContainer.appendChild(day);
  }

  // Assign color class based on the current month
  const colorClasses = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  calendarContainer.className = "calendar";
  calendarContainer.classList.add(colorClasses[currentMonth]);
}

// Render the initial calendar
renderCalendar();

// Previous month button click event
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

// Next month button click event
nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

const todoList = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task-btn");

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskItem(task));
}

// Save tasks to local storage
// take data, save it into tasks
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create a new task item
function createTaskItem(taskText) {
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;
  todoList.appendChild(taskItem);
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

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
