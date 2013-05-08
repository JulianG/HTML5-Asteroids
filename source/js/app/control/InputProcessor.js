/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:04
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function InputProcessor() {

	}

	var api = InputProcessor.prototype;

	api.processInput = function processInput( board, dt ){
		console.log('InputProcessor.processInput...' );

		var n = board.entities.length;
		for (var i = 0; i < n; i++) {

			var entity = board.entities[i];

			if(entity.control)
			{
				entity.control.processInput(entity, dt);
			}
		}

	};

	return InputProcessor;
});