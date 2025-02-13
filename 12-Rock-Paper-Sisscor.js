const score= JSON.parse(localStorage.getItem('score'))||
{
  win: 0,
  lose: 0,
  tie: 0
};

updateScoreElement();

/*
if(!score){
score = {
  win: 0,
  lose: 0,
  tie: 0
};
}
*/
function pickComputerMove(){
const randomNumber = (Math.random());
let computerMove = ` `;

if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = `Rock`;
}
else if(randomNumber >= 1/3 && randomNumber < 2/3){
  computerMove = `Paper`;
}
else if(randomNumber >= 2/3 && randomNumber < 1){
  computerMove = `Scissors`;
}
return computerMove;
}

function gameResult(UserChoice){
const computerMove = pickComputerMove();

let result = ``;
if(UserChoice === 'Scissors'){
  if (computerMove === 'Rock'){
  result = `You Lose`;
}
else if(computerMove === 'Paper'){
  result = `You Win`
}
else if(computerMove === `Scissors`){
  result = 'Tie';
}
}
else if(UserChoice === 'Paper'){
if (computerMove === 'Rock'){
  result = `You Win`;
}
else if(computerMove === 'Paper'){
  result = `Tie`
}
else if(computerMove === `Scissors`){
  result = 'You Lose';
}
}
else if(UserChoice === 'Rock'){
  if (computerMove === 'Rock'){
  result = `Tie`;
}
else if(computerMove === 'Paper'){
  result = `You Lose`
}
else if(computerMove === `Scissors`){
  result = 'You Win';
}
}

if(result === "You Win"){
  score.win = score.win + 1;
}
else if(result === "You Lose"){
score.lose = score.lose + 1;
}
else if(result === "Tie"){
score.tie = score.tie + 1;
}
localStorage.setItem('score', JSON.stringify(score));


updateScoreElement();

document.querySelector(".js-result").innerHTML = result;
document.querySelector(".js-moves").innerHTML = `Your Move - <img src = "images/${UserChoice}-emoji.png" class = "move-icon">
<img src = "images/${computerMove}-emoji.png" class = "move-icon"> - Computer Move`;

/*alert(`You Picked ${UserChoice}. Computer Picked ${computerMove}, So ${result}
  Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`
  
);
*/
//updateResult();
}
function updateScoreElement(){
  document.querySelector('.js-score').innerHTML =
 `Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;
}

let isAutoPlaying = false;
let intervalID;

//const autoPlay = () => {

//}


function autoplay(){
  if(!isAutoPlaying){
    intervalID = setInterval(() => {
    const playerMove = pickComputerMove();
    gameResult(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-button').innerHTML = 'Stop Playing';
    } else{
      clearInterval(intervalID);
      isAutoPlaying = false;
      document.querySelector('.js-auto-button').innerHTML = 'Auto Play';
    }
  }

  document.body.addEventListener('keydown', (event)=> {
    if(event.key === 'r'){
      gameResult('Rock')
    }
    else if(event.key === 'p'){
      gameResult('Paper')
    }
    else if(event.key === 's'){
      gameResult('Scissors');
    }
    else if(event.key === 'a'){
      autoplay();
    }
    else if(event.key === 'Backspace'){
      ScoreUpdate();
    }
  });

  document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    gameResult('Rock');
  });
  document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    gameResult('Paper');
  });
  document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    gameResult('Scissors');
  });

  document.querySelector('.js-auto-button').addEventListener('click', () => {
    autoplay();
  }
  )
  document.querySelector('.reset-score-button').addEventListener('click', () =>{
    ScoreUpdate();
  });

  function ScoreUpdate(){

    let confirming = 
    `
    <p class = "js-confirm">Are you sure you want to reset the score? 
    <button class = "js-yes-button"> Yes </button>
    <button class = "js-no-button"> No </button>
    </p>
    
    `
    document.querySelector('.confirm').innerHTML = confirming;

    document.querySelector('.js-no-button').addEventListener('click', ()=>{
      document.querySelector('.js-confirm').innerHTML = "";
    })
    document.querySelector('.js-yes-button').addEventListener('click', ()=> {
      score.win = 0;
      score.lose = 0;
      score.tie = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      document.querySelector('.js-confirm').innerHTML = "";
    })
  }
  