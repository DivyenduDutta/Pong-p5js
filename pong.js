const CANVASX = 700;
const CANVASY = 700;
const PLAYERSTARTX = CANVASX - 100;
const PLAYERSTARTY = CANVASY/2;
const TOPSCREENLIMIT = 0;
const BOTTOMSCREENLIMIT = CANVASY;
const PADDLEWIDTH = 50;
const PADDLEHEIGHT = 100;
const PADDLEMOVESPEED = 10;
const KEYCODEW = 87;
const KEYCODES = 83;
let playerPaddleMove;
let tempPlayerPaddleMove;
let playerPaddleX = 0;
let playerPaddleY = 0;
let comPaddleMove;
let tempComPaddleMove;
const COMSTARTX = 50;
const COMSTARTY = 0;
const COMPADDLESPEED = 1;
let ballMove;
const BALLORIGINALX = CANVASX/2;
const BALLORIGINALY = CANVASY/2;
const BALLRADIUS = 20;
const BALLXSPEED = 1;
const BALLYSPEED = 5;
//change ballYDirection and ballXDirection to change ball movement direction
let ballYDirection = -1;
let ballXDirection = 1;
let ballHitBottom = false;
let ballHitTop = false;
let ballHitPlayerPaddle = false;
let ballHitComPaddle = false;
let gameOver = false;

let pauseAll = false;

function setup(){
  createCanvas(CANVASX,CANVASY);
  playerPaddleMove = createVector(playerPaddleX,playerPaddleY);
  tempPlayerPaddleMove = createVector(playerPaddleX,playerPaddleY);  //used to pause unpause player
  comPaddleMove = createVector(0,0);
  tempComPaddleMove = createVector(0,0); //used to pause unpause com paddle
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
    text('GAME OVER',  CANVASX/2,  CANVASY/2);
  }
  else{
    push();
    fill("white");
    globalPause(); //pause unpause only if game isnt over
    moveBall();
    translate(ballMove);
    circle(BALLORIGINALX, BALLORIGINALY, BALLRADIUS); //the ball
    pop();

    push();
    movePaddle();
    fill("blue");
    translate(playerPaddleMove);
    rect(PLAYERSTARTX,PLAYERSTARTY,PADDLEWIDTH,PADDLEHEIGHT); //player paddle
    pop();

    push();
    fill("red");
    translate(comPaddleMove);
    rect(COMSTARTX,COMSTARTY,PADDLEWIDTH,PADDLEHEIGHT); //AI paddle
    moveComPaddle();
    pop();
  }
}

function movePaddle(){
  //console.log("here we are");
  if(pauseAll === false){
    if(keyIsDown(KEYCODEW)){
      playerPaddleY -= PADDLEMOVESPEED;
    }else if(keyIsDown(KEYCODES)){
      playerPaddleY += PADDLEMOVESPEED;
    }
    if (PLAYERSTARTY + playerPaddleY <= TOPSCREENLIMIT) {
      //have hit the top of screen (and going above)
      playerPaddleY = -PLAYERSTARTY;
    }
    if (PLAYERSTARTY + playerPaddleY + PADDLEHEIGHT >= BOTTOMSCREENLIMIT) {
      //have hit the bottom of screen (and going below)
      playerPaddleY = CANVASY - PLAYERSTARTY - PADDLEHEIGHT;
    }

    playerPaddleMove.set(playerPaddleX,playerPaddleY);
    //console.log(playerPaddleMove);
  }
}

function moveBall(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  if(pauseAll === false){
    ballPaddleX += ballXDirection * BALLXSPEED;
    ballPaddleY += ballYDirection * BALLYSPEED;
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
    if(hasBallHitComPaddle()){
      ballXDirection = 1;
      ballHitComPaddle   = false;
    }
    ballMove.set(ballPaddleX, ballPaddleY);
    //console.log(ballMove);
  }
}

function hasBallHitBottom(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  let threshold = BALLRADIUS * 0.5; //for more realistic ball bounce
  if(BALLORIGINALY + ballPaddleY + (BALLRADIUS - threshold) >= BOTTOMSCREENLIMIT){
    //console.log("Ball hit bottom");
    ballHitBottom = true;
  }
  return ballHitBottom;
}

function hasBallHitTop(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  let threshold = BALLRADIUS * 0.5; //for more realistic ball bounce
  if(BALLORIGINALY + ballPaddleY - (BALLRADIUS - threshold) <= TOPSCREENLIMIT){
    //console.log("Ball hit top");
    ballHitTop = true;
  }
  return ballHitTop;
}

function hasBallHitPlayerPaddle(){
  if(hasBallHitPlayerX() && hasBallHitPlayerY()){
    console.log("Ball hit player paddle");
    ballHitPlayerPaddle = true;
  }
  return ballHitPlayerPaddle;
}

function hasBallHitPlayerX(){
  let ballPaddleX = ballMove.x;
    let threshold = BALLRADIUS * 0.5; //for more realistic ball bounce
    if(BALLORIGINALX + ballPaddleX + (BALLRADIUS - threshold) >= PLAYERSTARTX){
      return true;
    }
    return false;
}

function hasBallHitPlayerY(){
  let ballPaddleY = ballMove.y;
    if(BALLORIGINALY + ballPaddleY >= PLAYERSTARTY + playerPaddleY &&
        BALLORIGINALY + ballPaddleY <= PLAYERSTARTY + playerPaddleY + PADDLEHEIGHT){
      return true;
    }

    return false;
}

function hasBallHitComPaddle(){
  if(hasBallHitComX() && hasBallHitComY()){
    console.log("Ball hit com paddle");
    ballHitComPaddle = true;
  }
  return ballHitComPaddle;
}

function hasBallHitComX(){
  let ballPaddleX = ballMove.x;
    let threshold = BALLRADIUS * 0.5; //for more realistic ball bounce
    if(BALLORIGINALX + ballPaddleX - (BALLRADIUS - threshold) <= (COMSTARTX + PADDLEWIDTH)){
      return true;
    }
    return false;
}

function hasBallHitComY(){
  let ballPaddleY = ballMove.y;
  let comPaddleY = comPaddleMove.y;
    if(BALLORIGINALY + ballPaddleY >= COMSTARTY + comPaddleY &&
        BALLORIGINALY + ballPaddleY <= COMSTARTY + comPaddleY + PADDLEHEIGHT){
      return true;
    }

    return false;
}

function hasBallHitTopOfPaddle(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  //honestly this checks if ball hit top of paddle and if it has gone past it above
  let threshold = BALLRADIUS * 0.5; //for more realistic ball bounce
  if(BALLORIGINALX + ballPaddleX >= PLAYERSTARTX &&
    BALLORIGINALY + ballPaddleY + (BALLRADIUS - threshold) <= PLAYERSTARTY + playerPaddleY){
    console.log("ball hit top of paddle");
    return true;
  }
}

function hasBallHitBottomOfPaddle(){
  let ballPaddleX = ballMove.x;
  let ballPaddleY = ballMove.y;
  //Similarly this checks if ball hit bottom of paddle and if it has gone past it below
  let threshold = BALLRADIUS * 0.5; //for more realistic ball bounce
  if(BALLORIGINALX + ballPaddleX >= PLAYERSTARTX &&
    BALLORIGINALY + ballPaddleY + (BALLRADIUS - threshold) >= PLAYERSTARTY + playerPaddleY + PADDLEHEIGHT){
    console.log("ball hit bottom of paddle");
    return true;
  }
}

function globalPause(){
  if(key === 'p'){
    pauseAll = true;
  }
  if(key === 'o'){
    pauseAll = false;
  }
  pauseUnPauseTheBall();
  pauseUnPauseThePlayerPaddle();
  pauseUnPauseTheComPaddle();
}

function pauseUnPauseTheBall(){
  if(pauseAll === false){ //case sensitive
    //console.log("Pause ball here");
    ballTempMove = ballMove;
  }
  if(pauseAll === true){//case sensitive
      //console.log("Unpause ball here");
    ballMove = ballTempMove;
  }
}

function pauseUnPauseThePlayerPaddle(){
  if(pauseAll === false){ //case sensitive
    //console.log("Pause ball here");
    tempPlayerPaddleMove = playerPaddleMove;
  }
  if(pauseAll === true){//case sensitive
      //console.log("Unpause ball here");
    playerPaddleMove = tempPlayerPaddleMove;
  }
}

function pauseUnPauseTheComPaddle(){
  if(pauseAll === false){ //case sensitive
    //console.log("Pause ball here");
    tempComPaddleMove = comPaddleMove;
  }
  if(pauseAll === true){//case sensitive
      //console.log("Unpause ball here");
    comPaddleMove = tempComPaddleMove;
  }
}

function moveComPaddle(){
  //AI movement logic here
  if(pauseAll === false){
    let ballCurrentPositionX = BALLORIGINALX + ballMove.x;
    let ballCurrentPositionY = BALLORIGINALY + ballMove.y;

    //center alignment logic
    let comPaddleX = comPaddleMove.x;
    let comPaddleY = comPaddleMove.y;
    let comCurrentPositionY = COMSTARTY + comPaddleY;
    //realistic AI movement - paddle moves only when needed - once paddle hits ball it stops
    if(ballCurrentPositionX < CANVASX/2 && ballXDirection === -1){
      if(ballCurrentPositionY > comCurrentPositionY &&
          ballCurrentPositionY > comCurrentPositionY + PADDLEHEIGHT){ //ball is below paddle and not in paddle range
          comPaddleY += COMPADDLESPEED;
      }
      else if(ballCurrentPositionY < comCurrentPositionY){//ball is above paddle
        comPaddleY -= COMPADDLESPEED;
      }
    }
    comPaddleMove.set(comPaddleX, comPaddleY);
  }
}
