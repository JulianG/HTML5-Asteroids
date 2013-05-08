/**
 * GameBoard
 * @author Julian
 */
define([], function () {

		function BoardAnalyser() {

		}

		var api = BoardAnalyser.prototype;

		api.analyse = function analyse(board, dt) {

			console.log('BoardAnalyser.analyse... must check collisions after ' + dt);


		};

		return BoardAnalyser;

	}
)
;