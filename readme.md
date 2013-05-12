HTML5 Asteroids
===============

An Asteroids clone made in Javascript, using [CreateJS](http://www.createjs.com/#!/CreateJS), [RequireJS](http://requirejs.org/) and [JS-Signals](https://github.com/millermedeiros/js-signals).

It's also my first AMD JavaScript project. 
I'm using RequireJS to optimize, or concatenate+minify, however the createjs libraries are not being loaded by RequireJS, I haven't looked into that yet.

I'm using [TexturePacker](http://www.codeandweb.com/texturepacker) for my sprite sheets.

![HTML5 Asteroids](https://lh6.googleusercontent.com/-kf04XitGt-A/UY31cZEUNsI/AAAAAAAAW-M/e3LSC5SO8yc/w800-h480-no/html5asteroids-00.png)

## How to Build ##

I'm not sure. I think it's like this:

	// Get the required node modules
	npm install
	
	// Check for code errors (optional)
	node jshint.js
	
	// Build using RequireJS optimizer
	node build.js

The deployment files will be copied to the **build** directory.








