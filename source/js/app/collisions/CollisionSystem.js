/**
 * GameBoard
 * @author Julian
 */
define([], function () {

		function CollisionSystem() {
			this.collisionDetected = new signals.Signal();
		}

		var api = CollisionSystem.prototype;

		api.update = function update(board, dt) {
			var n = board.entities.length;
			for (i = 0; i < n; i++) {
				var entity = board.entities[i];
				if (entity.collider.active) {
					this._checkCollisionsFor(entity, board.entities);
				}
			}
		};

		api._checkCollisionsFor = function _checkCollisionsFor(active_entity, entities) {
			var n = entities.length;
			for (i = 0; i < n; i++) {
				var passive_entity = entities[i];
				if (active_entity !== passive_entity) {
					this._checkCollisions(active_entity, passive_entity);
				}
			}
		};

		api._checkCollisions = function _checkCollisions(active_entity, passive_entity) {
			var distance = this._getDistance(active_entity.position, passive_entity.position);
			if (distance < active_entity.collider.radius + passive_entity.collider.radius) {
				// collision!
				console.log("collision!");
			}
		}

		api._getDistance = function _getDistance(position_a, position_b) {
			var dx = position_a.x - position_b.x;
			var dy = position_a.y - position_b.y;
			return Math.sqrt(dx * dx + dy * dy);
		}

		return CollisionSystem;

	}
)
;