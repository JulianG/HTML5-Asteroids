/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 16:13
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function TimeoutSystem(board) {
		this.board = board;
	}

	var api = TimeoutSystem.prototype;

	api.update = function update(dt) {
		var n = this.board.entities.length;
		for (var i = 0; i < n; i++) {
			var entity = this.board.entities[i];
			if (entity && entity.active) {
				var t = entity.timeout;
				if (t) {
					t.update(dt);
					if (t.active && t.remainingTime === 0) {
						this.board.removeEntity(entity);
					}
				}
			}
		}
	};

	return TimeoutSystem;
})
;