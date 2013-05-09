/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 22:28
 * To change this template use File | Settings | File Templates.
 */
define(function () {
	
	function Gun(board,holder,factory){
		this.board = board;
		this.holder = holder;
		this.factory = factory;

		this.reloadTime = 0.15;
		this.elapsed = 0;
		this.bulletSpeed = 300;

		this.triggerDown = false;
	}

	var api = Gun.prototype;

	api.update = function update(dt){
		this.elapsed += dt;
		if(this.triggerDown && this.holder) this.shoot( this.holder.position.rotation );
	};


	api.shoot = function shoot(angle){
		var rsp;
		if (this._isIdle())
		{
			this.elapsed = 0;
			rsp = this._getBullet(angle);
			createjs.Sound.play('laser');
		}
		return rsp;
	};

	api._getBullet  = function _getBullet(angle)	{

		var bullet = this.factory.createBullet();
		//bullet.reset();
		bullet.rotation = angle;
		var angle = bullet.rotation * Math.PI / 180;
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		bullet.motion.vx = cos * this.bulletSpeed;
		bullet.motion.vy = sin * this.bulletSpeed;
		bullet.position.x = this.holder.position.x + (this.holder.collider.radius ) * cos * 2;
		bullet.position.y = this.holder.position.y + (this.holder.collider.radius ) * sin * 2;
		bullet.position.rotation = this.holder.position.rotation;
		this.board.addEntity(bullet);
		return bullet;
	};

	api._isIdle = function _isIdle(){
		return this.holder && this.elapsed > this.reloadTime;
	};


	return Gun;
});