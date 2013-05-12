/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 13:34
 */
define(function () {

	function OSD(atlas) {
		this.view = new createjs.Container();

		this.txtPoints = new createjs.Text("", "18px Ubuntu", "#ffffff");
		this.txtPoints.textAlign = 'left';
		this.txtPoints.x = 10;
		this.txtPoints.y = 10;

		this.txtLevel = new createjs.Text("", "18px Ubuntu", "#ffffff");
		this.txtLevel.textAlign = 'center';
		this.txtLevel.x = 400;
		this.txtLevel.y = 10;

		this.view.addChild(this.txtPoints);
		this.view.addChild(this.txtLevel);

		this._initLives(atlas);

		this.setLives(0);
	}

	var api = OSD.prototype;

	api.setPoints = function setPoints(points) {
		this.txtPoints.text = points.toString();
	};

	api.setLevel = function setLevel(level) {
		this.txtLevel.text = (level > 0) ? "LEVEL " + level.toString() : '';
	};

	api.setLives = function setLives(lives) {
		this.lives[0].visible = lives > 0;
		this.lives[1].visible = lives > 1;
		this.lives[2].visible = lives > 2;
	};

	api._initLives = function _initLives(atlas) {
		var lives = [];
		lives.push(atlas.getDisplayObject('life-icon'));
		lives.push(atlas.getDisplayObject('life-icon'));
		lives.push(atlas.getDisplayObject('life-icon'));
		this.view.addChild(lives[0]);
		this.view.addChild(lives[1]);
		this.view.addChild(lives[2]);

		var y = 10;
		lives[0].y = y;
		lives[1].y = y;
		lives[2].y = y;

		var x = 800;
		x -= 23;
		lives[0].x = x;
		x -= 20;
		lives[1].x = x;
		x -= 20;
		lives[2].x = x;

		this.lives = lives;

	};

	return OSD;
});