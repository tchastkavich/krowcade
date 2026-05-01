var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var ballRadius = 30;

var paddleHeight = 80;
var paddleWidth = 160;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;
    
var brickRowCount = 4;
var brickColumnCount = 6;
var brickWidth = 140;
var brickHeight = 70;
var brickPadding = 20;
var brickOffsetTop = 40;
var brickOffsetLeft = 38;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
bricks[c] = [];
for(r=0; r<brickRowCount; r++) {
bricks[c][r] = { x: 0, y: 0, status: 1 };
}
}

var score = 0;

var lives = 3;

    function drawWalls() {
        ctx.beginPath();
        ctx.rect(0, 0, 1000, 800);
        ctx.strokeStyle = "rgba(255, 255, 255)";
        ctx.stroke();
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.closePath();
        }

        const ballImage = new Image();
        ballImage.src = './images/ball.png';
        
        ballImage.onload = function () {
            draw(); 
        };
        
        function drawBall() {
            if (ballImage.complete) {
                ctx.drawImage(ballImage, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
            } else {
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = "#ffadd2";
                ctx.fill();
                ctx.closePath();
            }
        }
        
const paddleImage = new Image();
paddleImage.src = './images/paddle.png';

paddleImage.onload = function () {
    draw();
};

function drawPaddle() {
    if (paddleImage.complete) {
        ctx.drawImage(paddleImage, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    } else {
       
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#ffadd2"; 
        ctx.fill();
        ctx.closePath();
    }
}

        const brickImage = new Image();
        brickImage.src = './images/brick.png';
        
        brickImage.onload = function () {
            draw();
        };
        
        function drawBricks() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status == 1) {
                        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
        
                       
                        if (brickImage.complete) {
                            ctx.drawImage(brickImage, brickX, brickY, brickWidth, brickHeight);
                        } else {
                            ctx.beginPath();
                            ctx.rect(brickX, brickY, brickWidth, brickHeight);
                            ctx.fillStyle = "#ffadd2";
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            }
        }

            function collisionDetection() {

                for(c=0; c<brickColumnCount; c++) {
                
                for(r=0; r<brickRowCount; r++) {
                
                var b = bricks[c][r];
                
                if(b.status == 1) {
                
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                
                dy = -dy;
                
                b.status = 0;
                
                score++;
                
                if(score == brickRowCount*brickColumnCount) {
                
                alert("YOU WIN, CONGRATULATIONS!");
                
                document.location.reload();
                
                }
                
                }
                
                }
                
                }
                
                }
                
                }
                function drawScore() {

                    ctx.font = "16px Arial";
                    
                    ctx.fillStyle = "#ffadd2";
                    
                    ctx.fillText("Score: "+score, 8, 20);
                    
                    }

                    function mouseMoveHandler(e) {

                        var relativeX = e.clientX - canvas.offsetLeft;
                        
                        if(relativeX > 0 && relativeX < canvas.width) {
                        
                        paddleX = relativeX - paddleWidth/2;
                        }       
                        }

                        function drawLives() {

                            ctx.font = "16px Arial";
                            
                            ctx.fillStyle = "#ffadd2";
                            
                            ctx.fillText("Lives: "+lives, canvas.width-65, 20);
                            
                            }

        function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWalls();        
        drawBall();
        drawPaddle();
        drawBricks();
        collisionDetection();
        drawScore();
        drawLives();
        
        x += dx;
        y += dy;
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
dx = -dx;
}

if(y + dy < ballRadius) {
    dy = -dy;} 
    else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
    dy = -dy;
    }

    else {
lives--;

if(!lives) {

alert("GAME OVER");

document.location.reload();

}

else {

x = canvas.width/2;

y = canvas.height-30;

dx = 2;

dy = -2;

paddleX = (canvas.width-paddleWidth)/2;

}
    }
    }

if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 4;} 
else if(leftPressed && paddleX > 0) {
    paddleX -= 4;}

requestAnimationFrame(draw);
    }


        document.addEventListener("keydown", keyDownHandler, false);

        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {

            if(e.keyCode == 39) {
            
            rightPressed = true;
            
            }
            
            else if(e.keyCode == 37) {
            
            leftPressed = true;
            
            }
            
            }
            
            function keyUpHandler(e) {
            
            if(e.keyCode == 39) {
            
            rightPressed = false;
            
            }
            
            else if(e.keyCode == 37) {
            
            leftPressed = false;
            
            }
            
            }

           // cool but im not using it: document.addEventListener("mousemove", mouseMoveHandler, false);

            draw();



