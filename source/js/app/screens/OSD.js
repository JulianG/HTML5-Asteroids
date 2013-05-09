/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 13:34
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function OSD(){
		this.view = new createjs.Container();

		this.txtPoints = new createjs.Text("", "18px Ubuntu", "#ffffff");
		this.txtPoints.textAlign = 'left';
		//this.txtPoints.textBaseline = "alphabetic";
		this.txtPoints.x = 10;
		this.txtPoints.y = 10;

		this.txtLevel = new createjs.Text("", "18px Ubuntu", "#ffffff");
		this.txtLevel.textAlign = 'center';
		this.txtLevel.x = 400;
		this.txtLevel.y = 10;

		this.view.addChild(this.txtPoints);
		this.view.addChild(this.txtLevel);

	}

	var api = OSD.prototype;

	api.setPoints = function setPoints(points){
		this.txtPoints.text = points.toString();
	};

	api.setLevel = function setLevel(level){
		this.txtLevel.text = "LEVEL " + level.toString();
	};

	return OSD;
});