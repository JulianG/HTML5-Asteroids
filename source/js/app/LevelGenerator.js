/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 11:55
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function LevelGenerator(factory) {
		this.factory = factory;
	}

	var api = LevelGenerator.prototype;

	api.buildLevel = function buildLevel(position, num_asteroids, asteroid_speed, asteroid_av) {
		var list = [];
		for (var i = 0; i < num_asteroids; i++) {
			target_center = (i % 3 == 0); // one in three asteroids move towards the center
			var asteroid = this.getAsteroid(position, asteroid_speed, asteroid_av, target_center);
			list.push(asteroid);
		}
		return list;
	};

	api.getAsteroid = function getAsteroid(position, speed, av, target_center) {
		var asteroid = this.factory.createAsteroid(3);
		asteroid.motion.av = av * (Math.random() * 1 - 0.5);
		var position_angle = Math.random() * Math.PI * 2;
		var distance_from_center = Math.random() * 100 + 100;
		asteroid.position.x = position.x + Math.cos(position_angle) * distance_from_center;
		asteroid.position.y = position.y + Math.sin(position_angle) * distance_from_center;

		var angle;
		if (target_center) {
			angle = position_angle + Math.PI;
		}
		else // random direction
		{
			angle = Math.random() * Math.PI * 2;
		}
		asteroid.motion.vx = speed * Math.cos(angle);
		asteroid.motion.vy = speed * Math.sin(angle);

		return asteroid;
	};

	return LevelGenerator;
});