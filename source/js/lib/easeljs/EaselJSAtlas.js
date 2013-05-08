/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/03/13
 * Time: 15:26
 * To change this template use File | Settings | File Templates.
 */
define(['lib/signals.min','lib/easeljs/DisplayObjectPool'], function (signals,DisplayObjectPool) {

	function EaselJSAtlas() {
		this.completed = new signals.Signal();
		this.spriteSheet = null;
		this.objectPools = null;
	}

	var api = EaselJSAtlas.prototype;

	api.init = function init(obj, path, separator) {
		this._validate(obj);
		this.data = obj;
		this._prependPath(path);
		this._detectAnimations(separator);
		this.spriteSheet = new createjs.SpriteSheet(this.data);
		this._initAnimations(this.spriteSheet);

		var completed = this.completed;
		this.spriteSheet.addEventListener('complete', function () {
			completed.dispatch();
		});
	};

	api.getDisplayObjectList = function getDisplayObjectList() {
		return this.spriteSheet.getAnimations();
	};

	api.getDisplayObject = function getDisplayObject(name){
		var obj = null;
		var pool = this.objectPools[name];
		if(pool){
			obj = pool.getObject();
			obj.gotoAndPlay(name);
		}else{
			throw('[EaselJSAtlas] Error. Cannot find an object pool named: ' + name);
		}
		return obj;
	};

	api._prependPath = function _prependPath(path) {

		var list = this.data.images;
		var n = list.length;
		for (var i = 0; i < n; i++) {
			list[i] = path + list[i];
		}
	};

	api._detectAnimations = function _detectAnimations(separator) {
		var animations = {};
		for (var key in this.data.animations) {
			var parts = key.split(separator);
			if (parts.length > 1) {
				if (!animations[parts[0]]) {
					animations[parts[0]] = {};
					animations[parts[0]].frames = [];
				}
				animations[parts[0]].frames.push(this.data.animations[key][0]);
			} else {
				animations[key] = this.data.animations[key];
			}
		}
		this.data.animations = animations;
	};

	api._initAnimations = function _initAnimations(ss) {
		this.objectPools = {};
		var animations = ss.getAnimations();
		var self = this;
		animations.forEach(function (name) {
			var anim = ss.getAnimation(name);
			self._initBitmapAnimation(ss, name);
			/*if (anim.frames.length == 1) {
				self._initBitmap(ss, name);
			} else {
				self._initBitmapAnimation(ss, name);
			}*/
		});
	};

	/*api._initBitmap = function _initBitmap(ss, name) {
		var pool = new DisplayObjectPool();
		pool.instantiate = function(){
			return new createjs.Bitmap();
		};
		pool.init(10);
		this.objectPools[name] = pool;
	};*/
	api._initBitmapAnimation = function _initBitmapAnimation(ss, name) {
		//var bmpa = new createjs.BitmapAnimation(ss);
		//bmpa.gotoAndPlay(name, 0);
		var pool = new DisplayObjectPool();
		pool.instantiate = function instantiate(){
			return new createjs.BitmapAnimation(ss);
		};
		pool.init(10);
		this.objectPools[name] = pool;
	};

	api._validate = function _validate(obj) {
		var errors = '';
		if (obj) {
			if (!this._isArray(obj.images)) {
				errors += ' .images must be an Array.\n';
			}
			if (!this._isArray(obj.frames)) {
				errors += ' .frames must be an Array.\n';
			}
			if (!this._isObject(obj.animations)) {
				errors += ' .animations must be an Object.\n';
			}
		}
		else {
			errors += ' obj cannot be null.\n';
		}
		if (errors !== '') {
			throw('Error validating Atlas object.\n' + errors);
		}
	};

	api._isArray = function _isArray(obj) {
		return ( Object.prototype.toString.call(obj) === '[object Array]' );
	};
	api._isObject = function _isObject(obj) {
		return ( Object.prototype.toString.call(obj) === '[object Object]' );
	};


	return EaselJSAtlas;
});