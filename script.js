    const gameBoard = document.getElementById("game-board"); 
    const restartButton = document.getElementById("restart-button");
    const endMessage = document.getElementById("end-msg");
    const hardButton = document.getElementById("hard-button");
    //allows to interact with parts of the webpage, and then storing them in the elements
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
    //had to use chatgpt for specific shuffling function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
    }
}
//creating and reseting the game board and card matching pairs
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
        //stores card values before waiting for user interaction
            cardElement.addEventListener("click", function () {
                if (stopclick === true || cardElement.classList.contains("flipped")) {
                    return; }



                cardElement.classList.add("flipped");
                cardElement.innerHTML = "";
        //setting img as data/ card value
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
        //comparing the first and second cards that were clicked, and increasing match counter
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
        //returning to original non flipped class if not matched
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
//sets the game modes for the buttons, their functions and responses
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
