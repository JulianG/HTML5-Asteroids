/*

node build.js

*/
var requirejs = require('requirejs');

var options = {
    appDir: "./source",
    baseUrl: "js",
    dir: "./build",
    modules: [
        {
            name: "main"
        }
    ]
};

console.log('optimizing...');
requirejs.optimize( options, function(response){
        console.log(response);
		console.log('optimized!');		
    });