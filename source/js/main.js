requirejs.config({
	//By default load any module IDs from js/lib
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
		var sound_manifest = [
			{id: "button", src: path + "button.mp3"},
			{id: "explosion", src: path + "explosion.mp3"},
			{id: "laser", src: path + "laser.mp3"},
			{id: "thruster", src: path + "thruster.mp3"},
			{id: "levelstart", src: path + "levelstart.mp3"}
		];

		atlas_loader.complete.add(function (atlas) {
			console.log('Asteroids Main - graphics loaded');
			console.log(atlas.data);
			sound_loader.loaded.add(function () {
				console.log('Asteroids Main - sounds loaded');
				bdg.init('canvas', atlas, keypoll);
			});
			sound_loader.init(sound_manifest);
		});
		atlas_loader.load('./assets/', 'asteroids.json');

	});