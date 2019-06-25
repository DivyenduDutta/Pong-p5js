const canvasX = 700;
const canvasY = 700;
const playerStartX = canvasX - 100;
const playerStartY = canvasY/2;
const topScreenLimit = 0;
const bottomScreenLimit = canvasY;
const paddleWidth = 50;
const paddleHeight = 100;
const paddleMoveSpeed = 10;
const keyCodeW = 87;
const keyCodeS = 83;
let playerPaddleMove;
let playerPaddleX = 0;
let playerPaddleY = 0;
let comPaddleMove;
let comPaddleX = 0;
let comPaddleY = 0;
let ballMove;
let ballPaddleX = 0;
let ballPaddleY = 0;
const ballOriginalX = canvasX/2;
const ballOriginalY = canvasY/2;
const ballRadius = 20;
const ballXSpeed = 1;
const ballYSpeed = 5;
//change ballYDirection and ballXDirection to change ball movement direction
let ballYDirection = -1;
let ballXDirection = 1;
let ballHitBottom = false;
let ballHitTop = false;
let ballHitPlayerPaddle = false;
let gameOver = false;

let pauseBall = false;
let ballCurrentPositionX = 0;
let ballCurrentPositionY = 0;

function setup(){
  createCanvas(canvasX,canvasY);
  playerPaddleMove = createVector(playerPaddleX,playerPaddleY);
  comPaddleMove = createVector(comPaddleX,comPaddleY);
  ballMove = createVector(ballPaddleX,ballPaddleY);
  ballTempMove = createVector(ballPaddleX,ballPaddleY);  //used to pause unpause ball
}

function draw(){
  background("black");
  gameOver = hasBallHitTopOfPaddle() || hasBallHitBottomOfPaddle();
  if(gameOver){

    textAlign(CENTER);
    textSize(50);
    strokeWeight(0.5);
    text('GAME OVER',  canvasX/2,  canvasY/2);
  }
  else{
    push();
    fill("white");
    pauseUnPauseTheBall();
    moveBall();
    translate(ballMove);
    circle(ballOriginalX, ballOriginalY, ballRadius); //the ball
    pop();

    fill("red");
    rect(50,0,paddleWidth,paddleHeight); //AI paddle

    push();
    movePaddle();
    fill("blue");
    translate(playerPaddleMove);
    rect(playerStartX,playerStartY,paddleWidth,paddleHeight); //player paddle
    pop();
  }
}

function movePaddle(){
  //console.log("here we are");
  if(keyIsDown(keyCodeW)){
    playerPaddleY -= paddleMoveSpeed;
  }else if(keyIsDown(keyCodeS)){
    playerPaddleY += paddleMoveSpeed;
  }
  if (playerStartY + playerPaddleY <= topScreenLimit) {
    //have hit the top of screen (and going above)
    playerPaddleY = -playerStartY;
  }
  if (playerStartY + playerPaddleY + paddleHeight >= bottomScreenLimit) {
    //have hit the bottom of screen (and going below)
    playerPaddleY = canvasY - playerStartY - paddleHeight;
  }

  playerPaddleMove.set(playerPaddleX,playerPaddleY);
  //console.log(playerPaddleMove);
}

function moveBall(){
  if(pauseBall === false){
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

    if(hasBallHitPlayerPaddle()){
      ballXDirection = -1;
      ballHitPlayerPaddle = false;
    }
    ballMove.set(ballPaddleX, ballPaddleY);
    //console.log(ballMove);
  }
}

function hasBallHitBottom(){
  let threshold = ballRadius * 0.5; //for more realistic ball bounce
  if(ballOriginalY + ballPaddleY + (ballRadius - threshold) >= bottomScreenLimit){
    //console.log("Ball hit bottom");
    ballHitBottom = true;
  }
  return ballHitBottom;
}

function hasBallHitTop(){
  let threshold = ballRadius * 0.5; //for more realistic ball bounce
  if(ballOriginalY + ballPaddleY - (ballRadius - threshold) <= topScreenLimit){
    //console.log("Ball hit top");
    ballHitTop = true;
  }
  return ballHitTop;
}

function hasBallHitPlayerPaddle(){
  let threshold = ballRadius * 0.5; //for more realistic ball bounce
  if(hasBallHitPlayerX() && hasBallHitPlayerY()){
    console.log("Ball hit player paddle");
    ballHitPlayerPaddle = true;
  }
  return ballHitPlayerPaddle;
}

function hasBallHitPlayerX(){
    let threshold = ballRadius * 0.5; //for more realistic ball bounce
    if(ballOriginalX + ballPaddleX + (ballRadius - threshold) >= playerStartX){
      return true;
    }
    return false;
}

function hasBallHitPlayerY(){
    if(ballOriginalY + ballPaddleY >= playerStartY + playerPaddleY &&
        ballOriginalY + ballPaddleY <= playerStartY + playerPaddleY + paddleHeight){
      return true;
    }

    return false;
}

function hasBallHitTopOfPaddle(){
  //honestly this checks if ball hit top of paddle and if it has gone past it above
  let threshold = ballRadius * 0.5; //for more realistic ball bounce
  if(ballOriginalX + ballPaddleX >= playerStartX &&
    ballOriginalY + ballPaddleY + (ballRadius - threshold) <= playerStartY + playerPaddleY){
    console.log("ball hit top of paddle");
    return true;
  }
}

function hasBallHitBottomOfPaddle(){
  //Similarly this checks if ball hit bottom of paddle and if it has gone past it below
  let threshold = ballRadius * 0.5; //for more realistic ball bounce
  if(ballOriginalX + ballPaddleX >= playerStartX &&
    ballOriginalY + ballPaddleY + (ballRadius - threshold) >= playerStartY + playerPaddleY + paddleHeight){
    console.log("ball hit bottom of paddle");
    return true;
  }
}

function pauseUnPauseTheBall(){
  if(pauseBall === false && key === 'p'){ //case sensitive
    //console.log("Pause ball here");
    pauseBall = true;
    ballTempMove = ballMove;
  }

  if(pauseBall === true && key === 'o'){//case sensitive
      //console.log("Unpause ball here");
    pauseBall = false;
    ballMove = ballTempMove;
  }
}
