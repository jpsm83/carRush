class Pedestrians {
    constructor(canvas, positionX) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.size = 30;
        this.x = positionX;
        this.y = this.canvas.height;
        this.speed = 5;
    }

    draw() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillReact(this.x, this.y, this.size, this.size);
    }

    updatePosition() {
        this.y += this.speed;
    }

    isInsideScreen() {
        const head = this.y;
        const foot = this.y + this.size;
        const screenBotton = this.canvas.height;
        const isInside = head < foot;
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