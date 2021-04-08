class Player {
    constructor(canvas, lives) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.lives = lives;
        this.size = 60;
        this.x = 50;
        this.y = this.canvas.height / 2 - this.size / 2;
        this.directionX = 0;
        this.directionY = 0;
        this.speed = 5;
        this.img = new Image();
        this.img.src = 'img/player.jpg';
    }

    setDirection(directionY, directionX) {
        if (directionY === 'up') {
            this.directionY = -1;
        } else
        if (directionY === 'down') {
            this.directionY = 1;
        } else
        if (directionX === 'left') {
            this.directionX = -1;
        } else
        if (directionX === 'right') {
            this.directionX = 1;
        }
    }

    updatePosition() {
        this.y += this.directionY * this.speed;
        this.x += this.directionX * this.speed;
    }

    screenEdges() {
        const screenTop = 0;
        const screenBottom = this.canvas.height;
        const screenLeft = 0;
        const screenRight = this.canvas.width;
        const playerTop = this.y;
        const playerBack = this.x;
        const playerBottom = this.y + this.size;
        const playerFront = this.x + this.size;
        if (playerBottom >= screenBottom) this.setDirection("up", '');
        else if (playerTop <= screenTop) this.setDirection("down", '');
        else if (playerFront >= screenRight) this.setDirection('', 'left');
        else if (playerBack <= screenLeft) this.setDirection('', 'right');
    }

    removeLife() {
        this.lives -= 1;
    }

    draw() {
        if (this.img) {
            this.ctx.drawImage(
                this.img, this.x, this.y, this.size, this.size
            )
        } else {
        this.ctx.fillStyle = '#006400';
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    carOvertaken(car) {
        const playerLeft = this.x;
        const carRight = car.x + car.size;
        if (playerLeft >= carRight && this.carCollided(car) === false) {
            return true;
        } else {
            return false;
        }
    }

    carCollided(car) {
        const playerLeft = this.x;
        const playerRight = this.x + this.size;
        const playerTop = this.y;
        const playerBottom = this.y + this.size;

        const carLeft = car.x;
        const carRight = car.x + car.size;
        const carTop = car.y;
        const carBottom = car.y + car.size;

        const crossLeft = carLeft <= playerRight && carLeft >= playerLeft;
        const crossRight = carRight >= playerLeft && carRight <= playerRight;
        const crossBottom = carBottom >= playerTop && carBottom <= playerBottom;
        const crossTop = carTop <= playerBottom && carTop >= playerTop;
    
        if ((crossLeft || crossRight) && (crossTop || crossBottom)){
            return true;
        } else {
            return false
        }
    }

    pedestrianCollided(pedestrian) {
        const playerLeft = this.x;
        const playerRight = this.x + this.size;
        const playerTop = this.y;
        const playerBottom = this.y + this.size;

        const pedestrianLeft = pedestrian.x;
        const pedestrianRight = pedestrian.x + pedestrian.size;
        const pedestrianTop = pedestrian.y;
        const pedestrianBottom = pedestrian.y + pedestrian.size;

        const crossLeft = pedestrianLeft <= playerRight && pedestrianLeft >= playerLeft;
        const crossRight = pedestrianRight >= playerLeft && pedestrianRight <= playerRight;
        const crossBottom = pedestrianBottom >= playerTop && pedestrianBottom <= playerBottom;
        const crossTop = pedestrianTop <= playerBottom && pedestrianTop >= playerTop;
    
        if ((crossLeft || crossRight) && (crossTop || crossBottom)){
            return true;
        } else {
            return false
        }
    }

    speedUp(SpeedUpBox) {
        const playerLeft = this.x;
        const playerRight = this.x + this.size;
        const playerTop = this.y;
        const playerBottom = this.y + this.size;

        const speedUpLeft = SpeedUpBox.x;
        const speedUpRight = SpeedUpBox.x + SpeedUpBox.size;
        const speedUpTop = SpeedUpBox.y;
        const speedUpBottom = SpeedUpBox.y + SpeedUpBox.size;

        const crossLeft = speedUpLeft <= playerRight && speedUpLeft >= playerLeft;
        const crossRight = speedUpRight >= playerLeft && speedUpRight <= playerRight;
        const crossBottom = speedUpBottom >= playerTop && speedUpBottom <= playerBottom;
        const crossTop = speedUpTop <= playerBottom && speedUpTop >= playerTop;
    
        if ((crossLeft || crossRight) && (crossTop || crossBottom)){
            return true;
        } else {
            return false
        }
    }

    speedDown(SpeedDownBox) {
        const playerLeft = this.x;
        const playerRight = this.x + this.size;
        const playerTop = this.y;
        const playerBottom = this.y + this.size;

        const speedDownLeft = SpeedDownBox.x;
        const speedDownRight = SpeedDownBox.x + SpeedDownBox.size;
        const speedDownTop = SpeedDownBox.y;
        const speedDownBottom = SpeedDownBox.y + SpeedDownBox.size;

        const crossLeft = speedDownLeft <= playerRight && speedDownLeft >= playerLeft;
        const crossRight = speedDownRight >= playerLeft && speedDownRight <= playerRight;
        const crossBottom = speedDownBottom >= playerTop && speedDownBottom <= playerBottom;
        const crossTop = speedDownTop <= playerBottom && speedDownTop >= playerTop;
    
        if ((crossLeft || crossRight) && (crossTop || crossBottom)){
            return true;
        } else {
            return false
        }
    }
}