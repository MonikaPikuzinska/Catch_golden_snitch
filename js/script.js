const clouds = document.querySelectorAll('.cloud');
const scoreBoard = document.querySelector('.score');
const snitches = document.querySelectorAll('.snitch');
let lastcloud;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomcloud(clouds) {
    const idx = Math.floor(Math.random() * clouds.length);
    const cloud = clouds[idx];
    if (cloud === lastcloud) {
        console.log('Ah nah thats the same one bud');
        return randomcloud(clouds);
    }
    lastcloud = cloud;
    return cloud;
}

function peep() {
    const time = randomTime(200, 1500);
    const cloud = randomcloud(clouds);
    cloud.classList.add('up');
    setTimeout(() => {
        cloud.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

snitches.forEach(snitch => snitch.addEventListener('click', bonk));