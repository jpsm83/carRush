class Pedestrians {
    constructor(canvas, speed) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.size = 30;
        this.x = this.canvas.width;
        this.y = this.canvas.height;
        this.speed = speed;
    }

    draw() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillReact(this.x, this.y, this.size, this.size);
    }

    updatePosition() {
        this.x -= this.speed;
        this.y += this.speed;
    }

    isInsideScreen() {
        const righttArm = this.x + this.size;
        const head = this.y - this.size;
        const screenLeft = 0;
        const screenBotton = this.canvas.height;
        const isInside = righttArm > screenLeft && head < screenBotton;
        return isInside;
    }
}