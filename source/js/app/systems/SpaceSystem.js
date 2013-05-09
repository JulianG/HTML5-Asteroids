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
		if (position.x > this.board.width + this.board.wrapMargin) {
			position.x = position.x - this.board.width - this.board.wrapMargin * 2;
		}
		if (position.x < -this.board.wrapMargin) {
			position.x = position.x + this.board.width + this.board.wrapMargin * 2;
		}
		if (position.y > this.board.height + this.board.wrapMargin) {
			position.y = position.y - this.board.height - this.board.wrapMargin * 2;
		}
		if (position.y < -this.board.wrapMargin) {
			position.y = position.y + this.board.height + this.board.wrapMargin * 2;
		}
	};

	return SpaceSystem;
});