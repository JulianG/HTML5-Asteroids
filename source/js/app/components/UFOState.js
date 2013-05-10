/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 10/05/13
 * Time: 09:13
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function UFOState(board) {
		this.board = board;
		this.entity = null;
		this.weapon = null;

		this.leftLimit = -35;
		this.rightLimit = board.width + 35;
	}

	var api = UFOState.prototype;

	api.handleAdded = function handleAdded(entity) {
		this.entity = entity;
		this.weapon.triggerDown = true;
	};

	api.update = function update(dt) {
		if (!this.entity) return;
		//
		if (this.weapon && this.weapon.update) {
			this.aim(this.weapon);
			this.weapon.update(dt);
		}

		if (Math.random() > 0.99) {
			this.entity.motion.vy = -this.entity.motion.vy;
		}

		if (this.entity.position.x >= this.rightLimit && this.entity.motion.vx > 0) {
			this.board.removeEntity(this.entity);
		}
		if (this.entity.position.x <= this.leftLimit && this.entity.motion.vx < 0) {
			this.board.removeEntity(this.entity);
		}

	};

	api.handleRemoved = function handleRemoved(entity) {

	};

	api.aim = function aim(weapon){
		weapon.rotation = Math.random() * 360;
	};

	return UFOState;
});