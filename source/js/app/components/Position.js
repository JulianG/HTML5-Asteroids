/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 15:38
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function Position() {
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
	}

	var api = Position.prototype;

	api.clone = function clone(that) {
		console.log("cloning");
		console.log(that);
		this.x = that.x;
		this.y = that.y;
		this.rotation = that.rotation;
	};

	return Position;
});