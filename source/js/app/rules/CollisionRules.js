/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 15:28
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function CollisionRules(board, ship, exploding_ship){
		this.board = board;
		this.ship = ship;
		this.explodingShip = exploding_ship;
	}

	var api = CollisionRules.prototype;

	api.handleCollision = function handleCollision( active_entity, passive_entity ){
		console.log("collision handled!");

		if(active_entity==this.ship){

			this.explodingShip.position.clone(this.ship.position);
			this.explodingShip.motion.clone(this.ship.motion);

			this.board.removeEntity(this.ship);
			this.board.addEntity(this.explodingShip);

		}

	};

	return CollisionRules;
});