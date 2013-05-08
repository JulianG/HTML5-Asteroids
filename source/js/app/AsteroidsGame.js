/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 01/03/13
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'app/GameLoop', 'app/GameBoard', 'app/control/InputProcessor', 'app/rules/BoardAnalyser', 'app/render/Renderer'],
	function (KeyPoll, GameLoop, GameBoard, InputProcessor, BoardAnalyser, Renderer) {

		function AsteroidsGame() {
			this.stage = null;
			this.atlas = null;
			this.keypoll = null;
		}

		var api = AsteroidsGame.prototype;

		api.init = function init(canvas_id, atlas, keypoll) {

			this.keypoll = keypoll;

			this.stage = new createjs.Stage(canvas_id);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(this.stage);

			this._initGame();
		};



		api._initGame = function _initGame() {

			var board = new GameBoard();
			var input = new InputProcessor();
			var analyser = new BoardAnalyser();
			var renderer = new Renderer(this.stage, board);
			var game = new GameLoop(board, input, analyser, renderer);

			// stage updates
			createjs.Ticker.setFPS(1);
			createjs.Ticker.addListener(this.stage);
			createjs.Ticker.addEventListener("tick", function (event) {
				// Actions carried out each frame
				game.step(event.delta);
			});
		};

		return AsteroidsGame;
	}
);