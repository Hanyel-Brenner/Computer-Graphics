var clickCounter = 0;
var linePoints = [];
function main() {

    const body = document.querySelector('body');
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl',{ preserveDrawingBuffer: true });
    
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
    const color = [0.0,0.0,0.0];
    const colorUniformLoc = gl.getUniformLocation(program, 'u_color');
    gl.uniform3fv(colorUniformLoc, color);
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

    
    clickCounter = 0;
    canvas.addEventListener("mousedown", function(event) {
        mouseClick(gl,canvas,positionBuffer,event)
    }, false);
    body.addEventListener("keydown", function(event){
        keyboardPress(gl, colorUniformLoc, event)
    }, false);

    /*
    *clear screen
    */
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width,canvas.height);

    /*
    *bind buffer and set buffer data each at a time(position and color)
    */
}   

main();