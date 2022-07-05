const body = document.querySelector('body');
const height = body.clientHeight;
const width = body.clientWidth;
const buttonLeft = body.querySelector('.left');
const buttonRight = body.querySelector('.right');
const buttonUp = body.querySelector('.up');
const buttonDown = body.querySelector('.down');
const canvas = document.getElementById("game");
let topHeight, border, leftPadding;
if (width > 768) {
  topHeight = 100;
  border = 50;
  leftPadding = 50; 
}
else {
  topHeight = 100;
  border = 10;
  leftPadding = 10;
}
const row = 20;
const column = 20;
let box;
canvas.style.width = width + 'px';
canvas.style.height = height + 'px';
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "../img/ground.png";

const foodImg = new Image();
foodImg.src = "/img/apple.svg";

rowBox = Math.floor((width - border * 2) / row);
columnBox = Math.floor((height - ( topHeight + border * 2 ) ) / column);

if (rowBox > columnBox) {
  box = columnBox;
} else {
  box = rowBox;
}

// box = 50;
let score = 0;
let dir;

let snake = [];

snake[0] = {
  x: Math.floor(column / 2) * box + border,
  y: Math.floor(row / 2) * box + border + topHeight
};

let food = {
  x: Math.floor((Math.random() * row)) * box + border,
  y: Math.floor((Math.random() * column)) * box + border + topHeight,
};

document.addEventListener("keydown", direction);

buttonLeft.addEventListener('click', ()=> {
  left();
})
buttonRight.addEventListener('click', ()=> {
  right();
})
buttonUp.addEventListener('click', ()=> {
  up();
})
buttonDown.addEventListener('click', ()=> {
  down();
})

function left() {
  if (dir!='right') {
    dir = 'left';
  }
}
function right() {
  if (dir!='left') {
    dir = 'right';
  }
}
function up() {
  if (dir!='down') {
    dir = 'up';
  }
}
function down() {
  if (dir!='up') {
    dir = 'down';
  }
}

function direction(event) {
  if (event.keyCode == 37 || event.keyCode == 65)
    left();
  else if (event.keyCode == 38  || event.keyCode == 87)
    up();
  else if (event.keyCode == 39  || event.keyCode == 68)
    right();
  else if (event.keyCode == 40  || event.keyCode == 83)
    down();
}

function drawGame() {
  ctx.fillStyle = '#578a34';
  ctx.fillRect(0, 0 , width, height);
  ctx.fillStyle = '#4a752c';
  ctx.fillRect(0, 0 , width, topHeight);
  let topPos = topHeight + border;
  let leftPos = border;

  for (let index = 0; index < row; index++) {
    if (index % 2 == 0) {
      ctx.fillStyle = '#aad751';
    }
    else {
      ctx.fillStyle = '#a2d149';
    }
    ctx.fillRect(leftPos, topPos, box, box);

    let topColumn = topHeight + border + box;
    let leftColumn = border + (box * index);

    for (let col = 0; col < column - 1; col++) {
      if (index % 2 == 0) {
        if (col % 2 != 0) {
          ctx.fillStyle = '#aad751';
        }
        else {
          ctx.fillStyle = '#a2d149';
        }
      } else {
        if (col % 2 != 0) {
          ctx.fillStyle = '#a2d149';
        }
        else {
          ctx.fillStyle = '#aad751'; 
        }
      }
      ctx.fillRect(leftColumn, topColumn, box, box);
      topColumn = topColumn + box;
    }

    leftPos = leftPos + box;
  }

  ctx.drawImage(foodImg, food.x, food.y, box, box);

  for(let i=0; i < snake.length; i++){
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font =  topHeight / 2 + "px Arial";
  ctx.drawImage(foodImg, leftPadding, ((topHeight) - (topHeight / 1.5)  ), topHeight / 2, topHeight / 2 );
  ctx.fillText(score, leftPadding + 50 , ((topHeight) - (topHeight / 4)  ) );

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {  
      x: Math.floor((Math.random() * row)) * box + border,
      y: Math.floor((Math.random() * column)) * box + border + topHeight,    
    };
  }
  else {
    snake.pop();
  }

  if(snakeX < border || snakeX > (box * ( row - 1) + border) ||
     snakeY < topHeight + border || snakeY > ((box * (column - 1)) + topHeight + border) )
     clearInterval(game);

  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;

  function eatTeil(head, arr) {
    for(let i=0; i<arr.length; i++){
      if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
  }

  let newHead ={
    x: snakeX,
    y: snakeY
  };

  eatTeil(newHead, snake);
  snake.unshift(newHead);

}

let game = setInterval(drawGame,100);
