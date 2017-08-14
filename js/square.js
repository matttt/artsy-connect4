function Square(col, row) {
    this.row = row;
    this.col = col;
    this.x = col * l;
    this.y = row * l;
    this.piece = null;
}

Square.prototype.isPointInside = function (x, y) {
    return collidePointRect(x, y, this.col * l, this.row * l, l, l);
};

Square.prototype.isXInSameCol = function (x) {
    return collidePointRect(x, 50, this.col * l, 0, l, 800);
};

Square.prototype.draw = function () {
    var circleX = this.x + l / 2 + 2;
    var circleY = this.y + l / 2 + 5;

    function c(p, a) { //get color of player 'p' with alpha 'a'
        var c_ = board.colors[p].rgb;
        c_[3] = a || 55;

        return c_;
    }

    if (this.piece !== null) {
        fill(c(this.piece));
    } else if (this.isXInSameCol(mouseX) && !board.gameOver && this.row === 0) {
        fill(c(board.player));
    } else if (board.gameOver && this.piece === null) {
        var offset = (this.col + this.row * NUM_COLS) * 5;
        var alpha = sin(frameCount / 10 + offset) * 50 + 60;

        fill(255);
        ellipse(circleX, circleY, l * .8, l * .8);
        fill(c(board.winner, alpha));
    } else {
        fill(255, 55);
    }

    ellipse(circleX, circleY, l * .8, l * .8);
};

