let database = firebase.database();
let todoListFolder = database.ref("todoList");
// first call db
// call the todoList folder
// get the new userinput
// push the userInput into our todoList db
// show the data from db into todoList container

//Get User Input
document.getElementById("add-task-btn").addEventListener("click", function () {
  let userInput = document.getElementById("userInput").value;
  console.log(userInput);
  pushDataToDB(userInput);
});

//Push data into todoList DB
function pushDataToDB(task) {
  todoListFolder
    .push(task)
    .then(function () {
      console.log("Task added successfully");
    })
    .catch(function () {
      console.log("Task upload failed");
    });
}

function deleteTaskFromTodoList(taskId) {
    let taskRef = todoListFolder.child(taskId)
    taskRef.remove()
    .then(function() {
        console.log('Task deleted successfully.');
    })
    .catch(function() {
        console.log('Task could not be deleted')
    })
}

function showTodoListData() {
  todoListFolder.on("value", function (snapshot) {
    let todoList = snapshot.val();
    const todoListContainer = document.getElementById("todo-list");
    todoListContainer.innerHTML = ""; //clear previous list

    //use for loop to iterate over todo list
    for (var key in todoList) {
      if (todoList.hasOwnProperty(key)) {
        let task = todoList[key];

        //create a new list element for each data
        let listItem = document.createElement("li");
        listItem.textContent = task;

        //for every list, create a delete button
        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Remove';
        deleteBtn.setAttribute('data-task-id', key)
        deleteBtn.addEventListener('click', function(event) {
            let taskId = event.target.getAttribute('data-task-id');
            deleteTaskFromTodoList(taskId);
        })
        listItem.appendChild(deleteBtn)
        todoListContainer.appendChild(listItem);
      }
    }
  });
}

showTodoListData();
