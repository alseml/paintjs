const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function OnMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!filling) {
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function startPainting(event) {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function RangeChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

function ModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function CanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function SaveImg() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "image";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", OnMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", CanvasClick);
  // canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
  const count = colors.length;
  for (let i = 0; i < count; i++) {
    colors[i].addEventListener("click", changeColor);
  }
}
// Array.from(colors).forEach((color) =>
//   color.addEventListener("click", changeColor)
// );
if (range) {
  range.addEventListener("input", RangeChange);
}

if (mode) {
  mode.addEventListener("click", ModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", SaveImg);
}
