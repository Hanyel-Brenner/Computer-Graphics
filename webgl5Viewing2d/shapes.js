
/* 
*generates the vertex array for a circle constructed using the number of points (or triangles generated) as specified in the numberOfPoints
*not optimized, since it has many duplicated vertex;
*data is put in dynamic array so must be converted to a typed float array outside of function
*/
function setCircleVertices(gl,c_x, c_y, radius, numberOfPoints){
  var angle = (2 * Math.PI)/numberOfPoints; 
  var vertices = [];
  
  for(let i=0; i<numberOfPoints; i++){
    var x = radius * Math.cos(angle*i) + c_x;
    var y = radius * Math.sin(angle*i) + c_y;
    var x2 = radius * Math.cos(angle*(i+1)) + c_x;
    var y2 = radius * Math.sin(angle*(i+1)) + c_y;
    
    vertices.push(x);
    vertices.push(y);
    vertices.push(x2);
    vertices.push(y2);
    vertices.push(0.0 + c_x);
    vertices.push(0.0 + c_y); 
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

/*
*generates vertex array for rectangle and binds the data to the array buffer
*not optmized, since it has duplicated vertex data
*data is put in dynamic array so must be converted to a typed float array outside of function
*/
function setRectangleVertices(gl,x,y,width, height){
  var vertices = [];
  vertices.push(x);
  vertices.push(y);
  vertices.push(x + width);
  vertices.push(y);
  vertices.push(x);
  vertices.push(y + height);

  vertices.push(x + width);
  vertices.push(y);
  vertices.push(x);
  vertices.push(y + height);
  vertices.push(x + width);
  vertices.push(y + height);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

}

/* 
*generates the color array for a circle with given number of points
*/
function setCircleColor(gl, c1,c2,c3 , numberOfPoints){
  var colorArray = [];  
  for(let i=0; i<numberOfPoints*6; i++){
    colorArray.push(c1);
    colorArray.push(c2);
    colorArray.push(c3); 
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArray), gl.STATIC_DRAW);
}

/* 
*generates the color array for a single rectangle (composed of two triangles)
*/
function setRectangleColor(gl, c1,c2,c3){
  colorArray = [];

  for(let i=0; i<6; i++){
    colorArray.push(c1);
    colorArray.push(c2);
    colorArray.push(c3);  
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArray), gl.STATIC_DRAW);
}