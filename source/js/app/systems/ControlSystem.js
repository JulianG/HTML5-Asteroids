/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:04
 */
define(function () {

	/**
	 * Well this one is very simple. It calls the update method on the control component of each entity that has a control component.
	 * @param board
	 * @constructor
	 */
	function ControlSystem(board) {
		this.board = board;
	}

	var api = ControlSystem.prototype;

	api.update = function update(dt) {
		var n = this.board.entities.length;
		for (var i = 0; i < n; i++) {
			var entity = this.board.entities[i];
			if (entity && entity.active) {
				if (entity.control) {
					entity.control.update(entity, dt);
				}
			}
		}
	};

	return ControlSystem;
});