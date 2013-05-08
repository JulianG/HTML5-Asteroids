/**
 * GameBoard
 * @author Julian
 */
define([], function () {

		function CollisionSystem(board) {
			this.board = board;
			this.collisionDetected = new signals.Signal();
		}

		var api = CollisionSystem.prototype;

		api.update = function update(dt) {
			var n = this.board.entities.length;
			for (i = 0; i < n; i++) {
				var entity = this.board.entities[i];
				if (entity.collider.active) {
					this._checkCollisionsFor(entity);
				}
			}
		};

		api._checkCollisionsFor = function _checkCollisionsFor(active_entity) {
			var n = this.board.entities.length;
			for (i = 0; i < n; i++) {
				var passive_entity = this.board.entities[i];
				if (active_entity !== passive_entity && active_entity && passive_entity) {
					var collision = this._checkCollisions(active_entity, passive_entity);
					if(collision) this.collisionDetected.dispatch(active_entity,passive_entity);
					//break;
				}
			}
		};

		api._checkCollisions = function _checkCollisions(active_entity, passive_entity) {
			var distance = this._getDistance(active_entity.position, passive_entity.position);
			var threshold = active_entity.collider.radius + passive_entity.collider.radius;
			return (distance < threshold);
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