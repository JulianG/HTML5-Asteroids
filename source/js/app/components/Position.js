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

	api.reset = function reset(){
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
	};

	return Position;
});