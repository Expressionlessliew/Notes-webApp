let database = firebase.database();
let todoListFolder = database.ref("todoList");
// first call db
// call the todoList folder
// get the new userinput
// push the userInput into our todoList db


//Get User Input
document.getElementById('add-task-btn').addEventListener('click', function() {
    let userInput = document.getElementById('userInput').value;
    console.log(userInput)
    pushDataToDB(userInput)
})

//Push data into todoList DB
function pushDataToDB(data) {
    todoListFolder.push(data)
    .then(function() {
        console.log('Task added successfully')
    }).catch(function() {
        console.log('Task upload failed')
    })
}