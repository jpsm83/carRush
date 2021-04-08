class SpeedUpBox {
    constructor(canvas, positionY) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.size = 30;
        this.x = this.canvas.width;
        this.y = positionY;
        this.speed = 3;
        this.img = new Image();
        this.img.src = 'img/speedUp.jpg'
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
        const backOfSpeedUpBox = this.x + this.size;
        const screenLeft = 0;
        const isInside = backOfSpeedUpBox > screenLeft;
        return isInside;
    }
}