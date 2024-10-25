function main() {

    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        throw new Error('WebGL not supported');
    }

    const vertexShaderSrc = document.getElementById('vertexShader').text;
    const fragmentShaderSrc = document.getElementById('fragmentShader').text;

    //create shaders and attach to program 
    const vertexShader = generateShader(gl,gl.VERTEX_SHADER,vertexShaderSrc);
    const fragmentShader = generateShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSrc);
    const program = generateProgram(gl, vertexShader, fragmentShader);
    
    gl.useProgram(program);
    
    const vertexPositions = new Float32Array([
        -0.5, 0.5,
        0.5, -0.5,
        0.5, 0.5,
        -0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5
    ]);
    
    const vertexColors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0
    ]);

    var numberOfCirclePoints = 50000;
    
    const generatedVertexPositions = new Float32Array(rectangle(0.0,0.0, 0.5, -0.8))//circle(-0.3,-0.3,0.5,numberOfCirclePoints); rectangle(0.0,0.0, 0.5, -0.8)
    const generatedColor = new Float32Array();

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,generatedVertexPositions, gl.STATIC_DRAW);

   /* const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW)*/

    /*location refers to the location of the attributes defined in shader or fragment glsl
    *In this case refers to the a_position attribute defined in shader program
    *we can get this reference and work with it the following way*/
    const positionLocation = gl.getAttribLocation(program,'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    /*const colorLocation = gl.getAttribLocation(program,'color');
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0);*/
    
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, numberOfCirclePoints*6);
}   

main();
