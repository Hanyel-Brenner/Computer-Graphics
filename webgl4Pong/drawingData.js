const carTriangles = [[-0.25, 0.0, 0.4, 0.23],
  [-0.4, -0.3, 0.8, 0.3],
  [-0.20, 0.0, 0.3, 0.2]];

const carTrianglesColor = [[0.0, 0.0, 0.0],
       [0.0, 1.0, 0.0],
       [0.0, 0.0, 1.0]];

const carWheels = [[-0.2, -0.26, 0.14],
[0.2, -0.26, 0.14]];

const carWheelsColor = [[0.0,0.0,0.0],
    [0.0,0.0,0.0]];

const flowerCircles = [
[ 0.0, 0.0, 0.2],                        
[0.3, 0.0, 0.1],                        
[0.15, 0.2598, 0.1],                    
[-0.15, 0.2598, 0.1],                   
[-0.3, 0.0, 0.1],                       
[-0.15, -0.2598, 0.1],                 
[0.15, -0.2598, 0.1]                  
              ];
const flowerCircleColor = [
 [0.58, 0.29, 0],
 [1, 1, 0],
 [1, 1, 0],
 [1, 1, 0],
 [1, 1, 0],
 [1, 1, 0],
 [1, 1, 0]
              ];
const flowerTriangles = [[-0.025, -0.20, 0.05, -0.7]];
const flowerTrianglesColor = [[0.0, 1.0, 0.0]];

const clownTriangles = [[-0.25 ,-0.4, 0.5, 0.25]]; //covers half of the mouth of the clown so it appear to be smiling
const clownTrianglesColor = [[0.95, 0.95, 0.58]];

const clownCircles = [
                      [-0.6, 0.6, 0.5], //hair on the left
                      [0.6, 0.6, 0.5], //hair on the right
                      [0, 0, 0.8],  //head
                      [0, 0, 0.20],  //nose 
                      [-0.4, 0.4, 0.2],  //left eye
                      [0.4, 0.4, 0.2],    //right eye
                      [0, -0.4, 0.25] //mouth 
                    ];
const clownCirclesColor = [ 
                            [0, 0, 1],
                            [0, 0, 1],
                            [0.95, 0.95, 0.58],
                            [1.0, 0.0, 0.0],
                            [0.0, 0.0, 1.0],
                            [0.0, 0.0, 1.0],
                            [1.0, 1.0, 1.0]  
                          ];

function drawFigureCirclesFirst(gl, positionBuffer, colorBuffer, figureTriangles, figureTrianglesColor, figureCircles, figureCirclesColor){

  if(figureCircles != null)
  {
    for(let i=0; i<figureCircles.length; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setCircleVertices(gl,figureCircles[i][0], figureCircles[i][1], figureCircles[i][2], N_OF_CIRCLE_POINTS)
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setCircleColor(gl, figureCirclesColor[i][0], figureCirclesColor[i][1], figureCirclesColor[i][2], N_OF_CIRCLE_POINTS);

        gl.drawArrays(gl.TRIANGLES,0, N_OF_CIRCLE_POINTS*6);
    }
  }

  if(figureTriangles != null)
  {
    for(let i=0; i<figureTriangles.length; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setRectangleVertices(gl, figureTriangles[i][0], figureTriangles[i][1], figureTriangles[i][2], figureTriangles[i][3]);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setRectangleColor(gl,figureTrianglesColor[i][0],figureTrianglesColor[i][1], figureTrianglesColor[i][2]);
    
        gl.drawArrays(gl.TRIANGLES,0,6);
    }
  }
}

function drawFigureRectangleFirst(gl, positionBuffer, colorBuffer, figureTriangles, figureTrianglesColor, figureCircles, figureCirclesColor){

  if(figureTriangles != null)
  {
    for(let i=0; i<figureTriangles.length; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setRectangleVertices(gl, figureTriangles[i][0], figureTriangles[i][1], figureTriangles[i][2], figureTriangles[i][3]);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setRectangleColor(gl,figureTrianglesColor[i][0],figureTrianglesColor[i][1], figureTrianglesColor[i][2]);
    
        gl.drawArrays(gl.TRIANGLES,0,6);
    }
  }
  if(figureCircles != null)
  {
    for(let i=0; i<figureCircles.length; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setCircleVertices(gl,figureCircles[i][0], figureCircles[i][1], figureCircles[i][2], N_OF_CIRCLE_POINTS)
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setCircleColor(gl, figureCirclesColor[i][0], figureCirclesColor[i][1], figureCirclesColor[i][2], N_OF_CIRCLE_POINTS);

        gl.drawArrays(gl.TRIANGLES,0, N_OF_CIRCLE_POINTS*6);
    }
  }
}