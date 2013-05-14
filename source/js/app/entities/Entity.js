/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 10:31
 */
define(['app/components/Position', 'app/components/Motion', 'app/components/Collider', 'app/components/Timeout'], function (Position, Motion, Collider, Timeout) {

	/**
	 * Every "actor" in the game is an Entity.
	 * Entities contain different components that are handled by different systems. See the systems directory.
	 *
	 * @constructor
	 */
	function Entity() {
		this.disposed = new signals.Signal();

		this.position = new Position();
		this.collider = new Collider();
		this.motion = new Motion();
		this.timeout = new Timeout();
		this.reset();
	}

	var api = Entity.prototype;

	api.reset = function reset() {
		this.active = true;
		this.state = '';
		this.control = null;
		this.view = null;
		this.viewController = null;
		this.rewardPoints = 0;
		this.position.reset();
		this.collider.reset();
		this.motion.reset();
		this.timeout.reset();
		//
		this.disposed.removeAll();
	};

	return Entity;
});