/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 15:38 */
define(function () {

	/**
	 * USed by RenderSystem, MotionSystem and probably others.
	 * @constructor
	 */
	function Position() {
		this.reset();
	}

	var api = Position.prototype;

	api.clone = function clone(that) {
		this.x = that.x;
		this.y = that.y;
		this.rotation = that.rotation;
	};

	api.getDistanceTo = function getDistanceTo(x, y) {
		var dx = x - this.x;
		var dy = y - this.y;
		return Math.sqrt(dx * dx + dy * dy);
	};

	api.getAngleTo = function getAngleTo(x, y) {
		var dx = x - this.x;
		var dy = y - this.y;
		var angle = this._normalizeAngle(Math.atan2(dy, dx) * 180 / Math.PI, 360);
		this.rotation = this._normalizeAngle(this.rotation, 360);
		var steer = angle - this.rotation;
		if (Math.abs(steer) > 180) {
			steer = (180 - steer) % 360;
		}
		return steer;
	};

	api.reset = function reset() {
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
	};

	api._normalizeAngle = function _normalizeAngle(angle, max) {
		angle = angle % max;
		if (angle < 0) {
			angle += max;
		}
		return angle;
	};

	return Position;
});