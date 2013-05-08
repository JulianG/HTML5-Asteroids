/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:31
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function Entity() {
		this.active = true;
		this.position = {x: 0, y: 0, rotation: 0};
		this.motion = {vx: 0, vy: 0, av: 0};
		this.control = null;
		this.view = null;
	}

	var api = Entity.prototype;

	return Entity;
});