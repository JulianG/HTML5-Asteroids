/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:04
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function ControlSystem() {

	}

	var api = ControlSystem.prototype;

	api.update = function update(board, dt) {
		//console.log('ControlSystem.processInput...' );

		var n = board.entities.length;
		for (var i = 0; i < n; i++) {
			var entity = board.entities[i];
			if (entity) {
				if (entity.control) {
					entity.control.update(entity, dt);
				}
			}
		}
	};

	return ControlSystem;
});