const N_OF_CIRCLE_POINTS = 100;

inputs = {
    NO_KEY : -1,
    START : 0, 
    EXIT : 1,
    P1_UP : 2,
    P1_DOWN : 3,
    P2_UP : 4,
    P2_DOWN : 5,
}

var input;

var default_step = 0.01;
var default_step_ball = 0.03;

var ty_P1 = 0.0;
var ty_step_P1 = 0.0;
var ty_P2 = 0.0;
var ty_step_P2 = 0.0;

var tx_ball;
var ty_ball;


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
    body.addEventListener("keypress", function(event){
        keyboardPress(event);
    }, false);

/*
*Definition of transformation matrix;
*/    
    const transfMatrixLoc = gl.getUniformLocation(program, 'matrix');
    const matrix = mat4.create();

    /*mat4.translate(matrix, matrix, [0.5, 0.5, 0]);
    mat4.scale(matrix, matrix, [0.75, 0.75, 1]);
    mat4.rotateZ(matrix, matrix, Math.PI / 2);
    gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);
*/
    /*
    *clear screen
    */
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    function render(){

        //gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);
        mat4.identity(matrix);
        //tx += tx_step;
        //ty += ty_step;

       /*if( input == inputs.P1_UP) 
        {
            console.log(".");
            input = inputs.NO_KEY;
        }*/

        switch(input){
            case inputs.P1_UP:

                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                setRectangleVertices(gl, p1[0], p1[1], p1[2], p1[3]);
                gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
                setRectangleColor(gl, p1Color[0], p1Color[1], p1Color[2]);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
                
            break;
        }
        
        requestAnimationFrame(render);
    }

    render();
}   

main();
