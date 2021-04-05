class Game {
    constructor(gameScreen) {
        this.canvas = null;
        this.ctx = null;
        this.cars = [];
        this.player = null;
        this.gameIsOver = false;
        this.gameScreen = gameScreen;
        this.score = 0;
        this.livesElement = undefined;
        this.scoreElement = undefined;
        this.carsOvertaken = 0;
    }

    start() {
        this.livesElement = this.gameScreen.querySelector('.lives .value');
        this.scoreElement = this.gameScreen.querySelector('.score .value');
        this.carsOvertaken = this.gameScreen.querySelector('.overtaken-cars .value');
        this.canvas = this.gameScreen.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvasContainer = this.gameScreen.querySelector('.canvas-container');
        this.containerWidth = this.canvasContainer.clientWidth;
        this.containerHeight = this.canvasContainer.clientHeight;
        this.canvas.setAttribute('width', 800);
        this.canvas.setAttribute('height', 600);
        this.player = new Player(this.canvas, 5);

        function handleKeyDown(event) {
            if (event.key === "ArrowUp") this.player.setDirection("up");
            else if (event.key === "ArrowDown") this.player.setDirection("down");
          }
          const boundHandleKeyDown = handleKeyDown.bind(this);
          document.body.addEventListener("keydown", boundHandleKeyDown);
          this.startLoop();
        }
       
    startLoop() {
        const loop = () => {
            if (this.cars.length < 6) {
                if (Math.random() > 0.95) {
                    const randomY = Math.floor((this.canvas.height - 20) * Math.random());
                    const newCar = new Car(this.canvas, randomY, 5);
                    this.cars.push(newCar);
                }
            }

            this.checkCollisions();
            this.player.updatePosition();

            this.cars.forEach((car) => {
            if (this.player.carCollided(car)) {
                this.player.lives -= 1;
            }
            });

            this.cars = this.cars.filter((car) => {
                car.updatePosition();
                return car.isInsideScreen();
            });

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.player.draw();
            this.cars.forEach((car) => {
                car.draw();
            });

            if (!this.gameIsOver) {
                window.requestAnimationFrame(loop);
            }

            this.updateGameStats();
        };

        loop();
    }

    checkCollisions() {
        this.cars.forEach((car) => {
            if (this.player.carCollided(car)) {
                this.player.removeLife();
                console.log('lives', this.player.lives);
                car.x = 0 - car.size;
                this.player.speed = 5;
                this.carsOvertaken -= 1;
                if (this.player.lives === 0) {
                    this.gameIsOver();
                }
            }
        });
    }
    gameOver() {
        this.gameIsOver = true;
        endGame(this.score, this.carsOvertaken)
    }

    updateGameStats() {
        this.score += 10;
        this.livesElement.innerHTML = this.player.lives;
        this.scoreElement.innerHTML = this.player.score;
        this.carsOvertaken.innerHTML = this.player.carsOvertaken;
    }
}