function main() {

    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        throw new Error('WebGL not supported');
    }

    const vertexShaderSrc = document.getElementById('vertexShader').text;
    const fragmentShaderSrc = document.getElementById('vertexShader').text;


    //create shaders and attach to program 
    const program = gl.createProgram();

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSrc)
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vertexShader));
    }
    gl.attachShader(program, vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSrc)
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(fragmentShader));
    }
    gl.attachShader(program, fragmentShader);

    //finally link attached shaders, program should be ready to use for drawing
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);
    // vertex positions for a square
    const squareVertexPositions = new Float32Array([
        -0.5, 0.5,
        0.5, -0.5,
        0.5, 0.5,
        -0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,squareVertexPositions, gl.STATIC_DRAW);

    /*location refers to the location of the attributes defined in shader or fragment glsl
    *In this case refers to the a_position attribute defined in shader program
    *we can get this reference and work with it the following way*/
    const positionLocation = gl.getAttribLocation(program,'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}   

main();
