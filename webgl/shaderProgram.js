function generateShader(gl,shaderType,shaderSource){
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader,shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader)){
    throw new Error(`Failed to compile shader of type ${shaderType}\nLOG : ${gl.getShaderInfoLog(shader, gl.COMPILE_STATUS)}`);
  }
  return shader;
}

function generateProgram(gl, vertexShader, fragmentShader){
  var program = gl.createProgram();
  gl.attachShader(program,vertexShader);
  gl.attachShader(program,fragmentShader);
  gl.linkProgram(program);

  if(gl.getProgramParameter(program)) {return program;}
  
  gl.deleteProgram(program);
  throw new error(`Failed to generate or link shader program\nLOG : ${gl.getProgramInfoLog(program,gl.LINK_STATUS)}`);
  
}