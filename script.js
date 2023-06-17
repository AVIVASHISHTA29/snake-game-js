// The snake is an array of objects where each object is a position in the grid.
let snake = [{ top: 200, left: 200 }];
let direction = { key: "ArrowRight", dx: 10, dy: 0 }; // previously dx: 20, dy: 0

// similarly update the other parts of the code that depend on the grid size

let food = null;
let score = 0;
let highScore = 0;

// Update the direction based on the user's input.
window.addEventListener("keydown", (e) => {
  const newDirection = getDirection(e.key);
  const allowedChange = Math.abs(direction.dx) !== Math.abs(newDirection.dx);
  if (allowedChange) direction = newDirection;
});

function getDirection(key) {
  switch (key) {
    case "ArrowUp":
      return { key, dx: 0, dy: -20 };
    case "ArrowDown":
      return { key, dx: 0, dy: 20 };
    case "ArrowLeft":
      return { key, dx: -20, dy: 0 };
    case "ArrowRight":
      return { key, dx: 20, dy: 0 };
    default:
      return direction;
  }
}

// Moves the snake by updating the position of the head and removing the last segment.
function moveSnake() {
  const head = Object.assign({}, snake[0]); // copy head
  head.top += direction.dy;
  head.left += direction.dx;
  snake.unshift(head);

  if (snake[0].top < 0) snake[0].top = 380;
  if (snake[0].left < 0) snake[0].left = 380;
  if (snake[0].top > 380) snake[0].top = 0;
  if (snake[0].left > 380) snake[0].left = 0;

  if (!eatFood()) snake.pop(); // if the snake doesn't eat food, remove the tail
}

// Generates a random position for the food.
function randomFood() {
  food = {
    top: Math.floor(Math.random() * 20) * 20,
    left: Math.floor(Math.random() * 20) * 20,
  };
}

// If the snake's head is at the same position as the food, it eats the food.
function eatFood() {
  if (snake[0].top === food.top && snake[0].left === food.left) {
    food = null;
    return true;
  }
  return false;
}

// Update the score on the screen.
function updateScore() {
  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("high-score").innerText = "High Score: " + highScore;
}

// If the snake intersects itself, the game is over.
function gameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].top === snake[0].top && snake[i].left === snake[0].left)
      return true;
  }
  return false;
}

// Game loop
function gameLoop() {
  if (gameOver()) {
    if (score > highScore) {
      highScore = score;
    }
    score = 0;
    snake = [{ top: 200, left: 200 }];
    direction = { key: "ArrowRight", dx: 20, dy: 0 };
  }

  setTimeout(() => {
    document.getElementById("game-board").innerHTML = "";
    moveSnake();
    if (!food) {
      randomFood();
      score += 1;
    } // ensure food is created
    if (eatFood()) {
      document.getElementById("score").innerHTML = `Score :${score}`;
    }
    updateScore();
    drawSnake();
    drawFood();
    gameLoop();
  }, 100);
}

randomFood(); // call this to generate food before the game starts
gameLoop();

// Draw the snake on the screen.
function drawSnake() {
  snake.forEach((part, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.top = `${part.top}px`;
    snakeElement.style.left = `${part.left}px`;
    snakeElement.classList.add("snake");
    if (index === 0) snakeElement.classList.add("head");
    document.getElementById("game-board").appendChild(snakeElement);
  });
}

// Draw the food on the screen.
function drawFood() {
  const foodElement = document.createElement("div");
  foodElement.style.top = `${food.top}px`;
  foodElement.style.left = `${food.left}px`;
  foodElement.classList.add("food");
  document.getElementById("game-board").appendChild(foodElement);
}
