/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 11:34
 */
define(function () {

	/**
	 * This object performs a very basic kinematics calculations.
	 * The position.x and position.y is updated according to the motion.vx and motion.vy
	 * So only entities containing both a position and a motion component are affected.
	 *
	 * Oh, there's also damping but that's not been resolved very well.
	 *
	 * @param board
	 * @constructor
	 */
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