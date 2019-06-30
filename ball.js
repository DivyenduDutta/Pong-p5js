/*
* All ball related code goes here
*/
let gameConstantsModule = require('./gameConstants.js');
let gameOverModule = require('./gameOver.js');
let collisionModule = require('./collisionDetection.js');

//these constants repeat in gameConstants.js as well - thats bad - DRY violated but I accept the risk
const BALLORIGINALX = gameConstantsModule.CANVASX/2;
const BALLORIGINALY = gameConstantsModule.CANVASY/2;
const BALLRADIUS = 20;

let ballMove, ballTempMove;
let ballXSpeed = 1; //ball speed x and y is variable because it changes dynamically
let ballYSpeed = 5;
//change ballYDirection and ballXDirection to change ball movement direction
let ballYDirection = 1;
let ballXDirection = 1;
let ballHitBottom = false;
let ballHitTop = false;
let ballHitPlayerPaddle = false;
let ballHitComPaddle = false;

module.exports = {
  BALLORIGINALX, BALLORIGINALY, BALLRADIUS, initBall, moveBall,
  hasBallHitBottom, hasBallHitTop, getBallXDirection,
  getBallMove, getTempBallMove, setBallMove, setTempBallMove
}

function initBall(p){
  ballMove = p.createVector(0,0);
  ballTempMove = p.createVector(0,0);  //used to pause unpause ball
  ballXDirection = p.random([-1, 1]);
  ballYDirection = p.random([-1, 1]);
}

function getBallXDirection(){
  return ballXDirection;
}

function moveBall(playerPaddleMove, comPaddleMove){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  if(gameOverModule.getGameOverFreeze() === false && gameOverModule.getPauseAll() === false){//put this condition in a function check
    ballPaddleX += ballXDirection * ballXSpeed;
    ballPaddleY += ballYDirection * ballYSpeed;
    if(hasBallHitBottom()){
      ballYDirection = -1;
      ballHitBottom = false;
    }

    if(hasBallHitTop()){
      ballYDirection = 1;
      ballHitTop = false;
    }

    if(collisionModule.hasBallHitPlayerPaddle(ballMove, ballXSpeed, ballXDirection, ballHitPlayerPaddle, playerPaddleMove.y)){
      ballXSpeed += 0.2;
      ballYSpeed += 0.2;
      ballXDirection = -1;
      ballHitPlayerPaddle = false;
    }
    if(collisionModule.hasBallHitComPaddle(ballMove, ballHitComPaddle, ballXDirection, comPaddleMove)){
      ballXSpeed += 0.2;
      ballYSpeed += 0.2;
      ballXDirection = 1;
      ballHitComPaddle   = false;
    }
    //console.log(ballMove);
    ballMove.set(ballPaddleX, ballPaddleY);
    //console.log(ballMove);
  }
}

function hasBallHitBottom(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  let threshold = BALLRADIUS * 0.5; //for more realistic ball bounce
  if(BALLORIGINALY + ballPaddleY + (BALLRADIUS - threshold) >= gameConstantsModule.BOTTOMSCREENLIMIT){
    //console.log("Ball hit bottom");
    ballHitBottom = true;
  }
  return ballHitBottom;
}

function hasBallHitTop(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  let threshold = BALLRADIUS * 0.5; //for more realistic ball bounce
  if(BALLORIGINALY + ballPaddleY - (BALLRADIUS - threshold) <= gameConstantsModule.TOPSCREENLIMIT){
    //console.log("Ball hit top");
    ballHitTop = true;
  }
  return ballHitTop;
}

function getBallMove(){
  return ballMove;
}

function setBallMove(value){
  ballMove = value;
}

function getTempBallMove(){
  return ballTempMove;
}

function setTempBallMove(value){
  ballTempMove = value;
}
