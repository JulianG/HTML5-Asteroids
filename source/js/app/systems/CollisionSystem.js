/**
 * @author Julian
 */
define([], function () {

		/**
		 * Checks collisions between entities in the game board. But only those with a collider component.
		 *
		 * @param board
		 * @constructor
		 */
		function CollisionSystem(board) {
			this.board = board;
			this.collisionDetected = new signals.Signal();
		}

		var api = CollisionSystem.prototype;

		api.update = function update(dt) {
			var count = 0;
			var n = this.board.entities.length;
			for (var i = 0; i < n; i++) {
				var entity = this.board.entities[i];
				if (entity && entity.active) {
					if (entity.collider.active) {
						count++;
						this._checkCollisionsFor(entity);
					}
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
		};

		api._getDistance = function _getDistance(position_a, position_b) {
			var dx = position_a.x - position_b.x;
			var dy = position_a.y - position_b.y;
			return Math.sqrt(dx * dx + dy * dy);
		};

		return CollisionSystem;

	}
)
;