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
	}

	var api = StateSystem.prototype;

	api.update = function update(dt) {
		var n = this.board.entities.length;
		for (var i = 0; i < n; i++) {
			var entity = this.board.entities[i];
			if(entity && entity.active && entity.state){
				if(entity.state.update) entity.state.update(dt);
			}
		}
	};
	return StateSystem;
});