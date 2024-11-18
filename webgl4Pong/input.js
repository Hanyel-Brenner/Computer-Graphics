function keyboardPressDown(event){
  keysPressed[event.keyCode] = true;
}

function keyboardPressUp(event){
  keysPressed[event.keyCode] = false
}

function updatePlayerDisplacement(){
  if(keysPressed[87] == true) dyPlayer1 += yPlayerSpeed; //w
  if(keysPressed[83] == true) dyPlayer1 -= yPlayerSpeed; //s
  if(keysPressed[38] == true) dyPlayer2 += yPlayerSpeed; //ArrowUp
  if(keysPressed[40] == true) dyPlayer2 -= yPlayerSpeed; //ArrowDown
}

function updatePlayerPosition(player, yDisplacement){
  let newPosition = [player[0], player[1] + yDisplacement, player[2], player[3]];
  return newPosition;
}

function updateBallDisplacement(){
  dxBall += xBallSpeed;
  dyBall += yBallSpeed;
}

function updateBallPosition(ball, xDisplacement, yDisplacement){
  let newPosition = [ball[0] + xDisplacement, ball[1] + yDisplacement, ball[2]];
  return newPosition;
}
