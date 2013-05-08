/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:34
 */

define(['app/render/SpaceshipViewController', 'app/render/ExplodingSpaceshipViewController'], function (SpaceshipViewController, ExplodingSpaceshipViewController) {

	function EntityFactory(atlas, pool) {
		this.atlas = atlas;
		this.availableObjects = pool;
		this.asteroidSymbols = ['asteroid-00', 'asteroid-01', 'asteroid-02', 'asteroid-03'];
	}

	var api = EntityFactory.prototype;

	api.createShip = function createShip() {
		var entity = this.availableObjects.getEntity();

		var view = new createjs.Container();
		var ship_body = this.atlas.getDisplayObject('spaceship');
		ship_body.x = -26;
		ship_body.y = -13;
		var thruster = this.atlas.getDisplayObject('thruster');
		thruster.x = -26;
		thruster.y = -13;
		thruster.name = 'thruster';
		view.addChild(ship_body);
		view.addChild(thruster);
		entity.view = view;
		entity.viewController = new SpaceshipViewController(view);
		entity.state = 'idle';
		entity.collider.active = true;
		entity.collider.radius = 15;
		entity.timeout.active = false;
		entity.timeout.remainingTime = 0;
		return entity;
	};

	api.createExplodingShip = function createExplodingShip() {
		var entity = this.availableObjects.getEntity();

		var view = new createjs.Container();
		entity.viewController = new ExplodingSpaceshipViewController(view, this.atlas);
		entity.view = view;

		entity.state = 'idle';
		entity.collider.active = false;
		entity.collider.radius = 0;
		entity.timeout.active = true;
		entity.timeout.remainingTime = 0.5;

		return entity;
	};

	api.createAsteroid = function createAsteroid(size) {
		var entity = this.availableObjects.getEntity();
		entity.viewController = null;
		entity.state = size;

		var symbol = this.asteroidSymbols[Math.floor(Math.random() * this.asteroidSymbols.length)];
		entity.view = this.atlas.getDisplayObject(symbol);
		entity.view.regX = 45;
		entity.view.regY = 45;

		var scale = size / 3;
		entity.view.scaleX = entity.view.scaleY = scale;

		entity.motion.av = 50;
		entity.collider.active = false;
		entity.collider.radius = scale * 3 * 22 / 2;

		entity.timeout.active = false;
		entity.timeout.remainingTime = 0;

		return entity;
	};

	api.createExplodingAsteroid = function createExplodingAsteroid(size) {
		var entity = this.availableObjects.getEntity();
		entity.viewController = null;

		var symbol = 'explosion';
		entity.view = this.atlas.getDisplayObject(symbol);
		entity.view.regX = 45;
		entity.view.regY = 45;

		var scale = size / 2;
		entity.view.scaleX = entity.view.scaleY = scale;

		entity.motion.av = 50;
		entity.collider.active = false;
		entity.collider.radius = 0;

		entity.timeout.active = true;
		entity.timeout.remainingTime = 0.233;

		return entity;
	};

	api.createBullet = function createBullet(){
		var entity = this.availableObjects.getEntity();
		entity.viewController = null;

		var symbol = 'bullet';
		entity.view = this.atlas.getDisplayObject(symbol);
		entity.view.regX = 6;
		entity.view.regY = 2;

		entity.motion.av = 0;
		entity.collider.active = true;
		entity.collider.radius = 2;

		entity.timeout.active = true;
		entity.timeout.remainingTime = 2;

	};

	return EntityFactory;
});
