var draw; 
var m, c; 
var bef_paint=[];
var af_paint=[];
var tool;
var color;
var brush;

//last mouse
var lastX,lastY;

function init() {
    m = document.getElementById("m"); 
    c = m.getContext("2d");
    brush1.checked = "checked";
    m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");
    tool = "pen";
    color = "black";
    brush = 1;
}

//mouse
function md() {
    bef_paint.push(c.getImageData(0,0,m.width, m.height));
    switch(tool){
        case "eraser":
            c.strokeStyle = "rgb(255,255,255)";
            c.lineWidth = brush;
            c.moveTo(event.offsetX, event.offsetY);
            draw = true;
            c.beginPath();
            break;
        
        case "rectangle":
            c.strokeStyle = color;
            c.lineWidth = brush;
            c.moveTo(event.offsetX, event.offsetY);
            lastX = event.offsetX;
            lastY = event.offsetY;
            draw = true;
            break;

        case "text":
            c.fillStyle = color;
            c.font = brush + '2' + 'px fantasy';
            c.fillText(document.getElementById("text_data").value,event.offsetX,event.offsetY);
            break;
            
        default:
            c.strokeStyle = color;
            c.lineWidth = brush;
            c.moveTo(event.offsetX, event.offsetY);
            lastX = event.offsetX;
            lastY = event.offsetY;
            draw = true;
            c.beginPath();
            break;
    }
}
function mv() {
    if (draw) {
        switch(tool){
            case "pen":
                c.lineTo(event.offsetX, event.offsetY);
                c.stroke();
                break;
            
            case "eraser":
                c.lineTo(event.offsetX, event.offsetY);
                c.stroke();
                break;

            case "rectangle":
                c.putImageData(bef_paint[bef_paint.length-1], 0, 0);
                c.beginPath(); 
                c.lineTo(event.offsetX, lastY);
                c.lineTo(event.offsetX, event.offsetY);
                c.lineTo(lastX, event.offsetY);
                c.lineTo(lastX, lastY);
                c.closePath();
                c.stroke();  
                break;

            case "circle":
                c.putImageData(bef_paint[bef_paint.length-1], 0, 0);
                c.beginPath();
                c.arc(lastX, lastY, Math.sqrt((lastX-event.offsetX)*(lastX-event.offsetX) + (lastY-event.offsetY)*(lastY-event.offsetY)), 0, 2 * Math.PI);
                c.closePath();
                c.stroke();  
                break;

            case "triangle":
                c.putImageData(bef_paint[bef_paint.length-1], 0, 0);
                c.beginPath();  
                c.lineTo(event.offsetX, event.offsetY);
                c.lineTo(2*lastX-event.offsetX, event.offsetY);
                c.lineTo(lastX, lastY);
                c.closePath();
                c.stroke(); 
                break;

            case "line":
                c.putImageData(bef_paint[bef_paint.length-1], 0, 0);
                c.beginPath();  
                c.lineTo(event.offsetX, event.offsetY);
                c.lineTo(lastX, lastY);
                c.closePath();
                c.stroke();  
                break;

            default:
                c.lineTo(event.offsetX, event.offsetY);
                c.stroke();
                break;
        }
    }
}
function mup() {
    if(draw && event.offsetX>=0 && event.offsetX<=m.width && event.offsetY>=0 && event.offsetY<=m.height){
        draw = false;
        c.closePath();
    }
}

//undo redo
function undo(){
    if(bef_paint.length > 0){
        af_paint.push(c.getImageData(0,0,m.width, m.height));
        c.putImageData(bef_paint[bef_paint.length-1], 0, 0);
        bef_paint.pop();
    }
}
function redo(){
    if(af_paint.length > 0){
        bef_paint.push(c.getImageData(0,0,m.width, m.height));
        c.putImageData(af_paint[af_paint.length-1],0,0);
        af_paint.pop();
    }
}

//upload pic
function uploading(){
    var upload = document.getElementById("upload");
    upload.addEventListener("change",uploadImage,false);

    function uploadImage(e){
        var reader = new FileReader();

        reader.onload = function(event){
            var img = new Image();
            img.onload = function () {
                c.drawImage(img,0,0,img.width,img.height);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
	}
}

function color1() { color = "black"; }
function color2() { color = "red";}
function color3() { color = "orange";}
function color4() { color = "yellow"; }
function color5() { color = "green"; }
function color6() { color = "blue"; }
function color7() { color = "purple";}
function color8() { color = "brown"; }

function brush1() { brush = 1; }
function brush2() { brush = 3; }
function brush3() { brush = 5; }
function brush4() { brush = 10; }
function brush5() { brush = 20; }

function reset() { 
    c.clearRect(0,0,m.width, m.height); 
    bef_paint.push(c.getImageData(0,0,m.width, m.height));
}

// tool
function pen() { 
    tool = "pen";
    m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");
}

function eraser() { 
    tool = "eraser";
    m.setAttribute("style", "cursor:url(image/eraser.cur),default;");
}

function rectangle() { 
    tool = "rectangle";
    m.style.cursor = "crosshair";
}
function circle() { 
    tool = "circle";
    m.style.cursor = "crosshair";
}
function triangle() { 
    tool = "triangle";
    m.style.cursor = "crosshair";
}
function line() { 
    tool = "line";
    m.style.cursor = "crosshair";
}

// text
function text(){
    m.style.cursor = "text";
    tool = "text";
}