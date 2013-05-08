/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 01/03/13
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'app/Config', 'app/GameLoop', 'app/GameBoard', 'app/control/ControlSystem', 'app/motion/MotionSystem',
	'app/collisions/CollisionSystem', 'app/render/RenderSystem', 'app/entities/EntityPool', 'app/entities/EntityFactory', 'app/LevelGenerator', 'app/control/SpaceshipControl'],
	function (KeyPoll, Config, GameLoop, GameBoard, ControlSystem, MotionSystem, CollisionSystem, RenderSystem, EntityPool, EntityFactory, LevelGenerator, SpaceshipControl) {

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
			var input = new ControlSystem();
			var motion = new MotionSystem();
			var collisions = new CollisionSystem();
			var render = new RenderSystem(this.stage, board);
			var game = new GameLoop(board, input, motion, collisions, render);

			// stage updates
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(this.stage);
			createjs.Ticker.addEventListener("tick", function (event) {
				// Actions carried out each frame
				game.update(event.delta / 1000);
			});

			var factory = new EntityFactory(this.atlas, new EntityPool());
			this.levelGenerator = new LevelGenerator(factory);

			this._initShip(factory);

			this._startLevel(1);


		};

		api._initShip = function _initShip(factory) {
			this.ship = factory.createShip();
			this.ship.position.x = this.config.spaceWidth / 2;
			this.ship.position.y = this.config.spaceHeight / 2;
			this.ship.control = new SpaceshipControl(this.config, this.keypoll);
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