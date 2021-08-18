const X_CLASS = 'x';
const O_CLASS = 'o';
const WIN_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let turn;

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningScreen = document.getElementById('winningMasage');
const restartButton = document.getElementById('restartButton');
const winningMasage = document.querySelector('[data-winning-masage-text]')

restartButton.addEventListener('click', ()=>{
    window.location.reload();
});

function startGame() {
    turn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click',handleClick); 
        cell.addEventListener('click',handleClick,{once: true});
    })
    hoverEffect();
    winningScreen.classList.remove('show');
}


function handleClick(e){
    const cell = e.target;
    const curr = turn ? O_CLASS : X_CLASS;
    
    placeMark(cell,curr);

    if(checkWiner(curr)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurns();
        hoverEffect();
    }
}
function placeMark(_cell, _curr){
    _cell.classList.add(_curr);
}
function swapTurns(){
    turn = !turn;
}
function hoverEffect(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(turn){
        board.classList.add(O_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}
function checkWiner(_curr){
    return WIN_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(_curr);
        })
    });
}
function endGame(_draw) {
    if (_draw) {
        winningMasage.innerText = "Draw!";
    }else{
        winningMasage.innerText = `${turn ? "O's" : "X's"} Wins!`;
    }
    winningScreen.classList.add('show');
}
function isDraw(){
    return [...cells].every(_cell => {
        return _cell.classList.contains(X_CLASS) || _cell.classList.contains(O_CLASS);
    })
}
startGame();