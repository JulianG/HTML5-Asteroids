/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:34
 */

define(function () {

	function EntityFactory(atlas, pool) {
		this.atlas = atlas;
		this.availableObjects = pool;
	}

	var api = EntityFactory.prototype;

	api.createAsteroid = function createAsteroid(size) {
		var entity = this.availableObjects.getEntity();
		entity.view = this.atlas.getDisplayObject("asteroid-00");
		entity.view.regX = 45;
		entity.view.regY = 45;
		var scale = size/3;
		entity.view.scaleX = entity.view.scaleY = scale;

		entity.motion.va = 50;
		entity.collider.radius = scale * 3 * 45/2;

		return entity;
	};

	return EntityFactory;
});
