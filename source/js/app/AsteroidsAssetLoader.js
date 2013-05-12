/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 12/05/13
 * Time: 10:19
 */
define(['lib/easeljs/EaselJSAtlasLoader', 'lib/SoundPreloader'], function (EaselJSAtlasLoader, SoundPreloader) {

	/**
	 * This class is specific to this Asteroids game.
	 * It loads the atlas and then it preloads the sounds.
	 * When it's done, it dispatches a signal.
	 * @constructor
	 */
	function AsteroidsAssetLoader() {
		this.completed = new signals.Signal();
		this.atlasLoader = new EaselJSAtlasLoader();
		this.soundLoader = new SoundPreloader();
		this.atlas = null;
	}

	var api = AsteroidsAssetLoader.prototype;

	api.loadAssets = function loadAssets() {
		var self = this;
		this.atlasLoader.complete.add(function (atlas) {
			console.log('[AsteroidsAssetLoader] atlas loaded');
			console.log(atlas);
			self.atlas = atlas;
			self._loadSounds();
		});
		console.log('[AsteroidsAssetLoader] loading atlas');
		this.atlasLoader.load('./assets/', 'asteroids.json');
	};

	api._loadSounds = function _loadSounds() {
		var ext = this._getSoundFileExtension();
		var sound_manifest = this._createManifest(ext);

		var self = this;
		this.soundLoader.loaded.add(function () {
			console.log('[AsteroidsAssetLoader] ALL sounds loaded');
			self.completed.dispatch(self.atlas);
		});

		if (ext = '') {
			console.log('[AsteroidsAssetLoader] not loading sounds');
			self.completed.dispatch(self.atlas);
		} else {
			console.log('[AsteroidsAssetLoader] loading sounds of type ' + ext);
			this.soundLoader.init(sound_manifest);
		}
	};

	/**
	 * Decides which file types to use: ogg, mp3 or wav, based on the client's capabilities.
	 * @returns {string}
	 * @private
	 */
	api._getSoundFileExtension = function _getSoundFileExtension() {
		var ext = '';
		createjs.FlashPlugin.BASE_PATH = "./libs/soundjs/";
		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin, createjs.HTMLAudioPlugin]);
		var cap = createjs.Sound.getCapabilities();
		if (cap.ogg) {
			ext = ".ogg";
		} else {
			if (cap.mp3) {
				ext = ".mp3";
			}
		}
		return ext;
	};

	/**
	 * Creates a list of sound files to be loaded.
	 * @param ext
	 * @returns {Array}
	 * @private
	 */
	api._createManifest = function _createManifest(ext) {
		var path = './assets/audio/';
		return [
			{id: "button", src: path + "button" + ext},
			{id: "explosion", src: path + "explosion" + ext},
			{id: "laser", src: path + "laser" + ext},
			{id: "thruster", src: path + "thruster" + ext},
			{id: "levelstart", src: path + "levelstart" + ext},
			{id: "big-ufo", src: path + "big-ufo" + ext},
			{id: "small-ufo", src: path + "small-ufo" + ext}
		];
	};

	return AsteroidsAssetLoader;
});