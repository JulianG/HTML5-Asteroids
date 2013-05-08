/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:31
 * To change this template use File | Settings | File Templates.
 */
define(['app/components/Position', 'app/components/Motion', 'app/components/Collider', 'app/components/Timeout'], function (Position, Motion, Collider, Timeout) {

	function Entity() {
		this.active = true;
		//this.trash = false;
		this.state = '';
		this.position = new Position();
		this.collider = new Collider();
		this.motion = new Motion();
		this.control = null;
		this.timeout = new Timeout();
		this.view = null;
		this.viewController = null;
	}

	var api = Entity.prototype;

	return Entity;
});