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
requirejs(['lib/easeljs/EaselJSAtlasLoader', 'lib/KeyPoll', 'app/AsteroidsGame'],
	function (EaselJSAtlasLoader, KeyPoll, AsteroidsGame) {

		console.log('Asteroids Main');

		var keypoll = new KeyPoll(document);

		var bdg = new AsteroidsGame();

		var loader = new EaselJSAtlasLoader();
		loader.complete.add(function (atlas) {
			console.log('Asteroids Main - atlas loaded');
			bdg.init('canvas', atlas, keypoll);
		});
		loader.load('./assets/', 'asteroids.json');

	});