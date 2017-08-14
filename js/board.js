function Board(squares, colors, player) {
    this.squares = squares;
    this.colors = colors;
    this.player = player;
    this.gameOver = false;
    this.winner = null;
}

Board.prototype.getSquare = function (x, y) {
    if (x >= 0 && x < NUM_COLS && y >= 0 && y < NUM_ROWS) {
        return this.squares[x + y * NUM_COLS];
    } else {
        return null;
    }
};

Board.prototype.nextPlayer = function () {
    this.player ^= 1;
};

Board.prototype.settle = function (j) {
    var unSettled = false;
    for (var i = 0; i < NUM_ROWS - 1; i++) {
        if (board.getSquare(j, (i + 1)).piece == null && board.getSquare(j, i).piece != null) {
            unSettled = true;
            board.getSquare(j, (i + 1)).piece = board.getSquare(j, i).piece;
            board.getSquare(j, i).piece = null;
        }
    }

    if (unSettled) this.settle(j);
};

Board.prototype.checkWin = function () {
    var dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];

    for (square of this.squares) {
        for (dir of dirs) {
            var continuous = true;
            var cursor = [square.col, square.row];

            for (var i = 0; i < 4; i++) {
                var curSquare = board.getSquare(cursor[0], cursor[1]);

                if (curSquare) {
                    if (curSquare.piece !== board.player) continuous = false;

                    cursor[0] += dir[0];
                    cursor[1] += dir[1];
                } else {
                    continuous = false; 
                }
            }

            if (continuous) return board.player;
        }
    }

    return null;
};

Board.prototype.endGame = function (winner) {
    var msg = this.colors[winner].name + ' Wins!';

    this.gameOver = true;
    this.winner = winner;

    fill(0);
    textSize(40);
    text(msg, 25, 720);
};
