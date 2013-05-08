/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:34
 */

define(function () {

	function EntityFactory(atlas,pool) {
		this.atlas = atlas;
		this.availableObjects = pool;
	}

	var api = EntityFactory.prototype;

	api.createAsteroid = function createAsteroid(){
		var entity = this.availableObjects.getEntity();
		entity.view = this.atlas.getDisplayObject("asteroid-00");
		return entity;
	};

	return EntityFactory;
});
