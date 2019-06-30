/*
* Game over conditions and logic is here
*/
let gameConstantsModule = require('./gameConstants.js');

let gameOverPlayer = false;
let gameOverCom = false;
let pauseAll = false;
let gameOverFreeze = false;

module.exports = {
  getGameOverFreeze, setGameOverFreeze, getGameOverPlayer, setGameOverPlayer,
  getGameOverCom, setGameOverCom, getPauseAll, setPauseAll,
  pauseOnGameOver, globalPause, displayGameOverText
}

function getPauseAll(){
  return pauseAll;
}

function setPauseAll(value){
  pauseAll = value;
}

function getGameOverFreeze(){
  return gameOverFreeze;
}

function setGameOverFreeze(value){
  gameOverFreeze = value;
}

function pauseOnGameOver(){
  gameOverFreeze = true;
}

function globalPause(p, moveValues){
  if(p.key === 'p' && !getGameOverPlayer() && !getGameOverCom()){
    pauseAll = true;
  }
  if(p.key === 'o'){
    pauseAll = false;
  }
  if(pauseAll){
    displayPauseText(p);
  }
  let ballMoveValues = pauseUnPauseTheBall(moveValues[0], moveValues[1]);
  let playerPaddleMoveValues = pauseUnPauseThePlayerPaddle(moveValues[2], moveValues[3]);
  let comPaddleMoveValues = pauseUnPauseTheComPaddle(moveValues[4], moveValues[5]);
  return [ballMoveValues, playerPaddleMoveValues, comPaddleMoveValues]
}

function displayPauseText(p){
  p.push();
  p.textAlign(p.CENTER);
  p.textSize(15);
  p.fill(0, 0, 255);
  p.strokeWeight(0.5);
  p.text('Paused - Press o to unpause',  gameConstantsModule.CANVASX/2,  gameConstantsModule.CANVASY/2);
  p.pop();
}

function pauseUnPauseTheBall(ballMove, ballTempMove){
  if(pauseAll === false){ //case sensitive
    //console.log("Pause ball here");
    ballTempMove = ballMove;
  }
  if(pauseAll === true){//case sensitive
      //console.log("Unpause ball here");
    ballMove = ballTempMove;
  }
  return [ballMove, ballTempMove];
}

function pauseUnPauseThePlayerPaddle(playerPaddleMove, tempPlayerPaddleMove){
  if(pauseAll === false){ //case sensitive
    //console.log("Pause ball here");
    tempPlayerPaddleMove = playerPaddleMove;
  }
  if(pauseAll === true){//case sensitive
      //console.log("Unpause ball here");
    playerPaddleMove = tempPlayerPaddleMove;
  }
  return [playerPaddleMove, tempPlayerPaddleMove];
}

function pauseUnPauseTheComPaddle(comPaddleMove, tempComPaddleMove){
  if(pauseAll === false){ //case sensitive
    //console.log("Pause ball here");
    tempComPaddleMove = comPaddleMove;
  }
  if(pauseAll === true){//case sensitive
      //console.log("Unpause ball here");
    comPaddleMove = tempComPaddleMove;
  }
  return [comPaddleMove, tempComPaddleMove];
}

function displayGameOverText(text, p){
  p.textAlign(p.CENTER);
  p.textSize(25);
  p.fill(0, 102, 153);
  p.strokeWeight(0.5);
  p.text(text,  gameConstantsModule.CANVASX/2,  gameConstantsModule.CANVASY/2);
  pauseOnGameOver();
}

function getGameOverPlayer(){
  return gameOverPlayer;
}

function setGameOverPlayer(value){
  gameOverPlayer = value;
}

function getGameOverCom(){
  return gameOverCom;
}

function setGameOverCom(value){
  gameOverCom = value;
}
