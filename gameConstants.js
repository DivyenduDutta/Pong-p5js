/*
* All global game constants go here
* Make sure to export the constants as well
*/
const CANVASX = 700;
const CANVASY = 700;
const TOPSCREENLIMIT = 0;
const BOTTOMSCREENLIMIT = CANVASY;
const KEYCODEW = 87;
const KEYCODES = 83;
const PADDLEWIDTH = 50;
const PADDLEHEIGHT = 100;

//ball gameConstants
const BALLORIGINALX = CANVASX/2;
const BALLORIGINALY = CANVASY/2;
const BALLRADIUS = 20;
const PLAYERSTARTX = CANVASX - 100;
const PLAYERSTARTY = CANVASY/2;
const COMSTARTX = 50;
const COMSTARTY = 0;
const COMPADDLESPEED = 10;

module.exports = {
  CANVASX, CANVASY, TOPSCREENLIMIT, BOTTOMSCREENLIMIT,
  KEYCODEW, KEYCODES, PADDLEWIDTH, PADDLEHEIGHT,
  BALLORIGINALX, BALLORIGINALY, BALLRADIUS, PLAYERSTARTX, PLAYERSTARTY,
  COMSTARTX, COMSTARTY, COMPADDLESPEED
}