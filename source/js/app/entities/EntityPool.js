/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:36
 * To change this template use File | Settings | File Templates.
 */
define(['app/entities/Entity'], function (Entity) {

	/**
	 * An ObjectPool for Entity instances.
	 * @constructor
	 */
	function EntityPool() {
		this.availableObjects = [];
	}

	var api = EntityPool.prototype;

	api.getEntity = function getEntity() {
		var obj = null;
		if (this.availableObjects.length > 0) {
			obj = this.availableObjects.pop();
		} else {
			obj = this.instantiate();
		}
		return obj;
	};

	api.disposeEntity = function returnEntity(entity) {
		this.availableObjects.push(entity);
	};

	api.instantiate = function instantiate(){
		return new Entity();
	};

	return EntityPool;
});