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