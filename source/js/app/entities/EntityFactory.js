/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:34
 */

define(function () {

	function EntityFactory(atlas, pool) {
		this.atlas = atlas;
		this.availableObjects = pool;

		this.asteroidSymbols = ['asteroid-00','asteroid-01','asteroid-02','asteroid-03'];
	}

	var api = EntityFactory.prototype;

	api.createShip = function createShip(){
		var entity = this.availableObjects.getEntity();

		var view = new createjs.Container();
		var ship_body = this.atlas.getDisplayObject('spaceship');
		ship_body.x = -26;
		ship_body.y = -13;
		var thruster = this.atlas.getDisplayObject('thruster');
		thruster.x = -26;
		thruster.y = -13;
		view.addChild(ship_body);
		view.addChild(thruster);
		entity.view = view;
		entity.collider.radius = 15;

		return entity;
	};

	api.createAsteroid = function createAsteroid(size) {
		var entity = this.availableObjects.getEntity();

		var symbol = this.asteroidSymbols[Math.floor(Math.random()*this.asteroidSymbols.length)];
		entity.view = this.atlas.getDisplayObject(symbol);
		entity.view.regX = 45;
		entity.view.regY = 45;
		var scale = size/3;
		entity.view.scaleX = entity.view.scaleY = scale;

		entity.motion.va = 50;
		entity.collider.radius = scale * 3 * 45/2;

		return entity;
	};

	return EntityFactory;
});
