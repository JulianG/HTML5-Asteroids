/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 15:41
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function Collider(){
		this.reset();
	}

	var api = Collider.prototype;

	api.reset = function reset(){
		this.active = false;
		this.radius = 0;
		this.group = '';
	};

	return Collider;
});