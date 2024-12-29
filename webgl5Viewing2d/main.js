const N_OF_CIRCLE_POINTS = 100;
const MAX_POINTS = 3;
/*
*keysPressed maintains a hashmap of the state of keys pressed at a given moment with a boolean mapped to the keyCode of a keydown event
*/
keysPressed = {}; 

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
    const positionLocation = gl.getAttribLocation(program,'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

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
*Definition of transformation matrix, initiating it with identity matrix
*/    
    const transfMatrixLoc = gl.getUniformLocation(program, 'matrix');
    gl.uniformMatrix4fv(transfMatrixLoc, false, mat4.create());

/*
*clear screen
*/
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    var matrix = mat4.create();
    var viewingMatrix = mat4.create();
    var windowViewportMatrix = mat4.create();
    var wcRange = 1;
    var wc_step = 0.05;

    function render(){

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        //if(wcRange <= 0.5 || wcRange >= 2) wc_step = -wc_step;
    
        //wcRange += wc_step;
        viewingMatrix = get2DViewingMatrix([0.3, 0.3], 35);
        windowViewportMatrix = get2DWindowToViewportMatrix(-wcRange, wcRange, -wcRange, wcRange);
        mat4.multiply(matrix, viewingMatrix, windowViewportMatrix);
        gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);

        gl.viewport(0, 0, canvas.width/2, canvas.height/2);
        
        drawSquare(gl, positionBuffer, colorBuffer, p1, p1Color );
    
        gl.viewport(canvas.width/2, 0, canvas.width/2, canvas.height/2);
        
        drawSquare(gl, positionBuffer, colorBuffer, p1, p1Color );

        gl.viewport( 0, canvas.height/2 ,canvas.width/2, canvas.height/2);
        
        drawSquare(gl, positionBuffer, colorBuffer, p1, p1Color );

        gl.viewport(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);
        
        drawSquare(gl, positionBuffer, colorBuffer, p1, p1Color );

        requestAnimationFrame(render);
    }

    render();
    
}

main();


