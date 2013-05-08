/**
 * GameLoop
 * @author Julian
 */
define(function () {

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