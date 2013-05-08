/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 28/02/13
 * Time: 11:18
 * To change this template use File | Settings | File Templates.
 */
define(['app/Directions'], function (Directions) {

	function HeroState(){
		this.direction = Directions.NONE;
	}

	return HeroState;
});