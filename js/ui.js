SnakeGame.UI = (function () {
  function UI(container) {
    this.container = $(container);

    defaultNumRows = 15;
    defaultNumCols = 20;
    this.board = new SnakeGame.Board(defaultNumRows, defaultNumCols);
    this.viewBoard = [];
  }

  UI.prototype.createViewBoard = function () {
    var that = this;
    $(that.container).html("");

    _(15).times(function (r) {
      var $row = $('<section></section>');
      that.container.append($row);
      _(20).times(function (c) {
        $row.append($('<div>'));
      });
    });
  }

  UI.prototype.loadViewBoard = function () {
    var that = this;
    var viewBoard = [];
    var rows = $(that.container).children("section");
    rows.each(function (rowIndex, row) {
      viewBoard[rowIndex] = $(row).children("div");
    });
    that.viewBoard = viewBoard;

    console.log("loaded board:");
    console.log(that.viewBoard);
  }

  UI.prototype.renderBoard = function () {
    var viewBoard = this.viewBoard;

    // add apple
    var apple = this.board.apple;
    var rowIndex = apple[0];
    var colIndex = apple[1];
    var row = viewBoard[rowIndex];
    var tile = $(row).eq(colIndex);
    $(tile).addClass("apple");

    // add snake
    var segments = this.board.snake.segments;
    _.each(segments, function (segment) {
      var rowIndex = segment[0];
      var colIndex = segment[1];

      var row = viewBoard[rowIndex];
      var tile = $(row).eq(colIndex);
      $(tile).addClass("snake");
    });
  };

  UI.prototype.clearTile = function (tileCoord) {
    var viewBoard = this.viewBoard;

    var rowIndex = tileCoord[0];
    var colIndex = tileCoord[1];

    var row = viewBoard[rowIndex]
    var tile = $(row).eq(colIndex);
    $(tile).removeClass();
  }

  UI.prototype.gameOver = function (intervalId) {
    clearInterval(intervalId);
  }

  UI.prototype.play = function () {
    var that = this;

    this.createViewBoard();
    this.loadViewBoard();

    var intervalId = window.setInterval(function () {
      var board = that.board;

      board.step();

      if (board.snake.isDead(board.numRows, board.numCols)) {
        that.gameOver(intervalId);
      } else {
        if (board.snake.hitApple(board.apple)) {
          that.clearTile(board.apple);
          board.eatApple(board.apple);
          board.newApple();
        } else {
          tailToSlice = that.board.sliceTail();
          that.clearTile(tailToSlice);
        }

        that.renderBoard();
      }
    }, 125);

    // listen for keys
    document.addEventListener("keydown", function (e) {
      switch (e.charCode || e.keyCode) {
        // up
        case 38:
          that.board.snake.turn("up");
          break;

        // down
        case 40:
          that.board.snake.turn("down");
          break;

        // left
        case 37:
          that.board.snake.turn("left");
          break;

        // right
        case 39:
          that.board.snake.turn("right");
          break;
      }
    });
  }

  return UI;
})();
