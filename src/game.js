class Game {
    constructor(gameScreen) {
        this.canvas = null;
        this.ctx = null;
        this.cars = [];
        this.pedestrians = [];
        this.speedUpBox = [];
        this.speedDownBox = [];
        this.player = null;
        this.gameIsOver = false;
        this.gameScreen = gameScreen;
        this.score = 0;
        this.carsOvertaken = 0;
        this.livesElement = undefined;
        this.scoreElement = undefined;
        this.carsOvertakenElement = undefined;
    }

    start() {
        this.livesElement = this.gameScreen.querySelector('.lives .value');
        this.scoreElement = this.gameScreen.querySelector('.score .value');
        this.carsOvertakenElement = this.gameScreen.querySelector('.overtaken-cars .value');
        this.canvas = this.gameScreen.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvasContainer = this.gameScreen.querySelector('.canvas-container');
        this.containerWidth = this.canvasContainer.clientWidth;
        this.containerHeight = this.canvasContainer.clientHeight;
        this.canvas.setAttribute("width", this.containerWidth);
        this.canvas.setAttribute("height", this.containerHeight);
        this.player = new Player(this.canvas, 5);

        const handleKeyDown = (event) => {
            if (event.key === "ArrowUp") this.player.setDirection("up", '');
            else if (event.key === "ArrowDown") this.player.setDirection("down", '');
            else if (event.key === "ArrowLeft") this.player.setDirection("", 'left');
            else if (event.key === "ArrowRight") this.player.setDirection("", 'right');
          }
          document.body.addEventListener("keydown", handleKeyDown);
          this.startLoop();
        }
       
    startLoop() {
        const loop = () => {
            if (this.cars.length < 4) {
                if (Math.random() > 0.98) {
                    const randomY = Math.floor((this.canvas.height - 60) * Math.random());
                    const newCar = new Car(this.canvas, randomY);
                    this.cars.push(newCar);
                }
            }
            if (this.speedUpBox.length < 2) {
                if (Math.random() > 0.99) {
                    const randomY = Math.floor((this.canvas.height - 30) * Math.random());
                    const newSpeedUpBox = new SpeedUpBox(this.canvas, randomY);
                    this.speedUpBox.push(newSpeedUpBox);
                }
            }
            if (this.speedDownBox.length < 2) {
                if (Math.random() > 0.99) {
                    const randomY = Math.floor((this.canvas.height - 30) * Math.random());
                    const newSpeedDownBox = new SpeedDownBox(this.canvas, randomY);
                    this.speedDownBox.push(newSpeedDownBox);
                }
            }
            if (this.pedestrians.length < 2) {
                if (Math.random() > 0.98) {
                    const randomX = Math.floor((this.canvas.width - 20) * Math.random());
                    const newPedestrian = new Pedestrians(this.canvas, randomX);
                    this.pedestrians.push(newPedestrian);
                }
            }
            this.checkCollisions();
            // this.checkCarOvertaken();
            this.checkSpeedDown();
            this.checkSpeedUp();
            this.player.updatePosition();
            this.player.screenEdges();
            this.cars = this.cars.filter((car) => {
                car.updatePosition();
                if (car.isInsideScreen() === false) {
                    this.carsOvertaken += 1;
                }
                this.pointsScore()
                return car.isInsideScreen();
            });
            this.speedUpBox = this.speedUpBox.filter((boxUp) => {
                boxUp.updatePosition();
                return boxUp.isInsideScreen();
            });
            this.speedDownBox = this.speedDownBox.filter((boxDown) => {
                boxDown.updatePosition();
                return boxDown.isInsideScreen();
            });
            this.pedestrians = this.pedestrians.filter((people) => {
                people.updatePosition();
                return people.isInsideScreen();
            });
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.player.draw();
            this.cars.forEach((car) => {
                car.draw();
            });
            this.speedUpBox.forEach((boxUp) => {
                boxUp.draw();
            });
            this.speedDownBox.forEach((boxDown) => {
                boxDown.draw();
            });
            this.pedestrians.forEach((people) => {
                people.draw();
            });
            if (!this.gameIsOver) {
                window.requestAnimationFrame(loop);
            }
            this.updateGameStats();
        }
        loop();
    }

    pointsScore() {
        if (this.player.speed === 5) {
            this.score += 0.01;
        } else
        if (this.player.speed === 6) {
            this.score += 0.015;
        } else
        if (this.player.speed === 7) {
            this.score += 0.02;
        } else
        if (this.player.speed === 8) {
            this.score += 0.025;
        } else
        if (this.player.speed === 9) {
            this.score += 0.03;
        } else
        if (this.player.speed === 10) {
            this.score += 0.035;
        }
    }

    murderer() {
        let murderer = document.createElement('h4');
        murderer.innerHTML = '* * * YOU KILLED KENNY... BASTARD...* * *';
        document.body.appendChild(murderer);
        setTimeout(() => {
            murderer.remove();
        }, 1500);
    }

    createBang() {
        let bang = document.createElement('h4');
        bang.innerHTML = '* * * BANG * * *';
        document.body.appendChild(bang);
        setTimeout(() => {
            bang.remove();
        }, 1500);
    }
        
    checkCollisions() {
        this.cars.forEach((car) => {
            if (this.player.carCollided(car)) {
                this.createBang();
                this.player.removeLife();
                car.x = 0 - car.size;
                if (this.player.lives === 0) {
                    this.gameOver();
                }
            }
        });
        this.pedestrians.forEach((pedestrian) => {
            if (this.player.pedestrianCollided(pedestrian)) {
                this.murderer();
                this.player.speed = 5;
            }
        });
    }

    checkSpeedUp() {
        this.speedUpBox.forEach((boxUp) => {
            if (this.player.speedUp(boxUp)) {
                if (this.player.speed < 11) {
                    this.player.speed += 1;
                } else {
                    this.player.speed = 10;
                }
            }
        });
    }

    checkSpeedDown() {
        this.speedDownBox.forEach((boxDown) => {
            if (this.player.speedUp(boxDown)) {
                if (this.player.speed > 5) {
                    this.player.speed -= 1;
                } else {
                    this.player.speed = 5;
                }
            }
        });
    }

    gameOver() {
        this.gameIsOver = true;
        endGame(this.score, this.carsOvertaken)
    }

    updateGameStats() {
        this.livesElement.innerHTML = this.player.lives;
        this.scoreElement.innerHTML = Math.floor(this.score);
        this.carsOvertakenElement.innerHTML = Math.floor(this.carsOvertaken);
    }
}