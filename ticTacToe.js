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

  // Check if the computer can win on the next move
  for (let i = 0; i < availableCells.length; i++) {
    const cell = availableCells[i];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
      gameOver(currentPlayer + ' wins!');
      return;
    }

    cell.textContent = '';
    cell.classList.remove(currentPlayer);
  }

  // Check if the player can win on the next move and block them
  for (let i = 0; i < availableCells.length; i++) {
    const cell = availableCells[i];
    cell.textContent = 'X'; // Assume player's move
    cell.classList.add('X');

    if (checkWin('X')) {
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);

      if (checkWin(currentPlayer)) {
        gameOver(currentPlayer + ' wins!');
        return;
      }

      cell.textContent = '';
      cell.classList.remove(currentPlayer);
    } else {
      cell.textContent = '';
      cell.classList.remove('X');
    }
  }

  // Choose the best available move
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
