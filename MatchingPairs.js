document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    const words = ['hat', 'sat', 'rat', 'that', 'mat', 'fat', 'bat', 'cat', 'hat', 'sat', 'rat', 'that',
        'mat', 'fat', 'bat', 'cat'];
    let flippedCards = [];
    let matchedPairs = 0;
    let timerStarted = false;
    let startTime;
    let timerInterval;
    let totalTime; // Variable to store the total time

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const createBoard = () => {
        shuffleArray(words);
        for (let i = 0; i < words.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = words[i];
            card.innerHTML = `<div class="front"></div><div class="back">${words[i]}</div>`;
            grid.appendChild(card);
        }
    };

    const startTimer = () => {
        startTime = new Date().getTime();
        timerStarted = true;
        timerInterval = setInterval(updateTimer, 1000);
    };

    const updateTimer = () => {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000; // in seconds
        console.log(elapsedTime); // You can use this value as needed
        totalTime = elapsedTime; // Update totalTime
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
    };

    const flipCard = e => {
        if (timerStarted) {
            const clickedCard = e.target.closest('.card');
            if (clickedCard && !clickedCard.classList.contains('flipped') && flippedCards.length < 2) {
                clickedCard.classList.add('flipped');
                flippedCards.push(clickedCard);
                if (flippedCards.length === 2) {
                    setTimeout(checkForMatch, 500);
                }
            }
        }
    };

    const checkForMatch = () => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.name === card2.dataset.name) {
            matchedPairs++;
            if (matchedPairs === words.length / 2) {
                stopTimer();
                alert(`Congratulations! You found all the pairs in ${totalTime} seconds!`);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    };

    const restartGame = () => {
        stopTimer();
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        timerStarted = false;
        createBoard();
    };

    startButton.addEventListener('click', () => {
        restartGame();
        startTimer(); // Start the game timer when the "Start Game" button is clicked
    });

    createBoard();

    grid.addEventListener('click', flipCard);
    restartButton.addEventListener('click', restartGame);
});



