class Car {
    constructor(canvas, positionY) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.size = 60;
        this.x = this.canvas.width;
        this.y = positionY;
        this.speed = 5;
        this.img = new Image();
        this.img.src = 'img/coche03.jpg';
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