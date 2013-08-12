SnakeGame.Snake = (function () {
	function Snake(startRow, startCol) {
		var that = this;

		this.segments = [];
		this.direction = [1, 0];

		// generate snake
		var numSegments = 3;
		_(numSegments).times(function (n) {
			that.segments[n] = ([startRow, startCol - n]);
		});
	}

	Snake.prototype.turn = function (directionStr) {
		switch (directionStr) {
			case "up":
				if (this.direction[0] !== 1) {
					this.direction = [-1, 0];
					// console.log("up");
				}
				break;
			case "down":
				if (this.direction[0] !== -1) {
					this.direction = [1, 0];
					// console.log("down");
				}
				break;
			case "left":
				if (this.direction[1] !== 1) {
					this.direction = [0, -1];
					// console.log("left");
				}
				break;
			case "right":
				if (this.direction[1] !== -1) {
					this.direction = [0, 1];
					// console.log("right");
				}
				break;
		}
	}

	Snake.prototype.eatApple = function (appleCoord) {
		var that = this;
		that.apple = [];
	}

	Snake.prototype.hitApple = function (appleCoord) {
		var that = this;
		var appleRow = appleCoord[0];
		var appleCol = appleCoord[1];

		var hitApple = _(this.segments).some(function (segment) {
			var segRow = segment[0], segCol = segment[1];
			return (segRow ===  appleRow && segCol === appleCol);
		});
		return hitApple;
	}

	Snake.prototype.isDead = function (numRows, numCols) {
		var that = this;
		var head = that.segments[0];
		var row = head[0], col = head[1];

		var isDead = (row < 0 || row > numRows - 1 || col < 0 || col > numCols - 1);
		return isDead;
	}

	return Snake;
})();
