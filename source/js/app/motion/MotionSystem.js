/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 11:34
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function MotionSystem() {

	}

	var api = MotionSystem.prototype;

	api.update = function (board, dt) {
		var n = board.entities.length;
		for (var i = 0; i < n; i++) {
			var entity = board.entities[i];
			if (entity.active && entity.motion && entity.position) {
				entity.position.x += entity.motion.vx * dt;
				entity.position.y += entity.motion.vy * dt;
				entity.position.rotation += entity.motion.av * dt;
				//
				//damping
				entity.motion.vx = entity.motion.vx * entity.motion.damping * dt;
				entity.motion.vy = entity.motion.vy * entity.motion.damping * dt;
			}
		}
	}

	return MotionSystem;
});