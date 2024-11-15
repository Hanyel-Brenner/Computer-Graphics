var p1 = [-0.8, 0.0, 0.1, 0.3];
var p2 = [0.6, 0.0, 0.1, 0.3];
var p1Color = [1.0, 0.0, 0.0];
var p2Color = [0.0, 1.0, 0.0];

function printPlayer(gl, positionBuffer, colorBuffer,playerData, playerColor){
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangleVertices(gl, playerData[0], playerData[1], playerData[2], playerData[3]);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setRectangleColor(gl, playerColor[0], playerColor[1], playerColor[2]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}