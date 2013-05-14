/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 18:42
 */
define(function () {

	/**
	 * Used by the StateSystem
	 * @constructor
	 */
	function SpaceshipState() {
		this.entity = null;
		this.thruster = false;
		this.weapon = null;
		this.thrusterSound = null;
	}

	var api = SpaceshipState.prototype;

	api.handleAdded = function handleAdded(entity) {
		this.entity = entity;
	};

	api.update = function update(dt) {
		if (this.weapon && this.weapon.update) {
			this.weapon.rotation = this.entity.position.rotation;
			this.weapon.update(dt);
		}

		if (this.thrusterSound === null) this.thrusterSound = createjs.Sound.createInstance('thruster');

		if (this.thruster && this.thrusterSound.playState == createjs.Sound.PLAY_FINISHED) {
			this.thrusterSound.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 100);
		}
		if (!this.thruster && this.thrusterSound.playState !== createjs.Sound.PLAY_FINISHED) {
			this.thrusterSound.stop();
		}
	};

	api.handleRemoved = function handleRemoved(entity) {
	};

	return SpaceshipState;
});