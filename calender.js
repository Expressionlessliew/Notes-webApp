// Calendar
const calendar = document.getElementById("calendar");
const calendarHeader = document.getElementById("calendar-header");

// Get the current date
const currentDate = new Date();

// Get the current month and year
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Create an array of month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to generate the calendar for a given month and year
function generateCalendar(month, year) {
  // Get the number of days in the specified month and year
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Get the index of the first day of the month (0 - Sunday, 1 - Monday, ...)
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Clear the calendar
  calendar.innerHTML = "";

  // Create the calendar header
  calendarHeader.innerHTML = monthNames[month] + " " + year;

  // Create the calendar days
  for (let i = 0; i < totalDays + firstDayIndex; i++) {
    const day = document.createElement("div");
    day.classList.add("day");

    // Calculate the day number
    const dayNumber = i - firstDayIndex + 1;

    // Set the day number if it falls within the current month
    if (i >= firstDayIndex) {
      day.textContent = dayNumber;

      // Highlight the current day
      if (
        dayNumber === currentDate.getDate() &&
        month === currentDate.getMonth() &&
        year === currentDate.getFullYear()
      ) {
        day.classList.add("today");
      }
    }

    calendar.appendChild(day);
  }
}

// Generate the calendar for the current month and year
generateCalendar(currentMonth, currentYear);
