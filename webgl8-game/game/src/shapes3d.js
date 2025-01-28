export function setCubeVertices(){
    const vertexData = [
        // Front
        0.5, 0.5, 0.5,
        0.5, -.5, 0.5,
        -.5, 0.5, 0.5,
        -.5, 0.5, 0.5,
        0.5, -.5, 0.5,
        -.5, -.5, 0.5,
    
        // Left
        -.5, 0.5, 0.5,
        -.5, -.5, 0.5,
        -.5, 0.5, -.5,
        -.5, 0.5, -.5,
        -.5, -.5, 0.5,
        -.5, -.5, -.5,
    
        // Back
        -.5, 0.5, -.5,
        -.5, -.5, -.5,
        0.5, 0.5, -.5,
        0.5, 0.5, -.5,
        -.5, -.5, -.5,
        0.5, -.5, -.5,
    
        // Right
        0.5, 0.5, -.5,
        0.5, -.5, -.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, -.5, 0.5,
        0.5, -.5, -.5,
    
        // Top
        0.5, 0.5, 0.5,
        0.5, 0.5, -.5,
        -.5, 0.5, 0.5,
        -.5, 0.5, 0.5,
        0.5, 0.5, -.5,
        -.5, 0.5, -.5,
    
        // Bottom
        0.5, -.5, 0.5,
        0.5, -.5, -.5,
        -.5, -.5, 0.5,
        -.5, -.5, 0.5,
        0.5, -.5, -.5,
        -.5, -.5, -.5,
      ];
      return vertexData;
}

/* 
* You input 6 colors, one for each face
* The colors should be inputed in the order of the face that is closest to the z = 0 plane,
* then you specify in counter-clock wise the other faces, finishing with top and bottom
*/
export function setCubeFaceColors(colors){
    var colorData = [];
    for(let i=0; i < 6; i++){
        for(let j=0; j < 6; j++){
            colorData = [...colorData, colors[i][0], colors[i][1], colors[i][2]];
        }
    }
    return colorData;
}

export function setCubeNormals(){
    var normals = [
        //front
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        //left
        -1,0,0,
        -1,0,0,
        -1,0,0,
        -1,0,0,
        -1,0,0,
        -1,0,0,
        //back
        0,0,-1,
        0,0,-1,
        0,0,-1,
        0,0,-1,
        0,0,-1,
        0,0,-1,
        //right
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        //top
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        //bottom
        0,-1,0,
        0,-1,0,
        0,-1,0,
        0,-1,0,
        0,-1,0,
        0,-1,0
    ];

    return normals;

}

export function setCylinderVertices(circle1, circle2, radius, nOfCirclePoints){
    var angle = 0;
    var angleVariation = 2*Math.PI/nOfCirclePoints;
    var x1 = circle1[0], y1 = circle1[1], z1 = circle1[2], x2 = circle2[0], y2 = circle2[1], z2 = circle2[2];
    var circle1Points = [];
    var circle2Points = [];
    var vertexArray = [];
    var x, y, z;

    for(let i = 0; i < nOfCirclePoints; i++){
        x = radius * Math.cos(angle) + x1;
        y = radius * Math.sin(angle) + y1;
        z = z1;
        circle1Points.push([x,y,z]);
        angle += angleVariation;
    }

    angle = 0;
    
    for(let j = 0; j < nOfCirclePoints; j++){
        x = radius * Math.cos(angle) + x2;
        y = radius * Math.sin(angle) + y2;
        z = z2;
        circle2Points.push([x, y, z]);
        angle += angleVariation;
    }

    for(var k = 0; k < nOfCirclePoints - 1; k++){
        vertexArray.push(circle1Points[k]);
        vertexArray.push(circle2Points[k]);
        vertexArray.push(circle2Points[k+1]);
        vertexArray.push(circle1Points[k+1]);
        vertexArray.push(circle1Points[k]);
        vertexArray.push(circle2Points[k+1]);
    } 
        vertexArray.push(circle1Points[circle1Points.length - 1]);
        vertexArray.push(circle2Points[circle2Points.length - 1]);
        vertexArray.push(circle2Points[0]);
        vertexArray.push(circle1Points[0]);
        vertexArray.push(circle1Points[circle1Points.length - 1]);
        vertexArray.push(circle2Points[circle2Points.length - 1]);
        
    var formatedVertexArray = [];

    for(let i = 0; i < vertexArray.length; i++ ){
        formatedVertexArray.push(vertexArray[i][0]);
        formatedVertexArray.push(vertexArray[i][1]);
        formatedVertexArray.push(vertexArray[i][2]);
    }
    return formatedVertexArray;
}

export function setCylinderColor(color, nOfCirclePoints){
    var colorArray = [];
    for(var i = 0; i < nOfCirclePoints*6; i++){
        colorArray.push(color[0]);
        colorArray.push(color[1]);
        colorArray.push(color[2]);
    }
    return colorArray;
}