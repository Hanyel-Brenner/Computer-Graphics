function keyboardPress(event){
  switch(event.key){
    case "1":
      input = inputs.START;
    break;
    case "0":
      input = inputs.EXIT;
    case "w":
      input = inputs.P1_UP;
    break;
    case "s":
      input = inputs.P1_DOWN;
    break;
    case "ArrowUp":
      input = inputs.P2_UP;
    break;
    case "ArrowDown":
      input = inputs.P2_DOWN;
    break;
  }
}