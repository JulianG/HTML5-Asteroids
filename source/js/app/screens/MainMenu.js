/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 11:25
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function MainMenu(atlas) {
		this.startGameRequested = new signals.Signal();
		//
		this.atlas = atlas;
		this.view = new createjs.Container();

		var title = this.atlas.getDisplayObject('title');
		title.x = (800 - 430) / 2;
		title.y = 100;
		this.view.addChild(title);

		var controls = this.atlas.getDisplayObject('controls-icon');
		controls.x = 10;
		controls.y = 480-37;
		this.view.addChild(controls);

		this.playBtn = this.atlas.getDisplayObject('play-btn');
		this.playBtn.x = (800 - 123) / 2;
		this.playBtn.y = 240;
		var signal = this.startGameRequested;
		this.playBtn.onPress = function (mouseEvent) {
			createjs.Sound.play('button');
			signal.dispatch();
		};
		this.view.addChild(this.playBtn);
	}

	return MainMenu;
});