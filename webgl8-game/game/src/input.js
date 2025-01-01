var x0, y0, z0;
var xRef, yRef, zRef;

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
    
    mouseEventCounter++;
  }
}

function updateCamera(){

  var direction = unitVector([xRef - x0, 0 , zRef - z0]);
  var theta = vec3.angle(direction, [1.0, 0.0, 0.0]);
  var rightDirection = perpendicularVectorClockwise([direction[0], direction[2]]);
  var omega = vec3.angle([rightDirection[0], 0, rightDirection[1]], [1.0, 0.0, 0.0]);
  //console.log(radToDeg(omega));
  //console.log(rightDirection);
  var dxFront, dzFront;
  var dxSide, dzSide;

  //console.log("theta : "+radToDeg(theta));
  //console.log("omega : "+radToDeg(omega));

  if( z0 > zRef){
    dxFront = Math.cos(theta);
    dzFront = -(Math.sin(theta));
  }else{
    dxFront = Math.cos(theta);
    dzFront = (Math.sin(theta));
  }

  if(rightDirection[1] < 0){
    dxSide = Math.cos(omega);
    dzSide = -(Math.sin(omega));
  }else{
    dxSide = Math.cos(omega);
    dzSide = (Math.sin(omega));
  }

  if(keysPressed[87] == true) {
    z0 += dzFront * 0.05;
    zRef += dzFront * 0.05;
    x0 += dxFront * 0.05;
    xRef += dxFront * 0.05;
  } //w
  if(keysPressed[83] == true) {
    z0 -= dzFront * 0.05;
    zRef -= dzFront * 0.05;
    x0 -= dxFront * 0.05;
    xRef -= dxFront * 0.05;
  } //s
  if(keysPressed[68] == true) {
    z0 += dzSide * 0.05;
    zRef += dzSide * 0.05;
    x0 += dxSide * 0.05;
    xRef += dxSide * 0.05;
  }; //d
  if(keysPressed[65] == true) {
    z0 -= dzSide * 0.05;
    zRef -= dzSide * 0.05;
    x0 -= dxSide * 0.05;
    xRef -= dxSide * 0.05;
    }; //a

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

