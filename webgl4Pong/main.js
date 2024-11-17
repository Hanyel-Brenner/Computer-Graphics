const N_OF_CIRCLE_POINTS = 100;

/*
*keysPressed maintains a hashmap of the state of keys pressed at a given moment with a boolean mapped to the keyCode of a keydown event
*/
keysPressed = {}; 

var isRunning = true;

var yPlayerSpeed = 0.01;
var xPlayerSpeed = 0.01;
var xBallSpeed = 0.03
var yBallSpeed = 0.03;

var dxPlayer1 = 0.0, dyPlayer1 = 0.0;
var dxPlayer2 = 0.0, dyPlayer2 = 0.0;

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
        keyboardPressDown(event);
    },false);

    body.addEventListener("keyup", function(event){
        keyboardPressUp(event);
    },false);

/*
*Definition of transformation matrix;
*/    
    const transfMatrixLoc = gl.getUniformLocation(program, 'matrix');
    const matrixP1 = mat4.create();
    const matrixP2 = mat4.create();

/*
*clear screen
*/
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    function render(){
        
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        if(isRunning == false){
            printPlayer(gl, positionBuffer, colorBuffer, p1, p1Color);
            printPlayer(gl, positionBuffer, colorBuffer, p2, p2Color);
        }

        mat4.identity(matrixP1);
        mat4.identity(matrixP2);

        /*
        *given the state of keysPressed, updates the player displacement in y-direction
        */
        updatePlayerPosition();
        // TODO updateBallPosition();

        mat4.translate(matrixP1, matrixP1, [0, dyPlayer1 ,0]);
        mat4.translate(matrixP2, matrixP2, [0, dyPlayer2, 0]);
        gl.uniformMatrix4fv(transfMatrixLoc, false, matrixP1);
        printPlayer(gl, positionBuffer, colorBuffer, p1, p1Color);
        gl.uniformMatrix4fv(transfMatrixLoc, false, matrixP2)
        printPlayer(gl, positionBuffer, colorBuffer, p2, p2Color);

        requestAnimationFrame(render);
    }

    render();
}   

main();
