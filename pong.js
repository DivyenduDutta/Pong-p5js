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
const comStartX = 50;
const comStartY = 0;
const comPaddleSpeed = 10;
let ballMove;
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

function setup(){
  createCanvas(canvasX,canvasY);
  playerPaddleMove = createVector(playerPaddleX,playerPaddleY);
  comPaddleMove = createVector(0,0);
  ballMove = createVector(0,0);
  ballTempMove = createVector(0,0);  //used to pause unpause ball
}

function draw(){
  background("black");
  gameOver = hasBallHitTopOfPaddle() || hasBallHitBottomOfPaddle();
  if(gameOver){
    //console.log("game over");
    textAlign(CENTER);
    textSize(50);
    fill(0, 102, 153);
    strokeWeight(0.5);
    text('GAME OVER',  canvasX/2,  canvasY/2);
  }
  else{
    push();
    fill("white");
    pauseUnPauseTheBall(); //pause unpause only if game isnt over
    moveBall();
    translate(ballMove);
    circle(ballOriginalX, ballOriginalY, ballRadius); //the ball
    pop();

    push();
    movePaddle();
    fill("blue");
    translate(playerPaddleMove);
    rect(playerStartX,playerStartY,paddleWidth,paddleHeight); //player paddle
    pop();

    push();
    fill("red");
    translate(comPaddleMove);
    rect(comStartX,comStartY,paddleWidth,paddleHeight); //AI paddle
    moveComPaddle();
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
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
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
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  let threshold = ballRadius * 0.5; //for more realistic ball bounce
  if(ballOriginalY + ballPaddleY + (ballRadius - threshold) >= bottomScreenLimit){
    //console.log("Ball hit bottom");
    ballHitBottom = true;
  }
  return ballHitBottom;
}

function hasBallHitTop(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
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
  let ballPaddleX = ballMove.x;
    let threshold = ballRadius * 0.5; //for more realistic ball bounce
    if(ballOriginalX + ballPaddleX + (ballRadius - threshold) >= playerStartX){
      return true;
    }
    return false;
}

function hasBallHitPlayerY(){
  let ballPaddleY = ballMove.y;
    if(ballOriginalY + ballPaddleY >= playerStartY + playerPaddleY &&
        ballOriginalY + ballPaddleY <= playerStartY + playerPaddleY + paddleHeight){
      return true;
    }

    return false;
}

function hasBallHitTopOfPaddle(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  //honestly this checks if ball hit top of paddle and if it has gone past it above
  let threshold = ballRadius * 0.5; //for more realistic ball bounce
  if(ballOriginalX + ballPaddleX >= playerStartX &&
    ballOriginalY + ballPaddleY + (ballRadius - threshold) <= playerStartY + playerPaddleY){
    console.log("ball hit top of paddle");
    return true;
  }
}

function hasBallHitBottomOfPaddle(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
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

function moveComPaddle(){
  //AI movement logic here
  let ballCurrentPositionX = ballOriginalX + ballMove.x;
  let ballCurrentPositionY = ballOriginalY + ballMove.y;

  //center alignment logic
  let comPaddleX = comPaddleMove.x;
  let comPaddleY = comPaddleMove.y;
  let comCurrentPositionY = comStartY + comPaddleY;
  if(ballCurrentPositionY > comCurrentPositionY &&
      ballCurrentPositionY > comCurrentPositionY + paddleHeight){ //ball is below paddle and not in paddle range
      comPaddleY += comPaddleSpeed;
  }
  else if(ballCurrentPositionY < comCurrentPositionY){//ball is above paddle
    comPaddleY -= comPaddleSpeed;
  }
  comPaddleMove.set(comPaddleX, comPaddleY);
}
