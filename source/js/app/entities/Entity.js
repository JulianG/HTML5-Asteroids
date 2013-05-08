/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:31
 * To change this template use File | Settings | File Templates.
 */
define(['app/entities/Position','app/entities/Motion','app/collisions/Collider'], function (Position,Motion,Collider) {

	function Entity() {
		this.active = true;
		this.state = '';
		this.position = new Position();
		this.collider = new Collider();
		this.motion = new Motion();
		this.control = null;
		this.view = null;
		this.viewController = null;
	}

	var api = Entity.prototype;

	return Entity;
});