/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 11:25
 */
define(function () {

	function MainMenu(atlas) {
		this.startGameRequested = new signals.Signal();
		//
		this.atlas = atlas;
		this.view = new createjs.Container();

		var logo = this.atlas.getDisplayObject('html5');
		logo.x = (800-64)/2;
		logo.y = 75;
		this.view.addChild(logo);

		var title = this.atlas.getDisplayObject('title');
		title.x = (800 - 430) / 2;
		title.y = 160;
		this.view.addChild(title);

		var ship =  new createjs.Container();
		var ship_body = this.atlas.getDisplayObject('menu-ship-body');
		var ship_fire = this.atlas.getDisplayObject('menu-ship-fire');
		ship.addChild(ship_body);
		ship.addChild(ship_fire);
		ship.x = 800 - 120 - 30;
		ship.y = 480 - 80 - 30;
		this.view.addChild(ship);

		var controls = this.atlas.getDisplayObject('controls-icon');
		controls.x = 10;
		controls.y = 480-37;
		this.view.addChild(controls);

		var credits = new createjs.Text("by Julian Garamendy", "12px Ubuntu", "#ffffff");
		credits.textAlign = 'center';
		credits.x = 400;
		credits.y = 480 - 25;
		this.view.addChild(credits);

		this.playBtn = this.atlas.getDisplayObject('play-btn');
		this.playBtn.x = (800 - 123) / 2;
		this.playBtn.y = 260;
		var signal = this.startGameRequested;
		this.playBtn.onPress = function (mouseEvent) {
			createjs.Sound.play('button');
			signal.dispatch();
		};
		this.view.addChild(this.playBtn);
	}

	return MainMenu;
});