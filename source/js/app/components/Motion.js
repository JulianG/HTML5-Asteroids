/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 15:38
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function Motion() {
		this.vx = 0;
		this.vy = 0;
		this.av = 0;
		this.damping = 1;
	}

	var api = Motion.prototype;

	api.clone = function clone(that) {
		this.vx = that.vx;
		this.vy = that.vy;
		this.av = that.av;
		this.damping = that.damping;
	};

	api.stop = function stop() {
		this.vx = 0;
		this.vy = 0;
		this.av = 0;
	};

	api.getSpeed = function getSpeed() {
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	};

	return Motion;
});