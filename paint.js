var draw; 
var m, c; 
var tmp_paint;
var bef_paint=[];
var af_paint=[];

function init() {
    m = document.getElementById("m"); 
    c = m.getContext("2d");
    brush1.checked = "checked";
    m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");
}
function md() {
    c.moveTo(event.offsetX, event.offsetY);
    draw = true;
    c.beginPath();
}
function mv() {
    if (draw) {
        c.lineTo(event.offsetX, event.offsetY);
        c.stroke();
    }
}
function mup() {
    if(draw){
        draw = false;
        c.closePath();
        bef_paint.push(c.getImageData(0,0,m.width, m.height));
    }
    save();
}

//undo redo
function undo(){
    bef_paint.push(c.getImageData(0,0,m.width, m.height));
    c.putImageData(af[af.length-1],0,0);
    af.pop();
    
}
function redo(){
    af.push(c.getImageData(0,0,m.width, m.height));
    c.putImageData(bef[bef.length-1], 0, 0);
    bef.pop();

}

function color1() { c.strokeStyle = "black"; m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");}
function color2() { c.strokeStyle = "red";m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");}
function color3() { c.strokeStyle = "orange"; m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");}
function color4() { c.strokeStyle = "yellow"; m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");}
function color5() { c.strokeStyle = "green"; m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");}
function color6() { c.strokeStyle = "blue"; m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");}
function color7() { c.strokeStyle = "purple"; m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");}
function color8() { c.strokeStyle = "brown"; m.setAttribute("style", "cursor:url(image/featherpenpointer.cur),default;");}

function brush1() { c.lineWidth = 1; }
function brush2() { c.lineWidth = 3; }
function brush3() { c.lineWidth = 5; }
function brush4() { c.lineWidth = 10; }
function brush5() { c.lineWidth = 20; }

function Button1_onclick() { 
    c.clearRect(0,0,m.width, m.height); 
    af.push(c.getImageData(0,0,m.width, m.height));
}
function Button2_onclick() { 
    c.strokeStyle = "rgb(255,255,255)"; 
    m.setAttribute("style", "cursor:url(image/eraser.cur),default;");
}

