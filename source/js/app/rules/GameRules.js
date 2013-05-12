/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 15:28
 */
define(function () {

	/**
	 * This object works as a referee.
	 * It decides what happens when two entities collide.
	 * It decides when to spawn a new UFO, and which type.
	 * It dispatches signals when points are rewarded, when the level is completed or the ship is killed.
	 *
	 * @param config
	 * @param board
	 * @param ship
	 * @param exploding_ship
	 * @param factory
	 * @constructor
	 */
	function GameRules(config, board, ship, exploding_ship, factory) {
		this.config = config;
		this.pointsRewarded = new signals.Signal();
		this.shipDestroyed = new signals.Signal();
		this.levelCompleted = new signals.Signal();
		//
		this.board = board;
		this.ship = ship;
		this.explodingShip = exploding_ship;
		this.factory = factory;
		//
		this.gameStarted = false;
		this.elapsed = 0;
	}

	var api = GameRules.prototype;

	api.update = function update(dt) {
		if(!this.gameStarted) return;
		//
		this.elapsed += dt;
		var elapsed_seconds = Math.round(this.elapsed);
		if (elapsed_seconds > this.config.ufoDelay && elapsed_seconds % this.config.ufoFrequency === 0 && this._countUFOs() < 1) {
			this._addUFO();
		}
	};

	api.handleLevelStart = function handleLevelStart(level) {
		this.gameStarted = true;
		this.elapsed = 0;
	};

	api.handleGameEnded = function handleGameEnded(){
		this.gameStarted = false;
	};

	api.handleCollision = function handleCollision(active_entity, passive_entity) {

		if (passive_entity) {
			if (passive_entity.collider.group == 'asteroid') {
				this.board.removeEntity(passive_entity);
				this._breakAsteroid(passive_entity);
				this._addAsteroidExplosion(passive_entity);
				createjs.Sound.play('explosion');
				//
				this.pointsRewarded.dispatch(asteroid.rewardPoints);
			}
			if (passive_entity.collider.group == 'ufo') {
				this.board.removeEntity(passive_entity);
				this._addUFOExplosion(passive_entity);
				createjs.Sound.play('explosion');
				//
				this.pointsRewarded.dispatch(passive_entity.rewardPoints);
			}
		}

		var shipDestroyed = this.shipDestroyed;
		if (active_entity == this.ship && passive_entity.collider.group != 'ship-bullet') {
			// kill spaceship
			this.explodingShip.position.clone(this.ship.position);
			this.explodingShip.motion.clone(this.ship.motion);
			this.explodingShip.motion.damping = 0.95;
			this.board.removeEntity(this.ship);

			this.explodingShip.timeout.active = true;
			this.explodingShip.timeout.remainingTime = 0.5;
			this.board.addEntity(this.explodingShip);
			createjs.Sound.play('explosion');
			shipDestroyed.dispatch();
		} else {
			// probably a bullet
			if (active_entity.collider.group == 'ship-bullet') this.board.removeEntity(active_entity);
			if (active_entity.collider.group == 'ufo-bullet') this.board.removeEntity(active_entity);
		}
	};

	api._addAsteroidExplosion = function _addAsteroidExplosion(asteroid) {
		var size = asteroid.state;
		var expl = this.factory.createExplodingAsteroid(size);
		expl.position.clone(asteroid.position);
		expl.motion.clone(asteroid.motion);
		this.board.addEntity(expl);
	};

	api._addUFOExplosion = function _addUFOExplosion(ufo) {
		var expl = this.factory.createExplodingAsteroid(2);
		expl.position.clone(ufo.position);
		expl.motion.clone(ufo.motion);
		this.board.addEntity(expl);
	};

	api._breakAsteroid = function _breakAsteroid(asteroid) {
		var size = asteroid.state;
		if (size > 1) {
			var debris0 = this._addAsteroidAt(asteroid.position, size - 1);
			var debris1 = this._addAsteroidAt(asteroid.position, size - 1);
			if (debris0 && debris1) {
				var debris_speed = asteroid.motion.getSpeed() * 1.25;
				var safety_margin = Math.PI / 40;
				var angle0 = Math.random() * (Math.PI / 2 - 2 * safety_margin) + safety_margin;
				angle0 = angle0 + Math.floor(Math.random() * 4) * Math.PI / 2;
				debris0.motion.vx = debris_speed * Math.cos(angle0);
				debris0.motion.vy = debris_speed * Math.sin(angle0);
				debris0.motion.av = asteroid.motion.av * 1.5;
				var angle1 = Math.PI + angle0;
				debris1.motion.vx = debris_speed * Math.cos(angle1);
				debris1.motion.vy = debris_speed * Math.sin(angle1);
				debris1.motion.av = -asteroid.motion.av * 1.5;
			}
			this.board.addEntity(debris0);
			this.board.addEntity(debris1);
		} else {
			this._checkLevelComplete();
		}
	};

	api._addAsteroidAt = function _addAsteroidAt(position, size) {
		var asteroid = this.factory.createAsteroid(size);
		asteroid.position.clone(position);
		return asteroid;
	};

	api._addUFO = function _addUFO() {
		console.log('adding ufo');
		var ufo = this.factory.createUFO(this.board, (this._countAsteroids()>=2), this.ship);
		ufo.motion.vx = (Math.random() > 0.5) ? this.config.ufoSpeed : -this.config.ufoSpeed;
		ufo.motion.vy = this.config.ufoSpeed / 5 + (Math.random() * this.config.ufoSpeed / 10);
		ufo.position.x = (ufo.motion.vx > 0) ? ufo.state.leftLimit : ufo.state.rightLimit;
		ufo.position.y = this.board.height * (Math.random() * 0.50 + 0.25);
		this.board.addEntity(ufo);
	};

	api._countUFOs = function _countUFOs() {
		var ufo_count = 0;

		this.board.entities.forEach(function (entity, index, entities) {
			if (entity && entity.active && entity.collider && entity.collider.group == 'ufo') {
				ufo_count++;
			}
		});
		return ufo_count;
	};

	api._countAsteroids = function _countAsteroids() {
		var asteroid_count = 0;
		var n = this.board.entities.length;
		for (var i = 0; i < n; i++) {
			var entity = this.board.entities[i];
			if (entity && entity.active && entity.collider && entity.collider.group == 'asteroid') {
				asteroid_count++;
			}
		}
		return asteroid_count;
	};

	api._checkLevelComplete = function _checkLevelComplete() {
		var asteroid_count = this._countAsteroids();
		if (asteroid_count === 0) this.levelCompleted.dispatch();
	};

	return GameRules;
});