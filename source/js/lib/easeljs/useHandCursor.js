/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 14/05/13
 * Time: 18:11
 */
define(function () {

	function useHandCursor( img ) {

		console.log('useHandCursor called on ' + img.currentAnimation );

		img.onMouseOver = function(e) {
			document.body.style.cursor='pointer';
		};
		img.onMouseOut = function(e) {
			document.body.style.cursor='default';
		};
	}

	return useHandCursor;
});