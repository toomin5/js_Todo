/* $표시 html에서 가져온 태그*/ 
const $saveBtn = document.querySelector("#save");
const $textInput = document.querySelector("#text");
const $file = document.querySelector("#file");
const $erase = document.querySelector("#eraser-btn");
const $destroy = document.querySelector("#destroy");
const $modeBtn = document.querySelector("#mode-btn");
const $colorOption = Array.from(
  document.getElementsByClassName("color-option")
);
const $color = document.querySelector("#color");
const $lineWidth = document.querySelector("#line-width");
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGTH = 800;

$canvas.width = CANVAS_WIDTH;
$canvas.height = CANVAS_HEIGTH;
ctx.lineWidth = $lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(evt){
  if(isPainting){
    ctx.lineTo(evt.offsetX, evt.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(evt.offsetX, evt.offsetY);
}

function startPainting(){
  isPainting = true;
}

function cancelPainting(){
  isPainting = false;
}

function onLineWidthChange(evt){ //input값이 바뀔 때 마다 실행
  ctx.lineWidth = evt.target.value;
}

function onColorChange(evt){
  ctx.strokeStyle = evt.target.value;
  ctx.fillStyle = evt.target.value;
}

function onColorClick(evt){
  const colorValue = evt.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  $color.value = colorValue; 
}

function onModeClick(){
  if(isFilling){
    isFilling = false;
    $modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    $modeBtn.innerText = "DRAW";
  }
}

function onCanvasClick(){
  if(isFilling){
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGTH);
  }
}

function onDestroyClick(){
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGTH);
}

function onEraserClick(){
  ctx.strokeStyle = "white";
  isFilling = false;
  $modeBtn.innerText = "Fill"; //erase버튼 누르면 draw모드로 변경하면서 스트로크컬러 white
}

function onFileChange(evt){
  const file = evt.target.files[0]; // 파일정보
  const url = URL.createObjectURL(file); //사용자가 업로드한 파일 브라우저 메모리안에 저장
  const image = new Image(); //이미지 생성 createElement와 동일함
  image.src = url;
  image.onload = function(){
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
  }
}

function onDoubleClick(evt){
  const $textvalue = $text.value;
  if($textvalue !== ""){ //비어있지않다면 
  ctx.save(); //현재 상태,색상,스타일 저장함수
  ctx.lineWidth = 1;
  ctx.font = "48px serif";
  ctx.fillText($textvalue, evt.offsetX, evt.offsetY);
  ctx.restore(); //save와 restore사이의 변경값은 저장되지않는다. save함수가 변경되기전(버튼누르기직전) 현재상태를 저장하기떄문
  }
}

function onSaveClick(){//canvas.toDataUrl 메소드 사용,   이미지 -> base64로 인코딩
  const url = $canvas.toDataURL();
  const a = document.createElement("a"); //a태그에 다운로드 속성을 이용하기위해 생성
  a.href = url;
  a.download = "myDrawing.png"
  a.click();
}

$canvas.addEventListener('dblclick',onDoubleClick);
$canvas.addEventListener('mousemove', onMove);
$canvas.addEventListener('mousedown', startPainting);
$canvas.addEventListener('mouseup', cancelPainting);
$canvas.addEventListener('mouseleave', cancelPainting);
$canvas.addEventListener('click',onCanvasClick);
$lineWidth.addEventListener('change', onLineWidthChange);
$color.addEventListener('change',onColorChange);

$colorOption.forEach(color => color.addEventListener
('click',onColorClick))

$modeBtn.addEventListener('click', onModeClick);
$destroy.addEventListener('click', onDestroyClick);
$erase.addEventListener('click', onEraserClick);
$file.addEventListener('change',onFileChange);
$saveBtn.addEventListener('click',onSaveClick);