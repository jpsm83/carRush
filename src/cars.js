class Car {
    constructor(canvas, positionY) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.size = 60;
        this.x = this.canvas.width;
        this.y = positionY;
        this.speed = 5;
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    updatePosition() {
        this.x -= this.speed;
    }

    isInsideScreen() {
        const backOfCar = this.x + this.size;
        const screenLeft = 0;
        const isInside = backOfCar > screenLeft;
        return isInside;
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
}