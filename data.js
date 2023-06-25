let database = firebase.database();
let dataRef = database.ref('data');

let newData = {
  name: 'John Doe',
  age: 25,
  email: 'johndoe@example.com'
};

dataRef.set(newData)
  .then(function() {
    console.log('Data saved successfully.');
  })
  .catch(function(error) {
    console.log('Data could not be saved: ' + error);
  });
