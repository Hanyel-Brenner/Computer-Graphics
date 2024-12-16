function keyboardPressDown(event){
  keysPressed[event.keyCode] = true;
}

function keyboardPressUp(event){
  keysPressed[event.keyCode] = false
}

function updateCamera(){
  if(keysPressed[87] == true) y0 += 0.05; //w
  if(keysPressed[83] == true) y0 -= 0.05; //s
  if(keysPressed[68] == true) x0 += 0.05; //a
  if(keysPressed[65] == true) x0 -= 0.05; //d
  if(keysPressed[38] == true) z0 += 0.05; //ArrowUp
  if(keysPressed[40] == true) z0 -= 0.05; //ArrowDown
}

