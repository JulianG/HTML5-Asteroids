/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 01/03/13
 * Time: 16:44
 */
define(['lib/KeyPoll', 'app/control/SpaceshipControl', 'app/control/SpaceshipMouseControl', //
	'app/screens/MainMenu', 'app/screens/GameScreen', 'app/screens/GameOverScreen'],
	function (KeyPoll, SpaceshipControl, SpaceshipMouseControl, //
			  MainMenu, GameScreen, GameOverScreen) {

		/**
		 * Instantiates the GameScreen and the MenuScreen.
		 * MenuScreen is then placed on top of the GameScreen.
		 *
		 * This object handles the start and restart of games.
		 *
		 * @constructor
		 */
		function AsteroidsGame() {
			this.fps = 60;
			this.config = null;
			this.stage = null;
			this.gameScreen = null;
			this.menuScreen = null;
		}

		var api = AsteroidsGame.prototype;

		api.init = function init(canvas_id, atlas, config) {
			var self = this;
			this.config = config;

			this.stage = new createjs.Stage(canvas_id);
			createjs.Ticker.setFPS(this.fps);
			createjs.Ticker.addListener(this.stage);

			var container = new createjs.Container();

			var ctrl = null;
			if (this.config.touchDevice) {
				ctrl = new SpaceshipMouseControl(this.config, container);
			} else {
				var keypoll = new KeyPoll(document); // Based on @brejep 's KeyPoll script.
				ctrl = new SpaceshipControl(this.config, keypoll);
			}
			this.gameScreen = new GameScreen(container, atlas, ctrl, this.config);
			this.gameScreen.gameFinished.add(function (points) {
				self.showGameOver(points);
			});
			this.menuScreen = new MainMenu(atlas, this.config);
			this.menuScreen.startGameRequested.add(function () {
				self.startGame();
			});
			this.gameOverScreen = new GameOverScreen(atlas, keypoll);
			this.gameOverScreen.gotoMenuRequested.add(function () {
				self.showMenu();
			});
			this.stage.addChild(this.gameScreen.view);
			//
			this.gameScreen.startDemo();
			this.showMenu();
			//this.showGameOver(1000);
		};

		api.startGame = function startGame() {
			this.stage.removeChild(this.menuScreen.view);
			this.gameScreen.startGame();
			this._toggleMouseCursor(false);
		};

		api.showMenu = function showMenu() {
			this.stage.addChild(this.menuScreen.view);
			this.stage.removeChild(this.gameOverScreen.view);
			this._toggleMouseCursor(true);
		};

		api.showGameOver = function showGameOver(points) {
			this.gameOverScreen.setPoints(points);
			this.stage.addChild(this.gameOverScreen.view);
			this._toggleMouseCursor(true);
		};

		api._toggleMouseCursor = function _toggleMouseCursor(b) {
			if (b) {
				this.stage.enableMouseOver(this.fps);
				document.body.style.cursor = 'default';
			} else {
				this.stage.enableMouseOver(0);
				document.body.style.cursor = 'none';
			}
		};

		return AsteroidsGame;
	}
);