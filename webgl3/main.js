/* 
*CONSTS
*/
const N_OF_CIRCLE_POINTS = 100;
var tx=0, ty=0;
var tx_step = 0.01;
var ty_step = 0;
var angleSpeed = 0;
var figure = 1;

function main() {

    const body = document.querySelector('body');
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true } );

    if (!gl) {
        throw new Error('WebGL not supported');
    }

    const vertexShaderSrc = document.getElementById('vertexShader').text;
    const fragmentShaderSrc = document.getElementById('fragmentShader').text;

    const vertexShader = generateShader(gl,gl.VERTEX_SHADER,vertexShaderSrc);
    const fragmentShader = generateShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSrc);
    const program = generateProgram(gl, vertexShader, fragmentShader);
    
    gl.useProgram(program);
    
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

/*
*location refers to the location of the attributes defined in shader or fragment glsl
*/
    const positionLocation = gl.getAttribLocation(program,'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const colorLocation = gl.getAttribLocation(program,'color');
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);


/*
*Event listeners for keyboard or mouse
*/    
    body.addEventListener("keydown", function(event){
        keyboardPress(gl, positionBuffer, colorBuffer, event, tx, ty);
    }, false);

/*
*Definition of transformation matrix;
*/    
    const transfMatrixLoc = gl.getUniformLocation(program, 'matrix');
    const matrix = mat4.create();

    mat4.translate(matrix, matrix, [0.5, 0.5, 0]);
    mat4.scale(matrix, matrix, [0.75, 0.75, 1]);
    mat4.rotateZ(matrix, matrix, Math.PI / 2);
    gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);

    /*
    *clear screen
    */
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    function render(){

        gl.clear(gl.COLOR_BUFFER_BIT);
        mat4.identity(matrix);

        tx += tx_step;
        ty += ty_step;
        angleSpeed += 0.01;

        if(tx >= 1 || tx <= -1) tx_step = -tx_step;

        switch(figure){
            case 1:
                mat4.translate(matrix, matrix, [tx, ty, 0]);
                gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);
                drawFigureCirclesFirst(gl, positionBuffer, colorBuffer, carTriangles, carTrianglesColor, carWheels, carWheelsColor);
            break;
            case 2:
                mat4.rotateZ(matrix, matrix, angleSpeed); 
                gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);
                drawFigureCirclesFirst(gl, positionBuffer, colorBuffer, flowerTriangles, flowerTrianglesColor, flowerCircles, flowerCircleColor);
            break;
            case 3:
                mat4.rotateZ(matrix, matrix, angleSpeed); 
                gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);
                drawFigureCirclesFirst(gl, positionBuffer, colorBuffer, clownTriangles, clownTrianglesColor, clownCircles, clownCirclesColor);
            break;
        }
        
        requestAnimationFrame(render);
    }

    render();

}   

main();
