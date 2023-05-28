firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in
        document.getElementById("userInfo").textContent = "Welcome, " + user.email;
    } else {
        // No user is signed in
        document.getElementById("userInfo").textContent = "";
    }
});

// Logout button event listener
document.getElementById("logoutBtn").addEventListener("click", function() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful, redirect to login page
        window.location.href = "index.html";
    }).catch(function(error) {
        // An error happened
        console.log(error.message);
    });
});