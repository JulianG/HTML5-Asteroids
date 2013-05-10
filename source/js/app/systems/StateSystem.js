/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 21:54
 * To change this template use File | Settings | File Templates.
 */
define(function () {

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
			if(entity && entity.active && entity.state && entity.state.handleAdded) entity.state.handleAdded(entity);
	};

	api.update = function update(dt) {
		this.board.entities.forEach( function(entity,index,entities){
			if(entity && entity.active && entity.state && entity.state.update) entity.state.update(dt);
		});
	};

	api.remove = function remove(entity){
			if(entity && entity.active && entity.state && entity.state.handleRemoved) entity.state.handleRemoved(entity);
	};

	return StateSystem;
});