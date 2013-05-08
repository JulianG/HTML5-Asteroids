/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 01/03/13
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'app/GameLoop', 'app/GameBoard', 'app/control/ControlSystem', 'app/motion/MotionSystem', 'app/collisions/CollisionSystem', 'app/render/RenderSystem', 'app/entities/EntityPool', 'app/entities/EntityFactory'],
	function (KeyPoll, GameLoop, GameBoard, ControlSystem, MotionSystem, CollisionSystem, RenderSystem, EntityPool, EntityFactory) {

		function AsteroidsGame() {
			this.stage = null;
			this.atlas = null;
			this.keypoll = null;
		}

		var api = AsteroidsGame.prototype;

		api.init = function init(canvas_id, atlas, keypoll) {
			this.stage = new createjs.Stage(canvas_id);
			this.atlas = atlas;
			this.keypoll = keypoll;
			this._initGame();
		};


		api._initGame = function _initGame() {

			var board = new GameBoard();
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

			var p = new EntityPool();
			var f = new EntityFactory(this.atlas, p);

			var asteroid = f.createAsteroid(3);
			asteroid.position.x = 100;
			asteroid.position.y = 100;
			asteroid.motion.av = 50;
			board.addEntity(asteroid);
		};

		return AsteroidsGame;
	}
);