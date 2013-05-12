/**
 * GameLoop
 * @author Julian
 */
define(function () {

	/**
	 * This object keeps a list of Systems (any object with an update method).
	 * When the update method is called, it calls each system's update method.
	 * That's all.
	 *
	 * @constructor
	 */
	function GameLoop() {
		this.systems = [];
	}

	var api = GameLoop.prototype;

	api.addSystem = function addSystem(system) {
		if (!system.update) {
			throw("Systems must declare an update method.");
		}
		this.systems.push(system);
	};

	api.update = function update(dt) {

		var n = this.systems.length;
		for (var i = 0; i < n; i++) {
			var sys = this.systems[i];
			sys.update(dt);
		}
	};

	return GameLoop;

});