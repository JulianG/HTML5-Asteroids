/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 16:15
 */
define(function () {

	/**
	 * Used by the TimeoutSystem
	 * @constructor
	 */
	function Timeout() {
		this.active = false;
		this.remainingTime = 0;
	}

	var api = Timeout.prototype;

	api.reset = function reset(){
		this.active = false;
		this.remainingTime = 0;
	};

	api.update = function update(dt) {
		this.remainingTime = Math.max(this.remainingTime - dt, 0);
	};

	return Timeout;
});