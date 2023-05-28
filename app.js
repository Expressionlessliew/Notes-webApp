const Login = document.getElementById("login");

Login.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log('successful.login');
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

