/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, winning;

winning = 100;

init();

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice '</em>';

document.querySelector(".btn-roll").addEventListener("click", function () {
    // 1. random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. display result
    let diceDOM = document.querySelector(".dice");
    diceDOM.src = "dice-" + dice + ".png";

    // 3. update the round score if the rolled number is NOT 1
    if (dice !== 1) {
        // add score
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        document.querySelector(".dice").style.display = "block";
    } else {
        // next player
        resetUI();
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    // 1. add current score to global score
    scores[activePlayer] += roundScore;

    // 2. update the ui
    document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];

    // 3. check if player won the game
    if (scores[activePlayer] >= winning) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice").style.display = "none";
        document
            .querySelector(".player-" + activePlayer + "-panel")
            .classList.add("winner");
        document
            .querySelector(".player-" + activePlayer + "-panel")
            .classList.remove("active");
        document.querySelector(".btn-hold").disabled = true;
        document.querySelector(".btn-roll").disabled = true;
    } else {
        resetUI();
    }
});

function resetUI() {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    setTimeout(function () {
        document.querySelector(".dice").style.display = "none";
    }, 500);
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    let player1 = document.querySelector("#name-0");
    let player2 = document.querySelector("#name-1");

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    player1.textContent = "Player1";
    player2.textContent = "Player2";
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
}
