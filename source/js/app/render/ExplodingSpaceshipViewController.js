/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 08/05/13
 * Time: 14:09
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function ExplodingSpaceshipViewController(view, atlas) {
		this.view = view;

		this.leftFire = atlas.getDisplayObject('thruster');
		this.leftFire.regX = 16;
		this.leftFire.regY = 13;
		this.leftFire.scaleX = 1;
		this.leftFire.scaleY = 2;

		this.rightFire = atlas.getDisplayObject('thruster');
		this.rightFire.regX = 16;
		this.rightFire.regY = 13;
		this.rightFire.scaleX = -1;
		this.rightFire.scaleY = 2;

		this.shipBody = atlas.getDisplayObject('ship-explosion');
		this.shipBody.x = -25;
		this.shipBody.y = -35;

		this.view.addChild(this.leftFire);
		this.view.addChild(this.rightFire);
		this.view.addChild(this.shipBody);
	}

	var api = ExplodingSpaceshipViewController.prototype;

	api.handleAdded = function handleAdded(entity) {
		this.shipBody.currentAnimationFrame = 0;
		this.leftFire.scaleX = 1;
		this.leftFire.scaleY = 2;
		this.rightFire.scaleX = -1;
		this.rightFire.scaleY = 2;
		this.leftFire.alpha = 1;
		this.rightFire.alpha = 1;
		createjs.Tween.get(this.leftFire).wait(230).to({scaleX: 0.25, scaleY: 0.25, alpha: 0}, 160);
		createjs.Tween.get(this.rightFire).wait(230).to({scaleX: -0.25, scaleY: 0.25, alpha: 0}, 160);
	};

	api.handleRemoved = function handleRemoved(entity) {
	};

	api.update = function update(entity, dt) {

	};
	return ExplodingSpaceshipViewController;
});