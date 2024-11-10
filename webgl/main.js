/* 
*CONSTS
*/
const N_OF_CIRCLE_POINTS = 100;

function main() {
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
    *clear screen
    */
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    /*
    *draw car in middle of screen
    */
/*
    for(let i=0; i<carWheels.length; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setCircleVertices(gl,carWheels[i][0], carWheels[i][1], carWheels[i][2], N_OF_CIRCLE_POINTS);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setCircleColor(gl,carWheelsColor[i][0],carWheelsColor[i][1],carWheelsColor[i][2], N_OF_CIRCLE_POINTS);

        gl.drawArrays(gl.TRIANGLES,0, N_OF_CIRCLE_POINTS*6);
    }
  
    for(let i=0; i<carTriangles.length; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setRectangleVertices(gl,carTriangles[i][0],carTriangles[i][1],carTriangles[i][2],carTriangles[i][3]);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setRectangleColor(gl,carTrianglesColor[i][0],carTrianglesColor[i][1],carTrianglesColor[i][2]);
        
        gl.drawArrays(gl.TRIANGLES,0,6);
    }
*/
/*
    draw flower in the middle of the screen
*/

    for(let i=0; i<flowerCircles.length; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setCircleVertices(gl,flowerCircles[i][0], flowerCircles[i][1], flowerCircles[i][2], N_OF_CIRCLE_POINTS)
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setCircleColor(gl,flowerCircleColor[i][0],flowerCircleColor[i][1],flowerCircleColor[i][2], N_OF_CIRCLE_POINTS);

        gl.drawArrays(gl.TRIANGLES,0, N_OF_CIRCLE_POINTS*6);
    }

    for(let i=0; i<flowerTriangles.length; i++)
    {
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            setRectangleVertices(gl,flowerTriangles[i][0],flowerTriangles[i][1],flowerTriangles[i][2],flowerTriangles[i][3]);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            setRectangleColor(gl,flowerTrianglesColor[i][0],flowerTrianglesColor[i][1],flowerTrianglesColor[i][2]);

            gl.drawArrays(gl.TRIANGLES,0,6);
    }
    
    /*var nOfPoints = 3000;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, -0.3, -0.3, 0.5, nOfPoints);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, 0.0, 0.0, 1.0, nOfPoints);   
    gl.drawArrays(gl.TRIANGLES, 0, nOfPoints*6);
    */
}   

main();
