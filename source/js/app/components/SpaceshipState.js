/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 18:42
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function SpaceshipState() {
		this.thrust = false;
		this.weapon = null;
	}

	var api = SpaceshipState.prototype;

	api.update = function update(dt) {

		// handle thruster and weapon
	};

	return SpaceshipState;
});