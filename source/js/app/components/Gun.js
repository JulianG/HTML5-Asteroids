/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 22:28
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function Gun(board, holder, bullet_group, factory) {
		this.board = board;
		this.holder = holder;
		this.factory = factory;
		this.reloadTime = 0.15;
		this.elapsed = 0;
		this.bulletSpeed = 300;
		this.triggerDown = false;
		this.rotation = 0;
		this.bulletGroup = bullet_group;
	}

	var api = Gun.prototype;

	api.update = function update(dt) {
		if (this.triggerDown && this.holder) this.shoot();
		this.elapsed += dt;
	};


	api.shoot = function shoot() {
		var rsp;
		if (this.isIdle()) {
			this.elapsed = 0;
			rsp = this._getBullet();
			createjs.Sound.play('laser');
		}
		return rsp;
	};

	api._getBullet = function _getBullet() {

		var bullet = this.factory.createBullet(this.bulletGroup);
		//bullet.reset();
		bullet.position.rotation = this.rotation;
		var angle = bullet.position.rotation * Math.PI / 180;
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		bullet.motion.vx = cos * this.bulletSpeed;
		bullet.motion.vy = sin * this.bulletSpeed;
		bullet.position.x = this.holder.position.x + (this.holder.collider.radius ) * cos * 2;
		bullet.position.y = this.holder.position.y + (this.holder.collider.radius ) * sin * 2;
		this.board.addEntity(bullet);
		return bullet;
	};

	api.isIdle = function isIdle() {
		return this.holder && this.elapsed > this.reloadTime;
	};


	return Gun;
});