class Player {
    constructor(canvas, lives) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.lives = lives;
        this.size = 60;
        this.x = 50;
        this.y = this.canvas.height - this.size / 2;
        this.direction = 0;
        this.speed = 5;
    }

    setDirection(direction) {
        if (direction === 'up') {
            this.direction = -1;
        } else
        if (direction === 'down') {
            this.direction = 1;
        }
    }

    updatePosition() {
        this.y =+ this.direction * this.speed;
    }

    screenEdges() {
        const screenTop = 0;
        const screenBotton = this.canvas.height;
        const playerTop = this.y;
        const playerBotton = this.y - this.size;

        if (playerTop <= screenTop) {
            this.y = 0;
        } else
        if (playerBotton >= screenBotton) {
            this.y = this.canvas.height;
        }

        // if (playerBottom >= screenBottom) this.setDirection("up");
        // else if (playerTop <= screenTop) this.setDirection("down");
    }

    removeLife() {
        this.lives =- 1;
    }

    increaseSpeed() {
        if (this.speed < 20) {
            this.speed += 5;
        } else {
            this.speed = 20;
        }
    }

    decreaseSpeed() {
        if (this.speed > 5) {
            this.speed -= 5;
        } else {
            this.speed = 5;
        }
    }

    draw() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    carOvertaken(car) {
        const playerLeft = this.x;
        const carRight = car.x + car.size;
        if (playerLeft > carRight && carCollided === false) {
            this.game.carsOvertaken += 1;
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

        const crossVertical = playerBottom >= carTop && playerTop < carTop || playerTop <= carBottom && playerBottom > carBottom;
        const crossHorrizontal = playerLeft >= carRight && playerRight < carRight || playerRight <= carLeft && playerLeft > carLeft;

        if (crossHorrizontal && crossVertical) {
            return true;
        } else {
            return false;
        }
    }

    pedestrianCollided(pedestrians) {
        const playerLeft = this.x;
        const playerRight = this.x + this.size;
        const playerTop = this.y;
        const playerBottom = this.y + this.size;

        const carLeft = pedestrians.x;
        const carRight = pedestrians.x + pedestrians.size;
        const carTop = pedestrians.y;
        const carBottom = pedestrians.y + pedestrians.size;

        const crossVertical = playerBottom >= carTop && playerTop < carTop || playerTop <= carBottom && playerBottom > carBottom;
        const crossHorrizontal = playerLeft >= carRight && playerRight < carRight || playerRight <= carLeft && playerLeft > carLeft;

        if (crossHorrizontal && crossVertical) {
            return true;
        } else {
            return false;
        }
    }
}