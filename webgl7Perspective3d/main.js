const N_OF_CIRCLE_POINTS = 100;
const MAX_POINTS = 3;
/*
*keysPressed maintains a hashmap of the state of keys pressed at a given moment with a boolean mapped to the keyCode of a keydown event
*/
var mouseEventCounter = 0;
var mousePos1 = [];
var mousePos2 = [];
var mouseDirection = [0,0];

const keysPressed = {}; 

const colors = [[1.0, 0.0, 0.0],  //front, red
                [0.0, 1.0, 0.0],  //left, green
                [0.0 , 0.0, 1.0], //back, blue
                [1.0, 1.0, 0.0],    //right, yellow
                [1.0, 0.0, 1.0],    //top , purple
                [0.0, 1.0, 1.0]];   //bottom, cyan

const cubePosition = setCubeVertices();
const cubeColor = setCubeFaceColors(colors);

var x0 = 0.0;
var y0 = 2.0;
var z0 = 2.0;

var xRef = 0.0;
var yRef = 0.0;
var zRef = 0.0;

var currentAngle = 90;

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

    gl.enable(gl.DEPTH_TEST);
    
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

    body.addEventListener("mousemove", function(event){
        mouseTrack(event, canvas);
    },false);

/*
*Definition of transformation matrix, initiating it with identity matrix
*/    
    const transfMatrixLoc = gl.getUniformLocation(program, 'matrix');
    gl.uniformMatrix4fv(transfMatrixLoc, false, mat4.create());

/*
*clear screen
*/
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    var p0 = [x0, y0, z0];
    var pRef = [xRef, yRef, zRef];
    var V = [0.0, 1.0, 0.0];

    var xw_min = -1.0;
    var xw_max = 1.0;
    var yw_min = -1.0;
    var yw_max = 1.0;
    var z_near = -1.0;
    var z_far = -20.0

    var cameraMatrix = mat4.create();
    var persMatrix = mat4.create();
    var lookAt = mat4.create();
    var model = mat4.create();
    var matrix = mat4.create();

    function render(){

        updateCamera();

        p0 = [x0, y0, z0];
        pRef = [xRef, yRef, zRef];

        cameraMatrix = mat4.create();
        persMatrix = mat4.create();
        lookAt = mat4.create();
        model = mat4.create();
        matrix = mat4.create();
        
        //mat4.rotateY(model,model, degToRad(45));
        //mat4.translate(model, model, [0.0, 0.0, -1.0]);
        //mat4.scale(model, model, [0.5, 0.5, 0.5])

        cameraMatrix = get3DViewingMatrix(p0, pRef, V);
        persMatrix = getPerspectiveMatrix(xw_min, xw_max, yw_min, yw_max, z_near, z_far);
        mat4.multiply(lookAt, persMatrix, cameraMatrix);
        mat4.multiply(matrix, lookAt, model);

        gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubePosition), gl.STATIC_DRAW);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeColor), gl.STATIC_DRAW);
        
        gl.drawArrays(gl.TRIANGLES, 0, cubePosition.length/3);
        
        requestAnimationFrame(render);
    }

    render();
    
}

main();


