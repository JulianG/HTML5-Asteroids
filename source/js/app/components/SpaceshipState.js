/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 18:42
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function SpaceshipState() {
		this.thruster = false;
		this.weapon = null;
		this.thrusterSound = null;
	}

	var api = SpaceshipState.prototype;

	api.update = function update(dt) {
		if (this.weapon && this.weapon.update) {
			this.weapon.update(dt);
		}

		if (this.thrusterSound == null) this.thrusterSound = createjs.Sound.createInstance('thruster');

		if (this.thruster && this.thrusterSound.playState == createjs.Sound.PLAY_FINISHED) {
			this.thrusterSound.play('thruster', 'none', 0, 0, 100);
		}
		if (!this.thruster && this.thrusterSound.playState !== createjs.Sound.PLAY_FINISHED) {
			this.thrusterSound.stop();
		}
	};

	return SpaceshipState;
});