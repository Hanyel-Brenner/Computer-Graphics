var p1 = [-0.8, 0.0, 0.1, 0.3];
var p2 = [0.6, 0.0, 0.1, 0.3];
var p1Color = [1.0, 0.0, 0.0];
var p2Color = [0.0, 1.0, 0.0];
var ball = [0.0, 0.0, 0.05];
var ballColor = [0.0, 0.0, 0.0];

var playableBox = [-1.0, 1.0, 2.0, -2.0];

function printPlayer(gl, positionBuffer, colorBuffer,playerData, playerColor){
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangleVertices(gl, playerData[0], playerData[1], playerData[2], playerData[3]);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setRectangleColor(gl, playerColor[0], playerColor[1], playerColor[2]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function printBall(gl, positionBuffer, colorBuffer, ballData, ballColor, nOfPoints){
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, ballData[0], ballData[1], ballData[2], nOfPoints);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, ballColor[0], ballColor[1], ballColor[2], nOfPoints);
    gl.drawArrays(gl.TRIANGLES, 0, nOfPoints * 6);
}