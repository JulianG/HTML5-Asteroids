/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 14:09
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function SpaceshipViewController(view) {
		this.view = view;
		this.thruster = view.getChildByName('thruster');
	}

	var api = SpaceshipViewController.prototype;

	api.handleAdded = function handleAdded(entity) {

	};
	api.handleRemoved = function handleRemoved(entity) {

	};

	api.update = function update(entity, dt) {
		if (this.thruster)  this.thruster.visible = entity.state.thruster;
	};
	return SpaceshipViewController;
});