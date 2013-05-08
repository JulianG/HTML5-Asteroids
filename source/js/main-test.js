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
requirejs(['tests/AtlasTest'], function (AtlasTest) {
	console.log("Main (AtlasTest)");
	test = new AtlasTest();
	test.init();


});