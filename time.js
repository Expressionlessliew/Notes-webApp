function time() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const session = document.getElementById("session");
  
    // Convert hours to 12-hour format
    let formattedHours = hours % 12;
    if (formattedHours === 0) {
      formattedHours = 12;
    }
  
    document.getElementById("hours").textContent = formattedHours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  
    if (hours >= 12) {
      session.textContent = "PM";
    } else {
      session.textContent = "AM";
    }
  }
  
  setInterval(time, 1000);
  