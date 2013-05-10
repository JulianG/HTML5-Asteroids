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

var test = null;

// Start the main app logic.
requirejs(['tests/AtlasTest','lib/SoundPreloader'], function (AtlasTest, SoundPreloader) {
	console.log("Main Test");
	//test = new AtlasTest();
	//test.init();

	var sound_loader = new SoundPreloader();

	var path = './assets/audio/';
	var sound_manifest = [
		{id: "button", src: path + "button.mp3"},
		{id: "explosion", src: path + "explosion.mp3"},
		{id: "laser", src: path + "laser.mp3"},
		{id: "thruster", src: path + "thruster.mp3"},
		{id: "levelstart", src: path + "levelstart.mp3"},
		{id: "big-ufo", src: path + "big-ufo.ogg"},
		{id: "small-ufo", src: path + "small-ufo.ogg"}
	];

	sound_loader.loaded.add(function () {
		console.log('Asteroids Main - sounds loaded');
	});
	sound_loader.init(sound_manifest);

});