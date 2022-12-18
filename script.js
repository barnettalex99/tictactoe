// creates board
let boardArray = [];
for (let i = 0; i < 9; i++) {
  boardArray.push('');
}

// creates DOM element that displays instructions
let instructions = document.getElementsByClassName('instruction-container');

// factory method
const playerFactory = (playerName, symbol) => {
  const chooseSquare = () => console.log('Square Chosen by: ' + playerName);
  const whosTurn = () => { instructions[0].innerHTML = 'It is your turn, ' + playerName + '!'; };

  return {
    playerName, symbol, chooseSquare, whosTurn,
  };
};

// creates players
const playerOne = playerFactory('Player One', 'X');
const playerTwo = playerFactory('Player Two', 'O');

// sets active player to start
let activePlayer = playerOne;

// checks if board is full
function isFull(array) {
  let arrayCount = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== '') {
      arrayCount += 1;
    }
  }
  if (arrayCount === (array.length)) {
    return true;
  }
  return false;
}

// creates function for when winner is determined
function winnerDetermined(winnerValue) {
  if (winnerValue === 1) {
    instructions[0].innerHTML = `${playerOne.playerName} wins!`;
  } else if (winnerValue === 2) {
    instructions[0].innerHTML = `${playerTwo.playerName} wins!`;
  } else {
    instructions[0].innerHTML = 'It is a tie!';
  }
}

// creates function to check for win conditions
function checkWin() {
  console.log(boardArray);
  if (boardArray[0] === boardArray[1] && boardArray[1] === boardArray[2] && boardArray[0] !== '') {
    winnerDetermined(boardArray[0]);
  } else if (boardArray[3] === boardArray[4] && boardArray[4] === boardArray[5] && boardArray[3] != '' ) {
    winnerDetermined(boardArray[3]);
  } else if (boardArray[6] === boardArray[7] && boardArray[7] === boardArray[8] && boardArray[6] != '') {
    winnerDetermined(boardArray[6]);
  } else if (boardArray[0] === boardArray[3] && boardArray[3] === boardArray[6] && boardArray[0] != '') {
    winnerDetermined(boardArray[0]);
  } else if (boardArray[1] === boardArray[4] && boardArray[4] === boardArray[7] && boardArray[1] != '') {
    winnerDetermined(boardArray[1]);
  } else if (boardArray[2] === boardArray[5] && boardArray[5] === boardArray[8] && boardArray[2] != '') {
    winnerDetermined(boardArray[2]);
  } else if (boardArray[0] === boardArray[4] && boardArray[4] === boardArray[8] && boardArray[0] != '') {
    winnerDetermined(boardArray[0]);
  } else if (boardArray[2] === boardArray[4] && boardArray[4] === boardArray[6] && boardArray[2] != '') {
    winnerDetermined(boardArray[2]);
  } else if (isFull(boardArray)) {
    winnerDetermined(3);
  } else {
    console.log('checking for tie');
  }
}

// creates button onlick function
function changeSymbol(buttonId) {
  const selectedButton = document.getElementById(buttonId);
  if (selectedButton.value === "hasNotBeenClicked") {
    selectedButton.textContent = activePlayer.symbol;
    if (activePlayer.playerName === 'Player One') {
      selectedButton.value = 'hasBeenClicked';
      boardArray[buttonId] = 1;
      activePlayer = playerTwo;
      activePlayer.whosTurn();
      checkWin();
    } else {
      selectedButton.value = 'hasBeenClicked';
      boardArray[buttonId] = 2;
      activePlayer = playerOne;
      activePlayer.whosTurn();
      checkWin();
    }
  }
}

