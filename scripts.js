const board = document.querySelector("#canva"); // pega o canvas
const ctx = board.getContext("2d"); // pega o contexto do canvas
const pencil = document.querySelector("#pencil"); // pega o botão de pincel
const eraser = document.querySelector("#eraser"); // pega o botão de borracha
const buttons = document.querySelectorAll("button"); // pega os botões
const color = document.querySelector("input[type=color]"); // pega a cor
const range = document.querySelector("input[type=range]"); // pega o tamanho

let isDrawing = false; // altera o estado do pincel
let pointSize = 10; // altera o tamanho do pincel
let fillColor = "#000000"; // altera a cor do pincel
let typeDraw = "brush"; // altera o tipo do pincel

// Altera a cor do pincel
color.addEventListener("change", ({ target }) => {
  fillColor = target.value;
});

// altera o tamanho do pincel
range.addEventListener("change", ({ target }) => {
  pointSize = target.value;
});

// altera pra borracha
eraser.addEventListener("click", () => {
  typeDraw = "erase";
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  eraser.classList.add("active");
});

// altera pro pincel
pencil.addEventListener("click", () => {
  typeDraw = "brush";
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  pencil.classList.add("active");
});

// Cria pontos com pincel/borracha
board.addEventListener("mousedown", ({ clientX, clientY }) => {
  isDrawing = true;

  if (typeDraw === "brush") {
    draw(clientX, clientY);
  } else if (typeDraw === "erase") {
    erasing(clientX, clientY);
  }
});

// Cria linhas e demais com pincel/borracha
board.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isDrawing) {
    if (typeDraw === "brush") {
      draw(clientX, clientY);
    } else if (typeDraw === "erase") {
      erasing(clientX, clientY);
    }
  }
});

// ao soltar o mouse, desfaz o evento isDrawing
board.addEventListener("mouseup", () => {
  isDrawing = false;
});

// Função de desenhar
const draw = (x, y) => {
  ctx.globalCompositeOperation = "source-over"; // composição padrão do canva
  ctx.fillStyle = fillColor; // cor do pincel
  v = x - board.offsetLeft; // eixo X
  h = y - board.offsetTop; // eixo Y
  ctx.beginPath(); // inicia o path do desenho
  ctx.arc(v, h, pointSize / 2, 0, Math.PI * 2); // cria um circulo, passando EIXO X, EIXO Y, TAMANHO, ANGULO INICIAL, ANGULO FINAL
  ctx.fill(); // faz o desenho do circulo com a cor definida
};

const erasing = (x, y) => {
  ctx.globalCompositeOperation = "destination-out";
  v = x - board.offsetLeft;
  h = y - board.offsetTop;
  ctx.beginPath();
  ctx.arc(v, h, pointSize / 2, 0, Math.PI * 2);
  ctx.fill();
};
