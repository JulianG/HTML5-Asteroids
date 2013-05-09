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

		this.title = this.atlas.getDisplayObject('title');
		this.title.x = (800 - 430) / 2;
		this.title.y = 100;

		this.view.addChild(this.title);

		this.playBtn = this.atlas.getDisplayObject('play-btn');
		this.playBtn.x = (800 - 123) / 2;
		this.playBtn.y = 300;
		var signal = this.startGameRequested;
		this.playBtn.onPress = function(mouseEvent) {
			signal.dispatch();
		};
		this.view.addChild(this.playBtn);
	}

	return MainMenu;
});