/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll'], function (KeyPoll) {

	function SpaceshipControl(config, keypoll) {
		this.config = config;
		this.keypoll = keypoll;
	}

	var api = SpaceshipControl.prototype;

	api.update = function update(entity, dt) {

		// check which keys are down, and modify the entity.motion object;
		if (entity.motion) {
			var thruster = false;
			var steering = 0;
			var fire = false;

			if (this.keypoll.isDown(KeyPoll.UP)) thruster = true;

			if (this.keypoll.isDown(KeyPoll.LEFT)) steering = -this.config.shipSteeringSpeed;
			if (this.keypoll.isDown(KeyPoll.RIGHT)) steering = this.config.shipSteeringSpeed;

			if (this.keypoll.isDown(KeyPoll.FIRE)) fire = true;
			if (this.keypoll.isDown(KeyPoll.FIRE1)) fire = true;
			if (this.keypoll.isDown(KeyPoll.FIRE2)) fire = true;

			entity.motion.av = steering;

			if (thruster) {

				var angle = entity.position.rotation * Math.PI / 180;
				var cosA = Math.cos(angle);
				var sinA = Math.sin(angle);

				var xx = cosA * this.config.shipAcceleration * dt;
				var yy = sinA * this.config.shipAcceleration * dt;

				var vx = entity.motion.vx + xx;
				var vy = entity.motion.vy + yy;
				var speed = Math.sqrt(vx * vx + vy * vy);

				if (speed > this.config.shipMaxSpeed) {
					var m = speed / this.config.shipMaxSpeed;
					vx = vx / m;
					vy = vy / m;
				}

				entity.motion.vx = vx;
				entity.motion.vy = vy;
				entity.motion.damping = 1;
			} else {
				entity.motion.damping = this.config.shipFriction;
			}
			entity.state.thruster = thruster;
		}

	};

	return SpaceshipControl;
});