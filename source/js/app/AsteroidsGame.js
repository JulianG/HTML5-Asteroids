/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 01/03/13
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'app/Config', 'app/GameLoop', 'app/GameBoard', 'app/systems/ControlSystem', 'app/systems/MotionSystem',
	'app/systems/SpaceSystem', 'app/rules/CollisionRules', 'app/systems/CollisionSystem', 'app/systems/TimeoutSystem', 'app/systems/RenderSystem',
	'app/entities/EntityPool', 'app/entities/EntityFactory', 'app/LevelGenerator', 'app/control/SpaceshipControl'],
	function (KeyPoll, Config, GameLoop, GameBoard, ControlSystem, MotionSystem, SpaceSystem, CollisionRules, CollisionSystem, TimeoutSystem, RenderSystem, EntityPool, EntityFactory, LevelGenerator, SpaceshipControl) {

		function AsteroidsGame() {
			this.stage = null;
			this.board = null;
			this.atlas = null;
			this.keypoll = null;
			this.levelGenerator = null;
			this.config = null;
			this.ship = null;
		}

		var api = AsteroidsGame.prototype;

		api.init = function init(canvas_id, atlas, keypoll) {
			this.stage = new createjs.Stage(canvas_id);
			this.atlas = atlas;
			this.keypoll = keypoll;
			this._initGame();
		};


		api._initGame = function _initGame() {

			var c = new Config();
			this.config = c;

			var board = new GameBoard(c.spaceWidth, c.spaceHeight, c.spaceWrapMargin);
			this.board = board;
			var input = new ControlSystem(board);
			var motion = new MotionSystem(board);
			var space = new SpaceSystem(board);
			var collisions = new CollisionSystem(board);
			var timeout = new TimeoutSystem(board);
			var render = new RenderSystem(this.stage, board);
			
			var game_loop = new GameLoop();
			game_loop.addSystem(board);
			game_loop.addSystem(input);
			game_loop.addSystem(motion);
			game_loop.addSystem(space);
			game_loop.addSystem(collisions);
			game_loop.addSystem(timeout);
			game_loop.addSystem(render);

			// stage updates
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(this.stage);
			createjs.Ticker.addEventListener("tick", function (event) {
				// Actions carried out each frame
				var dt = event.delta / 1000;
				game_loop.update(dt);
			});

			var factory = new EntityFactory(this.atlas, new EntityPool());
			this.levelGenerator = new LevelGenerator(factory);

			this._initShip(factory);

			this._startLevel(1);

			var collisionRules = new CollisionRules(board, this.ship, this.explodingShip, factory);
			collisions.collisionDetected.add(function (active, passive) {
				collisionRules.handleCollision(active, passive);
			});


		};

		api._initShip = function _initShip(factory) {
			this.ship = factory.createShip();
			this.ship.position.x = this.config.spaceWidth / 2;
			this.ship.position.y = this.config.spaceHeight / 2;
			this.ship.control = new SpaceshipControl(this.config, this.keypoll);

			this.explodingShip = factory.createExplodingShip();
		};

		api._startLevel = function _startLevel(level) {
			this.currentLevel = level;
			var num_asteroids = this.config.getNumAsteroids(level);
			var asteroid_speed = this.config.getAsteroidSpeed(level);
			var av = this.config.asteroidAngularSpeed;

			var pos = {x: 400, y: 240};
			var asteroids = this.levelGenerator.buildLevel(pos, num_asteroids, asteroid_speed, av);
			this.board.addEntities(asteroids);

			//_levelStartSound.play();
			//_osd.setLevel(_currentLevel);
			//_gameRules.startLevel((level > 0));

			this.board.addEntity(this.ship);
		}

		return AsteroidsGame;
	}
);