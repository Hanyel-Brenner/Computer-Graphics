export class Renderer{
    
    gl;
    counter;
    objectPool;
    indexes;
    map;

    constructor(gl, context){
        this.gl = gl;
        this.objectPool = [];
        this.indexes = [];
        this.map = {}
        this.counter = 0;
    }

    addGameObject(gameObject){
        this.objectPool.push(...gameObject.vertices);
        this.indexes.push(counter);
        this.map[gameObject.name] = {index : this.indexes.length - 1, size : gameObject.size};
        counter += gameObject.size;
    }

    getObjectByName(name){
        var object = [];
        let index = this.map[name].index;
        for(let i = index; i < this.map[name].size; i++){
            object.push(this.objectPool[i]);
        }
        return object;
    }

    drawAll(){
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.context.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.objectPool), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.context.colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(), this.gl.STATIC_DRAW);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.objectPool.length/3);
    }

}

export class GameObject{

    name;
    size = 0;
    vertices = [];
    colors = [];

    constructor(name,vertices, colors){
        if(vertices.length != colors.length) throw new Error("RENDERER_ERROR::size of vertices and colors array must be the same");
        this.name = name;
        this.vertices = vertices;
        this.colors = colors;
        size = vertices.length;
    }

}