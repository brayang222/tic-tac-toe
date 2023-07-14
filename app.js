let playerText = document.getElementById('playerText');
let rBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let boxesH1 = Array.from(document.getElementsByClassName('box-h1'));
const blackScreen = document.getElementById('blackScreen');
const winnerText = document.querySelector('.winnerText')


const O_TEXT = 'O';
const X_TEXT = 'X';
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked (e) {
  const id = e.target.id;

  if(!spaces[id]){
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if(playerWon()){
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();

      blackScreen.style.display = 'flex';
      setTimeout(() => {
        blackScreen.style.display = 'none';
      }, 3000);

      winnerText.innerText = `${currentPlayer} has won!`;
      playerText.innerText = `${currentPlayer} has won!`;
      let winningBlocks = playerWon();

      winningBlocks.map(box => boxes[box].classList.add('winnerInd'));
      spaces.fill('*');
    } 
    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winning = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function playerWon() {
  for (const condition of winning) {
    let [a, b ,c ] = condition;

    if(spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
      return [a, b, c]
    }
  }
  return false;
}

rBtn.addEventListener('click', restart)

function restart () {
  spaces.fill(null)

  boxes.forEach(box => {
    box.innerText = '';
    box.classList.remove('winnerInd')
  })

  playerText.innerText = 'Triki';

  currentPlayer = X_TEXT;
}

startGame();

// ------------------------------ CONFETI -----------------------------------------------




 
