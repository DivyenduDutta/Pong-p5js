/*
* Collision detection logic is here
*/
let gameConstantsModule = require('./gameConstants.js');

module.exports = {
  hasBallHitPlayerPaddle, hasBallHitComPaddle
}

function shouldBallHitPlayerXCheck(ballXDirection){
  return ballXDirection === -1?false:true;
}

function hasBallHitPlayerPaddle(ballMove, ballXSpeed, ballXDirection, ballHitPlayerPaddle, playerPaddleY){
  if(shouldBallHitPlayerXCheck(ballXDirection) &&
      hasBallHitPlayerX(ballMove, ballXDirection, ballXSpeed) && hasBallHitPlayerY(ballMove, playerPaddleY)){
    console.log("Ball hit player paddle");
    //takeScreencap();
    ballHitPlayerPaddle = true;
  }
  return ballHitPlayerPaddle;
}

function hasBallHitPlayerX(ballMove, ballXDirection, ballXSpeed){
    let ballPaddleX = ballMove.x;
    let isHit = false;
    let threshold = gameConstantsModule.BALLRADIUS * 0.2; //for more realistic ball bounce
    let ballCurrentPositionX = gameConstantsModule.BALLORIGINALX + ballPaddleX + (gameConstantsModule.BALLRADIUS - threshold);
    //console.log(ballXSpeed);
    let ballDisplacementNextFrameX = ballXDirection * ballXSpeed;
    let ballPositionNextFrameX = ballCurrentPositionX + ballDisplacementNextFrameX;
    if(ballCurrentPositionX < gameConstantsModule.PLAYERSTARTX &&
       (gameConstantsModule.PLAYERSTARTX - ballCurrentPositionX) < (ballPositionNextFrameX - gameConstantsModule.PLAYERSTARTX)){
      isHit = true;
    }else if(ballCurrentPositionX >= gameConstantsModule.PLAYERSTARTX){
      isHit = true;
    }
    return isHit;
}

function hasBallHitPlayerY(ballMove, playerPaddleY){
  let ballPaddleY = ballMove.y;
    if(gameConstantsModule.BALLORIGINALY + ballPaddleY >= gameConstantsModule.PLAYERSTARTY + playerPaddleY &&
        gameConstantsModule.BALLORIGINALY + ballPaddleY <= gameConstantsModule.PLAYERSTARTY + playerPaddleY + gameConstantsModule.PADDLEHEIGHT){
      return true;
    }

    return false;
}

function shouldBallHitComXCheck(ballXDirection){
  return ballXDirection === 1?false:true;
}

function hasBallHitComPaddle(ballMove, ballHitComPaddle, ballXDirection, comPaddleMove){
  //console.log(hasBallHitComX(ballMove));
  if(shouldBallHitComXCheck(ballXDirection) && hasBallHitComX(ballMove) && hasBallHitComY(ballMove, comPaddleMove)){
    console.log("Ball hit com paddle");
    ballHitComPaddle = true;
  }
  return ballHitComPaddle;
}

function hasBallHitComX(ballMove){
    let ballPaddleX = ballMove.x;
    let threshold = gameConstantsModule.BALLRADIUS * 0.2; //for more realistic ball bounce
    if(gameConstantsModule.BALLORIGINALX + ballPaddleX - (gameConstantsModule.BALLRADIUS - threshold) <= (gameConstantsModule.COMSTARTX + gameConstantsModule.PADDLEWIDTH)){
      return true;
    }
    return false;
}

function hasBallHitComY(ballMove, comPaddleMove){
  let ballPaddleY = ballMove.y;
  let comPaddleY = comPaddleMove.y;
    if(gameConstantsModule.BALLORIGINALY + ballPaddleY >= gameConstantsModule.COMSTARTY + comPaddleY &&
        gameConstantsModule.BALLORIGINALY + ballPaddleY <= gameConstantsModule.COMSTARTY + comPaddleY + gameConstantsModule.PADDLEHEIGHT){
      return true;
    }

    return false;
}
