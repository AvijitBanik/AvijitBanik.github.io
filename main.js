const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(max, min) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Ball(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    if((this.x + this.size) >= width) {
        this.velX = -this.velX;
    }
    if((this.x - this.size) <= 0) {
        this.velX = -this.velX;
    }
    if((this.y + this.size) >= height) {
        this.velY = -this.velY;
    }
    if((this.y - this.size) <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collitionDetect = function() {
    for(let j = 0; j < balls.length; j++) {
        if(!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
        
            if(distance <= this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb('+ random(255,0) +','+ random(255,0) +','+ random(255,0) +')';
            }
        }
    }
}

let balls = [];

while(balls.length < 100) {
    let size = random(20, 10);
    let ball = new Ball(
        random(width - size, size),
        random(height - size, size),
        random(7, -7),
        random(7, -7),
        'rgb('+ random(255,0) +','+ random(255,0) +','+ random(255,0) +')',
        size
    );
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, width, height);

    for(let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collitionDetect();
    }

    requestAnimationFrame(loop);
}

loop();