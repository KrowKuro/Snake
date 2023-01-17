//board
var blocksize = 25;
var rows = 25;
var cols =25;
var board;
var context;

//snake
var snakeX = blocksize * 7;
var snakeY = blocksize * 7;
var velX = 0;
var velY = 0;
var snakeBody = [];

//food
var foodX = 0;
var foodY = 0;

var gameOver = false;

var points = 0;
var n=0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    document.addEventListener("keyup", changeDirection);
    placeFood();
    setInterval(update, 150);
}

function update() {
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blocksize, blocksize);
    if(foodX == snakeX && foodY == snakeY){
        snakeBody.push([foodX, foodY]);
        placeFood();
        points++;
        document.getElementById("points").innerText = points;
    }

    for(let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
    context.fillStyle="purple";
    snakeX += velX * blocksize;
    snakeY += velY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    if(snakeX < 0 || snakeX > (cols - 1) * blocksize || snakeY < 0 || snakeY > (rows - 1) * blocksize) {
        gameOver = true;
        if(n == 0){
            alert("Game Over \nYour Score is: " + points);
            n++;
        }
        location.reload();
    }
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            if(n == 0){
                alert("Game Over \nYour Score is: " + points);
                n++;
              }
            location.reload();
        }
    }
}

function changeDirection(e) {
    if(e.code == "ArrowUp" && velY != 1){
        velX = 0;
        velY = -1;
    }
    else if(e.code == "ArrowDown" && velY != -1){
        velX = 0;
        velY = 1;
    }
    else if(e.code == "ArrowRight" && velX != -1){
        velX = 1;
        velY = 0;
    }
    else if(e.code == "ArrowLeft" && velX != 1){
        velX = -1;
        velY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}
