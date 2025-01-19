//import {mat4} from './gl-matrix-main.js';
import {generateShader, generateProgram} from './shaderProgram.js';
import { keyboardPressDown, keyboardPressUp, mouseTrack } from './input.js';
import {setCubeVertices, setCubeFaceColors, setCubeNormals} from './shapes3d.js';
import * as camera from './camera.js';
import {degToRad, get3DViewingMatrix, getPerspectiveMatrix} from './utils.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const N_OF_CIRCLE_POINTS = 100;
const MAX_POINTS = 3;

const colors = [[1.0, 0.0, 0.0],  //front, red
                [0.0, 1.0, 0.0],  //left, green
                [0.0 , 0.0, 1.0], //back, blue
                [1.0, 1.0, 0.0],    //right, yellow
                [1.0, 0.0, 1.0],    //top , purple
                [0.0, 1.0, 1.0]];   //bottom, cyan

const cubePosition = setCubeVertices();
const cubeColor = setCubeFaceColors(colors);
const cubeNormal = setCubeNormals();

var light = [0.5, 0.0, 0.5];

var x0 = 0.0;
var y0 = 0.0;
var z0 = 2.0;

var xRef = 0.0;
var yRef = 0.0;
var zRef = 0.0;

function main() {
    
    const body = document.querySelector('body');
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true } );
    
    var loader = new GLTFLoader();
    loader.load('assets/old_cannon_gltf/scene.gltf', function(gltf){
        console.log('modelo gltf:');
        console.log(gltf);
    }, undefined, function(err){
       console.log(err);
    } );


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
    const normalBuffer = gl.createBuffer();
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

    const normalLocation = gl.getAttribLocation(program,'normal');
    gl.enableVertexAttribArray(normalLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);

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

    const lightDirectionLoc = gl.getUniformLocation(program, 'uLightDirection');
    gl.uniform3fv(lightDirectionLoc, light);

/*
*clear screen
*/
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    var p0 = [x0, y0, z0];
    var pRef = [xRef, yRef, zRef];
    var V = [0.0, 1.0, 0.0];

    camera.initialize(p0,pRef);

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
    var lightMatrix = mat4.create();

    function render(){

        camera.updateCamera();
        p0 = camera.getCameraPosition();
        pRef = camera.getReferencePoint();

        cameraMatrix = mat4.create();
        persMatrix = mat4.create();
        lookAt = mat4.create();
        model = mat4.create();
        matrix = mat4.create();
        lightMatrix = mat4.create();
        
        //mat4.rotateY(model,model, degToRad(45));
        //mat4.translate(model, model, [0.0, 0.0, -1.0]);
        //mat4.scale(model, model, [0.5, 0.5, 0.5])

        cameraMatrix = get3DViewingMatrix(p0, pRef, V);
        persMatrix = getPerspectiveMatrix(xw_min, xw_max, yw_min, yw_max, z_near, z_far);
        mat4.multiply(lookAt, persMatrix, cameraMatrix);
        mat4.multiply(matrix, lookAt, model);

        mat4.rotateY(lightMatrix, lightMatrix, degToRad(0.1));
        vec3.transformMat4(light, light, lightMatrix);

        gl.uniformMatrix4fv(transfMatrixLoc, false, matrix);
        gl.uniform3fv(lightDirectionLoc, light);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubePosition), gl.STATIC_DRAW);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeColor), gl.STATIC_DRAW);

        /*this is the part where the normals are introduced */
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeNormal), gl.STATIC_DRAW);
        
        gl.drawArrays(gl.TRIANGLES, 0, cubePosition.length/3);
        
        requestAnimationFrame(render);
    }

    render();
    
}

main();


