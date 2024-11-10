function mouseClick(gl,canvas, positionBuffer, event){
  clickCounter++;
  //let x = -1.0 + (2*(event.offsetX/canvas.width));
  //let y = 1.0 - (2*(event.offsetY/canvas.height));  
  let x = event.offsetX;
  let y = event.offsetY;
  
  let point = [x,y];
  linePoints.push(point[0]);
  linePoints.push(point[1]);
  
  if(clickCounter == 2){
    bresenham(gl,canvas,positionBuffer,linePoints[0], linePoints[1], linePoints[2] , linePoints[3]);
    linePoints = [];
    clickCounter=0;
  }
}

function raster(x0,y0, xend, yend){
  if(xend-x0 == 0) throw new Error('division by zero not allowed');
  
  let points = [];
  let m = (yend-y0)/(xend-x0);
  //let b = y0 - (m*x0);
  //now we have all terms in the  y = mx + b equation;
  
  //if(m < 1){
    for(let x = x0; x <= xend; x++){
      points.push(x);
      points.push(Math.round(m*x + y0));
      console.log(points);
    }  
  //}
}

function bresenham(gl, canvas, positionBuffer, x0 , y0 , xend, yend){
  let points = [];
  
  let dx = xend - x0;
  let dy = yend - y0;

  if(dx == 0) throw new Error('division by zero not allowed');

  dir = 0;

  if(dy < 0) dir = -1;
  else dir = dir = 1;

  dy *= dir;
  
  let y = y0;
  let p = 2*dy - dx;
  
  for(let i = 0; i <= dx + 1 ; i++){
    points.push(-1.0 + 2*((x0 + i)/canvas.width));
    points.push(1 - 2*(y/canvas.height));

    if(p >= 0){
      y += dir;
      p = p - 2*dx;
    }
    else p = p + 2*dy;
    
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.drawArrays(gl.POINTS, 0, (points.length)/2);
}

function keyboardPress(gl, colorUniformLoc, event){
  switch(event.key){
    case "0":
      colorVector = [0.0,0.0,0.0];
      break;
    case "1":
      colorVector = [1.0,0.0,0.0];
      break;
    case "2":
      colorVector = [0.0,1.0,0.0];
      break;
    case "3":
      colorVector = [0.0,0.0,1.0];
      break;
    case "4":
      colorVector = [1.0,1.0,0.0];
      break;
    case "5":
      colorVector = [0.0,1.0,1.0];
      break;
    case "6":
      colorVector = [1.0,0.0,1.0];
      break;
    case "7":
      colorVector = [1.0,0.5,0.5];
      break;
    case "8":
      colorVector = [0.5,1.0,0.5];
      break;
    case "9":
      colorVector = [0.5,0.5,1.0];
      break;
  }
  gl.uniform3fv(colorUniformLoc, colorVector);
}