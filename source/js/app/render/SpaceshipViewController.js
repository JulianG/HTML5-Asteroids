/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 14:09
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function SpaceshipViewController(){

	}

	var api = SpaceshipViewController.prototype;

	api.update = function update(entity, dt){

		if(entity.view){
			var thrusting = (entity.state=='thrusting');

			var thruster = entity.view.getChildByName('thruster');

			if(thruster){
				thruster.visible = thrusting;
			}
		}


	}
	return SpaceshipViewController;
});