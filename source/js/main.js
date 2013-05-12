requirejs.config({
});

requirejs(['app/AsteroidsAssetLoader', 'lib/KeyPoll', 'app/AsteroidsGame'],
	function (AsteroidsAssetLoader, KeyPoll, AsteroidsGame) {

		console.log('[Asteroids Main]');
		var application = new AsteroidsGame();
		var keypoll = new KeyPoll(document); // Based on @brejep 's KeyPoll script.
		var aal = new AsteroidsAssetLoader();
		aal.completed.add(function (atlas) {
			console.log('[Asteroids Main] Initializing Main Application');
			application.init('canvas', atlas, keypoll);

		});
		aal.loadAssets();

	});