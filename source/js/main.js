requirejs.config({
});

requirejs(['app/AsteroidsAssetLoader', 'app/Config', 'app/AsteroidsGame'],
	function (AsteroidsAssetLoader, Config, AsteroidsGame) {

		console.log('[Asteroids Main]');
		var application = new AsteroidsGame();

		var config = new Config();
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			config.touchDevice = true;
		}
		var aal = new AsteroidsAssetLoader();
		aal.completed.add(function (atlas) {
			console.log('[Asteroids Main] Initializing Main Application');
			application.init('canvas', atlas, config);

		});
		aal.loadAssets();

	});