/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll'], function (KeyPoll) {

	function HeroControl(keypoll) {
		this.keypoll = keypoll;
	}

	var api = HeroControl.prototype;

	api.processInput = function processInput(entity, dt) {

		// check which keys are down, and modify the entity.motion object;
		if (entity.motion) {
			var thruster = false;
			var steering = 0;

			if (this.keypoll.isDown(KeyPoll.UP)) thruster = true;

			if (this.keypoll.isDown(KeyPoll.LEFT)) steering = -1;
			if (this.keypoll.isDown(KeyPoll.RIGHT)) steering = 1;

			entity.motion.av = steering;
			//entity.motion.thruster = thruster;

		}

	};

	return HeroControl;
});