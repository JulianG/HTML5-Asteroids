/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 16:15
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function Timeout() {
		this.active = false;
		this.remainingTime = 0;
	}

	var api = Timeout.prototype;

	api.update = function update(dt) {
		this.remainingTime = Math.max(this.remainingTime - dt, 0);
	}

	return Timeout;
});