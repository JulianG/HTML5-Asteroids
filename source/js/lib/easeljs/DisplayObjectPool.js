/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 12/03/13
 * Time: 09:21
 */
define(function () {

	/**
	 * Provides object-pooling for EaselJS DisplayObject instances.
	 * @constructor
	 */
	function DisplayObjectPool() {
		this.availableObjects = [];
	}

	var api = DisplayObjectPool.prototype;

	api.init = function init(qty) {
		for (var i = 0; i < qty; i++) {
			var obj = this.getObject();
			this.disposeObject(obj);
		}
	};

	api.getObject = function getObject() {
		var obj = null;
		if (this.availableObjects.length > 0) {
			obj = this.availableObjects.pop();
		} else {
			obj = this.instantiate();
		}
		return obj;
	};

	api.disposeObject = function disposeObject(obj) {
		this.availableObjects.push(obj);
	};

	api.instantiate = function instantiate() {
		return null;
	};

	return DisplayObjectPool;
});