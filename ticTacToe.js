const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restart-btn');
const alertMessage = document.querySelector('.alert-message');

let currentPlayer = 'X';
let isGameOver = false;

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartBtn.addEventListener('click', restartGame);

function handleClick() {
  if (isGameOver || this.textContent !== '') {
    return;
  }

  this.textContent = currentPlayer;
  this.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    gameOver(currentPlayer + ' wins!');
    return;
  }

  if (checkDraw()) {
    gameOver('It\'s a draw!');
    return;
  }

  currentPlayer = 'O';
  setTimeout(computerMove, 500);
}

function computerMove() {
  const availableCells = Array.from(cells).filter(cell => cell.textContent === '');
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const computerCell = availableCells[randomIndex];

  computerCell.textContent = currentPlayer;
  computerCell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    gameOver(currentPlayer + ' wins!');
    return;
  }

  if (checkDraw()) {
    gameOver('It\'s a draw!');
    return;
  }

  currentPlayer = 'X';
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].classList.contains(player));
  });
}

function checkDraw() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function gameOver(message) {
  isGameOver = true;
  alertMessage.textContent = message;
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });

  currentPlayer = 'X';
  isGameOver = false;
  alertMessage.textContent = '';
}
