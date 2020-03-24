// DOM

const icons = document.querySelectorAll('i');
const startMessage = document.getElementById('start-game-message');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
const endGameMessage = document.getElementById('end-game-message');

// Generate Random Number to determine which team willl go first

const random = Math.floor(Math.random() * 2);

// Message displayed if Tie

const tieMessage = 'It was a Tie!';

// Player 1

const playerX = {
  winningMessage: 'Team X Won!',
  turn: random === 0 ? true : false,
  mark: `fas fa-times`,
  marked: []
};

// Player 2

const playerO = {
  winningMessage: 'Team O Won!',
  name: 'O',
  turn: !playerX.turn ? true : false,
  mark: `far fa-circle`,
  marked: []
};

// Message shows when window reloads

onload();

function onload() {
  if (playerX.turn) {
    startMessage.innerHTML = `<p>X's  Start  the  Game</p>`;
  } else {
    startMessage.innerHTML = `<p>O's  Start  the  Game</p>`;
  }

  setTimeout(() => {
    startMessage.style.opacity = '0';
  }, 3000);
}

// Hover/Mousover Effect when choosing move
// Icon class changes when Hovering but not if the space is marked

function showMove(e) {
  if (playerX.turn && !e.target.classList.contains('marked')) {
    const x = playerX.mark;
    e.target.classList.value = `${x}`;
  }
  if (playerO.turn && !e.target.classList.contains('marked')) {
    const o = playerO.mark;
    e.target.classList.value = `${o}`;
  }
}

// Onclick space is marked and space ID is added to list in the Player Object

function selectMove(e) {
  if (playerX.turn && !e.target.classList.contains('marked')) {
    playerX.marked.push(e.target.id);
    e.target.classList.add('marked');
    playerX.turn = false;
    playerO.turn = true;

    // Check if Player 1 won

    checkIfXWon();
  }
  if (playerO.turn && !e.target.classList.contains('marked')) {
    playerO.marked.push(e.target.id);
    e.target.classList.add('marked');
    playerO.turn = false;
    playerX.turn = true;

    // Check if Player 2 won

    checkIfOWon();
  }

  // If all fpaces are filled/No winner show tie message

  if (playerO.marked.length + playerX.marked.length === 9) {
    showEndMessage(tieMessage);
  }
}

// Check Player1 marked list if there winning combinations

function checkIfXWon() {
  const x = playerX;
  if (
    (x.marked.includes('1') &&
      x.marked.includes('2') &&
      x.marked.includes('3')) ||
    (x.marked.includes('4') &&
      x.marked.includes('5') &&
      x.marked.includes('6')) ||
    (x.marked.includes('7') &&
      x.marked.includes('8') &&
      x.marked.includes('9')) ||
    (x.marked.includes('1') &&
      x.marked.includes('4') &&
      x.marked.includes('7')) ||
    (x.marked.includes('2') &&
      x.marked.includes('5') &&
      x.marked.includes('8')) ||
    (x.marked.includes('3') &&
      x.marked.includes('6') &&
      x.marked.includes('9')) ||
    (x.marked.includes('1') &&
      x.marked.includes('5') &&
      x.marked.includes('9')) ||
    (x.marked.includes('3') && x.marked.includes('5') && x.marked.includes('7'))
  ) {
    showEndMessage(playerX.winningMessage);
  }
}

// Check Player2 marked list if theres winning combination

function checkIfOWon() {
  const o = playerO;
  if (
    (o.marked.includes('1') &&
      o.marked.includes('2') &&
      o.marked.includes('3')) ||
    (o.marked.includes('4') &&
      o.marked.includes('5') &&
      o.marked.includes('6')) ||
    (o.marked.includes('7') &&
      o.marked.includes('8') &&
      o.marked.includes('9')) ||
    (o.marked.includes('1') &&
      o.marked.includes('4') &&
      o.marked.includes('7')) ||
    (o.marked.includes('2') &&
      o.marked.includes('5') &&
      o.marked.includes('8')) ||
    (o.marked.includes('3') &&
      o.marked.includes('6') &&
      o.marked.includes('9')) ||
    (o.marked.includes('1') &&
      o.marked.includes('5') &&
      o.marked.includes('9')) ||
    (o.marked.includes('3') && o.marked.includes('5') && o.marked.includes('7'))
  ) {
    showEndMessage(playerO.winningMessage);
  }
}

function showEndMessage(msg) {
  endGameMessage.style.display = 'block';
  message.innerHTML = `<p>${msg}</p>`;
}

// Event listeners

icons.forEach(i => {
  i.addEventListener('mouseover', showMove);
});

icons.forEach(i => {
  i.addEventListener('click', selectMove);
});

resetBtn.addEventListener('click', () => {
  location.reload();
});

// add nice looking popup when game is over
