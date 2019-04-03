var draw; //是否在繪圖狀態
var m, c; //繪圖物件
function init() {
    m = document.getElementById("m"); //取得畫布物件參考
    c = m.getContext("2d"); //建立2d繪圖物件
    brush1.checked = "checked";
}
function md() {
    c.moveTo(event.offsetX, event.offsetY); //起點
    draw = true; //進入繪圖模式
    c.beginPath(); //本次繪圖筆畫開始
}
function mv() {
    if (draw) {
        c.lineTo(event.offsetX, event.offsetY); //下一點
        c.stroke(); //繪圖
    }
}
function mup() {
    draw = false; //離開繪圖模式
    c.closePath(); //繪圖筆畫結束
}
function color1() { c.strokeStyle = "black"; m.style.cursor = "url(pencil.png),auto"; }
function color2() { c.strokeStyle = "red"; m.style.cursor = "url(pencil.png),auto";}
function color3() { c.strokeStyle = "orange"; }
function color4() { c.strokeStyle = "yellow"; }
function color5() { c.strokeStyle = "green"; }
function color6() { c.strokeStyle = "blue"; }
function color7() { c.strokeStyle = "purple"; }
function color8() { c.strokeStyle = "brown"; }

function brush1() { c.lineWidth = 1; }
function brush2() { c.lineWidth = 3; }
function brush3() { c.lineWidth = 5; }
function brush4() { c.lineWidth = 10; }
function brush5() { c.lineWidth = 20; }

function Button1_onclick() { location.reload(); }
function Button2_onclick() { c.strokeStyle = "rgb(255,255,255)"; }
