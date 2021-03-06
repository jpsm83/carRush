class Pedestrians {
    constructor(canvas, positionX) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.size = 20;
        this.x = positionX;
        this.y = 0;
        this.speed = 5;
        this.img = new Image();
        this.img.src = 'img/kenny.jpg';
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
        this.y += this.speed;
    }

    isInsideScreen() {
        const head = this.y;
        const screenBotton = this.canvas.height;
        const isInside = head < screenBotton;
        return isInside;
    }
}