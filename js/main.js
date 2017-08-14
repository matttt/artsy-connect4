const P_ONE = 0;
const P_TWO = 1;
const NUM_ROWS = 6;
const NUM_COLS = 7;

const COLORS = [
    {
        rgb: [251, 50, 50],
        name: 'Red'
    },
    {
        rgb: [255, 187, 0],
        name: 'Yellow'
    }
];

var board = null;
var l = null; //for side length of square

function mousePressed() {
    if (!board.gameOver) {
        for (square of board.squares) {
            if (square.isPointInside(mouseX, mouseY)) {
                var topSquare = board.getSquare(square.col, 0);
                if (topSquare.piece === null) {
                    topSquare.piece = board.player;
                    board.settle(square.col);

                    var winner = board.checkWin();

                    if (winner != null) {
                        board.endGame(winner);
                    } else {
                        board.nextPlayer();
                    }
                }
            }
        }
    }
}

function setup() {
    createCanvas(800, 800);
    strokeWeight(2);

    l = width / NUM_COLS;

    var squares = [];

    for (var j = 0; j < NUM_ROWS; j++) {
        for (var i = 0; i < NUM_COLS; i++) {
            squares.push(new Square(i, j));
        }
    }

    board = new Board(squares, COLORS, P_ONE);
}

function draw() {
    for (square of board.squares) {
        square.draw();
    }
}
