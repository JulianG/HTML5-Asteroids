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
			this.atlas = atlas;
			this.keypoll = keypoll;

			this.view = new createjs.Container();

			this.board = null;
			this.keypoll = null;
			this.levelGenerator = null;
			this.config = null;
			this.ship = null;

			//

			this.atlas = atlas;
			this.keypoll = keypoll;


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
		}

		var api = GameScreen.prototype;

		api._initShip = function _initShip(factory, board) {
			this.ship = factory.createShip(board);
			this.ship.position.x = this.config.spaceWidth / 2;
			this.ship.position.y = this.config.spaceHeight / 2;
			this.ship.control = new SpaceshipControl(this.config, this.keypoll);

			this.explodingShip = factory.createExplodingShip();
		};

		api.startLevel = function startLevel(level) {
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
		};

		return GameScreen;
	});