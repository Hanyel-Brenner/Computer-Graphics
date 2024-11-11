/* 
*CONSTS
*/
const N_OF_CIRCLE_POINTS = 100;
const tx=0, ty=0;

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
const figure = 0;

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

}   

main();
