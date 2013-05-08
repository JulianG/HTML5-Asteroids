/**
 * GameLoop
 * @author Julian
 */
define(function () {

	function GameLoop(game_board, control_sys, motion_sys, collision_sys, render_sys) {
		this.board = game_board;

		this.controlSystem = control_sys;
		this.motionSystem = motion_sys;
		this.collisionSystem = collision_sys;
		this.renderSystem = render_sys;
	}

	var api = GameLoop.prototype;

	api.update = function update(dt) {

		this.controlSystem.update(this.board, dt);
		this.motionSystem.update(this.board, dt);
		this.board.update(dt);
		this.collisionSystem.update(this.board, dt);
		this.renderSystem.update(this.board, dt);
	};

	return GameLoop;

});