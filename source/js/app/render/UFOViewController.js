/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 10/05/13
 * Time: 11:07
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function UFOViewController(view, sound_id) {
		this.view = view;
		this.sound = createjs.Sound.createInstance(sound_id);
	}

	var api = UFOViewController.prototype;

	api.handleAdded = function handleAdded(entity) {
		this.sound.play(createjs.Sound.INTERRUPT_NONE,0,0,1000);
	};
	api.handleRemoved = function handleRemoved(entity) {
		this.sound.stop();
		console.log('muting ufo');
	};

	api.update = function update(entity, dt) {
	};
	return UFOViewController;
});
