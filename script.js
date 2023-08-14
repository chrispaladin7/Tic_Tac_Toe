/*----- constants -----*/
//1.1
const COLOR_CODE = {
  'null': 'white',
  '1': 'red',
  '-1': 'blue'
};

//1.2

/*----- state variables -----*/
//2.1

let board;
let turn;
let winner;


/*----- cached elements  -----*/
const markerEl = [...document.querySelectorAll('#marker > div')];
const msgEl = document.querySelector('h1');
const replayBtn = document.querySelector('button');

const winningCombination = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 5, 8],
  [3, 4, 5],
  [6, 7, 8]

];



/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}

function render() {

  renderBoard();
  renderMessage();

}

function handleMove(evt) {
  const cellIdx = markerEl.indexOf(evt.target);
  if (cellIdx === -1) return;
  board[cellIdx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function renderBoard() {
  board.forEach(function(cellVal, index) {
    const cellEl = document.getElementById(`cell${index}`);
    cellEl.style.backgroundColor = COLOR_CODE[cellVal];
  });
  replayBtn.style.disabled = winner ? false : true;
}

function getWinner() {
  for (let i = 0; i < winningCombination.length; i++) {
    if ((board[winningCombination[i][0]] + board[winningCombination[i][1]] + board[winningCombination[i][2]]) === 3) return board[winningCombination[i][0]];

    if (board.includes(null)) return null;
    return 'T';
  }
}

function renderMessage() {
  if (winner === 'T') {
    msgEl.innerHTML = "IT'S A TIE!";
  } else if (winner) {
    msgEl.innerHTML = `Congrats <span style="color: ${COLOR_CODE[winner]}">${COLOR_CODE[winner].toUpperCase()}</span>!`;
  } else {
    msgEl.innerHTML = `<span style="color: ${COLOR_CODE[turn]}">${COLOR_CODE[turn].toUpperCase()}</span>'s Turn`;
  }
}