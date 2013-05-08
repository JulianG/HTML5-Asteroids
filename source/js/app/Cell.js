/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:18
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function Cell( type ){
		this.type = type; // the type of cell. see CellTypes
		this.control = null;
		this.view = null; // an EaselJS display object that can be added to a container
	}

	return Cell;
});