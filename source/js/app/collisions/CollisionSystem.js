/**
 * GameBoard
 * @author Julian
 */
define([], function () {

		function CollisionSystem() {

		}

		var api = CollisionSystem.prototype;

		api.update = function update(board, dt) {

			console.log('BoardAnalyser.analyse... must check collisions after ' + dt);


		};

		return CollisionSystem;

	}
)
;