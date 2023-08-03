const board = document.querySelector("#canva");
let ctx = board.getContext("2d");
const pencil = document.querySelector("#pencil");
const eraser = document.querySelector("#eraser");
const buttons = document.querySelectorAll("button");
const color = document.querySelector("input[type=color]");
const range = document.querySelector("input[type=range]");

let isDrawing = false;
let pointSize = 10;
let fillColor = "#000000";
let typeDraw = "brush";

color.addEventListener("change", ({ target }) => {
  fillColor = target.value;
});

range.addEventListener("change", ({ target }) => {
  pointSize = target.value;
});

eraser.addEventListener("click", () => {
  typeDraw = "erase";
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  eraser.classList.add("active");
});

pencil.addEventListener("click", () => {
  typeDraw = "brush";
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  pencil.classList.add("active");
});

board.addEventListener("mousedown", ({ clientX, clientY }) => {
  isDrawing = true;

  if (typeDraw === "brush") {
    draw(clientX, clientY);
  } else if (typeDraw === "erase") {
    erasing(clientX, clientY);
  }
});

board.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isDrawing) {
    if (typeDraw === "brush") {
      draw(clientX, clientY);
    } else if (typeDraw === "erase") {
      erasing(clientX, clientY);
    }
  }
});

board.addEventListener("mouseup", () => {
  isDrawing = false;
});

const draw = (x, y) => {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = fillColor;
  v = x - board.offsetLeft;
  h = y - board.offsetTop;
  ctx.beginPath();
  ctx.arc(v, h, pointSize / 2, 0, Math.PI * 2);
  ctx.fill();
};

const erasing = (x, y) => {
  ctx.globalCompositeOperation = "destination-out";
  v = x - board.offsetLeft;
  h = y - board.offsetTop;
  ctx.beginPath();
  ctx.arc(v, h, pointSize / 2, 0, Math.PI * 2);
  ctx.fill();
};
