/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 21:54
 */
define(function () {

	/**
	 * This is a generic system that can be used for almost anything.
	 * (It is used by UFOs and the Ship to keep their weapons and other stuff. but this class isn't aware of that, of course)
	 *
	 * @param board
	 * @constructor
	 */
	function StateSystem(board) {
		this.board = board;

		var self = this;
		this.board.entityRemoved.add(function (entity) {
			self.remove(entity);
		});
		this.board.entityAdded.add(function (entity) {
			self.add(entity);
		});
	}

	var api = StateSystem.prototype;

	api.add = function add(entity){
			if(entity && entity.state && entity.state.handleAdded) entity.state.handleAdded(entity);
	};

	api.update = function update(dt) {
		this.board.entities.forEach( function(entity,index,entities){
			if(entity && entity.active && entity.state && entity.state.update) entity.state.update(dt);
		});
	};

	api.remove = function remove(entity){
			if(entity && entity.state && entity.state.handleRemoved) entity.state.handleRemoved(entity);
	};

	return StateSystem;
});