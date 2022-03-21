var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickHeight = 10;
var brickWidth = 50;
var brickRowCount = 9;
var brickColumnCount = 12;
var score = 0;
var paused = false;

var bricks = [];

for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", gamePause);

function collisionDetection() {
    for (var i = 0; i < brickColumnCount; i++) {
        for (var j = 0; j < brickRowCount; j++) {
            var brick = bricks[i][j];
            if (brick.status == 1) {
                if (x + r >= brick.x && x - r <= brick.x + brickWidth && y >= brick.y && y <= brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    score++;
                    if (score == 108) {
                        document.location.reload();
                    }
                }
            }

        }
    }
}

function keyDownHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "ArrowLeft") {
        leftPressed = true;
    }

}

function keyUpHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function gamePause(e) {
    if (e.key == " ") {
        paused = !paused;
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawBrick() {
    for (var i = 0; i < brickColumnCount; i++) {
        for (var j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].status == 1) {
                bricks[i][j].x = i * (brickWidth + 10) + 10;
                bricks[i][j].y = j * (brickHeight + 10) + 10;
                ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
                ctx.fillStyle = "cyan";
                ctx.fill();
                ctx.closePath();
            }
        }

    }

}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("score: " + score, canvas.width - 100, canvas.height - 50);
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBrick();
    collisionDetection();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x >= paddleX && x <= paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("kya kar raha bhay tu!!");
            document.location.reload();
            //clearInterval(interval);
        }
    }

    if (!paused) {
        if (rightPressed) {
            paddleX += 7;
            if (paddleX + paddleWidth > canvas.width) {
                paddleX = canvas.width - paddleWidth;
            }
        }
        else if (leftPressed) {
            paddleX -= 7;
            if (paddleX < 0) {
                paddleX = 0;
            }
        }
        x += dx;
        y += dy;
    }

    requestAnimationFrame(draw);
}
draw();


window.prompt("enter your name");

//var interval = setInterval(draw, 1);
