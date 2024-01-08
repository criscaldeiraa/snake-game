let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

// event listener - alerted once the html is loaded to watch for clicks on the keyboard
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
});

// createBoard function
function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}

// startGame function
function startGame() {
    // get all the divs from the createBoard function
    let squares = document.querySelectorAll(".grid div");
    // let's choose a random place for the apple to appear
    randomApple(squares);
    //random apple
    direction = 1; // refers to where the snake is headed
    scoreDisplay.innerHTML = score;
    intervalTime = 700; // sets the time it takes for the snake to move around
    currentSnake = [2, 1, 0]; // where exactly on the grid the snake will be
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake")); // To display our snake on the screen, we will loop over
    interval = setInterval(moveOutcome, intervalTime); //
}

// moveOutcome function - every 1s - to check when the game is over because the snake has hit the walls
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        // check if the snake hit the wall and restart the game
        // alert("you hit something");
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        // if not, the game goes on
        moveSnake(squares);
    }
}

// moveSnake function
    // squares refers to the .div grid
function moveSnake(squares) {
    // to make the snake move, pop one value the last square, and unshift a new value in the beggining of the array
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    // movement ends here
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

// checkForHits function
function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}

// eatApple function - is called from the moveSnake function, every time the snake moves
function eatApple(squares, tail) {
    // checks if the next position our snake moves to contains an apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
        // first, remove the apple
        squares[currentSnake[0]].classList.remove("apple");
        // add a new square to the snake
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        // add a new apple to the board
        randomApple(squares);
        // increase the score
        score++;
        scoreDisplay.textContent = score;
        // clear the interval, and add speed to the snake
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

// randomApple function - it picks a location for the apple using a do while loop
function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length); // choose a random position
    } while (squares[appleIndex].classList.contains("snake"));
        squares[appleIndex].classList.add("apple"); // it adds a class of apple to the grid
}

// set up controls
function control(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    if (keyPressed === RIGHT_KEY) {
        direction = 1; // right
    } else if (keyPressed === UP_KEY) {
        direction = -width; //if we press the up arrow, the snake will go ten divs up
    } else if (keyPressed === LEFT_KEY) {
        direction = -1; // left, the snake will go left one div
    } else if (keyPressed === DOWN_KEY) {
        direction = +width; // down the snake head will instantly appear 10 divs below from the current div
    }
}

up.addEventListener("click", () => (direction = -width));
bottom.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));

// replay function
function replay() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}

