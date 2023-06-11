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
