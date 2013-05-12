/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:34
 */

define(['app/render/SpaceshipViewController', 'app/render/ExplodingSpaceshipViewController', 'app/render/UFOViewController',
	'app/components/SpaceshipState',
	'app/components/UFOState', 'app/components/Gun'], function (SpaceshipViewController, ExplodingSpaceshipViewController, UFOViewController, SpaceshipState, UFOState, Gun) {

	/**
	 * This object creates and configures entities by picking one from the object pool, and then confguring it to represent different game actors:
	 * Ship, Asteroid, UFO, etc.
	 *
	 * @param atlas
	 * @param pool
	 * @param config
	 * @constructor
	 */
	function EntityFactory(atlas, pool, config) {
		this.config = config;
		this.atlas = atlas;
		this.availableObjects = pool;
		this.asteroidSymbols = ['asteroid-00', 'asteroid-01', 'asteroid-02', 'asteroid-03'];
	}

	var api = EntityFactory.prototype;

	api.createShip = function createShip(board) {
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
		entity.state = new SpaceshipState();
		entity.state.weapon = new Gun(board, entity, 'ship-bullet', this);

		entity.collider.active = true;
		entity.collider.radius = 15;
		entity.collider.group = 'ship';
		entity.timeout.active = false;
		entity.timeout.remainingTime = 0;
		entity.rewardPoints = 0;
		return entity;
	};

	api.createExplodingShip = function createExplodingShip() {
		var entity = this.availableObjects.getEntity();

		var view = new createjs.Container();
		entity.viewController = new ExplodingSpaceshipViewController(view, this.atlas);
		entity.view = view;

		entity.state = '';
		entity.collider.active = false;
		entity.collider.radius = 0;
		entity.collider.group = '';
		entity.timeout.active = true;
		entity.timeout.remainingTime = 0.5;
		entity.rewardPoints = 0;

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

		entity.motion.av = 0;
		entity.collider.active = false;
		entity.collider.radius = scale * 3 * 22 / 2;
		entity.collider.group = 'asteroid';

		entity.timeout.active = false;
		entity.timeout.remainingTime = 0;
		entity.rewardPoints = this.config.getAsteroidReward(size);

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
		entity.collider.group = '';

		entity.timeout.active = true;
		entity.timeout.remainingTime = 0.233;

		entity.rewardPoints = 0;
		return entity;
	};

	api.createUFO = function createUFO(board, big, target) {
		var entity = this.availableObjects.getEntity();

		entity.motion.av = 0;
		entity.collider.active = false;
		entity.collider.radius = 25;
		entity.collider.group = 'ufo';

		entity.timeout.active = false;
		entity.timeout.remainingTime = 0;

		if (big) {
			entity.state = new UFOState(board);
			entity.state.weapon = new Gun(board, entity, 'ufo-bullet', this);
			entity.state.weapon.reloadTime = this.config.ufoBulletReloadTime;
			entity.state.weapon.bulletSpeed = this.config.ufoBulletSpeed;
			entity.view = this.atlas.getDisplayObject('big-ufo');
			entity.viewController = new UFOViewController(entity.view, 'big-ufo');
			entity.view.regX = 33;
			entity.view.regY = 25;
			entity.rewardPoints = this.config.bigUFOReward;
			//
			entity.state.aim = function aim(weapon) {
				weapon.rotation = Math.random() * 360;
			};
		} else {
			entity.state = new UFOState(board);
			entity.state.weapon = new Gun(board, entity, 'ufo-bullet', this);
			entity.state.weapon.reloadTime = this.config.miniUfoBulletReloadTime;
			entity.state.weapon.bulletSpeed = this.config.ufoBulletSpeed;
			entity.view = this.atlas.getDisplayObject('small-ufo');
			entity.viewController = new UFOViewController(entity.view, 'big-ufo');
			entity.view.regX = 23;
			entity.view.regY = 15;
			entity.rewardPoints = this.config.smallUFOReward;
			//
			entity.state.aim = function aim(weapon) {
				var dx = target.position.x - weapon.holder.position.x;
				var dy = target.position.y - weapon.holder.position.y;
				var angle = Math.atan2(dy, dx);
				weapon.rotation = angle * 180 / Math.PI;
			};
		}

		entity.active = true;
		return entity;
	};

	api.createBullet = function createBullet(group) {
		var entity = this.availableObjects.getEntity();
		entity.viewController = null;

		entity.view = this.atlas.getDisplayObject(group);
		entity.view.regX = 6;
		entity.view.regY = 2;

		entity.motion.av = 0;
		entity.collider.active = true;
		entity.collider.radius = 2;
		entity.collider.group = group;

		entity.timeout.active = true;
		entity.timeout.remainingTime = 2;

		entity.state = 'bullet';
		entity.active = true;
		entity.rewardPoints = 0;
		return entity;
	};

	return EntityFactory;
});
