var p1 = [-0.8, 0.0, 0.1, 0.3];
var p2 = [0.6, 0.0, 0.1, 0.3];
var p1Color = [1.0, 0.0, 0.0];
var p2Color = [0.0, 1.0, 0.0];
var ball = [0.0, 0.0, 0.05];
var ballColor = [0.0, 0.0, 0.0];

var playableBox = [-1.0, 1.0, 2.0, -2.0];

function drawSquare(gl, positionBuffer, colorBuffer, rectangleData, rectangleColor){
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangleVertices(gl, rectangleData[0], rectangleData[1], rectangleData[2], rectangleData[3]);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setRectangleColor(gl, rectangleColor[0], rectangleColor[1], rectangleColor[2]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function drawCircle(gl, positionBuffer, colorBuffer, circleData, circleColor, nOfPoints){
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, circleData[0], circleData[1], circleData[2], nOfPoints);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, circleColor[0], circleColor[1], circleColor[2], nOfPoints);
    gl.drawArrays(gl.TRIANGLES, 0, nOfPoints * 6);
}