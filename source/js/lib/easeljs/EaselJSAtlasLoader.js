/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 05/04/13
 * Time: 18:20
 */
define(['lib/loadJSON', 'lib/easeljs/EaselJSAtlas'], function (loadJSON, EaselJSAtlas) {

	/**
	 * Loads and parses a json atlas and then returns an instance of EaselJSAtlas.
	 * @constructor
	 */
	function EaselJSAtlasLoader() {
		this.complete = new signals.Signal();
		this.atlas = null;
	}

	var api = EaselJSAtlasLoader.prototype;

	api.load = function load(path, filename) {
		var self = this;
		this._loadAtlas(path, filename, function (obj, path) {
			self._buildAtlas(obj, path, function () {
				self.complete.dispatch(self.atlas);
			});
		});
	};

	api._loadAtlas = function _loadAtlas(path, filename, callback) {
		var self = this;
		loadJSON(path + filename, function (obj) {
			if (callback) callback(obj, path);
		});
	};

	api._buildAtlas = function _buildAtlas(obj, path, callback) {
		var self = this;
		this.atlas = new EaselJSAtlas();
		if (callback) this.atlas.completed.add(callback);
		this.atlas.init(obj, path, '/');
	};

	return EaselJSAtlasLoader;
});