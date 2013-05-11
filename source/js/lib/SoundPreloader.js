/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 08:38
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	/**
	 * Preloads sound effects. To play them back use createjs.Sound.play(id);
	 * @constructor
	 */
	function SoundPreloader() {
		this.loaded = new signals.Signal();
	}

	var api = SoundPreloader.prototype;

	api.init = function init(manifest) {

		var cap = createjs.Sound.getCapabilities();
		console.log("cap:");
		console.log(cap);

		var self = this;

		var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.addEventListener("complete", function () {
			self._handleLoadComplete();
		});
		queue.loadManifest(manifest);
	};

	api._handleLoadComplete = function _handleLoadComplete() {
		this.loaded.dispatch();
	};

	return SoundPreloader;
});