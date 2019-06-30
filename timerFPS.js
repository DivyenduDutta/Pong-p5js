/*
* Code to count and display FPS on top left is here
*/
let frames = 0;
let totalFrames = 0;
let startTime, endTime;

module.exports = {
  initTimer, fpsCounter
}

function initTimer(){
  startTime = new Date();
}

function displayFrame(p){
  p.background("black");
  p.textAlign(p.LEFT);
  p.textSize(15);
  p.fill(255, 255, 255);
  p.strokeWeight(0.5);
  p.text(totalFrames+" FPS",  5,  15);
}

function fpsCounter(p){
  endTime = new Date();
  if(Math.round((endTime - startTime)/1000) === 1){ //count a second
    totalFrames = frames;
    frames = 0;
    startTime = new Date();
  }else{
    frames += 1;
  }
  displayFrame(p);
}
