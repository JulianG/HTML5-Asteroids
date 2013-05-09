/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 01/03/13
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
define(['app/screens/MainMenu', 'app/screens/GameScreen'],
	function (MainMenu, GameScreen) {

		function AsteroidsGame() {
			this.stage = null;
			this.gameScreen = null;
			this.menuScreen = null;
		}

		var api = AsteroidsGame.prototype;

		api.init = function init(canvas_id, atlas, keypoll) {
			var self = this;
			this.stage = new createjs.Stage(canvas_id);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(this.stage);

			this.gameScreen = new GameScreen(atlas, keypoll);
			this.gameScreen.gameFinished.add(function (points) {
				self.showGameOver(points);
			});
			this.menuScreen = new MainMenu(atlas, keypoll);
			this.menuScreen.startGameRequested.add(function () {
				self.startGame();
			});
			this.stage.addChild(this.gameScreen.view);
			this.stage.addChild(this.menuScreen.view);
			//
			this.gameScreen.startDemo();
		};

		api.startGame = function startGame() {
			this.stage.removeChild(this.menuScreen.view);
			this.gameScreen.startGame();
		};

		api.showGameOver = function showGameOver(points) {
			this.stage.addChild(this.menuScreen.view);
		};

		return AsteroidsGame;
	}
);