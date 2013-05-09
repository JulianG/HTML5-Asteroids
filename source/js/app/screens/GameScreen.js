/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 11:25
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'app/Config', 'app/GameLoop', 'app/GameBoard', 'app/systems/StateSystem', 'app/systems/ControlSystem', 'app/systems/MotionSystem',
	'app/systems/SpaceSystem', 'app/rules/GameRules', 'app/systems/CollisionSystem', 'app/systems/TimeoutSystem', 'app/systems/RenderSystem',
	'app/entities/EntityPool', 'app/entities/EntityFactory', 'app/LevelGenerator', 'app/control/SpaceshipControl', 'app/screens/OSD'],
	function (KeyPoll, Config, GameLoop, GameBoard, StateSystem, ControlSystem, MotionSystem, SpaceSystem, GameRules, CollisionSystem, TimeoutSystem, RenderSystem, EntityPool, EntityFactory, LevelGenerator, SpaceshipControl, OSD) {


		function GameScreen(atlas, keypoll) {
			this.gameFinished = new signals.Signal();
			//
			this.atlas = atlas;
			this.keypoll = keypoll;

			this.view = new createjs.Container();
			this.container = new createjs.Container();

			this.currentLevel = 0;
			this.playerScore = 0;
			this.playerLives = 0;

			this.osd = null;
			this.osd = new OSD(atlas);

			this.view.addChild(this.container);
			this.view.addChild(this.osd.view);

			this.levelGenerator = null;
			this.config = null;
			this.ship = null;

			this.init();

		}

		var api = GameScreen.prototype;

		api.init = function init() {
			var c = new Config();
			this.config = c;

			var board = new GameBoard(c.spaceWidth, c.spaceHeight, c.spaceWrapMargin);
			this.board = board;
			var state = new StateSystem(board);
			var input = new ControlSystem(board);
			var motion = new MotionSystem(board);
			var space = new SpaceSystem(board);
			var collisions = new CollisionSystem(board);
			var timeout = new TimeoutSystem(board);
			var render = new RenderSystem(this.container, board);

			var game_loop = new GameLoop();
			game_loop.addSystem(board);
			game_loop.addSystem(state);
			game_loop.addSystem(input);
			game_loop.addSystem(motion);
			game_loop.addSystem(space);
			game_loop.addSystem(collisions);
			game_loop.addSystem(timeout);
			game_loop.addSystem(render);

			// stage updates
			createjs.Ticker.addEventListener("tick", function (event) {
				// Actions carried out each frame
				var dt = event.delta / 1000;
				game_loop.update(dt);
			});

			var factory = new EntityFactory(this.atlas, new EntityPool());
			this.levelGenerator = new LevelGenerator(factory);

			this._initShip(factory, board);

			var game_rules = new GameRules(this.config, board, this.ship, this.explodingShip, factory);
			collisions.collisionDetected.add(function (active, passive) {
				game_rules.handleCollision(active, passive);
			});
			var self = this;
			game_rules.shipDestroyed.add(function () {
				self._handleLifeLost();
			});
			game_rules.levelCompleted.add(function () {
				self._handleLevelComplete();
			});

			game_rules.pointsRewarded.add(function (points) {
				self.playerScore += points;
				self.osd.setPoints(self.playerScore);
			});
		};

		api._initShip = function _initShip(factory, board) {
			this.ship = factory.createShip(board);
			this.ship.control = new SpaceshipControl(this.config, this.keypoll);
			this.explodingShip = factory.createExplodingShip();
		};

		api.startGame = function startGame() {
			this._clearAsteroids();
			this._resetShip();
			this.playerLives = this.config.initialLives;
			this.playerScore = 0;
			this.currentLevel = 1;

			this.osd.setPoints(this.playerScore);
			this.osd.setLives(this.playerLives);
			this.osd.setLevel(0);

			var self = this;
			createjs.Tween.get({}).wait(1000).call(function () {

				self._startLevel(self.currentLevel);
			});
		};

		api.startDemo = function startDemo() {
			var num_asteroids = this.config.getNumAsteroids(3);
			var asteroid_speed = this.config.getAsteroidSpeed(3);
			var av = this.config.asteroidAngularSpeed;
			if (this.ship) pos = this.ship.position;
			var asteroids = this.levelGenerator.buildLevel(pos, num_asteroids, asteroid_speed, av);
			this.board.addEntities(asteroids);
		};

		api._startLevel = function _startLevel(level) {
			createjs.Sound.play('levelstart');
			this.currentLevel = level;
			var num_asteroids = this.config.getNumAsteroids(level);
			var asteroid_speed = this.config.getAsteroidSpeed(level);
			var av = this.config.asteroidAngularSpeed;
			//
			if (this.ship) pos = this.ship.position;
			var asteroids = this.levelGenerator.buildLevel(pos, num_asteroids, asteroid_speed, av);
			this.board.addEntities(asteroids);
			//
			this.osd.setLevel(this.currentLevel);
			//
			var self = this;
			createjs.Tween.get({}).wait(100).call(function () {
				self._hackPlaceShipOnTop();
			});
		};

		api._clearAsteroids = function _clearAsteroids() {
			var n = this.board.entities.length;
			for (var i = 0; i < n; i++) {
				var entity = this.board.entities[i];
				if (entity && entity.collider && entity.collider.group == 'asteroid') {
					this.board.removeEntity(entity);
				}
			}
		};

		api._handleLevelComplete = function _handleLevelComplete() {
			var self = this;
			createjs.Tween.get({}).wait(1000).call(function () {
				self.currentLevel++;
				self._startLevel(self.currentLevel);
			});
		};

		api._handleLifeLost = function _handleLifeLost() {
			var self = this;
			self.playerLives--;
			self.osd.setLives(self.playerLives);
			createjs.Tween.get({}).wait(1000).call(function () {
				if (self.playerLives === 0) {
					self.gameFinished.dispatch(self.playerScore);
				} else {
					self._resetShip();
				}
			});
		};

		api._resetShip = function _resetShip() {
			this.ship.position.x = this.config.spaceWidth / 2;
			this.ship.position.y = this.config.spaceHeight / 2;
			this.ship.position.rotation = -90;
			this.ship.motion.stop();
			this.board.addEntity(this.ship);
		};

		api._hackPlaceShipOnTop = function _hackPlaceShipOnTop() {
			var view = this.ship.view;
			if (view.parent) {
				var n = view.parent.getNumChildren();
				view.parent.setChildIndex(view, n - 1);
			}
		};

		return GameScreen;
	});