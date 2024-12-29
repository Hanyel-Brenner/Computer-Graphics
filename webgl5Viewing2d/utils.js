function degToRad(d) {
    return d * Math.PI / 180;
}

function get2DViewingMatrix(point, angle){
    var x = point[0];
    var y = point[1];
    var ang = degToRad(angle);
    var matrix = mat4.create();
    mat4.rotateZ(matrix, matrix , ang);
    mat4.translate(matrix, matrix, [-x, -y, 0.0]);
    return matrix;
}

function get2DWindowToViewportMatrix(xw_min, xw_max, yw_min, yw_max){
    var matrix = mat4.create();
    var sx = 2/(xw_max - xw_min);
    var sy = 2/(yw_max - yw_min);
    mat4.translate(matrix, matrix, [-1.0, -1.0, 0.0]);
    mat4.scale(matrix, matrix, [sx, sy, 1.0]);
    mat4.translate(matrix, matrix,  [-xw_min , -yw_min ,0.0]);
    return matrix;
}