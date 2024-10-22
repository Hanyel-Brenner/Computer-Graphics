function main(){
    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl');

    if(!gl){ 
        throw new Error('WebGL not supported');
    }

    const vertexShaderSrc = `
    attribute vec2 a_position;

    void main(){
        gl_Position = vec4(a_position, 0.0, 1.0)
    }
    `

    const fragmentShaderSrc = `
    attribute vec3 vColor;
    precision mediump float;

    void main(){
        gl_FragColor = vec4(1.0,0.0,1.0,1.0);
    }
    `
    //create shaders and attach to program 
    const program = gl.createProgram();

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSrc)
    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
        throw new Error(gl.getShaderInfoLog(vertexShader));
    }
    gl.attachShader(program, vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSrc)
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
        throw new Error(gl.getShaderInfoLog(fragmentShader));
    }
    gl.attachShader(program, fragmentShader);

    //finally link attached shaders, program should be ready to use for drawing
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program)){
        throw new Error(gl.getProgramInfoLog(program));
    }

}

main();