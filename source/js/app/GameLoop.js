/**
 * GameLoop
 * @author Julian
 */
define(function () {

	function GameLoop(game_board, control_sys, motion_sys, collision_sys, timeout_sys, render_sys) {
		this.board = game_board;

		this.controlSystem = control_sys;
		this.motionSystem = motion_sys;
		this.collisionSystem = collision_sys;
		this.timeoutSystem = timeout_sys;
		this.renderSystem = render_sys;
	}

	var api = GameLoop.prototype;

	api.update = function update(dt) {

		this.controlSystem.update(dt);
		this.motionSystem.update(dt);
		this.board.update(dt);
		this.collisionSystem.update(dt);
		this.timeoutSystem.update(dt);
		this.renderSystem.update(dt);
	};

	return GameLoop;

});