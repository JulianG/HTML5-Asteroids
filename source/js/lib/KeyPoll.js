/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 11:11
 * Based on @brejep 's KeyPoll script.
 */
define(function () {

	function KeyPoll(target) {
		this.target = target;

		var keys = {};
		this.keys = keys;

		function _onKeyDown(event) {
			//console.log('event.keyCode:' + event.keyCode);
			event.preventDefault();
			keys[event.keyCode] = true;
		}

		function _onKeyUp(event) {
			event.preventDefault();
			if (keys[event.keyCode]) {
				keys[event.keyCode] = null;
				delete keys[event.keyCode];
			}
		}

		this.target.addEventListener("keydown", _onKeyDown);
		this.target.addEventListener("keyup", _onKeyUp);

	}

	KeyPoll.UP = "38";
	KeyPoll.DOWN = "40";
	KeyPoll.LEFT = "37";
	KeyPoll.RIGHT = "39";
	KeyPoll.FIRE = "90";
	KeyPoll.FIRE1 = "88";
	KeyPoll.FIRE2 = "32";

	var api = KeyPoll.prototype;

	api.isDown = function isDown(testKey) {
		for (var keyCode in this.keys) {
			if (keyCode == testKey) {
				return this.keys[testKey];
			}
		}
		return false;
	};

	return KeyPoll;
});