/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 08:38
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	/**
	 * Preloads SoundFX. To play them back use createjs.Sound.play(id);
	 * @constructor
	 */
	function SoundFX() {
	}

	var api = SoundFX.prototype;

	api.init = function init() {
		var self = this;
		var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.addEventListener("complete", function () {
			self._handleLoadComplete();
		});

		var path = './assets/audio/';
		queue.loadManifest([
			{id: "button", src: path + "button.mp3"},
			{id: "explosion", src: path + "explosion.mp3"},
			{id: "laser", src: path + "laser.mp3"},
			{id: "thruster", src: path + "thruster.mp3"}
		]);

	};

	api._handleLoadComplete = function _handleLoadComplete() {
	};

	return SoundFX;
});