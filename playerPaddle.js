/*
* All player paddle related code goes here
*/
let gameConstantsModule = require('./gameConstants.js');
let ballModule = require('./ball.js');
let gameOverModule = require('./gameOver.js');

//these constants repeat in gameConstants.js as well - thats bad - DRY violated but I accept the risk
const PADDLEMOVESPEED = 10;
const PLAYERSTARTX = gameConstantsModule.CANVASX - 100;
const PLAYERSTARTY = gameConstantsModule.CANVASY/2;

let playerPaddleMove;
let tempPlayerPaddleMove;
let playerPaddleX = 0;
let playerPaddleY = 0;

module.exports = {
  PADDLEMOVESPEED, PLAYERSTARTX, PLAYERSTARTY,
  movePaddle, initPlayerPaddle, hasBallHitTopOfPaddle,
  hasBallHitBottomOfPaddle, getPlayerPaddleMove, getTempPlayerPaddleMove,
  setPlayerPaddleMove, setTempPlayerPaddleMove
}

function initPlayerPaddle(p){
  playerPaddleMove = p.createVector(playerPaddleX,playerPaddleY);
  tempPlayerPaddleMove = p.createVector(playerPaddleX,playerPaddleY);  //used to pause unpause player
}

function movePaddle(p){
  //console.log("here we are");
  if(gameOverModule.getGameOverFreeze() === false && gameOverModule.getPauseAll() === false){
    if(p.keyIsDown(gameConstantsModule.KEYCODEW)){
      playerPaddleY -= PADDLEMOVESPEED;
    }else if(p.keyIsDown(gameConstantsModule.KEYCODES)){
      playerPaddleY += PADDLEMOVESPEED;
    }
    if (PLAYERSTARTY + playerPaddleY <= gameConstantsModule.TOPSCREENLIMIT) {
      //have hit the top of screen (and going above)
      playerPaddleY = -PLAYERSTARTY;
    }
    if (PLAYERSTARTY + playerPaddleY + gameConstantsModule.PADDLEHEIGHT >= gameConstantsModule.BOTTOMSCREENLIMIT) {
      //have hit the bottom of screen (and going below)
      playerPaddleY = gameConstantsModule.CANVASY - PLAYERSTARTY - gameConstantsModule.PADDLEHEIGHT;
    }

    playerPaddleMove.set(playerPaddleX,playerPaddleY);
    //console.log(playerPaddleMove);
  }
}

function hasBallHitTopOfPaddle(){
  let ballPaddleX = ballModule.getBallMove().x;
  let ballPaddleY = ballModule.getBallMove().y;
  //honestly this checks if ball hit top of paddle and if it has gone past it above
  let threshold = ballModule.BALLRADIUS * 0.5; //for more realistic ball bounce
  if(ballModule.BALLORIGINALX + ballPaddleX >= PLAYERSTARTX &&
    ballModule.BALLORIGINALY + ballPaddleY + (ballModule.BALLRADIUS - threshold) <= PLAYERSTARTY + playerPaddleY){
    console.log("ball hit top of paddle");
    return true;
  }
}

function hasBallHitBottomOfPaddle(){
  let ballPaddleX = ballModule.getBallMove().x;
  let ballPaddleY = ballModule.getBallMove().y;
  //Similarly this checks if ball hit bottom of paddle and if it has gone past it below
  let threshold = ballModule.BALLRADIUS * 0.5; //for more realistic ball bounce
  if(ballModule.BALLORIGINALX + ballPaddleX >= PLAYERSTARTX &&
    ballModule.BALLORIGINALY + ballPaddleY + (ballModule.BALLRADIUS - threshold) >= PLAYERSTARTY + playerPaddleY + gameConstantsModule.PADDLEHEIGHT){
    console.log("ball hit bottom of paddle");
    return true;
  }
}

function getPlayerPaddleMove(){
  return playerPaddleMove;
}

function setPlayerPaddleMove(value){
  playerPaddleMove = value;
}

function getTempPlayerPaddleMove(){
  return tempPlayerPaddleMove;
}

function setTempPlayerPaddleMove(value){
  tempPlayerPaddleMove = value;
}
