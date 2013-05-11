requirejs.config({
	//By default load any module IDs from
	//baseUrl: './lib',

	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	//paths: { app: './app' }
});

// Start the main app logic.
requirejs(['lib/easeljs/EaselJSAtlasLoader', 'lib/SoundPreloader', 'lib/KeyPoll', 'app/AsteroidsGame'],
	function (EaselJSAtlasLoader, SoundPreloader, KeyPoll, AsteroidsGame) {

		console.log('Asteroids Main');

		var keypoll = new KeyPoll(document);

		var bdg = new AsteroidsGame();

		var sound_loader = new SoundPreloader();
		var atlas_loader = new EaselJSAtlasLoader();

		var path = './assets/audio/';

		atlas_loader.complete.add(function (atlas) {
			console.log('Asteroids Main - graphics loaded');
			//console.log(atlas.data);
			loadSounds(atlas);
		});
		atlas_loader.load('./assets/', 'asteroids.json');

		function loadSounds(atlas) {
			var sound_manifest = [];
			createjs.FlashPlugin.BASE_PATH = "./libs/soundjs/";
			createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin, createjs.HTMLAudioPlugin]);
			var cap = createjs.Sound.getCapabilities();

			var ext = '';
			if (cap.ogg) {
				ext = ".ogg";
			}else{
				if (cap.mp3) {
					ext = ".mp3";
				}
			}

			sound_manifest = [
				{id: "button", src: path + "button" + ext},
				{id: "explosion", src: path + "explosion" + ext},
				{id: "laser", src: path + "laser" + ext},
				{id: "thruster", src: path + "thruster" + ext},
				{id: "levelstart", src: path + "levelstart" + ext},
				{id: "big-ufo", src: path + "big-ufo" + ext},
				{id: "small-ufo", src: path + "small-ufo" + ext}
			];
			sound_loader.loaded.add(function () {
				console.log('Asteroids Main - ALL sounds loaded');
				bdg.init('canvas', atlas, keypoll);
			});

			if(ext=''){
				console.log('Asteroids Main - not loading sounds');
				bdg.init('canvas', atlas, keypoll);
			}else{
				console.log("Asteroids Main - loading " + sound_manifest.length + " sounds.");
				sound_loader.init(sound_manifest);
			}

		}

	});