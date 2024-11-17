function keyboardPressDown(event){
  keysPressed[event.keyCode] = true;
}

function keyboardPressUp(event){
  keysPressed[event.keyCode] = false
}

function updatePlayerPosition(){
  if(keysPressed[87] == true) dyPlayer1 += yPlayerSpeed; //w
  if(keysPressed[83] == true) dyPlayer1 -= yPlayerSpeed; //s
  if(keysPressed[38] == true) dyPlayer2 += yPlayerSpeed; //ArrowUp
  if(keysPressed[40] == true) dyPlayer2 -= yPlayerSpeed; //ArrowDown
}
