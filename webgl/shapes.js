
/* 
*generates the vertex array for a circle constructed using the number of points (or triangles generated) as specified in the numberOfPoints
*not optimized, since it has many duplicated vertex;
*data is put in dynamic array so must be converted to a typed float array outside of function
*not supposed to be used directly, use with the function
*/
function circle(c_x, c_y, radius, numberOfPoints){
  var angle = (2 * Math.PI)/numberOfPoints; 
  var vertexes = [];
  
  for(i=0; i<numberOfPoints; i++){
    var x = radius * Math.cos(angle*i) + c_x;
    var y = radius * Math.sin(angle*i) + c_y;
    var x2 = radius * Math.cos(angle*(i+1)) + c_x;
    var y2 = radius * Math.sin(angle*(i+1)) + c_y;
    
    vertexes.push(x);
    vertexes.push(y);
    vertexes.push(x2);
    vertexes.push(y2);
    vertexes.push(0.0) + c_x;
    vertexes.push(0.0) + c_y; 
  }
  return vertexes;
}

/*
*generates vertex array for rectangle
*not optmized, since it has duplicated vertex data
*data is put in dynamic array so must be converted to a typed float array outside of function
*/
function rectangle(x,y,width, height){
  vertexes = [];
  vertexes.push(x);
  vertexes.push(y);
  vertexes.push(x + width);
  vertexes.push(y);
  vertexes.push(x);
  vertexes.push(y + height);

  vertexes.push(x + width);
  vertexes.push(y);
  vertexes.push(x);
  vertexes.push(y + height);
  vertexes.push(x + width);
  vertexes.push(y + height);

  return vertexes;
}

/* 
*generates the color array for a circle with given number of points
*/
function circleColor(numberOfPoints){

}