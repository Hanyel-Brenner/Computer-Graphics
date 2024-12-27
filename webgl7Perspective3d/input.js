function keyboardPressDown(event){
  keysPressed[event.keyCode] = true;
}

function keyboardPressUp(event){
  keysPressed[event.keyCode] = false
}

function mouseTrack(event, canvas){
  let x = -1.0 + (2*(event.offsetX/canvas.width));
  let y = 1.0 - (2*(event.offsetY/canvas.height)); 

  if(!(x > 1 || x < -1 || y > 1 || y < -1)) {
    
    if(mouseEventCounter % 2 == 0){
      mousePos1 = [x, y];
    }
    else{
      mousePos2 = [x, y];
      mouseDirection = [mousePos2[0] - mousePos1[0], mousePos2[1] - mousePos1[1]];
    }

    //console.log("Mouse Event Counter :"+mouseEventCounter+"MouseDirection "+mouseDirection);
    
    mouseEventCounter++;
  }
}

function updateCamera(){

  var direction = unitVector([xRef - x0, 0 , zRef - z0]);
  var angleWithX = vec3.angle(direction, [1.0, 0.0, 0.0]);
  var dx = Math.cos(angleWithX);
  var dz = -(Math.sin(angleWithX));

  if(keysPressed[87] == true) {
    z0 += dz * 0.05;
    zRef += dz * 0.05;
    x0 += dx * 0.05;
    xRef += dx * 0.05;
  } //w
  if(keysPressed[83] == true) {
    z0 += 0.05;
    zRef += 0.05;
  } //s
  if(keysPressed[68] == true) {
    x0 += 0.05;
    xRef += 0.05;
  }; //a
  if(keysPressed[65] == true) {
    x0 -= 0.05;
    xRef -= 0.05;
  }; //d

  if(keysPressed[38] == true) {
    var old_pRef = [xRef, yRef, zRef];
    var new_pRef = [0.0, 0.0, 0.0];
    var matrix = mat4.create();
    mat4.translate(matrix, matrix ,[x0, y0, z0]);
    mat4.rotateX(matrix, matrix, degToRad(1.5));
    mat4.translate(matrix, matrix, [-x0, -y0, -z0]);
    vec3.transformMat4(new_pRef, old_pRef, matrix);

    xRef = new_pRef[0];
    yRef = new_pRef[1];
    zRef = new_pRef[2];
  } //ArrowUp

  if(keysPressed[40] == true) {
    var old_pRef = [xRef, yRef, zRef];
    var new_pRef = [0.0, 0.0, 0.0];
    var matrix = mat4.create();
    mat4.translate(matrix, matrix ,[x0, y0, z0]);
    mat4.rotateX(matrix, matrix, degToRad(-1.5));
    mat4.translate(matrix, matrix, [-x0, -y0, -z0]);
    vec3.transformMat4(new_pRef, old_pRef, matrix);

    xRef = new_pRef[0];
    yRef = new_pRef[1];
    zRef = new_pRef[2];
  } //ArrowDown

  if(keysPressed[39] == true){

    var old_pRef = [xRef, yRef, zRef];
    var new_pRef = [0.0, 0.0, 0.0];
    var matrix = mat4.create();
    mat4.translate(matrix, matrix ,[x0, y0, z0]);
    mat4.rotateY(matrix, matrix, degToRad(-1.5));
    mat4.translate(matrix, matrix, [-x0, -y0, -z0]);
    vec3.transformMat4(new_pRef, old_pRef, matrix);

    xRef = new_pRef[0];
    yRef = new_pRef[1];
    zRef = new_pRef[2];

  }//arrowRight

  if(keysPressed[37] == true){

    var old_pRef = [xRef, yRef, zRef];
    var new_pRef = [0.0, 0.0, 0.0];
    var matrix = mat4.create();
    mat4.translate(matrix, matrix ,[x0, y0, z0]);
    mat4.rotateY(matrix, matrix, degToRad( 1.5 ));
    mat4.translate(matrix, matrix, [-x0, -y0, -z0]);
    vec3.transformMat4(new_pRef, old_pRef, matrix);

    xRef = new_pRef[0];
    yRef = new_pRef[1];
    zRef = new_pRef[2];

  }//arrowLeft

}

