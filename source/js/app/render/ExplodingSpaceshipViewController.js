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
		this.shipBody.stop();

		this.view.addChild(this.leftFire);
		this.view.addChild(this.rightFire);
		this.view.addChild(this.shipBody);
	}

	var api = ExplodingSpaceshipViewController.prototype;

	api.handleAdded = function handleAdded(entity) {
		this.shipBody.gotoAndPlay(1);
		createjs.Tween.get(this.leftFire).set({alpha: 1, scaleX: 1}).wait(230).to({scaleX: 0, scaleY: 0, alpha: 0}, 160).to({scaleX: 1, scaleY: 1}, 1000);
		createjs.Tween.get(this.rightFire).set({alpha: 1, scaleX: -1}).wait(230).to({scaleX: 0, scaleY: 0, alpha: 0}, 160).to({scaleX: 1, scaleY: 1}, 1000);
	};

	api.handleRemoved = function handleRemoved(entity) {
		this.shipBody.gotoAndStop(0);
	};

	api.update = function update(entity, dt) {

	};
	return ExplodingSpaceshipViewController;
});