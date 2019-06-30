/*
* Contains code to display the welcome screen
*/
let gameConstantsModule = require('./gameConstants.js');

let gameStart = false;

module.exports = {
  displayWelcomeScreen, getGameStart, setGameStart, checkIfEnterPressedForGameStart
}

function displayWelcomeScreen(p){
  let text = 'Pong is a simple 2D game involving paddles and a ball \n' +
              'The game\'s  goal is to hit the ball back to the opponent. Miss and you lose.';
  let controls = 'w & s to control paddle. p to pause o to unpause';
  let start = 'Press [ENTER] to start the game. You are on the right. Happy paddling';
  p.push();
  p.background("black");
  p.push();
  p.textAlign(p.CENTER);
  p.textSize(20);
  p.fill(0, 255, 0);
  p.strokeWeight(0.5);
  p.text(text,  gameConstantsModule.CANVASX/2,  gameConstantsModule.CANVASY/3);
  p.pop();

  p.push();
  p.textAlign(p.CENTER);
  p.textSize(15);
  p.fill(255, 255, 0);
  p.strokeWeight(0.5);
  p.text(controls, gameConstantsModule.CANVASX/2,  gameConstantsModule.CANVASY/2+45);
  p.pop();

  p.push();
  p.textAlign(p.CENTER);
  p.textSize(15);
  p.fill(255, 255, 0);
  p.strokeWeight(0.5);
  p.text(start, gameConstantsModule.CANVASX/2,  gameConstantsModule.CANVASY/2+70);
  p.pop();
  p.pop();
}

function checkIfEnterPressedForGameStart(p){
  if(gameStart === false && p.keyIsDown(gameConstantsModule.KEYCODEENTER)){
    gameStart = true;
  }
}

function getGameStart(){
  return gameStart;
}

function setGameStart(value){
  gameStart = value;
}
