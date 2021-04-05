class Car {
    constructor(canvas, positionY, speed) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.size = 60;
        this.x = this.canvas.width;
        this.y = positionY;
        this.speed = speed;
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillReact(this.x, this.y, this.size, this.size);
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
}