/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 11:25
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'app/Config', 'app/GameLoop', 'app/GameBoard', 'app/systems/StateSystem', 'app/systems/ControlSystem', 'app/systems/MotionSystem',
	'app/systems/SpaceSystem', 'app/rules/CollisionRules', 'app/systems/CollisionSystem', 'app/systems/TimeoutSystem', 'app/systems/RenderSystem',
	'app/entities/EntityPool', 'app/entities/EntityFactory', 'app/LevelGenerator', 'app/control/SpaceshipControl'],
	function (KeyPoll, Config, GameLoop, GameBoard, StateSystem, ControlSystem, MotionSystem, SpaceSystem, CollisionRules, CollisionSystem, TimeoutSystem, RenderSystem, EntityPool, EntityFactory, LevelGenerator, SpaceshipControl) {


		function GameScreen(atlas, keypoll) {
			this.gameFinised = new signals.Signal();
			//
			this.atlas = atlas;
			this.keypoll = keypoll;

			this.view = new createjs.Container();

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
			var render = new RenderSystem(this.view, board);

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

			var collisionRules = new CollisionRules(board, this.ship, this.explodingShip, factory);
			collisions.collisionDetected.add(function (active, passive) {
				collisionRules.handleCollision(active, passive);
			});
			var self = this;
			collisionRules.shipDestroyed.add(function () {
				self.gameFinised.dispatch(0);
			});
		};

		api._initShip = function _initShip(factory, board) {
			this.ship = factory.createShip(board);
			this.ship.control = new SpaceshipControl(this.config, this.keypoll);
			this.explodingShip = factory.createExplodingShip();
		};

		api.startGame = function startGame() {
			this._clearAsteroids();
			this.ship.position.x = this.config.spaceWidth / 2;
			this.ship.position.y = this.config.spaceHeight / 2;
			this.ship.position.rotation = -90;
			this.ship.motion.stop();
			this._startLevel(1);
			this.board.addEntity(this.ship);
		};
		api.startDemo = function startDemo() {
			this._startLevel(2);
		};
		api._startLevel = function _startLevel(level) {
			createjs.Sound.play('levelstart');
			this.currentLevel = level;
			var num_asteroids = this.config.getNumAsteroids(level);
			var asteroid_speed = this.config.getAsteroidSpeed(level);
			var av = this.config.asteroidAngularSpeed;


			if (this.ship) pos = this.ship.position;
			var asteroids = this.levelGenerator.buildLevel(pos, num_asteroids, asteroid_speed, av);
			this.board.addEntities(asteroids);

			//_osd.setLevel(_currentLevel);
			//_gameRules.startLevel((level > 0));
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

		return GameScreen;
	});