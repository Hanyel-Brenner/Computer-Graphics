function Circle(radius , numberOfPoints){
  var angle = (2 * Math.PI)/numberOfPoints; 
  var tempArray = [];
  //var vertexes = new Float32Array(numberOfPoints * 3 * 2);
  
  for(i=0; i<numberOfPoints; i++){
    var x = radius * Math.cos(angle*i);
    var y = radius * Math.sin(angle*i);
    var x2 = radius * Math.cos(angle*(i+1));
    var y2 = radius * Math.sin(angle*(i+1));
    
    tempArray.push(x);
    tempArray.push(y);
    tempArray.push(x2);
    tempArray.push(y2);
    tempArray.push(0.0);
    tempArray.push(0.0);
  }
  return new Float32Array(tempArray);
}