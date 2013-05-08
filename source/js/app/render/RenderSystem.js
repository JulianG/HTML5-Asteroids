/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 16:56
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function RenderSystem(container, board) {
		this.container = container;
		this.board = board;
		//

		var self = this;
		this.board.entityRemoved.add(function(entity){
			self.remove(entity);
		});
		//this.board.entityAdded.add(function(entity){}); // new entities are added to the container in the update method
	}

	var api = RenderSystem.prototype;

	api.update = function update(dt) {
		//console.log("Renderer.renderBoard...");

		var n = this.board.entities.length;
		for (var i = 0; i < n; i++) {

			var entity = this.board.entities[i];

			if (entity.view && entity.position) {
				var sp = entity.view;
				if (entity.active) {
					if (!this.container.contains(sp)) {
						this.container.addChild(sp);
					}
					sp.x = entity.position.x;
					sp.y = entity.position.y;
					sp.rotation = entity.position.rotation;
				} else {
					if (this.container.contains(sp)) {
						this.container.removeChild(sp);
					}
				}
				if (entity.viewController) entity.viewController.update(entity, dt);
			}
		}
	};

	api.remove = function remove(entity){
		if (entity.view){
			if (this.container.contains(entity.view)) {
				this.container.removeChild(entity.view);
			}
		}
	};

	return RenderSystem;
});