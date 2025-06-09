    const gameBoard = document.getElementById("game-board");
    const restartButton = document.getElementById("restart-button");
    const endMessage = document.getElementById("end-msg");
    const hardButton = document.getElementById("hard-button");

    const easycardValues = [
        "images/dog1.png", "images/dog1.png",
        "images/dog2.png", "images/dog2.png",
        "images/dog3.png", "images/dog3.png",
        "images/dog4.png", "images/dog4.png",
        "images/dog5.png", "images/dog5.png",
        "images/dog6.png", "images/dog6.png",
    ];

    const hardcardValues = [
        "images/dog1.png", "images/dog1.png",
        "images/dog2.png", "images/dog2.png",
        "images/dog3.png", "images/dog3.png",
        "images/dog4.png", "images/dog4.png",
        "images/dog5.png", "images/dog5.png",
        "images/dog6.png", "images/dog6.png",
        "images/cat7.png", "images/cat7.png",
        "images/cat8.png", "images/cat8.png",
        "images/cat9.png", "images/cat9.png",
    ]

    let currentcardSet = easycardValues;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
    }
}

    function createBoard() {
        gameBoard.innerHTML = "";
        endMessage.style.display = "none";

         let firstcard = null;
         let secondcard = null;
         let stopclick = false;
         let matchesfound = 0;

        shuffle(currentcardSet);

        for (let i = 0; i < currentcardSet.length; i++) {
            let cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.textContent = "?";
            cardElement.setAttribute("data-value", currentcardSet[i]);

            cardElement.addEventListener("click", function () {
                if (stopclick === true || cardElement.classList.contains("flipped")) {
                    return; }



                cardElement.classList.add("flipped");
                cardElement.innerHTML = "";

                const img = document.createElement("img");
                img.src = cardElement.getAttribute("data-value");
                img.classList.add("card-img");
                cardElement.append(img);

                if (firstcard === null) {
                    firstcard = cardElement;
                } else {
                    secondcard = cardElement;
                    stopclick = true;

                if (firstcard.getAttribute("data-value") === secondcard.getAttribute("data-value")) {

                    matchesfound += 1;
                    if (matchesfound === currentcardSet.length / 2) {
                        endMessage.style.display = "block";
                    }
                    firstcard = null;
                    secondcard = null;
                    stopclick = false;
                } else {
                    setTimeout(function () {
                        firstcard.textContent = "?";
                        secondcard.textContent = "?";
                        firstcard.classList.remove("flipped");
                        secondcard.classList.remove("flipped");

                        firstcard = null;
                        secondcard = null;
                        stopclick = false;
                    }, 800);
                }
            }
});

    gameBoard.append(cardElement);
}
}

createBoard();

function restartGame() {
    currentcardSet = easycardValues;
    gameBoard.style.gridTemplateRows = "repeat(2, 150px)";
    createBoard();
}

function startHardMode() {
    currentcardSet = hardcardValues;
    gameBoard.style.gridTemplateRows = "repeat(3, 150px)";
    createBoard();
}
restartButton.addEventListener("click", restartGame);
hardButton.addEventListener("click", startHardMode);
