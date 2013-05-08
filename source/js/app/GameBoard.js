/**
 * GameBoard
 * @author Julian
 */
define(function () {

	function GameBoard( width, height) {

		//this.collected = new signals.Signal();
		this.width = width;
		this.height = height;
		this.entities = [];
	}

	var api = GameBoard.prototype;

	api.addEntity = function addEntity(entity){
		this.entities.push(entity);
	};
	api.removeEntity = function removeEntity(entity){
		var index = this.entities.indexOf(entity);
		if(index>-1) this.entities.splice(index,1);
	}

	return GameBoard;


});