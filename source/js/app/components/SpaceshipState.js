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
	function SpaceshipState(max_speed, acceleration, friction) {
		this.entity = null;
		this.thruster = false;
		this.weapon = null;
		this.thrusterSound = null;

		this.shipMaxSpeed = max_speed;
		this.shipAcceleration = acceleration;
		this.shipFriction = friction;
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

		if (this.thruster) {

			var angle = this.entity.position.rotation * Math.PI / 180;
			var cosA = Math.cos(angle);
			var sinA = Math.sin(angle);

			var xx = cosA * this.shipAcceleration * dt;
			var yy = sinA * this.shipAcceleration * dt;

			var vx = this.entity.motion.vx + xx;
			var vy = this.entity.motion.vy + yy;
			var speed = Math.sqrt(vx * vx + vy * vy);

			if (speed > this.shipMaxSpeed) {
				var m = speed / this.shipMaxSpeed;
				vx = vx / m;
				vy = vy / m;
			}
			this.entity.motion.vx = vx;
			this.entity.motion.vy = vy;
			this.entity.motion.damping = 1;
		} else {
			this.entity.motion.damping = this.shipFriction;
		}
	};


	api.handleRemoved = function handleRemoved(entity) {
	};

	return SpaceshipState;
});