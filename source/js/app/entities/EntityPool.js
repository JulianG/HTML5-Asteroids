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
		var entity = null;
		if (this.availableObjects.length > 0) {
			entity = this.availableObjects.pop();
		} else {
			entity = this.instantiate();
		}
		entity.reset();
		var self = this;
		entity.removed.add(function () {
			self.disposeEntity(entity);
			entity.removed.removeAll();
		});
		return entity;
	};

	api.disposeEntity = function returnEntity(entity) {
		this.availableObjects.push(entity);
	};

	api.instantiate = function instantiate() {
		return new Entity();
	};

	return EntityPool;
});