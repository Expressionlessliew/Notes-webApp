const questionNameElement = document.querySelector(".question-name");
const answerInputElement = document.querySelector(".answer-input");
const submitButton = document.querySelector(".submit-btn");
const scoreElement = document.querySelector(".score");

let currentQuestionIndex = 0;
let score = 0;

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
    }
  });
}

// Function to check the user's answer
function checkAnswer() {
  const questionRef = firebase.database().ref("questions");
  questionRef.once("value", (snapshot) => {
    const questions = snapshot.val();
    const questionKeys = Object.keys(questions);
    if (currentQuestionIndex < questionKeys.length) {
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
    }
  });
}

// Event listener for the submit button
submitButton.addEventListener("click", checkAnswer);

// Load the first question on page load
loadQuestion();
