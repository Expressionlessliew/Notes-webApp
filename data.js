let database = firebase.database();
let dataRef = database.ref("data");

let newData = {
  name: "John Doe",
  age: 25,
  email: "johndoe@example.com",
};
//Creating Data and Store in DB
dataRef
  .set(newData)
  .then(function () {
    console.log("Data saved successfully.");
  })
  .catch(function (error) {
    console.log("Data could not be saved: " + error);
  });

function getData() {
  dataRef.on("value", function (snapshot) {
    let dbData = snapshot.val();
    // get the latest data in snapshot form, then show the data
    console.log(dbData);
  });
}
// run the function after saving data
getData();
