HTML5 Asteroids
===============

An Asteroids clone made in Javascript, using [CreateJS](http://www.createjs.com/#!/CreateJS), [RequireJS](http://requirejs.org/) and [JS-Signals](https://github.com/millermedeiros/js-signals).

It's also my first AMD JavaScript project. 
I'm using RequireJS to optimize, or concatenate+minify, however the createjs libraries are not being loaded by RequireJS, I haven't looked into that yet.

I'm using [TexturePacker](http://www.codeandweb.com/texturepacker) for my sprite sheets.

![HTML5 Asteroids](https://lh6.googleusercontent.com/-kf04XitGt-A/UY31cZEUNsI/AAAAAAAAW-M/e3LSC5SO8yc/w800-h480-no/html5asteroids-00.png)

## Play online ##

You can play HTML5 Asteroids [here](http://tubamuga.com/demos/html5/asteroids/).

## How to Build/Optimize ##

I'm not sure. I think it's like this:

	// Get the required node modules
	npm install
	
	// Check for code errors (optional)
	node jshint.js
	
	// Build using RequireJS optimizer
	node build.js

The deployment files will be copied to the **build** directory.

## License ##

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_GB"><img alt="Creative Commons Licence" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png"/></a>

HTML5 Asteroids by [Julian Garamendy](http://tubamuga.com/demos/julian/) is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/deed.en_GB).