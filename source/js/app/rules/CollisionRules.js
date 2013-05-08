/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 15:28
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function CollisionRules(board, ship, exploding_ship, factory) {
		this.board = board;
		this.ship = ship;
		this.explodingShip = exploding_ship;
		this.factory = factory;
	}

	var api = CollisionRules.prototype;

	api.handleCollision = function handleCollision(active_entity, passive_entity) {
		console.log("collision handled!");

		if (active_entity == this.ship) {

			this.explodingShip.position.clone(this.ship.position);
			this.explodingShip.motion.clone(this.ship.motion);
			this.explodingShip.motion.damping = 0.95;
			this.board.removeEntity(this.ship);
			this.board.addEntity(this.explodingShip);
		}

		if (passive_entity) {
			this.board.removeEntity(passive_entity);
			this._breakAsteroid(passive_entity);
			this._addExplosion(passive_entity);
		}

	};

	api._addExplosion = function _addExplosion(asteroid) {
		var size = asteroid.state;
		var expl = this.factory.createExplodingAsteroid(size);
		expl.position.clone(asteroid.position);
		expl.motion.clone(asteroid.motion);
		this.board.addEntity(expl);
	};

	api._breakAsteroid = function _breakAsteroid(asteroid) {
		var size = asteroid.state;
		if (size > 0) {
			var debris0 = this._addAsteroidAt(asteroid.position, size - 1);
			var debris1 = this._addAsteroidAt(asteroid.position, size - 1);
			if (debris0 && debris1) {
				var debris_speed = asteroid.motion.getSpeed() * 1.25;
				var safety_margin = Math.PI / 40;
				var angle0 = Math.random() * (Math.PI / 2 - 2 * safety_margin) + safety_margin;
				angle0 = angle0 + Math.floor(Math.random() * 4) * Math.PI / 2;
				debris0.motion.vx = debris_speed * Math.cos(angle0);
				debris0.motion.vy = debris_speed * Math.sin(angle0);
				var angle1 = Math.PI + angle0;
				debris1.motion.vx = debris_speed * Math.cos(angle1);
				debris1.motion.vy = debris_speed * Math.sin(angle1);
			}
			this.board.addEntity(debris0);
			this.board.addEntity(debris1);
		}
	};

	api._addAsteroidAt = function _addAsteroidAt(position, size) {
		var asteroid = this.factory.createAsteroid(size);
		asteroid.position.clone(position);
		return asteroid;
	};

	return CollisionRules;
});