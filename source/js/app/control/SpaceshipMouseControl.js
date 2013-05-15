/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 15/05/13
 * Time: 09:37
 */
define(function () {

	function SpaceshipMouseControl(config, container) {
		this.config = config;
		this._lastPosition = {x: this.config.spaceWidth / 2, y: 0};
		this._isPressed = false;

		var self = this;
		container.onPress = function (e) {
			self._isPressed = true;
			self._lastPosition.x = e.stageX;
			self._lastPosition.y = e.stageY;
			e.onMouseMove = function (e) {
				if (self._lastPosition) {
					self._lastPosition.x = e.stageX;
					self._lastPosition.y = e.stageY;
				}
			};
			e.onMouseUp = function (e) {
				self._isPressed = false;
				self._lastPosition.x = e.stageX;
				self._lastPosition.y = e.stageY;
			};
		};
	}

	var api = SpaceshipMouseControl.prototype;

	api.update = function update(entity, dt) {
		var steering = entity.position.getAngleTo(this._lastPosition.x, this._lastPosition.y);
		var abs_steering = Math.abs(steering);
		if (abs_steering > 5) {
			console.log('steering angle: ' + steering);
		} else {
			steering = 0;
			abs_steering = 1;
		}
		steering = steering / abs_steering * this.config.shipSteeringSpeed;
		entity.motion.av = steering;
		entity.state.weapon.triggerDown = this._isPressed;
		entity.state.thruster = this._isPressed;
	};

	return SpaceshipMouseControl;
});