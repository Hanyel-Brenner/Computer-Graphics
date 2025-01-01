    
function main(){   
    const body = document.querySelector('body');
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true } );
    
    body.addEventListener("keydown", function(event){
        keyboardPressDown(event);
    },false);

    body.addEventListener("keyup", function(event){
        keyboardPressUp(event);
    },false);

    body.addEventListener("mousemove", function(event){
        mouseTrack(event, canvas);
    },false);
}

main();