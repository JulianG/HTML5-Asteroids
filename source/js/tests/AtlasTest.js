/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/03/13
 * Time: 13:27
 * To change this template use File | Settings | File Templates.
 */
define(['lib/easeljs/EaselJSAtlasLoader'], function (EaselJSAtlasLoader) {

	function AtlasTest() {
		this.stage = null;
		this.atlas = null;
	}

	var api = AtlasTest.prototype;

	api.init = function init() {
		var self = this;

		this._initStage();

		this.loader = new EaselJSAtlasLoader();
		this.loader.complete.add( function( atlas ){
			self._handleAtlasReady(atlas);
		});
		this.loader.load('./assets/', 'asteroids.json');

	};

	api._initStage = function _initStage(){
		this.stage = new createjs.Stage('canvas');
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addListener(this.stage);
		//createjs.Ticker.addEventListener("tick", function (event) {});
	};

	api._handleAtlasReady = function _handleAtlasReady(atlas) {
		console.log("drawing...");
		console.log(atlas.getDisplayObjectList());


		var bmpa1 = null;
		bmpa1 = atlas.getDisplayObject("asteroid-02");

		bmpa1.regX = 45;
		bmpa1.regY = 45;

		bmpa1.x = 100;
		bmpa1.y = 100;

		bmpa1.rotation = 0;

		this.stage.addChild(bmpa1);

		createjs.Ticker.addEventListener("tick", function (event) { bmpa1.rotation++; });
		/*
		var bmpa = null;
		bmpa = atlas.getDisplayObject("diamond");
		bmpa.x = 32;

		this.stage.addChild(bmpa);

		var bmpa2 = null;
		bmpa2 = atlas.getDisplayObject("enemy");
		bmpa2.x = 64;
		this.stage.addChild(bmpa2);
		*/
		this.atlas = atlas;
	};


	return AtlasTest;
});