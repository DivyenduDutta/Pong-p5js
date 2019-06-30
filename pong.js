/*
* Main entry to code flow is here
* Has the setup() and draw()
* Import other modules here
* Since Im using p5.js with browserify, Im usinf instance mode to make p5.js to play nicely with browserify
* Check https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace for more details
*/
let ballModule = require('./ball.js');
let gameConstantsModule = require('./gameConstants.js');
let timerFPSModule = require('./timerFPS.js');
let gameOverModule = require('./gameOver.js');
let comModule = require('./comPaddle.js');
let playerModule = require('./playerPaddle.js');
let welcomeModule = require('./welcomeScreen.js');

//Instance mode p5.js
const s = ( p ) => {

  p.setup = function() {
    p.createCanvas(gameConstantsModule.CANVASX,gameConstantsModule.CANVASY);
    playerModule.initPlayerPaddle(p);
    comModule.initComPaddle(p);
    ballModule.initBall(p);
    //timerFPSModule.initTimer();
  };

p.draw = function() {
    timerFPSModule.fpsCounter(p);
    welcomeModule.checkIfEnterPressedForGameStart(p);
    if(!welcomeModule.getGameStart()){
      welcomeModule.displayWelcomeScreen(p);
    }else {
      gameOverModule.setGameOverPlayer(playerModule.hasBallHitTopOfPaddle() || playerModule.hasBallHitBottomOfPaddle());
      gameOverModule.setGameOverCom(comModule.hasBallHitTopOfComPaddle() || comModule.hasBallHitBottomOfComPaddle());
      if(gameOverModule.getGameOverPlayer()){
        //console.log("game over");
        let gameOverPlayerText = 'GAME OVER - COM WINS YOU LOSE';
        gameOverModule.displayGameOverText(gameOverPlayerText, p);
      }
      if(gameOverModule.getGameOverCom()){
        //console.log("game over");
        let gameOverComText = 'GAME OVER - PLAYER WINS COM LOSES';
        gameOverModule.displayGameOverText(gameOverComText, p);
      }

        //draw the ball
        p.push();
        p.fill("white");
        moveValues = [ballModule.getBallMove(), ballModule.getTempBallMove(), playerModule.getPlayerPaddleMove(),
                        playerModule.getTempPlayerPaddleMove(), comModule.getComPaddleMove(), comModule.getTempComPaddleMove()];
        let updatedMoveValues = gameOverModule.globalPause(p, moveValues); //pause unpause only if game isnt over
        updateMoveValues(updatedMoveValues);
        ballModule.moveBall(playerModule.getPlayerPaddleMove(), comModule.getComPaddleMove(), p);
        p.translate(ballModule.getBallMove());
        p.circle(ballModule.BALLORIGINALX, ballModule.BALLORIGINALY, ballModule.BALLRADIUS); //the ball
        p.pop();

        //draw the center line
        p.push();
        p.stroke(200);
        p.line(gameConstantsModule.CANVASX/2, 0, gameConstantsModule.CANVASX/2, gameConstantsModule.CANVASY);
        p.pop();

        //draw the player paddle - right
        p.push();
        playerModule.movePaddle(p);
        p.fill("blue");
        p.translate(playerModule.getPlayerPaddleMove());
        p.rect(playerModule.PLAYERSTARTX,playerModule.PLAYERSTARTY,gameConstantsModule.PADDLEWIDTH,gameConstantsModule.PADDLEHEIGHT); //player paddle
        p.pop();

        //draw the com paddle - left
        p.push();
        p.fill("red");
        p.translate(comModule.getComPaddleMove());
        p.rect(comModule.COMSTARTX,comModule.COMSTARTY,gameConstantsModule.PADDLEWIDTH,gameConstantsModule.PADDLEHEIGHT); //AI paddle
        comModule.moveComPaddle();
        p.pop();
      }
  };
};

let myp5 = new p5(s);

function updateMoveValues(updatedMoveValues){
  ballModule.setBallMove(updatedMoveValues[0][0]);
  ballModule.setTempBallMove(updatedMoveValues[0][1]);
  playerModule.setPlayerPaddleMove(updatedMoveValues[1][0]);
  playerModule.setTempPlayerPaddleMove(updatedMoveValues[1][1]);
  comModule.setComPaddleMove(updatedMoveValues[2][0]);
  comModule.setTempComPaddleMove(updatedMoveValues[2][1]);
}

// function takeScreencap(){
//   html2canvas(document.body).then(function(canvas) {
//     // Export the canvas to its data URI representation
//     canvas.toBlob(function(blob) {
//         // Generate file download
//         window.saveAs(blob, "yourwebsite_screenshot.png");
//     });
// });
// }
