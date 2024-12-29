const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#live"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 50,
        countLive: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        playSound("gameover");

        if (state.values.result >= 30) {
            alert("Parabéns! Você fez " + state.values.result + " pontos.");
            resetGame();
        } else {
            alert("Game Over!! O seu resultado foi: " + state.values.result);
            state.values.countLive--;
            state.view.live.textContent = state.values.countLive;
            
            if (state.values.countLive > 0) {
                resetRound();
            } else {
                alert("Você perdeu todas as vidas! Fim de jogo.");
                resetGame();
            }
        }
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function resetRound() {
    state.values.curretTime = 50;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
}

function init(){
    addListenerHitBox();
}

init();