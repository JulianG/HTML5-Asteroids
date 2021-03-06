/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 12:30
 */
define(function () {

	/**
	 * Contains all the magic numbers.
	 * @constructor
	 */
	function Config() {

		this.version = 'v1.1.0';

		this.touchDevice = false;

		this.initialLives = 3;

		this.spaceWidth = 800;
		this.spaceHeight = 480;
		this.spaceWrapMargin = 40;

		this.levelUpTimerDuration = 1000;
		this.spawnTimerDuration = 2000;

		this.maxNumAsteroids = 128;
		this.maxNumBullets = 8;
		this.bulletSpeed = 300;
		this.bulletReloadTime = 0.05;
		this.bulletLifespan = 1.15;
		this.hyperspaceTime = 1000;

		this.shipAcceleration = 150;
		this.shipSteeringSpeed = 300;
		this.shipMaxSpeed = 200;
		this.shipFriction = 0.99;
		this.asteroidAngularSpeed = 50;

		this.ufoSpeed = 50;
		this.ufoDelay = 10;
		this.ufoFrequency = 10;

		this.ufoBulletSpeed = 150;
		this.ufoBulletReloadTime = 0.75;
		this.miniUfoBulletReloadTime = 2.00;
		//this.miniUFOCoolOffPeriod = 2;

		this._asteroidRewards = [0, 100, 50, 20];
		this.bigUFOReward = 500;
		this.smallUFOReward = 1000;
	}

	var api = Config.prototype;

	api.getAsteroidSpeed = function getAsteroidSpeed(level) {
		return 4 * (8 + level);
	};

	api.getAsteroidReward = function getAsteroidReward(scale) {
		return this._asteroidRewards[scale];
	};

	api.getNumAsteroids = function getNumAsteroids(level) {
		return 3 + level;
	};

	return Config;
});