let game;
let splashScreen;
let gameScreen;
let bangScreen;
let gameOverScreen;

function buildDom (htmlString) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.children[0];
}

function createSplashScreen () {
    splashScreen = buildDom(`
        <main>
            <h1>Car Rush</h1>
            <button>Ready, Steady, GO...</button>
        </main>
    `);
    document.body.appendChild(splashScreen);
    const startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', startGame);
}

function removeSplashScreen () {
    splashScreen.remove();
}

function createGameScreen () {
    gameScreen = buildDom(`
        <main class="game-container">
        <header>
            <div class="lives">
                <span class="label">Lives:</span>
                <span class="value"></span>
            </div>
            <div class="score">
                <span class="label">Score:</span>
                <span class="value"></span>
            </div>
            <div class="overtaken-cars">
                <span class="label">Overtaken Cars:</span>
                <span class="value"></span>
            </div>
        </header>
        <div class="canvas-container">
            <canvas></canvas>
        </div>
        </main>
    `)
    document.body.appendChild(gameScreen);
    return gameScreen;
}

function removeGameScreen () {
    gameScreen.remove();
}

function createGameOverScreen (score, carsOvertaken) {
    gameOverScreen = buildDom(`
        <main>
            <h1>GAME OVER</h1>
            <h3>You overtook </h3><p class='cars-overtaken'>${Math.floor(carsOvertaken)} cars</p>
            <h3>and reach the score of: </h3><p class='final-score'>${Math.floor(score)} points.</p>
            <button>Race again...</button>
        </main>
    `)
    const button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);
    document.body.appendChild(gameOverScreen);
}

function removeGameOverScreen () {
    gameOverScreen.remove();
}

function startGame () {
    removeSplashScreen();
    if (gameOverScreen) {
        removeGameOverScreen();
    }
    createGameScreen();
    game = new Game(gameScreen);
    game.start();
}

function endGame (score, carsOvertaken) {
    removeGameScreen();
    createGameOverScreen(score, carsOvertaken);
}

window.addEventListener('load', createSplashScreen);