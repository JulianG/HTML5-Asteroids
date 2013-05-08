/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 11:34
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function MotionSystem(board) {
		this.board = board;
	}

	var api = MotionSystem.prototype;

	api.update = function (dt) {
		var n = this.board.entities.length;
		for (var i = 0; i < n; i++) {
			var entity = this.board.entities[i];
			if (entity && entity.active) {
				if (entity.active && entity.motion && entity.position) {
					entity.position.x += entity.motion.vx * dt;
					entity.position.y += entity.motion.vy * dt;
					entity.position.rotation += entity.motion.av * dt;
					//
					if (entity.motion.damping < 1) {
						entity.motion.vx = entity.motion.vx * entity.motion.damping;
						entity.motion.vy = entity.motion.vy * entity.motion.damping;
					}
				}
			}
		}
	};

	return MotionSystem;
});