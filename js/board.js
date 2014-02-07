SnakeGame.Board = (function () {
  function Board(numRows, numCols) {
    var that = this;

    this.numRows = numRows;
    this.numCols = numCols;
    this.snake = new SnakeGame.Snake(parseInt(numRows / 2), Math.floor(numCols / 2));
    this.grid = [];
    this.apple = [2, 3];

    // generate grid
    _(numRows).times(function (r) {
      that.grid[r] = [];
      _(numCols).times(function (c) {
        that.grid[r][c] = null;
      });
    });
  }

  Board.prototype.newApple = function () {
    var that = this;
    var row = parseInt(Math.random() * (that.numRows));
    var col = parseInt(Math.random() * (that.numCols));
    that.apple = [row, col];
  }

  Board.prototype.eatApple = function () {
    that = this;
    that.apple = [];
  }

  Board.prototype.sliceTail = function () {
    var tailSlice = this.snake.segments.pop();
    return tailSlice;
  }

  Board.prototype.step = function () {
    var segments = this.snake.segments;
    var head = segments[0];
    var direction = this.snake.direction;
    var newHead = [head[0] + direction[0], head[1] + direction[1]];

    this.snake.segments.unshift(newHead);
  }

  return Board;
})();
