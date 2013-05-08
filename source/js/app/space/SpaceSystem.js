/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 18:49
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function SpaceSystem(board) {
		this.board = board;
	}

	var api = SpaceSystem.prototype;

	api.update = function update(dt) {

		var n = this.board.entities.length;
		for (i = 0; i < n; i++) {
			var entity = this.board.entities[i];
			if (entity.position) {
				this._wrapAround(entity.position);
			}
		}
	};

	api._wrapAround = function _wrapAround(position) {
		if (position.x > this.boardwidth + this.boardwrapMargin) {
			position.x = position.x - this.boardwidth - this.boardwrapMargin * 2;
		}
		if (position.x < -this.boardwrapMargin) {
			position.x = position.x + this.boardwidth + this.boardwrapMargin * 2;
		}
		if (position.y > this.boardheight + this.boardwrapMargin) {
			position.y = position.y - this.boardheight - this.boardwrapMargin * 2;
		}
		if (position.y < -this.boardwrapMargin) {
			position.y = position.y + this.boardheight + this.boardwrapMargin * 2;
		}
	}

	return SpaceSystem;
});