/*
* Computer paddle related code is here
*/
let ballModule = require('./ball.js');
let gameConstantsModule = require('./gameConstants.js');
let gameOverModule = require('./gameOver.js');

//these constants repeat in gameConstants.js as well - thats bad - DRY violated but I accept the risk
const COMSTARTX = 50;
const COMSTARTY = 0;
const COMPADDLESPEED = 10;

let comPaddleMove;
let tempComPaddleMove;

module.exports = {
  COMSTARTX, COMSTARTY, COMPADDLESPEED,
  initComPaddle, moveComPaddle, hasBallHitTopOfComPaddle,
  hasBallHitBottomOfComPaddle, getComPaddleMove, setComPaddleMove,
  getTempComPaddleMove, setTempComPaddleMove
}

function initComPaddle(p){
  comPaddleMove = p.createVector(0,0);
  tempComPaddleMove = p.createVector(0,0); //used to pause unpause com paddle
}

function moveComPaddle(){
  //AI movement logic here
  if(gameOverModule.getGameOverFreeze() === false && gameOverModule.getPauseAll() === false){
    let ballCurrentPositionX = ballModule.BALLORIGINALX + ballModule.getBallMove().x;
    let ballCurrentPositionY = ballModule.BALLORIGINALY + ballModule.getBallMove().y;

    //center alignment logic
    let comPaddleX = comPaddleMove.x;
    let comPaddleY = comPaddleMove.y;
    let comCurrentPositionY = COMSTARTY + comPaddleY;
    //realistic AI movement - paddle moves only when needed - once paddle hits ball it stops
    if(ballCurrentPositionX < gameConstantsModule.CANVASX/2 && ballModule.getBallXDirection() === -1){
      if(ballCurrentPositionY > comCurrentPositionY &&
          ballCurrentPositionY > comCurrentPositionY + gameConstantsModule.PADDLEHEIGHT){ //ball is below paddle and not in paddle range
          comPaddleY += COMPADDLESPEED;
      }
      else if(ballCurrentPositionY < comCurrentPositionY){//ball is above paddle
        comPaddleY -= COMPADDLESPEED;
      }
    }
    comPaddleMove.set(comPaddleX, comPaddleY);
  }
}

function hasBallHitTopOfComPaddle(){
  let ballPaddleX = ballModule.getBallMove().x;
  let ballPaddleY = ballModule.getBallMove().y;
  let comPaddleY = comPaddleMove.y;
  //honestly this checks if ball hit top of paddle and if it has gone past it above
  let threshold = ballModule.BALLRADIUS * 0.5; //for more realistic ball bounce
  if(ballModule.BALLORIGINALX + ballPaddleX <= (COMSTARTX + gameConstantsModule.PADDLEWIDTH) &&
    ballModule.BALLORIGINALY + ballPaddleY + (ballModule.BALLRADIUS - threshold) <= COMSTARTY + comPaddleY){
    console.log("ball hit top of com paddle");
    return true;
  }
}

function hasBallHitBottomOfComPaddle(){
  let ballPaddleX = ballModule.getBallMove().x;
  let ballPaddleY = ballModule.getBallMove().y;
  let comPaddleY = comPaddleMove.y;
  //Similarly this checks if ball hit bottom of paddle and if it has gone past it below
  let threshold = ballModule.BALLRADIUS * 0.5; //for more realistic ball bounce
  if(ballModule.BALLORIGINALX + ballPaddleX <= (COMSTARTX + gameConstantsModule.PADDLEWIDTH) &&
    ballModule.BALLORIGINALY + ballPaddleY + (ballModule.BALLRADIUS - threshold) >= COMSTARTY + comPaddleY + gameConstantsModule.PADDLEHEIGHT){
    console.log("ball hit bottom of com paddle");
    return true;
  }
}

function getComPaddleMove(){
  return comPaddleMove;
}

function setComPaddleMove(value){
  comPaddleMove = value;
}

function getTempComPaddleMove(){
  return tempComPaddleMove;
}

function setTempComPaddleMove(value){
  tempComPaddleMove = value;
}
