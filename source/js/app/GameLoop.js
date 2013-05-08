/**
 * GameLoop
 * @author Julian
 */
define(function () {

	function GameLoop(game_board, input_processor, game_analyser, render) {
		this.board = game_board;
		this.inputProcessor = input_processor;
		this.analyser = game_analyser;
		this.render = render;

		this._elapsedSteps = 0;
	}

	var api = GameLoop.prototype;

	api.step = function step(dt) {

		this.processInput(dt);
		this.analyseBoard(dt);
		this.renderBoard(dt);
		this._elapsedSteps++;
	};

	api.processInput = function processInput(dt) {
		this.inputProcessor.processInput(this.board, dt);
	};

	api.analyseBoard = function analyseBoard(dt) {
		this.analyser.analyse(this.board, dt);
	};

	api.renderBoard = function renderBoard(dt) {
		this.render.renderBoard(this.board, dt);
	};

	return GameLoop;

});