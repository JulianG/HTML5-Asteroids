/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:04
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function ControlSystem(board) {
		this.board = board;
	}

	var api = ControlSystem.prototype;

	api.update = function update(dt) {
		//console.log('ControlSystem.processInput...' );

		var n = this.board.entities.length;
		for (var i = 0; i < n; i++) {
			var entity = this.board.entities[i];
			if (entity) {
				if (entity.control) {
					entity.control.update(entity, dt);
				}
			}
		}
	};

	return ControlSystem;
});