const questionNameElement = document.querySelector(".question-name");
const answerInputElement = document.querySelector(".answer-input");
const submitButton = document.querySelector(".submit-btn");
const scoreElement = document.querySelector(".score");
const restartButton = document.createElement("button");
restartButton.textContent = "Restart Quiz";
restartButton.classList.add("restart-btn");
restartButton.style.display = "none"; // Hide the restart button initially

let currentQuestionIndex = 0;
let score = 0;
let isQuizFinished = false;

// Function to load the current question
function loadQuestion() {
  const questionRef = firebase.database().ref("questions");
  questionRef.once("value", (snapshot) => {
    const questions = snapshot.val();
    const questionKeys = Object.keys(questions);
    if (currentQuestionIndex < questionKeys.length) {
      const currentQuestionKey = questionKeys[currentQuestionIndex];
      const currentQuestion = questions[currentQuestionKey];
      questionNameElement.textContent = currentQuestion.name;
      isQuizFinished = false;
    } else {
      isQuizFinished = true;
      showRestartButton();
    }
  });
}

// Function to check the user's answer
function checkAnswer() {
  const questionRef = firebase.database().ref("questions");
  questionRef.once("value", (snapshot) => {
    const questions = snapshot.val();
    const questionKeys = Object.keys(questions);
    if (!isQuizFinished && currentQuestionIndex < questionKeys.length) {
      const currentQuestionKey = questionKeys[currentQuestionIndex];
      const currentQuestion = questions[currentQuestionKey];
      const userAnswer = answerInputElement.value.trim().toLowerCase();
      if (userAnswer === currentQuestion.answer) {
        score++;
        scoreElement.textContent = score;
      }
      currentQuestionIndex++;
      answerInputElement.value = "";
      loadQuestion();
    } else {
      if (isQuizFinished) {
        showRestartButton();
      }
    }
  });
}

// Function to show the restart button
function showRestartButton() {
  restartButton.style.display = "block";
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score;
  restartButton.style.display = "none";
  loadQuestion();
}

// Event listener for the submit button
submitButton.addEventListener("click", checkAnswer);

// Event listener for the restart button
restartButton.addEventListener("click", restartQuiz);

// Append the restart button to the scoreboard div
const scoreboardElement = document.querySelector(".scoreboard");
scoreboardElement.appendChild(restartButton);

// Load the first question on page load
loadQuestion();
