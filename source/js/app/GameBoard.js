/**
 * GameBoard
 * @author Julian
 */
define(function () {

	function GameBoard(width, height, wrap_margin) {

		this.entityRemoved = new signals.Signal();
		this.entityAdded = new signals.Signal();

		this.width = width;
		this.height = height;
		this.wrapMargin = wrap_margin;
		this.entities = [];

		this._fresh = [];
		this._trash = [];
	}

	var api = GameBoard.prototype;

	api.addEntity = function addEntity(entity) {
		if (entity !== null) {
			entity.active = true;
			this._fresh.push(entity);
		}
	};

	api.addEntities = function addEntities(list) {
		var n = list.length;
		for (i = 0; i < n; i++) {
			this.addEntity(list[i]);
		}
	};

	api.removeEntity = function removeEntity(entity) {
		if (entity.active) {
			entity.active = false;
			this._trash.push(entity);
			this.entityRemoved.dispatch(entity);
		}
	};

	api.update = function update(dt) {
		this._emptyTrash();
		this._addFresh();
	};

	api._emptyTrash = function _emptyTrash() {
		var i;
		var n = this._trash.length;
		for (i = 0; i < n; i++) {
			var entity = this._trash[i];
			var index = this.entities.indexOf(entity);
			if (index >= 0) this.entities.splice(index, 1);
		}
		for (i = 0; i < n; i++) this._trash.pop();
	};

	api._addFresh = function _addFresh() {
		var i;
		var n = this._fresh.length;
		for (i = 0; i < n; i++) {
			var entity = this._fresh[i];
			var index = this.entities.indexOf(entity);
			if (index == -1) {
				this.entities.push(entity);
				this.entityAdded.dispatch(entity);
			}
		}
		for (i = 0; i < n; i++) this._fresh.pop();
	};


	return GameBoard;


});