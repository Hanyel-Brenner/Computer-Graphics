function keyboardPress(gl, positionBuffer, colorBuffer, event, tx, ty){
  switch(event.key){
    case "0":
      gl.clear(gl.COLOR_BUFFER_BIT);
      drawFigureCirclesFirst(gl, positionBuffer, colorBuffer, carTriangles, carTrianglesColor, carWheels, carWheelsColor);
    break;
    case "1":
      gl.clear(gl.COLOR_BUFFER_BIT);
      drawFigureCirclesFirst(gl, positionBuffer, colorBuffer, flowerTriangles, flowerTrianglesColor, flowerCircles, flowerCircleColor);
    break;
    case "2":
      gl.clear(gl.COLOR_BUFFER_BIT);
      drawFigureCirclesFirst(gl, positionBuffer, colorBuffer, clownTriangles, clownTrianglesColor, clownCircles, clownCirclesColor);
    break;
  }
}